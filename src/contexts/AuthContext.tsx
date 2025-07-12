import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, hasSupabaseCredentials } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, username?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip authentication if Supabase credentials are missing
    if (!hasSupabaseCredentials) {
      console.warn('⚠️ Running in demo mode - Supabase credentials not configured')
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Error connecting to Supabase:', error)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle user profile creation on signup
        if (event === 'SIGNED_IN' && session?.user) {
          // Check if user profile exists
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('id', session.user.id)
            .single()

          // Create user profile if it doesn't exist
          if (!existingUser) {
            const { error } = await supabase
              .from('users')
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  username: session.user.user_metadata?.username || null,
                  created_at: new Date().toISOString(),
                },
              ])
            
            if (error) {
              console.error('Error creating user profile:', error)
            }
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, username?: string) => {
    if (!hasSupabaseCredentials) {
      return { error: { message: 'Demo mode: Please configure Supabase credentials to enable authentication' } as AuthError }
    }
    
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || null,
        },
      },
    })
    setLoading(false)
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    if (!hasSupabaseCredentials) {
      return { error: { message: 'Demo mode: Please configure Supabase credentials to enable authentication' } as AuthError }
    }
    
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    return { error }
  }

  const signOut = async () => {
    if (!hasSupabaseCredentials) {
      return { error: { message: 'Demo mode: Please configure Supabase credentials to enable authentication' } as AuthError }
    }
    
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    return { error }
  }

  const resetPassword = async (email: string) => {
    if (!hasSupabaseCredentials) {
      return { error: { message: 'Demo mode: Please configure Supabase credentials to enable authentication' } as AuthError }
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

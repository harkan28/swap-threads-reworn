import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have Supabase credentials
export const hasSupabaseCredentials = !!(supabaseUrl && supabaseAnonKey)

// Create a dummy client for development when credentials are missing
const createSupabaseClient = () => {
  if (!hasSupabaseCredentials) {
    console.warn('⚠️ Supabase credentials missing - running in demo mode. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
    // Return a dummy client that won't actually work but won't crash the app
    return createClient('https://dummy.supabase.co', 'dummy-key')
  }
  return createClient(supabaseUrl!, supabaseAnonKey!)
}

export const supabase = createSupabaseClient()

// Database types for TypeScript
export interface User {
  id: string
  email: string
  username?: string
  created_at: string
}

export interface ClothingItem {
  id: string
  user_id: string
  title: string
  description: string
  category: string
  size: string
  condition: string
  price?: number
  images: string[]
  status: 'available' | 'sold' | 'pending'
  created_at: string
  users?: User
}

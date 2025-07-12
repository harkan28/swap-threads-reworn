import { useState, useEffect } from 'react'
import { supabase, ClothingItem, hasSupabaseCredentials } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useClothingItems = () => {
  const { user } = useAuth()
  const [items, setItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    if (!user || !hasSupabaseCredentials) {
      setItems([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clothing_items')
        .select(`
          *,
          users (
            id,
            email,
            username
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setItems(data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching clothing items:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (itemData: Omit<ClothingItem, 'id' | 'user_id' | 'created_at' | 'users'>) => {
    if (!user) {
      return { data: null, error: 'User must be logged in to add items' }
    }

    if (!hasSupabaseCredentials) {
      return { data: null, error: 'Demo mode: Please configure Supabase credentials to save items' }
    }

    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .insert([
          {
            ...itemData,
            user_id: user.id,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

      // Refresh the items list
      await fetchItems()
      return { data, error: null }
    } catch (err) {
      console.error('Error adding item:', err)
      return { data: null, error: err instanceof Error ? err.message : 'Failed to add item' }
    }
  }

  const updateItem = async (id: string, updates: Partial<ClothingItem>) => {
    if (!user) {
      throw new Error('User must be logged in to update items')
    }

    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      // Refresh the items list
      await fetchItems()
      return { data, error: null }
    } catch (err) {
      console.error('Error updating item:', err)
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update item' }
    }
  }

  const deleteItem = async (id: string) => {
    if (!user) {
      throw new Error('User must be logged in to delete items')
    }

    try {
      const { error } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      // Refresh the items list
      await fetchItems()
      return { error: null }
    } catch (err) {
      console.error('Error deleting item:', err)
      return { error: err instanceof Error ? err.message : 'Failed to delete item' }
    }
  }

  useEffect(() => {
    fetchItems()
  }, [user])

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  }
}

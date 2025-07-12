-- Supabase Database Schema for Swap Threads Reworn
-- Run these SQL commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clothing_items table
CREATE TABLE public.clothing_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  price DECIMAL(10,2) DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_clothing_items_user_id ON public.clothing_items(user_id);
CREATE INDEX idx_clothing_items_status ON public.clothing_items(status);
CREATE INDEX idx_clothing_items_category ON public.clothing_items(category);
CREATE INDEX idx_clothing_items_created_at ON public.clothing_items(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clothing_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for clothing_items table
CREATE POLICY "Anyone can view available clothing items" ON public.clothing_items
  FOR SELECT USING (status = 'available');

CREATE POLICY "Users can view their own items" ON public.clothing_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own items" ON public.clothing_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items" ON public.clothing_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items" ON public.clothing_items
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_clothing_items_updated_at
  BEFORE UPDATE ON public.clothing_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert some sample data (optional)
-- Note: You'll need to replace the UUIDs with actual user IDs after users sign up

-- Sample clothing items (uncomment and modify after you have real users)
/*
INSERT INTO public.clothing_items (user_id, title, description, category, size, condition, price, images, status) VALUES
  ('your-user-id-here', 'Vintage Leather Jacket', 'Classic brown leather jacket in excellent condition', 'Outerwear', 'M', 'good', 25.00, '{"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&h=600&fit=crop"}', 'available'),
  ('your-user-id-here', 'Designer Blazer', 'Professional black blazer perfect for office wear', 'Professional', 'L', 'like_new', 30.00, '{"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop"}', 'available'),
  ('your-user-id-here', 'Casual Hoodie', 'Comfortable grey hoodie for everyday wear', 'Streetwear', 'M', 'good', 15.00, '{"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"}', 'available');
*/

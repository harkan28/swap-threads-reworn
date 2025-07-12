# 🚀 Quick Setup Guide

## Running in Demo Mode

Your application is currently running in **demo mode** because Supabase credentials are not configured. The app will work for viewing the UI, but authentication and database features will be disabled.

## Enable Full Functionality

To enable authentication and database features:

### 1. Set up Supabase (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings** → **API** in your Supabase dashboard
4. Copy your **Project URL** and **anon/public key**

### 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the script to create tables and security policies

### 4. Restart Development Server

```bash
npm run dev
```

That's it! Your app will now have:
- ✅ User authentication (login/signup)
- ✅ Database storage for clothing items  
- ✅ Real-time data synchronization
- ✅ Secure user-specific data

For detailed setup instructions, see `SUPABASE_SETUP.md`.

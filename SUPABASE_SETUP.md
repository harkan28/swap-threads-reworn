# Supabase Setup Guide for Swap Threads Reworn

This guide will walk you through setting up Supabase authentication and database for the Swap Threads Reworn application.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `swap-threads-reworn`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be set up (this may take a few minutes)

## Step 2: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Configure the following settings:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add your production URL when deploying
3. Enable **Email** provider (it's enabled by default)
4. Optionally enable social providers (Google, GitHub, etc.)

## Step 3: Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the query by clicking the "Run" button
5. Verify that the tables were created by going to **Table Editor**

You should see two tables:
- `users` - Stores user profile information
- `clothing_items` - Stores clothing items for swapping

## Step 4: Get API Keys

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (something like `https://your-project.supabase.co`)
   - **anon/public key** (starts with `eyJhbGci...`)

## Step 5: Configure Environment Variables

1. In your project root, open the `.env` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Never commit your actual API keys to version control. The `.env` file should be in your `.gitignore`.

## Step 6: Test the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the application
3. Try the following features:
   - **Register**: Create a new account with email/password
   - **Login**: Log in with your credentials
   - **Add Item**: Add a clothing item (go to Dashboard > Add Item)
   - **View Items**: Check the "My Listings" tab to see your items

## Step 7: Verify Database Records

1. Go back to Supabase **Table Editor**
2. Check the `users` table - you should see your user record
3. Check the `clothing_items` table - you should see any items you added

## Step 8: Production Setup (When Ready)

When deploying to production:

1. Update your **Site URL** in Supabase Auth settings
2. Add your production domain to **Redirect URLs**
3. Update your environment variables in your hosting platform
4. Consider enabling additional security features in Supabase

## Features Implemented

✅ **Authentication System**
- Email/password registration and login
- Secure session management
- Automatic user profile creation
- Protected routes

✅ **Database Integration**
- User profiles stored in Supabase
- Clothing items with full CRUD operations
- Row-level security (RLS) policies
- Real-time data synchronization

✅ **User Interface**
- Dynamic "My Listings" tab showing user's items
- Add new clothing items with form validation
- Loading states and error handling
- Empty states with calls-to-action

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Make sure your `.env` file has the correct values
   - Restart your development server after changing environment variables

2. **Authentication not working**
   - Verify your Site URL and Redirect URLs in Supabase Auth settings
   - Check that your API keys are correct

3. **Database errors**
   - Ensure you've run the schema SQL script
   - Check that RLS policies are enabled
   - Verify your user has the correct permissions

4. **Items not showing in "My Listings"**
   - Make sure you're logged in
   - Try adding a new item through the "Add Item" form
   - Check the `clothing_items` table in Supabase to verify data is being stored

### Getting Help:

- Check the browser console for error messages
- Review the Network tab in developer tools for failed requests
- Consult the [Supabase documentation](https://supabase.com/docs)
- Check the [Supabase Discord community](https://discord.supabase.com)

## Next Steps

Once you have the basic system working, you can extend it with:

- Image upload functionality using Supabase Storage
- Real-time notifications for item interactions
- Advanced search and filtering
- User ratings and reviews
- Messaging system between users
- Email notifications
- Mobile app using React Native

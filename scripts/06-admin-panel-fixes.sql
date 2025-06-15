-- Check if the service_role_key is set
DO $$
BEGIN
    IF current_setting('request.jwt.claim.role', true) IS NULL THEN
        RAISE EXCEPTION 'Missing SUPABASE_SERVICE_ROLE_KEY. Make sure it is set in your environment variables.';
    END IF;
END $$;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS analytics_data (
    id SERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    avg_time_on_page INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    device TEXT,
    browser TEXT,
    ip_address TEXT,
    country TEXT,
    city TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration INTEGER
);

-- Create admin_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_settings (
    id SERIAL PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type TEXT DEFAULT 'string',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if they don't exist
INSERT INTO admin_settings (setting_key, setting_value, setting_type)
VALUES 
    ('site_name', 'New Zip Indic', 'string'),
    ('contact_email', 'contact@example.com', 'string'),
    ('phone_number', '+91 1234567890', 'string'),
    ('enable_blog', 'true', 'boolean'),
    ('maintenance_mode', 'false', 'boolean')
ON CONFLICT (setting_key) DO NOTHING;

-- Create RLS policies for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all user data" ON users
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'name',
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user data
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users
    SET 
        email = NEW.email,
        name = NEW.raw_user_meta_data->>'name',
        role = COALESCE(NEW.raw_user_meta_data->>'role', users.role),
        updated_at = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_update();

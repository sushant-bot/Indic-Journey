-- Create admin user if it doesn't exist
DO $$
DECLARE
    user_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
    ) INTO user_exists;
    
    IF NOT user_exists THEN
        -- Insert into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        )
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4(),
            'authenticated',
            'authenticated',
            'admin@example.com',
            crypt('Admin123!', gen_salt('bf')),
            NOW(),
            NULL,
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"name": "Admin User", "role": "admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        RAISE NOTICE 'Admin user created successfully';
    ELSE
        RAISE NOTICE 'Admin user already exists';
    END IF;
END
$$;

-- Ensure the user is in the users table with admin role
DO $$
DECLARE
    admin_id UUID;
BEGIN
    SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@example.com';
    
    IF admin_id IS NOT NULL THEN
        INSERT INTO public.users (id, email, name, role)
        VALUES (
            admin_id,
            'admin@example.com',
            'Admin User',
            'admin'
        )
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', name = 'Admin User';
        
        RAISE NOTICE 'Admin user role set successfully';
    END IF;
END
$$;

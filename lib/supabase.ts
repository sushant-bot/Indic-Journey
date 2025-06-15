import { createClient as createClientBase } from "@supabase/supabase-js"

// Validate environment variables
const validateEnvVars = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not set")
    return false
  }

  if (!supabaseAnonKey) {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
    return false
  }

  return true
}

// Create a single supabase client for the entire app
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
  }

  return createClientBase(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Create a server-side client with admin privileges
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables. Please check your .env.local file.")
  }

  return createClientBase(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Create a singleton client for client-side use
let supabase: ReturnType<typeof createClientBase> | null = null

// Only create client-side instance if we're in the browser and have valid env vars
if (typeof window !== "undefined" && validateEnvVars()) {
  try {
    supabase = createClient()
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    supabase = null
  }
}

export { supabase }

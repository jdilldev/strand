import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supbaseClient: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `Supabase env variables are not set: ${supabaseUrl} ${supabaseKey}`
    );
  }

  return supbaseClient
    ? supbaseClient
    : createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      });
};

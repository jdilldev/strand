import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function getPublicImageUrl(bucket: string, path: string | null) {
  if (!path) return null;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url: string | undefined =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const key: string | undefined =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
export const isSupabaseReady = !!supabase;

if (!isSupabaseReady) {
  console.warn(
    '[The Learning Lab] Chưa cấu hình Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Form sẽ chuyển sang phương án liên hệ Zalo.',
  );
}

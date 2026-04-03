import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DIRECT_SUPABASE_HOST = 'https://xunbfndvinjlpjmrtdhz.supabase.co';
const PROXIED_SUPABASE_HOST = `${supabaseUrl}`;

export function proxyImageUrl(url: string): string {
  return url.replace(DIRECT_SUPABASE_HOST, PROXIED_SUPABASE_HOST);
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cfrdytbujeihrmcrtvay.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_R3SlLT3kgZBMXTbaOoyxYw_Z8SwBW_d';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etmdylaxhgtxqbtyzstr.supabase.co';
const supabasePublishableKey = 'sb_publishable_cChnYkEr_ROBwAfaYrJTRw_vxfMn1qP';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

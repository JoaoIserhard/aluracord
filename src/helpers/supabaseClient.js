import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDI3NSwiZXhwIjoxOTU4ODgwMjc1fQ.3FMPkKznhZmcFjdW0rwVEhTYc63jqkzrMnX9iS3FTh4';
const SUPABASE_URL = 'https://errkjmfdbwhvplybiwix.supabase.co';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


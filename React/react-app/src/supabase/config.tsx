import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uurweecmwceumlgsnxaa.supabase.co'
// Usa tu clave pública (anon / publishable)
const supabaseKey = "sb_publishable_4qlQsTgU3ya_HOMEMM8Fkg_HfosZDz7"

export const supabase = createClient(supabaseUrl, supabaseKey)
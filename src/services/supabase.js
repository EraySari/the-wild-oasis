import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kczhbvtettzbjrqojgyz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjemhidnRldHR6YmpycW9qZ3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODg4MzUsImV4cCI6MjA0Mzk2NDgzNX0.kakAC7qHWw4pH3WSSH4FspizBDQWqH6Rr_k09w9TXm8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

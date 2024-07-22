import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ehvjtbwfhsykrmcerrgf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodmp0YndmaHN5a3JtY2VycmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzODYzNDAsImV4cCI6MjAzNjk2MjM0MH0.cmdYHJeTD2H05ox3AA6RlB334W4dV8dRqrvG6TdfbNA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

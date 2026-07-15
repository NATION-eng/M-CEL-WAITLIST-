import { createClient } from "@supabase/supabase-js";

// Supabase project configuration.
// The anon key is a public value — access is controlled by Row Level Security.
const SUPABASE_URL = "https://lnzoxctgjzkohcfhoqem.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuem94Y3Rnanprb2hjZmhvcWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDY5MDIsImV4cCI6MjA5OTY4MjkwMn0.3kqHzJxzDnZopb3j7HcW1VKaHor440_ge-sR-1IuxlY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

(() => {
  if (!window.TSA_SUPABASE) {
    throw new Error("Supabase configuration not found.");
  }

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error("Supabase SDK not loaded.");
  }

  window.TSA_DB = window.supabase.createClient(
    window.TSA_SUPABASE.url,
    window.TSA_SUPABASE.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
})();

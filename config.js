/* Zugang zum Supabase-Projekt für die Synchronisation. Leer = Fortschritt bleibt nur lokal.
   Der Publishable- bzw. Anon-Key darf öffentlich sein: Die Row-Level-Security in
   supabase/schema.sql sorgt dafür, dass jeder nur seine eigene Zeile lesen und schreiben kann.
   Niemals den service_role- bzw. Secret-Key hier eintragen. */
window.SCHIRI_SYNC_CONFIG = {
  url: 'https://okqxolkcewtingehbgbq.supabase.co',
  key: 'sb_publishable_cYkr2VwsmMMb6WQE-uGMzQ_sroMymT1'
};

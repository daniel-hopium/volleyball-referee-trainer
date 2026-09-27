/* Zugang zum Supabase-Projekt für die Synchronisation. Leer = Fortschritt bleibt nur lokal.
   Der Publishable- bzw. Anon-Key darf öffentlich sein: Die Row-Level-Security in
   supabase/schema.sql sorgt dafür, dass jeder nur seine eigene Zeile lesen und schreiben kann.
   Niemals den service_role- bzw. Secret-Key hier eintragen. */
window.SCHIRI_SYNC_CONFIG = {
  url: '',
  key: ''
};

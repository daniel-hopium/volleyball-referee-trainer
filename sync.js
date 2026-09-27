/* Geräteübergreifender Fortschritt über Supabase. Ohne config.js bleibt alles lokal. */
(function () {
'use strict';

const C = window.SCHIRI_SYNC_CONFIG || {};
const APP = window.SCHIRI_APP;
const box = document.getElementById('sync-card');
if (!C.url || !C.key || !window.supabase || !APP || !box) return;

const sb = window.supabase.createClient(C.url, C.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' } });
let user = null, timer = null, busy = false, applying = false, status = { t: '', bad: false }, sent = '';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const time = () => new Date().toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });

/* Zusammenführen pro Eintrag: der neuere Zeitstempel gewinnt. Ein Zurücksetzen (resetAt)
   verwirft alles, was davor entstanden ist, auf allen Geräten. */
function merge(a, b) {
  a = a || {}; b = b || {};
  const reset = Math.max(a.resetAt || 0, b.resetAt || 0);
  const newer = (a.resetAt || 0) === (b.resetAt || 0) ? null : (a.resetAt || 0) > (b.resetAt || 0) ? a : b;
  const byT = (x = {}, y = {}) => {
    const out = {};
    new Set(Object.keys(x).concat(Object.keys(y))).forEach(k => {
      const p = x[k], q = y[k];
      const w = !p ? q : !q ? p : (q.t || 0) > (p.t || 0) ? q : p;
      if (w && (reset === 0 || (w.t || 0) >= reset)) out[k] = w;
    });
    return out;
  };
  /* Häkchen ohne Zeitstempel: nach einem Zurücksetzen gilt nur die neuere Seite, sonst gewinnt „erledigt“ */
  const flags = (x = {}, y = {}) => {
    if (newer) return Object.assign({}, newer === a ? x : y);
    const out = {};
    new Set(Object.keys(x).concat(Object.keys(y))).forEach(k => { out[k] = x[k] || y[k] || (k in x ? x[k] : y[k]); });
    return out;
  };
  const exams = (a.exams || []).concat(b.exams || []).filter(e => e.d >= reset);
  const seen = new Set();
  return {
    ch: flags(a.ch, b.ch),
    sit: flags(a.sit, b.sit),
    q: byT(a.q, b.q),
    sig: byT(a.sig, b.sig),
    exams: exams.filter(e => { const k = e.d + ':' + e.s; if (seen.has(k)) return false; seen.add(k); return true; }).sort((x, y) => x.d - y.d),
    lastCh: a.lastCh || b.lastCh || 'feld',
    resetAt: reset || undefined
  };
}

async function sync() {
  if (!user || busy) return;
  busy = true;
  try {
    const { data, error } = await sb.from('progress').select('data').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    const local = APP.get();
    const merged = merge(local, data && data.data);
    if (JSON.stringify(merged) !== JSON.stringify(local)) { applying = true; APP.replace(merged); applying = false; }
    const up = await sb.from('progress').upsert({ user_id: user.id, data: merged, updated_at: new Date().toISOString() });
    if (up.error) throw up.error;
    status = { t: `Synchronisiert um ${time()}`, bad: false };
  } catch (e) {
    status = { t: navigator.onLine ? `Synchronisieren fehlgeschlagen: ${e.message || e}` : 'Offline. Wird nachgeholt, sobald du wieder online bist.', bad: true };
  } finally {
    busy = false;
    render();
  }
}

function render() {
  if (user) {
    box.innerHTML = `<p class="eyebrow">Fortschritt auf allen Geräten</p><h3>Angemeldet als ${esc(user.email || 'du')}</h3>
      <p class="muted small">Jede Antwort wird gespeichert und mit deinen anderen Geräten zusammengeführt.</p>
      <div class="row-btns"><button type="button" class="btn btn-ghost btn-s" id="sync-now">Jetzt synchronisieren</button><button type="button" class="btn btn-ghost btn-s" id="sync-out">Abmelden</button></div>
      <p class="sync-st${status.bad ? ' bad' : ''}" aria-live="polite">${esc(status.t)}</p>`;
    box.querySelector('#sync-now').addEventListener('click', sync);
    box.querySelector('#sync-out').addEventListener('click', async () => { await sb.auth.signOut(); status = { t: 'Abgemeldet. Der Fortschritt bleibt in diesem Browser erhalten.', bad: false }; });
  } else {
    box.innerHTML = `<p class="eyebrow">Fortschritt auf allen Geräten</p><h3>Handy und PC abgleichen</h3>
      <p class="muted small">Melde dich mit deiner E-Mail an, auf jedem Gerät mit derselben. Du bekommst einen Anmeldelink, ein Passwort brauchst du nicht.</p>
      <form class="sync-form" id="sync-form"><label for="sync-mail" hidden>E-Mail</label><input id="sync-mail" type="email" autocomplete="email" required placeholder="deine@email.at" value="${esc(sent)}"><button type="submit" class="btn btn-primary btn-s">Anmeldelink schicken</button></form>
      <p class="sync-st${status.bad ? ' bad' : ''}" aria-live="polite">${esc(status.t)}</p>`;
    box.querySelector('#sync-form').addEventListener('submit', async e => {
      e.preventDefault();
      const email = box.querySelector('#sync-mail').value.trim();
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } });
      sent = email;
      status = error ? { t: `Das hat nicht geklappt: ${error.message}`, bad: true } : { t: `Link an ${email} geschickt. Öffne ihn auf diesem Gerät.`, bad: false };
      render();
    });
  }
  box.hidden = false;
}

sb.auth.onAuthStateChange((ev, session) => {
  user = session ? session.user : null;
  if (ev === 'SIGNED_OUT') user = null;
  render();
  if (user && (ev === 'SIGNED_IN' || ev === 'INITIAL_SESSION')) {
    if (/access_token/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + '#start'); } catch (e) {} }
    setTimeout(sync, 0);
  }
});
window.addEventListener('online', sync);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') sync(); });

window.SCHIRI_SYNC = {
  changed() { if (applying || !user) return; clearTimeout(timer); timer = setTimeout(sync, 1500); },
  merge
};
})();

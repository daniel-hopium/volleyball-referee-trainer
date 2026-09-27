(function () {
'use strict';

const D = window.SCHIRI_DATA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ROM = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI' };

const QS = D.Q.map(([id, k, q, o, c, e, r]) => ({ id, k, q, o, c, e, r }));
const CHMAP = Object.fromEntries(D.CH.map((c, i) => [c.k, Object.assign({ i }, c)]));
const SIGMAP = Object.fromEntries(D.SIG.map(s => [s.id, s]));
const WHO = { F: '1. SR', FS: '1. und 2. SR', L: 'Linienrichter' };

/* ---------- Regelverweise als Links ins FIVB-Regelwerk ---------- */
function rulePage(r) {
  const parts = r.split('.');
  while (parts.length) { const p = D.RP[parts.join('.')]; if (p) return p; parts.pop(); }
  return null;
}
const pdfLink = (page, label, title) => `<a href="${D.PDF}#page=${page}" target="_blank" rel="noopener" title="${esc(title)}">${label}</a>`;
function linkRuleText(txt) {
  const i = txt.indexOf('Regel');
  const pre = i >= 0 ? txt.slice(0, i + 5) : '';
  const rest = i >= 0 ? txt.slice(i + 5) : txt;
  return esc(pre) + esc(rest).replace(/\d+(?:\.\d+)*/g, m => { const p = rulePage(m); return p ? pdfLink(p, m, `Regel ${m} im FIVB-Regelwerk, PDF-Seite ${p}`) : m; });
}
function linkRules(root) { $$('.r:not([data-l]), .rl:not([data-l])', root).forEach(el => { el.dataset.l = '1'; el.innerHTML = linkRuleText(el.textContent); }); }
function linkFreeText(txt) {
  return esc(txt).replace(/\b\d{1,2}(?:\.\d{1,2}){1,4}\b/g, m => { const p = +m.split('.')[0] <= 30 ? rulePage(m) : null; return p ? pdfLink(p, m, `Regel ${m}, PDF-Seite ${p}`) : m; });
}
const rulePill = txt => `<span class="r">${esc(txt)}</span>`;
linkRules(document);
new MutationObserver(() => linkRules(document)).observe(document.body, { childList: true, subtree: true });

/* ---------- Fortschritt (nur in diesem Browser) ---------- */
const KEY = 'schiri-trainer-v1';
let P = { ch: {}, q: {}, sig: {}, sit: {}, exams: [], lastCh: 'feld' };
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) P = Object.assign(P, s); } catch (e) {}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {}
  if (window.SCHIRI_SYNC) window.SCHIRI_SYNC.changed();
}
/* Wiederholung nach dem Leitner-Prinzip: falsch -> morgen, dann 3, 7, 14, 30 Tage. */
const IVL = [1, 3, 7, 14, 30];
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
Object.values(P.q).forEach(s => { if (s.due == null) { s.lvl = s.last === 0 ? 0 : 2; s.due = s.last === 0 ? today() : today() + IVL[2]; } });
function recordQ(id, ok) {
  const s = P.q[id] || { r: 0, w: 0 }, d = today();
  ok ? s.r++ : s.w++; s.last = ok ? 1 : 0; s.t = Date.now();
  if (!ok) { s.lvl = 0; s.due = d + IVL[0]; }
  else if (s.due == null) { s.lvl = 2; s.due = d + IVL[2]; }
  else if (s.due <= d) { s.lvl = Math.min((s.lvl || 0) + 1, IVL.length - 1); s.due = d + IVL[s.lvl]; }
  P.q[id] = s; save();
}
const dueQs = () => { const d = today(); return QS.filter(q => P.q[q.id] && P.q[q.id].due <= d); };
function recordSig(id, ok) { const s = P.sig[id] || { r: 0, w: 0 }; ok ? s.r++ : s.w++; s.last = ok ? 1 : 0; s.t = Date.now(); P.sig[id] = s; save(); }

/* ---------- Navigation ---------- */
const VIEWS = ['start', 'lernen', 'zeichen', 'aufstellung', 'situationen', 'praxis', 'quiz', 'pruefung', 'coach'];
let pendingDue = false, curView = 'start';
const onShow = {};
function go(v) {
  if (!VIEWS.includes(v)) v = 'start';
  if (v !== 'praxis' && window.SCHIRI_PLAYS) window.SCHIRI_PLAYS.pause();
  VIEWS.forEach(x => { $('#v-' + x).hidden = x !== v; });
  $$('.nav button').forEach(b => b.setAttribute('aria-current', b.dataset.view === v ? 'page' : 'false'));
  const btn = $('.nav button[data-view="' + v + '"]');
  if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: 'nearest', inline: 'center' });
  curView = v;
  if (!/access_token|error_description/.test(location.hash)) { try { history.replaceState(null, '', '#' + v); } catch (e) {} }
  if (onShow[v]) onShow[v]();
  window.scrollTo(0, 0);
}
$$('.nav button').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]');
  if (!g) return;
  e.preventDefault();
  const [v, arg] = g.dataset.goto.split(':');
  if (v === 'lernen' && arg) P.lastCh = arg;
  if (v === 'quiz' && arg === 'due') pendingDue = true;
  go(v);
});

/* ---------- Piktogramme der Handzeichen ---------- */
function arr(d, x, y, ang) {
  return `<path d="${d}" class="pf-mot"/><polygon points="0,0 -8,-4.5 -8,4.5" class="pf-head-a" transform="translate(${x} ${y}) rotate(${ang})"/>`;
}
/* Figuren im Stil der FIVB-Diagramme 11 und 12: Oberkörper von vorn, Trikot, Arme mit Ellbogen,
   Ausgangsstellung blass, Bewegung als dunkler Pfeil. Koordinaten im Raster 120 × 140. */
const DN = { L: [[45, 56], [40, 82], [39, 106]], R: [[75, 56], [80, 82], [81, 106]] };
const angOf = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
const skinLine = (x1, y1, x2, y2, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pf-fo" stroke-width="${w + 2.4}"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pf-fi" stroke-width="${w}"/>`;
function hand(p, a, type) {
  const [x, y] = p, r = a * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r);
  const c = (cx, cy) => [+(cx).toFixed(1), +(cy).toFixed(1)];
  if (type === 'none') return '';
  if (type === 'open') { const [cx, cy] = c(x + dx * 4, y + dy * 4); return `<ellipse cx="${cx}" cy="${cy}" rx="8" ry="4.8" transform="rotate(${a.toFixed(0)} ${cx} ${cy})" class="pf-skin"/>`; }
  if (type === 'palmH') return `<ellipse cx="${x}" cy="${y - 1}" rx="8.5" ry="3.6" class="pf-skin"/>`;
  if (type === 'palmV') return `<ellipse cx="${x}" cy="${y - 5}" rx="3.8" ry="8.5" class="pf-skin"/>`;
  if (type === 'point') return skinLine(x, y, +(x + dx * 13).toFixed(1), +(y + dy * 13).toFixed(1), 2.8) + `<circle cx="${x}" cy="${y}" r="5.2" class="pf-skin"/>`;
  if (type === 'thumb') return skinLine(x, y - 2, x, y - 14, 3.6) + `<circle cx="${x}" cy="${y}" r="5.6" class="pf-skin"/>`;
  if (type[0] === 'f') {
    const n = +type.slice(1); let s = '';
    for (let i = 0; i < n; i++) { const t = (i - (n - 1) / 2) * 17 * Math.PI / 180; s += skinLine(x, y, +(x + Math.sin(t) * 13).toFixed(1), +(y - Math.cos(t) * 13).toFixed(1), 2.6); }
    return s + `<circle cx="${x}" cy="${y}" r="5.4" class="pf-skin"/>`;
  }
  return `<circle cx="${x}" cy="${y}" r="5.4" class="pf-skin"/>`;
}
const pl = pts => pts.map(p => p.join(',')).join(' ');
const arm = (pts, type = 'fist') => `<polyline points="${pl(pts)}" class="pf-sleeve-o"/><polyline points="${pl(pts)}" class="pf-sleeve"/>` + hand(pts[2], angOf(pts[1], pts[2]), type);
const ghost = pts => `<polyline points="${pl(pts)}" class="pf-ghost"/>`;
const mv = (d, tip, a) => `<path d="${d}" class="pf-mot"/><polygon points="0,0 -8,-4.6 -8,4.6" class="pf-head-a" transform="translate(${tip[0]} ${tip[1]}) rotate(${a})"/>`;
const card = (x, y, col, rot) => `<rect x="${x}" y="${y}" width="13" height="17" rx="1.5" fill="${col}" class="pf-card" transform="rotate(${rot} ${x + 6.5} ${y + 8.5})"/>`;
const badge = (n, x, y) => `<circle cx="${x}" cy="${y}" r="10" class="pf-badge"/><text x="${x}" y="${y + 4.5}" class="pf-badge-t">${n}</text>`;
const floorL = (x1, x2) => `<line x1="${x1}" y1="113" x2="${x2}" y2="113" class="pf-floor"/>`;
const net = (x, y, w, h) => {
  let m = '';
  for (let i = x + 6; i < x + w; i += 6) m += `<line x1="${i}" y1="${y}" x2="${i}" y2="${y + h}" class="pf-mesh"/>`;
  for (let j = y + 6; j < y + h; j += 6) m += `<line x1="${x}" y1="${j}" x2="${x + w}" y2="${j}" class="pf-mesh"/>`;
  return `<g>${m}<rect x="${x}" y="${y - 2}" width="${w}" height="5" class="pf-netband"/></g>`;
};
const flag = (x1, y1, x2, y2, up = true) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pf-stick"/><g transform="translate(${x2} ${y2 - (up ? 0 : 14)})"><rect width="19" height="14" fill="var(--red)" class="pf-card"/><polygon points="0,0 19,0 0,14" fill="var(--yellow)" opacity=".9"/></g>`;
/* L, R: [Punkte, Handform, 'back' für Arm hinter dem Körper]; o.pre hinter allem, o.mid vor dem Trikot, o.post zuoberst */
function fig(L, R, o = {}) {
  const a = s => arm(s[0], s[1]);
  const back = [L, R].filter(s => s[2] === 'back').map(a).join('');
  const front = [L, R].filter(s => s[2] !== 'back').map(a).join('');
  return `<svg viewBox="0 0 120 118" class="pict" aria-hidden="true">${o.pre || ''}${back}
<path d="M44 51 Q60 45 76 51 Q80 54 80 62 L81 118 L39 118 L40 62 Q40 54 44 51 Z" class="pf-shirt"/><path d="M54 46 L60 53 L66 46" class="pf-collar"/>
<circle cx="60" cy="31" r="13" class="pf-headc"/>${o.mid || ''}${front}${o.post || ''}</svg>`;
}
const L0 = [DN.L, 'fist'], R0 = [DN.R, 'fist'];
const PICT = {
  '1': () => fig(L0, [[[75, 56], [94, 58], [110, 58]], 'open'], { mid: ghost([[75, 56], [74, 80], [54, 88]]), post: mv('M52 100 Q84 108 108 74', [108, 74], -58) }),
  '2': () => fig(L0, [[[75, 56], [94, 54], [110, 52]], 'open']),
  '3': () => fig([[[45, 56], [32, 76], [60, 82]], 'fist'], [[[75, 56], [90, 72], [72, 84]], 'fist', 'back'], { post: mv('M24 94 Q60 116 98 92', [98, 92], -35) + mv('M96 36 Q60 20 26 38', [26, 38], 150) }),
  '4': () => fig([[[45, 56], [32, 64], [52, 48]], 'none'], [[[75, 56], [84, 82], [62, 72]], 'none'], { post: '<ellipse cx="62" cy="61" rx="4" ry="11" class="pf-skin"/><ellipse cx="62" cy="48" rx="12" ry="4" class="pf-skin"/>' + mv('M86 36 L112 36', [112, 36], 0) }),
  '5': () => fig([[[45, 56], [32, 74], [68, 72]], 'fist'], [[[75, 56], [88, 90], [52, 90]], 'fist'], { post: mv('M36 66 A26 12 0 0 1 86 70', [86, 70], 55) + mv('M86 98 A26 12 0 0 1 34 96', [34, 96], -125) }),
  '6a': () => fig(L0, [[[75, 56], [96, 46], [94, 24]], 'fist'], { post: card(88, 3, 'var(--yellow)', 8) }),
  '6b': () => fig(L0, [[[75, 56], [96, 46], [94, 24]], 'fist'], { post: card(88, 3, 'var(--red)', 8) }),
  '7': () => fig(L0, [[[75, 56], [96, 46], [94, 24]], 'fist'], { post: card(83, 4, 'var(--yellow)', -10) + card(92, 3, 'var(--red)', 10) }),
  '8': () => fig([[[45, 56], [24, 46], [26, 24]], 'fist'], [[[75, 56], [96, 46], [94, 24]], 'fist'], { post: card(15, 3, 'var(--yellow)', -8) + card(88, 3, 'var(--red)', 8) }),
  '9': () => fig([[[45, 56], [40, 86], [76, 68]], 'open'], [[[75, 56], [80, 86], [44, 68]], 'open']),
  '10': () => fig(L0, [[[75, 56], [92, 62], [106, 58]], 'palmH'], { mid: ghost([[75, 56], [90, 76], [100, 94]]), post: mv('M114 98 L114 66', [114, 66], -90) }),
  '11': () => fig([[[45, 56], [26, 56], [26, 32]], 'f4'], [[[75, 56], [94, 56], [94, 32]], 'f4'], { post: badge('8', 60, 9) }),
  '12': () => fig([[[45, 56], [38, 36], [36, 18]], 'palmV'], [[[75, 56], [82, 36], [84, 18]], 'palmV']),
  '13': () => fig(L0, [[[75, 56], [86, 84], [68, 94]], 'point'], { post: mv('M46 104 A20 8 0 1 0 74 88', [74, 88], -30) }),
  '14': () => fig([[[45, 56], [30, 78], [18, 96]], 'open'], R0, { pre: floorL(2, 44) + '<line x1="13" y1="104" x2="9" y2="110" class="pf-dash"/>' }),
  '15': () => fig([[[45, 56], [30, 80], [32, 52]], 'palmV'], [[[75, 56], [90, 80], [88, 52]], 'palmV'], { pre: ghost([[45, 56], [30, 80], [12, 90]]) + ghost([[75, 56], [90, 80], [108, 90]]), post: mv('M14 80 Q16 62 24 54', [24, 54], -60) + mv('M106 80 Q104 62 96 54', [96, 54], -120) }),
  '16': () => fig(L0, [[[75, 56], [82, 84], [102, 74]], 'palmH'], { mid: ghost([[75, 56], [82, 84], [98, 100]]), post: mv('M113 102 L113 70', [113, 70], -90) }),
  '17': () => fig(L0, [[[75, 56], [96, 50], [96, 28]], 'f2'], { post: badge('2', 18, 20) }),
  '18': () => fig(L0, [[[75, 56], [96, 50], [96, 28]], 'f4'], { post: badge('4', 18, 20) }),
  '19': () => fig(L0, [[[75, 56], [88, 64], [100, 60]], 'open'], { pre: net(96, 62, 24, 44) + '<line x1="117" y1="30" x2="117" y2="110" class="pf-antenna"/>' }),
  '20': () => fig(L0, [[[75, 56], [92, 62], [106, 72]], 'palmH'], { pre: net(92, 84, 28, 30) }),
  '21': () => fig(L0, [[[75, 56], [94, 36], [76, 24]], 'open'], { mid: ghost([[75, 56], [94, 36], [96, 10]]), post: mv('M104 10 Q112 30 90 32', [90, 32], 175) }),
  '22': () => fig(L0, [[[75, 56], [84, 76], [92, 90]], 'point'], { pre: floorL(70, 118) + '<line x1="92" y1="113" x2="118" y2="113" class="pf-lineacc"/><line x1="100" y1="103" x2="104" y2="110" class="pf-dash"/>' }),
  '23': () => fig([[[45, 56], [30, 82], [32, 58]], 'thumb'], [[[75, 56], [90, 82], [88, 58]], 'thumb']),
  '24': () => fig([[[45, 56], [72, 62], [92, 14]], 'palmH'], [[[75, 56], [100, 46], [98, 28]], 'palmV'], { post: mv('M80 6 Q96 -1 114 8', [114, 8], 25) }),
  '25': () => fig([[[45, 56], [70, 64], [90, 38]], 'none'], [[[75, 56], [100, 46], [96, 22]], 'fist'], { post: '<rect x="87" y="27" width="8" height="15" fill="var(--yellow)" class="pf-card"/><rect x="95" y="27" width="8" height="15" fill="var(--red)" class="pf-card"/>' }),
  'P': () => fig(L0, [[[75, 56], [94, 64], [106, 74]], 'point']),
  'L1': () => fig(L0, [[[75, 56], [84, 78], [92, 94]], 'fist'], { post: flag(92, 94, 98, 116, false) }),
  'L2': () => fig(L0, [[[75, 56], [80, 36], [82, 22]], 'fist'], { post: flag(82, 22, 82, 2) }),
  'L3': () => fig([[[45, 56], [38, 72], [66, 50]], 'palmH'], [[[75, 56], [88, 82], [70, 88]], 'fist'], { mid: flag(70, 88, 70, 52) }),
  'L4': () => fig([[[45, 56], [26, 56], [12, 52]], 'point'], [[[75, 56], [88, 34], [80, 18]], 'fist'], { post: flag(80, 18, 72, 2) + mv('M100 22 Q108 8 96 2', [96, 2], -150) }),
  'L5': () => fig([[[45, 56], [42, 86], [76, 68]], 'open'], [[[75, 56], [78, 86], [44, 68]], 'fist'], { post: flag(44, 68, 24, 40) })
};
const pict = id => (PICT[id] ? PICT[id]() : '');
window.SCHIRI_PICT = pict;

/* ---------- Start ---------- */
function renderStart() {
  const chDone = D.CH.filter(c => P.ch[c.k]).length;
  const qKnown = QS.filter(q => P.q[q.id] && P.q[q.id].last === 1).length;
  const sigKnown = D.SIG.filter(s => P.sig[s.id] && P.sig[s.id].last === 1).length;
  const sitDone = D.SIT.filter((s, i) => P.sit[i] === 1).length;
  const last = P.exams[P.exams.length - 1];
  const tile = (label, val, max, goto, note) => {
    const pct = max ? Math.round(val / max * 100) : 0;
    return `<button type="button" class="stat" data-goto="${goto}"><span class="stat-l">${label}</span><span class="stat-v">${val}<small>/${max}</small></span><span class="bar"><span style="width:${pct}%"></span></span><span class="stat-n">${note}</span></button>`;
  };
  $('#stats').innerHTML =
    tile('Kapitel verstanden', chDone, D.CH.length, 'lernen', 'Lernen') +
    tile('Fragen sicher', qKnown, QS.length, 'quiz', 'Zuletzt richtig beantwortet') +
    tile('Handzeichen sicher', sigKnown, D.SIG.length, 'zeichen', 'Zuletzt erkannt') +
    tile('Situationen gelöst', sitDone, D.SIT.length, 'situationen', 'Entscheidung + Zeichen richtig');
  const next = D.CH.find(c => !P.ch[c.k]);
  $('#next-step').innerHTML = next
    ? `<p class="eyebrow">Als Nächstes</p><p class="next-t">Kapitel ${CHMAP[next.k].i + 1}: ${esc(next.t)}</p><p class="muted">${esc(next.s)}</p><button type="button" class="btn btn-primary" data-goto="lernen:${next.k}">Kapitel öffnen</button>`
    : `<p class="eyebrow">Alle Kapitel erledigt</p><p class="next-t">Zeit für eine Probeprüfung</p><p class="muted">30 Fragen, 30 Minuten, gemischt aus allen Kapiteln.</p><button type="button" class="btn btn-primary" data-goto="pruefung">Prüfung starten</button>`;
  const due = dueQs().length, d = today();
  const planned = QS.map(q => P.q[q.id]).filter(s => s && s.due > d).map(s => s.due);
  const nextDue = planned.length ? Math.min.apply(null, planned) : null;
  const nextN = planned.filter(x => x === nextDue).length;
  const inDays = n => n === 1 ? 'morgen' : `in ${n} Tagen`;
  $('#due-card').hidden = !due && nextDue == null;
  $('#due-card').innerHTML = due
    ? `<div><p class="eyebrow">Wiederholung</p><p class="due-t">Heute fällig: <b>${due}</b> ${due === 1 ? 'Frage' : 'Fragen'}</p><p class="muted small">Falsch beantwortete Fragen kommen nach 1, 3 und 7 Tagen wieder. Sitzt eine Frage, werden die Abstände länger.</p></div><button type="button" class="btn btn-primary" data-goto="quiz:due">Jetzt wiederholen</button>`
    : nextDue != null ? `<div><p class="eyebrow">Wiederholung</p><p class="due-t">Heute ist nichts fällig.</p><p class="muted small">Nächste Wiederholung ${inDays(nextDue - d)}: ${nextN} ${nextN === 1 ? 'Frage' : 'Fragen'}.</p></div>` : '';
  $('#last-exam').innerHTML = last
    ? `Letzte Probeprüfung: <b>${Math.round(last.s / last.n * 100)} %</b> (${last.s} von ${last.n}) am ${new Date(last.d).toLocaleDateString('de-AT')}`
    : 'Noch keine Probeprüfung gemacht.';
}
onShow.start = renderStart;

/* ---------- Lernen ---------- */
function renderLernen() {
  const k = CHMAP[P.lastCh] ? P.lastCh : 'feld';
  $('#ch-list').innerHTML = D.CH.map((c, i) => `<button type="button" class="ch-item${c.k === k ? ' is-active' : ''}" data-ch="${c.k}"><span class="ch-no">${i + 1}</span><span class="ch-tt"><b>${esc(c.t)}</b><small>${esc(c.s)}</small></span><span class="ch-done${P.ch[c.k] ? ' on' : ''}" aria-label="${P.ch[c.k] ? 'verstanden' : 'offen'}"></span></button>`).join('');
  $$('#ch-list .ch-item').forEach(b => b.addEventListener('click', () => { P.lastCh = b.dataset.ch; save(); renderLernen(); $('#ch-body').scrollIntoView({ block: 'start' }); }));
  const c = CHMAP[k];
  const nextC = D.CH[c.i + 1];
  $('#ch-body').innerHTML = `
    <p class="eyebrow">Kapitel ${c.i + 1} von ${D.CH.length}</p>
    <h2>${esc(c.t)}</h2>
    <div class="prose">${c.html}</div>
    <section class="check">
      <h3>Schnell-Check</h3>
      <p class="muted">Drei Fragen zu diesem Kapitel. Falsche Antworten landen in deiner Fehlerkartei.</p>
      <div id="ch-quiz"></div>
    </section>
    <div class="ch-foot">
      <button type="button" class="btn ${P.ch[k] ? 'btn-ok' : 'btn-ghost'}" id="ch-toggle">${P.ch[k] ? 'Als verstanden markiert' : 'Als verstanden markieren'}</button>
      ${nextC ? `<button type="button" class="btn btn-primary" id="ch-next">Weiter: ${esc(nextC.t)}</button>` : ''}
    </div>`;
  $$('#ch-body [data-widget]').forEach(el => { const fn = WIDGETS[el.dataset.widget] || (window.SCHIRI_FIGS || {})[el.dataset.widget]; if (fn) fn(el); });
  runQuiz($('#ch-quiz'), shuffle(QS.filter(q => q.k === k)).slice(0, 3), { compact: true });
  $('#ch-toggle').addEventListener('click', () => { P.ch[k] = !P.ch[k]; save(); renderLernen(); });
  if (nextC) $('#ch-next').addEventListener('click', () => { P.ch[k] = true; P.lastCh = nextC.k; save(); renderLernen(); window.scrollTo(0, 0); });
}
onShow.lernen = renderLernen;

/* ---------- Quiz-Baustein ---------- */
function questionCard(q, idx, total, onAnswer, onNext) {
  const el = document.createElement('div');
  el.className = 'qcard';
  const order = shuffle(q.o.map((t, i) => i));
  el.innerHTML = `<div class="q-meta"><span>Frage ${idx + 1} von ${total}</span><span class="pill">${esc(CHMAP[q.k].t)}</span></div>
    <p class="q-text">${esc(q.q)}</p>
    <div class="opts">${order.map((oi, j) => `<button type="button" class="opt" data-i="${oi}"><span class="opt-key">${'ABCD'[j]}</span><span>${esc(q.o[oi])}</span></button>`).join('')}</div>
    <div class="fb" hidden></div>`;
  const fb = $('.fb', el);
  $$('.opt', el).forEach(b => b.addEventListener('click', () => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const chosen = +b.dataset.i, ok = chosen === q.c;
    $$('.opt', el).forEach(x => { x.disabled = true; if (+x.dataset.i === q.c) x.classList.add('is-right'); });
    if (!ok) b.classList.add('is-wrong');
    recordQ(q.id, ok);
    onAnswer(ok);
    fb.hidden = false;
    fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
    fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig.' : 'Nicht ganz.'}</p><p>${esc(q.e)}</p>
      <div class="fb-row"><span class="r">Regel ${esc(q.r)}</span>${coachReady ? '<button type="button" class="btn btn-ghost btn-s js-coach">Coach fragen</button>' : ''}<button type="button" class="btn btn-primary btn-s js-next">${idx + 1 < total ? 'Nächste Frage' : 'Auswertung'}</button></div>`;
    $('.js-next', fb).addEventListener('click', onNext);
    const cb = $('.js-coach', fb);
    if (cb) cb.addEventListener('click', () => askCoachAbout(q, chosen));
  }));
  return el;
}
function runQuiz(mount, qs, opts = {}) {
  let i = 0, right = 0;
  const wrong = [];
  if (!qs.length) { mount.innerHTML = '<p class="muted">Keine Fragen in dieser Auswahl.</p>'; return; }
  const step = () => {
    if (i >= qs.length) {
      const pct = Math.round(right / qs.length * 100);
      mount.innerHTML = `<div class="qsum"><p class="qsum-v">${right}<small>/${qs.length}</small></p><div><p class="fb-h">${pct >= 80 ? 'Sitzt.' : pct >= 50 ? 'Auf gutem Weg.' : 'Da lohnt sich Wiederholung.'}</p>
        ${wrong.length ? `<p class="muted">Zum Nachlesen:</p><ul class="wronglist">${wrong.map(q => `<li>${esc(q.q)} <span class="r">Regel ${esc(q.r)}</span></li>`).join('')}</ul>` : '<p class="muted">Alles richtig.</p>'}
        <button type="button" class="btn btn-ghost js-again">${opts.againLabel || 'Neue Runde'}</button></div></div>`;
      $('.js-again', mount).addEventListener('click', () => opts.onAgain ? opts.onAgain() : runQuiz(mount, shuffle(qs), opts));
      if (opts.onDone) opts.onDone(right, qs.length);
      return;
    }
    mount.innerHTML = '';
    mount.appendChild(questionCard(qs[i], i, qs.length, ok => { if (ok) right++; else wrong.push(qs[i]); }, () => { i++; step(); if (!opts.compact) mount.scrollIntoView({ block: 'start' }); }));
  };
  step();
}
function pickQs(pool, n) {
  return shuffle(pool.map(q => { const s = P.q[q.id]; const pri = !s ? 1 : (s.last === 0 ? 0 : 2); return { q, s: pri + Math.random() * 0.9 }; })
    .sort((a, b) => a.s - b.s).slice(0, n).map(x => x.q));
}

/* ---------- Quiz-Ansicht ---------- */
let quizCh = 'alle', quizN = 10;
function renderQuizSetup() {
  const wrongN = QS.filter(q => P.q[q.id] && P.q[q.id].last === 0).length;
  const dueN = dueQs().length;
  const seen = QS.filter(q => P.q[q.id]).length;
  $('#quiz-setup').innerHTML = `
    <div class="setup-row"><span class="lbl">Kapitel</span><div class="chips">${[['alle', 'Alle']].concat(D.CH.map(c => [c.k, c.t])).map(([k, t]) => `<button type="button" class="chip${quizCh === k ? ' on' : ''}" data-k="${k}">${esc(t)}</button>`).join('')}</div></div>
    <div class="setup-row"><span class="lbl">Anzahl</span><div class="chips">${[10, 20].map(n => `<button type="button" class="chip${quizN === n ? ' on' : ''}" data-n="${n}">${n} Fragen</button>`).join('')}</div></div>
    <div class="setup-row actions"><button type="button" class="btn btn-primary" id="quiz-go">Runde starten</button>
    <button type="button" class="btn btn-ghost" id="quiz-due"${dueN ? '' : ' disabled'}>Heute fällig (${dueN})</button>
    <button type="button" class="btn btn-ghost" id="quiz-wrong"${wrongN ? '' : ' disabled'}>Fehlerkartei üben (${wrongN})</button>
    <span class="muted small">${seen} von ${QS.length} Fragen schon gesehen. Neue und falsch beantwortete kommen zuerst.</span></div>`;
  $$('#quiz-setup [data-k]').forEach(b => b.addEventListener('click', () => { quizCh = b.dataset.k; renderQuizSetup(); }));
  $$('#quiz-setup [data-n]').forEach(b => b.addEventListener('click', () => { quizN = +b.dataset.n; renderQuizSetup(); }));
  $('#quiz-go').addEventListener('click', () => {
    const pool = quizCh === 'alle' ? QS : QS.filter(q => q.k === quizCh);
    runQuiz($('#quiz-run'), pickQs(pool, quizN), { onDone: renderQuizSetup });
    $('#quiz-run').scrollIntoView({ block: 'start' });
  });
  $('#quiz-due').addEventListener('click', startDue);
  $('#quiz-wrong').addEventListener('click', () => {
    const pool = QS.filter(q => P.q[q.id] && P.q[q.id].last === 0);
    runQuiz($('#quiz-run'), shuffle(pool).slice(0, 20), { onDone: renderQuizSetup });
    $('#quiz-run').scrollIntoView({ block: 'start' });
  });
}
function startDue() {
  const pool = dueQs();
  if (!pool.length) return;
  runQuiz($('#quiz-run'), shuffle(pool).slice(0, 20), { onDone: renderQuizSetup, againLabel: 'Zurück zur Auswahl', onAgain: () => { $('#quiz-run').innerHTML = ''; renderQuizSetup(); } });
  $('#quiz-run').scrollIntoView({ block: 'start' });
}
onShow.quiz = () => {
  renderQuizSetup();
  if (pendingDue) { pendingDue = false; startDue(); return; }
  if (!$('#quiz-run').innerHTML.trim()) $('#quiz-run').innerHTML = '<p class="muted placeholder">Wähle oben ein Kapitel und starte eine Runde.</p>';
};

/* ---------- Probeprüfung ---------- */
let EX = null;
const EX_N = 30, EX_MIN = 30, EX_PASS = 0.8;
function renderExamIntro() {
  const hist = P.exams.slice(-5).reverse();
  $('#exam').innerHTML = `
    <div class="exam-intro">
      <div>
        <h2>Probeprüfung</h2>
        <p>${EX_N} Fragen aus allen zehn Kapiteln, ${EX_MIN} Minuten. Du bekommst erst am Ende Rückmeldung, so wie beim echten Multiple-Choice-Test. Du kannst zwischen den Fragen springen und Antworten ändern.</p>
        <p class="muted small">Die Bestehensgrenze von ${Math.round(EX_PASS * 100)} % ist ein Übungswert dieser Seite, nicht die offizielle Vorgabe des ÖVV. Die genauen Bedingungen erfährst du in deinem Landesverband.</p>
        <button type="button" class="btn btn-primary" id="ex-start">Prüfung starten</button>
      </div>
      <div class="exam-hist"><p class="eyebrow">Deine letzten Versuche</p>${hist.length ? `<ul>${hist.map(x => { const p = Math.round(x.s / x.n * 100); return `<li><span>${new Date(x.d).toLocaleDateString('de-AT')}</span><span class="bar"><span style="width:${p}%" class="${p >= EX_PASS * 100 ? 'ok' : 'bad'}"></span></span><b>${p} %</b></li>`; }).join('')}</ul>` : '<p class="muted">Noch keine.</p>'}</div>
    </div>`;
  $('#ex-start').addEventListener('click', startExam);
}
function startExam() {
  const qs = [];
  D.CH.forEach(c => qs.push(...shuffle(QS.filter(q => q.k === c.k)).slice(0, EX_N / D.CH.length)));
  EX = { qs: shuffle(qs), ans: {}, ord: {}, i: 0, end: Date.now() + EX_MIN * 60000, confirm: false };
  EX.qs.forEach(q => { EX.ord[q.id] = shuffle(q.o.map((t, i) => i)); });
  clearInterval(EX.timer);
  EX.timer = setInterval(tickExam, 1000);
  renderExamQ();
}
function fmtTime(ms) { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function tickExam() {
  if (!EX) return;
  const left = EX.end - Date.now();
  const t = $('#ex-time');
  if (t) { t.textContent = fmtTime(left); t.classList.toggle('warn', left < 5 * 60000); }
  if (left <= 0) submitExam();
}
function renderExamQ() {
  const q = EX.qs[EX.i];
  const answered = Object.keys(EX.ans).length;
  $('#exam').innerHTML = `
    <div class="exam-bar"><span>Frage <b>${EX.i + 1}</b> von ${EX_N} · ${answered} beantwortet</span><span class="timer" id="ex-time">${fmtTime(EX.end - Date.now())}</span></div>
    <div class="dots">${EX.qs.map((x, j) => `<button type="button" class="dot${EX.ans[x.id] !== undefined ? ' done' : ''}${j === EX.i ? ' cur' : ''}" data-j="${j}" aria-label="Frage ${j + 1}"></button>`).join('')}</div>
    <div class="qcard">
      <p class="q-text">${esc(q.q)}</p>
      <div class="opts">${EX.ord[q.id].map((oi, j) => `<button type="button" class="opt${EX.ans[q.id] === oi ? ' is-sel' : ''}" data-i="${oi}"><span class="opt-key">${'ABCD'[j]}</span><span>${esc(q.o[oi])}</span></button>`).join('')}</div>
    </div>
    <div class="exam-nav">
      <button type="button" class="btn btn-ghost" id="ex-prev"${EX.i === 0 ? ' disabled' : ''}>Zurück</button>
      ${EX.i < EX_N - 1 ? '<button type="button" class="btn btn-primary" id="ex-next">Weiter</button>' : ''}
      <button type="button" class="btn ${EX.confirm ? 'btn-danger' : 'btn-ghost'}" id="ex-submit">${EX.confirm ? `Wirklich abgeben?${answered < EX_N ? ' ' + (EX_N - answered) + ' offen' : ''}` : 'Abgeben'}</button>
    </div>`;
  $$('#exam .opt').forEach(b => b.addEventListener('click', () => { EX.ans[q.id] = +b.dataset.i; EX.confirm = false; if (EX.i < EX_N - 1) { EX.i++; } renderExamQ(); }));
  $$('#exam .dot').forEach(b => b.addEventListener('click', () => { EX.i = +b.dataset.j; EX.confirm = false; renderExamQ(); }));
  $('#ex-prev').addEventListener('click', () => { EX.i--; EX.confirm = false; renderExamQ(); });
  if ($('#ex-next')) $('#ex-next').addEventListener('click', () => { EX.i++; EX.confirm = false; renderExamQ(); });
  $('#ex-submit').addEventListener('click', () => { if (EX.confirm) submitExam(); else { EX.confirm = true; renderExamQ(); } });
}
function submitExam() {
  if (!EX) return;
  clearInterval(EX.timer);
  const res = EX.qs.map(q => ({ q, a: EX.ans[q.id], ok: EX.ans[q.id] === q.c }));
  res.forEach(r => { if (r.a !== undefined) recordQ(r.q.id, r.ok); });
  const right = res.filter(r => r.ok).length;
  P.exams.push({ d: Date.now(), s: right, n: EX_N }); save();
  const pct = Math.round(right / EX_N * 100), pass = right / EX_N >= EX_PASS;
  const byCh = D.CH.map(c => { const rs = res.filter(r => r.q.k === c.k); return { c, r: rs.filter(x => x.ok).length, n: rs.length }; });
  const wrong = res.filter(r => !r.ok);
  $('#exam').innerHTML = `
    <div class="exam-res">
      <div class="res-head"><p class="qsum-v">${pct}<small> %</small></p><div><span class="pill ${pass ? 'pill-ok' : 'pill-bad'}">${pass ? 'Bestanden (Übungsgrenze 80 %)' : 'Noch nicht bestanden (Übungsgrenze 80 %)'}</span><p>${right} von ${EX_N} richtig.</p></div></div>
      <h3>Nach Kapiteln</h3>
      <ul class="bych">${byCh.map(x => `<li><span>${esc(x.c.t)}</span><span class="bar"><span style="width:${x.n ? x.r / x.n * 100 : 0}%" class="${x.r === x.n ? 'ok' : ''}"></span></span><b>${x.r}/${x.n}</b></li>`).join('')}</ul>
      ${wrong.length ? `<h3>Das solltest du nachlesen</h3><ol class="review">${wrong.map(r => `<li><p class="q-text">${esc(r.q.q)}</p><p><span class="tag-bad">Deine Antwort</span> ${r.a === undefined ? '<i>keine</i>' : esc(r.q.o[r.a])}</p><p><span class="tag-ok">Richtig</span> ${esc(r.q.o[r.q.c])}</p><p class="muted">${esc(r.q.e)} <span class="r">Regel ${esc(r.q.r)}</span></p></li>`).join('')}</ol>` : '<p>Keine Fehler. Stark.</p>'}
      <div class="exam-nav"><button type="button" class="btn btn-primary" id="ex-again">Neue Prüfung</button><button type="button" class="btn btn-ghost" data-goto="quiz">Fehlerkartei üben</button></div>
    </div>`;
  $('#ex-again').addEventListener('click', startExam);
  EX = null;
  window.scrollTo(0, 0);
}
onShow.pruefung = () => { if (!EX) renderExamIntro(); };

/* ---------- Handzeichen ---------- */
let sigMode = 'alle', sigFilter = 'sr';
function renderZeichen() {
  $$('#sig-modes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === sigMode));
  const box = $('#sig-body');
  if (sigMode === 'alle') {
    const list = D.SIG.filter(s => sigFilter === 'sr' ? s.who !== 'L' : s.who === 'L');
    box.innerHTML = `<div class="chips sig-filter"><button type="button" class="chip${sigFilter === 'sr' ? ' on' : ''}" data-f="sr">Schiedsrichter (${D.SIG.filter(s => s.who !== 'L').length})</button><button type="button" class="chip${sigFilter === 'l' ? ' on' : ''}" data-f="l">Linienrichter (5)</button></div>
      <p class="muted small">So liest du die Figuren: gestrichelt ist die Ausgangsstellung, der Pfeil zeigt die Bewegung. Tippe ein Zeichen an, dann kommst du auch direkt zum Original-Diagramm im Regelwerk.</p>
      <div class="sig-grid">${list.map(s => `<button type="button" class="sigcard" data-id="${s.id}">${pict(s.id)}<span class="sig-no">${s.id.replace('L', 'LR ')}</span><span class="sig-n">${esc(s.n)}</span>${P.sig[s.id] && P.sig[s.id].last === 1 ? '<span class="sig-ok" aria-label="sicher"></span>' : ''}</button>`).join('')}</div>`;
    $$('.sig-filter .chip', box).forEach(b => b.addEventListener('click', () => { sigFilter = b.dataset.f; renderZeichen(); }));
    $$('.sigcard', box).forEach(b => b.addEventListener('click', () => openSig(b.dataset.id)));
  } else if (sigMode === 'karten') {
    flashNext();
  } else if (sigMode === 'folge') {
    seqStart();
  } else {
    sigQuizStart();
  }
}
function openSig(id) {
  const s = SIGMAP[id];
  const m = $('#modal');
  $('#modal-body').innerHTML = `<div class="sig-detail">${pict(s.id)}<div><p class="eyebrow">Zeichen ${s.id.replace('L', 'LR ')} · ${WHO[s.who]}</p><h3>${esc(s.n)}</h3><p>${esc(s.d)}</p><p class="muted"><b>Beispiel:</b> ${esc(s.sit)}</p><div class="fb-row"><span class="r">Regel ${esc(s.r)}</span>${D.SIGP[s.id] ? pdfLink(D.SIGP[s.id], `Zeichen im Regelwerk ansehen (${s.who === 'L' ? 'Diagramm 12' : 'Diagramm 11'})`, `PDF-Seite ${D.SIGP[s.id]}`) : ''}</div></div></div>`;
  m.hidden = false;
  $('#modal-close').focus();
}
function closeModal() { $('#modal').hidden = true; }
$('#modal-close').addEventListener('click', closeModal);
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

let deck = [], deckI = 0;
function flashNext(reset) {
  if (reset || !deck.length || deckI >= deck.length) {
    deck = D.SIG.slice().map(s => ({ s, k: (P.sig[s.id] && P.sig[s.id].last === 1 ? 1 : 0) + Math.random() })).sort((a, b) => a.k - b.k).map(x => x.s);
    deckI = 0;
  }
  const s = deck[deckI];
  const box = $('#sig-body');
  box.innerHTML = `<div class="flash">
    <p class="muted small">Karte ${deckI + 1} von ${deck.length}. Schau dir die Figur an und sag laut, welches Zeichen das ist. Dann aufdecken.</p>
    <div class="flash-card">${pict(s.id)}<div class="flash-back" hidden><p class="eyebrow">${WHO[s.who]} · Regel ${esc(s.r)}</p><h3>${esc(s.n)}</h3><p>${esc(s.d)}</p></div></div>
    <div class="flash-act"><button type="button" class="btn btn-primary" id="fl-show">Aufdecken</button></div></div>`;
  $('#fl-show').addEventListener('click', () => {
    $('.flash-back', box).hidden = false;
    $('.flash-act', box).innerHTML = '<button type="button" class="btn btn-ok" id="fl-yes">Gewusst</button><button type="button" class="btn btn-ghost" id="fl-no">Nicht gewusst</button>';
    $('#fl-yes').addEventListener('click', () => { recordSig(s.id, true); deckI++; flashNext(); });
    $('#fl-no').addEventListener('click', () => { recordSig(s.id, false); deck.push(s); deckI++; flashNext(); });
  });
}
let sq = null;
function sigQuizStart() { sq = { i: 0, n: 10, r: 0 }; sigQuizStep(); }
function sigQuizStep() {
  const box = $('#sig-body');
  if (sq.i >= sq.n) {
    box.innerHTML = `<div class="qsum"><p class="qsum-v">${sq.r}<small>/${sq.n}</small></p><div><p class="fb-h">${sq.r >= 8 ? 'Du kennst deine Zeichen.' : 'Übe noch mit den Karteikarten.'}</p><button type="button" class="btn btn-primary" id="sq-again">Neue Runde</button></div></div>`;
    $('#sq-again').addEventListener('click', sigQuizStart);
    return;
  }
  const s = D.SIG[Math.floor(Math.random() * D.SIG.length)];
  const group = D.SIG.filter(x => (x.who === 'L') === (s.who === 'L') && x.id !== s.id);
  const opts = shuffle([s].concat(shuffle(group).slice(0, 3)));
  const type = ['sit', 'pict', 'name'][Math.floor(Math.random() * 3)];
  let prompt, optHtml;
  if (type === 'sit') {
    prompt = `<p class="eyebrow">Situation</p><p class="q-text">${esc(s.sit)}</p><p class="muted">Welches Zeichen zeigst du?</p>`;
    optHtml = opts.map(o => `<button type="button" class="opt" data-id="${o.id}"><span>${esc(o.n)}</span></button>`).join('');
  } else if (type === 'pict') {
    prompt = `<p class="eyebrow">Welches Zeichen ist das?</p><div class="sq-pict">${pict(s.id)}</div><p class="muted small">${esc(s.d)}</p>`;
    optHtml = opts.map(o => `<button type="button" class="opt" data-id="${o.id}"><span>${esc(o.n)}</span></button>`).join('');
  } else {
    prompt = `<p class="eyebrow">Welche Figur zeigt</p><p class="q-text">${esc(s.n)}?</p>`;
    optHtml = '<div class="pict-opts">' + opts.map(o => `<button type="button" class="opt opt-pict" data-id="${o.id}" aria-label="Figur">${pict(o.id)}</button>`).join('') + '</div>';
  }
  box.innerHTML = `<div class="qcard"><div class="q-meta"><span>Zeichen ${sq.i + 1} von ${sq.n}</span><span>${sq.r} richtig</span></div>${prompt}<div class="opts">${optHtml}</div><div class="fb" hidden></div></div>`;
  $$('.opt', box).forEach(b => b.addEventListener('click', () => {
    if (box.dataset.lock === '1') return;
    box.dataset.lock = '1';
    const ok = b.dataset.id === s.id;
    $$('.opt', box).forEach(x => { x.disabled = true; if (x.dataset.id === s.id) x.classList.add('is-right'); });
    if (!ok) b.classList.add('is-wrong');
    recordSig(s.id, ok);
    if (ok) sq.r++;
    const fb = $('.fb', box);
    fb.hidden = false;
    fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
    fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig.' : 'Richtig wäre: ' + esc(s.n)}</p><p>${esc(s.d)}</p><div class="fb-row"><span class="r">${WHO[s.who]} · Regel ${esc(s.r)}</span><button type="button" class="btn btn-primary btn-s" id="sq-next">Weiter</button></div>`;
    $('#sq-next').addEventListener('click', () => { box.dataset.lock = ''; sq.i++; sigQuizStep(); });
  }));
}
/* Reihenfolge der Zeichen nach Regel 22.2.3 */
const SEQ = [
  { w: 'F', f: '18', p: false, srv: 'Heim', t: 'Gast spielt den Ball viermal, bevor er über das Netz geht.' },
  { w: 'F', f: '17', p: true, srv: 'Gast', t: 'Heim-Spieler Nr. 5 berührt den Ball beim Zuspiel (zweite Berührung) zweimal hintereinander.' },
  { w: 'F', f: '16', p: true, srv: 'Heim', t: 'Der Zuspieler von Gast (Nr. 3) fängt den Ball kurz und wirft ihn weiter.' },
  { w: 'F', f: '15', p: false, srv: 'Gast', t: 'Ein Angriff von Heim landet klar hinter der Grundlinie. Niemand von Gast hat den Ball berührt.' },
  { w: 'F', f: '20', p: true, srv: 'Gast', t: 'Heim-Blocker Nr. 8 greift über das Netz und spielt den Ball, bevor Gast angreifen konnte.' },
  { w: 'S', f: '19', p: true, srv: 'Heim', t: 'Gast-Blocker Nr. 11 berührt beim Landen das Netz zwischen den Antennen.' },
  { w: 'S', f: '22', p: true, srv: 'Gast', t: 'Heim-Spieler Nr. 9 tritt mit dem ganzen Fuß über die Mittellinie ins gegnerische Feld.' },
  { w: 'S', f: '13', p: true, srv: 'Heim', t: 'Heim schlägt auf. Bei Gast haben Nr. 4 und Nr. 10 die Plätze getauscht, die Rotationsordnung stimmt nicht.' },
  { w: 'D', f: '23', p: 'opt', srv: 'Heim', t: 'Heim hat Aufschlag. Im Ballwechsel berühren zwei Gegenspieler gleichzeitig das Netz zwischen den Antennen.' },
  { w: 'D', f: '23', p: 'opt', srv: 'Gast', t: 'Gast hat Aufschlag. Zwei Gegenspieler begehen im selben Moment einen Fehler.' }
];
const SEQ_POOL = ['12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '24'];
let SQ = null;
function seqStart() { SQ = { order: shuffle(SEQ.map((s, i) => i)), i: 0, r: 0, pick: [], tiles: null, done: false }; seqStep(); }
function seqWant(s) {
  const pl = s.p === true ? ['P'] : [];
  return s.w === 'F' ? ['T', s.f].concat(pl) : [s.f].concat(pl, ['T']);
}
function seqTile(id, s) {
  if (id === 'T') return { h: pict('2'), l: `Aufschlagende Mannschaft (${s.srv})` };
  if (id === 'P') return { h: pict('P'), l: 'Auf den Spieler zeigen' };
  return { h: pict(id), l: SIGMAP[id].n };
}
function seqStep() {
  const box = $('#sig-body');
  if (SQ.i >= SQ.order.length) {
    box.innerHTML = `<div class="qsum"><p class="qsum-v">${SQ.r}<small>/${SQ.order.length}</small></p><div><p class="fb-h">${SQ.r >= 8 ? 'Die Reihenfolge sitzt.' : 'Merksatz: Der 1. SR beginnt mit der Mannschaft, der 2. SR endet mit ihr.'}</p><button type="button" class="btn btn-primary" id="seq-again">Neue Runde</button></div></div>`;
    $('#seq-again').addEventListener('click', seqStart);
    return;
  }
  const s = SEQ[SQ.order[SQ.i]];
  if (!SQ.tiles) SQ.tiles = shuffle(['T', 'P', s.f].concat(shuffle(SEQ_POOL.filter(x => x !== s.f)).slice(0, 2)));
  const who = s.w === 'F' ? 'Der 1. SR pfeift' : s.w === 'S' ? 'Der 2. SR pfeift' : 'Doppelfehler';
  const whose = s.w === 'S' ? 'des 2. SR' : 'des 1. SR';
  box.innerHTML = `<div class="qcard seq">
    <div class="q-meta"><span>Aufgabe ${SQ.i + 1} von ${SQ.order.length}</span><span>${SQ.r} richtig</span></div>
    <p class="eyebrow">${who}</p><p class="q-text">${esc(s.t)}</p>
    <p class="muted small">Tippe die Zeichen ${whose} in der richtigen Reihenfolge an. Nicht jede Karte gehört dazu. Eine gewählte Karte tippst du zum Entfernen noch einmal an.</p>
    <ol class="seq-slots" aria-label="Deine Reihenfolge">${SQ.pick.length ? SQ.pick.map((id, k) => { const t = seqTile(id, s); return `<li><button type="button" class="seq-tile on" data-k="${k}">${t.h}<span>${esc(t.l)}</span></button></li>`; }).join('') : '<li class="seq-empty">Noch nichts gewählt</li>'}</ol>
    <div class="seq-pool">${SQ.tiles.filter(id => !SQ.pick.includes(id)).map(id => { const t = seqTile(id, s); return `<button type="button" class="seq-tile" data-id="${id}">${t.h}<span>${esc(t.l)}</span></button>`; }).join('')}</div>
    <div class="row-btns"><button type="button" class="btn btn-primary" id="seq-check"${SQ.pick.length ? '' : ' disabled'}>Prüfen</button></div>
    <div class="fb" hidden></div></div>`;
  $$('.seq-pool .seq-tile', box).forEach(b => b.addEventListener('click', () => { if (SQ.done) return; SQ.pick.push(b.dataset.id); seqStep(); }));
  $$('.seq-slots .seq-tile', box).forEach(b => b.addEventListener('click', () => { if (SQ.done) return; SQ.pick.splice(+b.dataset.k, 1); seqStep(); }));
  $('#seq-check').addEventListener('click', () => {
    const want = seqWant(s), got = SQ.pick.join(',');
    const ok = got === want.join(',') || (s.p === 'opt' && got === [s.f, 'P', 'T'].join(','));
    SQ.done = true; if (ok) SQ.r++;
    recordSig(s.f, ok);
    $$('.seq-tile', box).forEach(x => { x.disabled = true; });
    $('#seq-check').hidden = true;
    const fb = $('.fb', box);
    const wantTxt = want.map(id => seqTile(id, s).l).join(' → ');
    const why = s.w === 'F' ? 'Pfeift der 1. SR, zeigt er zuerst die aufschlagende Mannschaft, dann die Art des Fehlers und, wenn nötig, den Spieler.'
      : s.w === 'S' ? 'Pfeift der 2. SR, zeigt er zuerst die Art des Fehlers, dann den Spieler und zuletzt die aufschlagende Mannschaft, und zwar erst, nachdem der 1. SR sie angezeigt hat. Der 1. SR zeigt in diesem Fall nur die aufschlagende Mannschaft.'
      : 'Beim Doppelfehler zeigen beide SR zuerst die Art des Fehlers (Doppelfehler) und, wenn nötig, die Spieler. Erst dann zeigt der 1. SR die Mannschaft, die aufschlägt. Der Ballwechsel wird wiederholt, es schlägt also dieselbe Mannschaft noch einmal auf.';
    const pl = s.p === true ? '' : s.p === false ? ' Einen Spieler zeigst du hier nicht, weil der Fehler nicht an einem einzelnen Spieler hängt.' : ' Die Spieler zu zeigen ist hier optional.';
    fb.hidden = false; fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
    fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig.' : 'Richtig wäre: ' + esc(wantTxt)}</p><p>${why}${pl}</p><div class="fb-row">${rulePill(s.w === 'F' ? 'Regel 22.2.3.1' : s.w === 'S' ? 'Regel 22.2.3.2' : 'Regel 22.2.3.4, 6.1.2.2')}<button type="button" class="btn btn-primary btn-s" id="seq-next">Weiter</button></div>`;
    $('#seq-next').addEventListener('click', () => { SQ.i++; SQ.pick = []; SQ.tiles = null; SQ.done = false; seqStep(); });
    $('#seq-next').focus();
  });
}
$$('#sig-modes button').forEach(b => b.addEventListener('click', () => { sigMode = b.dataset.m; renderZeichen(); }));
onShow.zeichen = renderZeichen;

/* ---------- Situationen ---------- */
let SI = null;
function sitStart() { SI = { order: shuffle(D.SIT.map((s, i) => i)), i: 0, r: 0 }; sitStep(); }
function sitStep() {
  const box = $('#sit-body');
  if (SI.i >= SI.order.length) {
    box.innerHTML = `<div class="qsum"><p class="qsum-v">${SI.r}<small>/${SI.order.length}</small></p><div><p class="fb-h">Alle Situationen durch.</p><p class="muted">Gezählt wird nur, wenn Entscheidung und Handzeichen stimmen.</p><button type="button" class="btn btn-primary" id="si-again">Noch einmal gemischt</button></div></div>`;
    $('#si-again').addEventListener('click', sitStart);
    return;
  }
  const idx = SI.order[SI.i], s = D.SIT[idx];
  const order = shuffle(s.o.map((t, i) => i));
  box.innerHTML = `<div class="sit">
    <div class="q-meta"><span>Situation ${SI.i + 1} von ${SI.order.length}</span><span>${SI.r} komplett richtig</span></div>
    <p class="sit-t">${esc(s.t)}</p>
    <p class="step-l">1 · Deine Entscheidung</p>
    <div class="opts" id="si-dec">${order.map(oi => `<button type="button" class="opt" data-i="${oi}"><span>${esc(s.o[oi])}</span></button>`).join('')}</div>
    <div id="si-sig"></div>
    <div class="fb" id="si-fb" hidden></div></div>`;
  let decOk = false;
  $$('#si-dec .opt').forEach(b => b.addEventListener('click', () => {
    if ($('#si-dec').dataset.done) return;
    $('#si-dec').dataset.done = '1';
    decOk = +b.dataset.i === s.c;
    $$('#si-dec .opt').forEach(x => { x.disabled = true; if (+x.dataset.i === s.c) x.classList.add('is-right'); });
    if (!decOk) b.classList.add('is-wrong');
    if (s.sig) {
      const pool = D.SIG.filter(x => x.who !== 'L' && x.id !== s.sig && x.id !== '1' && x.id !== '2');
      const opts = shuffle([SIGMAP[s.sig]].concat(shuffle(pool).slice(0, 3)));
      $('#si-sig').innerHTML = `<p class="step-l">2 · Welches Handzeichen zeigst du für den Fehler?</p><div class="pict-opts">${opts.map(o => `<button type="button" class="opt opt-pict" data-id="${o.id}">${pict(o.id)}<span>${esc(o.n)}</span></button>`).join('')}</div>`;
      $$('#si-sig .opt').forEach(x => x.addEventListener('click', () => {
        if ($('#si-sig').dataset.done) return;
        $('#si-sig').dataset.done = '1';
        const sigOk = x.dataset.id === s.sig;
        $$('#si-sig .opt').forEach(y => { y.disabled = true; if (y.dataset.id === s.sig) y.classList.add('is-right'); });
        if (!sigOk) x.classList.add('is-wrong');
        recordSig(s.sig, sigOk);
        sitFinish(idx, s, decOk && sigOk);
      }));
    } else {
      sitFinish(idx, s, decOk);
    }
  }));
}
function sitFinish(idx, s, ok) {
  P.sit[idx] = ok ? 1 : 0; save();
  if (ok) SI.r++;
  const fb = $('#si-fb');
  fb.hidden = false;
  fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
  fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig gepfiffen.' : 'Schau dir die Lösung an.'}</p><p>${esc(s.e)}</p>
    <p><b>Zuständig:</b> ${esc(s.who)}${s.sig ? ` · <b>Zeichen:</b> ${esc(SIGMAP[s.sig].n)}` : ' · kein Pfiff nötig'}</p>
    <div class="fb-row"><span class="r">Regel ${esc(s.r)}</span><button type="button" class="btn btn-primary btn-s" id="si-next">Nächste Situation</button></div>`;
  $('#si-next').addEventListener('click', () => { SI.i++; sitStep(); window.scrollTo(0, $('#v-situationen').offsetTop - 70); });
}
onShow.situationen = () => { if (!SI) sitStart(); };

/* ---------- Aufstellungs-Trainer ---------- */
const BASE = { 4: [80, 110], 3: [200, 110], 2: [320, 110], 5: [80, 290], 6: [200, 290], 1: [320, 290] };
const POS = { mode: 'frei', team: 'annahme', pl: JSON.parse(JSON.stringify(BASE)), nums: { 1: 7, 2: 12, 3: 3, 4: 9, 5: 1, 6: 14 }, r: 0, n: 0, answered: false };
function faults(pl, team) {
  const f = [];
  const out = p => pl[p][0] < 20 || pl[p][0] > 380 || pl[p][1] < 40 || pl[p][1] > 400;
  if (team === 'annahme') {
    [[4, 5], [3, 6], [2, 1]].forEach(([a, b]) => { if (pl[b][1] < pl[a][1]) f.push({ a, b, t: `${ROM[b]} steht näher an der Mittellinie als ${ROM[a]}` }); });
    [[4, 3], [3, 2], [5, 6], [6, 1]].forEach(([a, b]) => { if (pl[a][0] > pl[b][0]) f.push({ a, b, t: `${ROM[a]} steht weiter rechts als ${ROM[b]}` }); });
    [1, 2, 3, 4, 5, 6].forEach(p => { if (out(p)) f.push({ a: p, b: null, t: `${ROM[p]} steht außerhalb des Spielfeldes` }); });
  } else {
    [2, 3, 4, 5, 6].forEach(p => { if (out(p)) f.push({ a: p, b: null, t: `${ROM[p]} steht außerhalb des Spielfeldes (nur der Aufschläger darf draußen sein)` }); });
  }
  return f;
}
function genLayout(wantFault) {
  for (let t = 0; t < 1500; t++) {
    const pl = {};
    [1, 2, 3, 4, 5, 6].forEach(p => { pl[p] = [clamp(BASE[p][0] + rnd(-80, 80), 45, 355), clamp(BASE[p][1] + rnd(-85, 85), 65, 375)]; });
    let bad = false;
    [[4, 5], [3, 6], [2, 1]].forEach(([a, b]) => { if (Math.abs(pl[a][1] - pl[b][1]) < 16) bad = true; });
    [[4, 3], [3, 2], [5, 6], [6, 1]].forEach(([a, b]) => { if (Math.abs(pl[a][0] - pl[b][0]) < 16) bad = true; });
    for (let i = 1; i <= 6; i++) for (let j = i + 1; j <= 6; j++) if (Math.hypot(pl[i][0] - pl[j][0], pl[i][1] - pl[j][1]) < 52) bad = true;
    if (bad) continue;
    const n = faults(pl, 'annahme').length;
    if (wantFault ? n === 1 : n === 0) return pl;
  }
  return JSON.parse(JSON.stringify(BASE));
}
function courtSvg() {
  const { pl, nums } = POS;
  const f = POS.mode === 'frei' || POS.answered ? faults(pl, POS.team) : [];
  const lines = f.filter(x => x.b).map(x => `<line x1="${pl[x.a][0]}" y1="${pl[x.a][1]}" x2="${pl[x.b][0]}" y2="${pl[x.b][1]}" class="vline"/>`).join('');
  const bad = new Set(f.map(x => x.a).concat(f.map(x => x.b)));
  const toks = [1, 2, 3, 4, 5, 6].map(p => `<g class="tok${bad.has(p) ? ' bad' : ''}${POS.mode === 'frei' ? ' drag' : ''}" data-p="${p}" transform="translate(${pl[p][0]} ${pl[p][1]})"><circle r="24"/><text class="tok-num" y="3">${nums[p]}</text><text class="tok-pos" y="17">${ROM[p]}</text></g>`).join('');
  return `<svg viewBox="0 0 400 440" class="rot-svg" id="rot-svg" role="img" aria-label="Halbes Spielfeld mit sechs Spielern">
    <rect x="0" y="0" width="400" height="440" class="c-free"/>
    <rect x="20" y="40" width="360" height="360" class="c-court"/>
    <rect x="20" y="40" width="360" height="120" class="c-front"/>
    <line x1="20" y1="160" x2="380" y2="160" class="c-line"/>
    <rect x="20" y="40" width="360" height="360" class="c-bound"/>
    <line x1="0" y1="40" x2="400" y2="40" class="c-net"/>
    <text x="200" y="26" class="c-lbl">Netz · Mittellinie</text>
    <text x="376" y="154" class="c-lbl c-lbl-s" text-anchor="end">Angriffslinie</text>
    <text x="200" y="424" class="c-lbl">Grundlinie · dahinter die Aufschlagzone</text>
    ${lines}${toks}</svg>`;
}
function renderPos() {
  const box = $('#pos-body');
  const f = faults(POS.pl, POS.team);
  let verdict = '';
  if (POS.mode === 'frei') {
    verdict = POS.team === 'aufschlag'
      ? `<div class="verdict ${f.length ? 'v-bad' : 'v-ok'}"><b>${f.length ? 'Fehler' : 'Erlaubt'}</b><p>Aufschlagende Mannschaft: Seit 2025 ist die Reihenfolge frei ${rulePill('Regel 7.4')}. Alle außer dem Aufschläger müssen aber im eigenen Feld stehen.</p>${f.map(x => `<p>${esc(x.t)}</p>`).join('')}</div>`
      : `<div class="verdict ${f.length ? 'v-bad' : 'v-ok'}"><b>${f.length ? 'Positionsfehler' : 'Korrekte Aufstellung'}</b>${f.length ? f.map(x => `<p>${esc(x.t)}</p>`).join('') : '<p>Alle Nachbarn stehen richtig zueinander.</p>'}${rulePill('Regel 7.4.2, 7.4.3, 7.5')}</div>`;
  } else if (POS.answered) {
    verdict = `<div class="verdict ${POS.lastOk ? 'v-ok' : 'v-bad'}"><b>${POS.lastOk ? 'Richtig erkannt.' : 'Falsch.'}</b>${f.length ? f.map(x => `<p>${esc(x.t)}</p>`).join('') : '<p>Diese Aufstellung ist korrekt: alle Nachbarn stehen richtig, Diagonalen zählen nicht.</p>'}${rulePill('Regel 7.4.2, 7.4.3, 7.5')}</div>`;
  } else {
    verdict = `<div class="verdict"><b>Annehmende Mannschaft im Moment des Aufschlagschlags.</b><p>Ist das eine korrekte Aufstellung?</p></div>`;
  }
  const controls = POS.mode === 'frei'
    ? `<div class="chips"><button type="button" class="chip${POS.team === 'annahme' ? ' on' : ''}" data-team="annahme">Annehmende Mannschaft</button><button type="button" class="chip${POS.team === 'aufschlag' ? ' on' : ''}" data-team="aufschlag">Aufschlagende Mannschaft</button></div>
       <div class="row-btns"><button type="button" class="btn btn-ghost" id="pos-rot">Rotieren (im Uhrzeigersinn)</button><button type="button" class="btn btn-ghost" id="pos-reset">Grundaufstellung</button></div>
       <p class="muted small">Zieh die Spieler mit Maus oder Finger. Rote Linien zeigen, welche Nachbarn falsch zueinander stehen. Die Zahl ist die Trikotnummer, darunter die Position.</p>`
    : (POS.answered
      ? `<div class="row-btns"><button type="button" class="btn btn-primary" id="pos-new">Nächste Aufstellung</button></div>`
      : `<div class="row-btns"><button type="button" class="btn btn-ok" id="pos-yes">Korrekt</button><button type="button" class="btn btn-danger" id="pos-no">Positionsfehler</button></div>`)
      + `<p class="muted small">Punkte: ${POS.r} von ${POS.n}</p>`;
  box.innerHTML = `<div class="pos-grid"><div class="pos-court">${courtSvg()}</div><div class="pos-side">${verdict}${controls}<p class="muted small">Serve-Info: Nr. <b>${POS.nums[1]}</b> steht auf Position I und würde aufschlagen.</p></div></div>`;
  $$('#pos-body [data-team]').forEach(b => b.addEventListener('click', () => { POS.team = b.dataset.team; renderPos(); }));
  if ($('#pos-rot')) $('#pos-rot').addEventListener('click', () => { const o = POS.nums; POS.nums = { 1: o[2], 2: o[3], 3: o[4], 4: o[5], 5: o[6], 6: o[1] }; renderPos(); });
  if ($('#pos-reset')) $('#pos-reset').addEventListener('click', () => { POS.pl = JSON.parse(JSON.stringify(BASE)); renderPos(); });
  if ($('#pos-new')) $('#pos-new').addEventListener('click', posNew);
  const answer = saysOk => { const ok = (faults(POS.pl, 'annahme').length === 0) === saysOk; POS.n++; if (ok) POS.r++; POS.lastOk = ok; POS.answered = true; renderPos(); };
  if ($('#pos-yes')) $('#pos-yes').addEventListener('click', () => answer(true));
  if ($('#pos-no')) $('#pos-no').addEventListener('click', () => answer(false));
  if (POS.mode === 'frei') bindDrag();
}
function posNew() { POS.pl = genLayout(Math.random() < 0.55); POS.answered = false; POS.team = 'annahme'; renderPos(); }
function bindDrag() {
  const svg = $('#rot-svg');
  let cur = null;
  const pt = e => { const m = svg.getScreenCTM().inverse(); const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const r = p.matrixTransform(m); return [clamp(r.x, 4, 396), clamp(r.y, 44, 436)]; };
  $$('.tok', svg).forEach(g => {
    g.addEventListener('pointerdown', e => { e.preventDefault(); cur = +g.dataset.p; g.setPointerCapture(e.pointerId); g.classList.add('grab'); });
    g.addEventListener('pointermove', e => { if (cur !== +g.dataset.p) return; POS.pl[cur] = pt(e); g.setAttribute('transform', `translate(${POS.pl[cur][0]} ${POS.pl[cur][1]})`); });
    const end = () => { if (cur === null) return; cur = null; renderPos(); };
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
  });
}
$$('#pos-modes button').forEach(b => b.addEventListener('click', () => {
  POS.mode = b.dataset.m;
  $$('#pos-modes button').forEach(x => x.setAttribute('aria-pressed', x === b));
  if (POS.mode === 'suche') posNew(); else { POS.pl = JSON.parse(JSON.stringify(BASE)); renderPos(); }
}));

/* Aufschlagfolge (Schreiber-Blick) */
let SO = null;
function soNew() {
  SO = { st: { H: [7, 12, 3, 9, 1, 14], G: [5, 10, 2, 8, 11, 4] }, cur: null, srv: 'H', sc: { H: 0, G: 0 }, q: null, r: 0, n: 0, show: false, log: [] };
  SO.cur = { H: SO.st.H.slice(), G: SO.st.G.slice() };
  soRender();
}
const TEAM = { H: 'Heim', G: 'Gast' };
function sheet(t, rot, label) {
  const at = i => rot[i];
  return `<div class="sheet"><p class="sheet-h">${label}</p><div class="sheet-g"><span><i>IV</i>${at(3)}</span><span><i>III</i>${at(2)}</span><span><i>II</i>${at(1)}</span><span><i>V</i>${at(4)}</span><span><i>VI</i>${at(5)}</span><span class="srvpos"><i>I</i>${at(0)}</span></div></div>`;
}
function soRender(msg) {
  const box = $('#so-body');
  const setOver = (SO.sc.H >= 25 || SO.sc.G >= 25) && Math.abs(SO.sc.H - SO.sc.G) >= 2;
  const qHtml = SO.q
    ? `<div class="so-q"><p class="fb-h">${TEAM[SO.q.w]} gewinnt den Ballwechsel.</p><p>Wer schlägt jetzt auf?</p><div class="so-nums">${['H', 'G'].map(t => `<div><span class="lbl">${TEAM[t]}</span>${SO.st[t].slice().sort((a, b) => a - b).map(n => `<button type="button" class="num" data-t="${t}" data-n="${n}">${n}</button>`).join('')}</div>`).join('')}</div></div>`
    : `<div class="row-btns">${setOver ? `<p class="fb-h">Satz vorbei: ${SO.sc.H}:${SO.sc.G}.</p><button type="button" class="btn btn-primary" id="so-reset">Neuer Satz</button>` : '<button type="button" class="btn btn-primary" id="so-rally">Nächster Ballwechsel</button>'}</div>`;
  box.innerHTML = `
    <div class="so-top"><div class="score"><span>Heim</span><b>${SO.sc.H}</b><em>:</em><b>${SO.sc.G}</b><span>Gast</span></div>
      <p>Aufschlag: <b>${TEAM[SO.srv]}</b>, Nr. <b>${SO.cur[SO.srv][0]}</b></p></div>
    ${msg ? `<div class="fb ${msg.ok ? 'fb-ok' : 'fb-bad'}"><p>${msg.t}</p>${rulePill('Regel 6.1.3, 7.6, 12.2.2')}</div>` : ''}
    ${qHtml}
    <p class="muted small">Richtig: ${SO.r} von ${SO.n}. Heim hat die Auslosung gewonnen und schlägt zuerst auf.</p>
    <div class="sheets">${sheet('H', SO.st.H, 'Aufstellungsblatt Heim')}${sheet('G', SO.st.G, 'Aufstellungsblatt Gast')}</div>
    <label class="toggle"><input type="checkbox" id="so-show"${SO.show ? ' checked' : ''}> Aktuelle Positionen anzeigen (Hilfe)</label>
    ${SO.show ? `<div class="sheets">${sheet('H', SO.cur.H, 'Heim jetzt')}${sheet('G', SO.cur.G, 'Gast jetzt')}</div>` : ''}`;
  if ($('#so-rally')) $('#so-rally').addEventListener('click', () => { SO.q = { w: Math.random() < 0.5 ? 'H' : 'G' }; soRender(); });
  if ($('#so-reset')) $('#so-reset').addEventListener('click', soNew);
  $('#so-show').addEventListener('change', e => { SO.show = e.target.checked; soRender(); });
  $$('#so-body .num').forEach(b => b.addEventListener('click', () => {
    const w = SO.q.w;
    SO.sc[w]++;
    if (w !== SO.srv) { SO.cur[w] = SO.cur[w].slice(1).concat(SO.cur[w][0]); SO.srv = w; }
    const want = SO.cur[w][0];
    const ok = b.dataset.t === w && +b.dataset.n === want;
    SO.n++; if (ok) SO.r++;
    SO.q = null;
    soRender({ ok, t: ok ? `Richtig: ${TEAM[w]} Nr. ${want}.` : `Richtig wäre ${TEAM[w]} Nr. ${want}. ${b.dataset.t === w ? 'Denk an die Rotation: Wer das Aufschlagrecht zurückgewinnt, rotiert, und der Spieler von II schlägt auf.' : 'Den Aufschlag hat immer die Mannschaft, die den Ballwechsel gewonnen hat.'}` });
  }));
}
$$('#aufst-tabs button').forEach(b => b.addEventListener('click', () => {
  $$('#aufst-tabs button').forEach(x => x.setAttribute('aria-pressed', x === b));
  $('#pos-wrap').hidden = b.dataset.t !== 'pos';
  $('#so-wrap').hidden = b.dataset.t !== 'so';
}));
onShow.aufstellung = () => { renderPos(); if (!SO) soNew(); };

/* ---------- Praxis: Pfiff-Timing und elektronischer Spielbericht ---------- */
let praxisTab = 'pfiff';
function renderPraxis() {
  $$('#praxis-tabs button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === praxisTab));
  $('#pfiff-wrap').hidden = praxisTab !== 'pfiff';
  $('#sheet-wrap').hidden = praxisTab !== 'sheet';
  if (praxisTab === 'pfiff') { if (!$('#pfiff-body').innerHTML.trim()) window.SCHIRI_PLAYS.mount($('#pfiff-body')); }
  else { window.SCHIRI_PLAYS.pause(); if (!$('#sheet-body').innerHTML.trim()) window.SCHIRI_SHEET.mount($('#sheet-body')); }
}
$$('#praxis-tabs button').forEach(b => b.addEventListener('click', () => { praxisTab = b.dataset.t; renderPraxis(); }));
onShow.praxis = renderPraxis;

/* ---------- Widgets in den Kapiteln ---------- */
const ZONES = {
  frei: ['Freizone', 'Mindestens 3 m rund um das Feld (FIVB: 5 m seitlich, 6,5 m hinten). Der Ball darf hier gespielt werden, auch außerhalb der eigenen Freizone und über dem Schreibertisch.', '1.1, 9'],
  feld: ['Spielfeld und Hinterzone', '18 × 9 m, jede Hälfte 9 × 9 m. Hinter der Angriffslinie liegt die Hinterzone: Von dort dürfen Hinterspieler in jeder Höhe angreifen, wenn sie hinter der Linie abspringen.', '1.1, 13.2.2'],
  vorn: ['Vorderzone', 'Von der Achse der Mittellinie bis zur Hinterkante der Angriffslinie (3 m), seitlich bis zum Ende der Freizone verlängert. Hinterspieler dürfen hier nicht über Netzhöhe angreifen. Oberes Zuspiel des Libero hier: kein Angriff über Netzhöhe.', '1.4.1, 13.2.3, 19.3.1.4'],
  aufschlag: ['Aufschlagzone', '9 m breit hinter der Grundlinie, bis zum Ende der Freizone. Beim Schlag bzw. Absprung darf der Aufschläger weder das Feld (Grundlinie!) noch den Boden außerhalb der Zone berühren.', '1.4.2, 12.4.3'],
  wechsel: ['Auswechselzone', 'Zwischen den Verlängerungen der beiden Angriffslinien bis zum Schreibertisch. Betritt ein Ersatzspieler sie spielbereit, gilt der Wechsel als beantragt.', '1.4.3, 15.10'],
  libero: ['Libero-Austauschzone', 'Freizone auf der Bankseite zwischen Verlängerung der Angriffslinie und Grundlinie. Nur hier tauschen Libero und regulärer Ersatzspieler.', '1.4.4, 19.3.2.7'],
  netz: ['Netz, Antennen, Mittellinie', 'Netzhöhe 2,43 m (Männer) / 2,24 m (Frauen). Antennen ragen 80 cm über das Netz und begrenzen den Überquerungsraum. Unter dem Netz liegt die Mittellinie: Ein Teil des Fußes muss auf oder über ihr bleiben.', '2.1, 2.4, 11.2.2'],
  sr1: ['1. Schiedsrichter', 'Auf dem Schiedsrichterstuhl an einem Netzende, gegenüber dem Schreiber. Blickhöhe etwa 50 cm über dem Netz. Leitet das Spiel und hat das letzte Wort.', '23'],
  sr2: ['2. Schiedsrichter', 'Steht außerhalb des Feldes nahe dem Pfosten auf der Seite des Schreibers, gegenüber dem 1. SR. Genehmigt Auszeiten und Wechsel.', '24'],
  schreiber: ['Schreibertisch', 'Schreiber gegenüber dem 1. SR. Führt den Spielbericht, kontrolliert die Aufschlagfolge und bestätigt Wechselanträge mit dem Summer. Daneben die Mannschaftsbänke.', '27'],
  lr: ['Linienrichter (zwei)', 'An den Ecken, die der rechten Hand jedes Schiedsrichters am nächsten sind, diagonal 1–2 m von der Ecke. Jeder überwacht Grund- und Seitenlinie seiner Seite. Flaggen 40 × 40 cm.', '29.1']
};
const WIDGETS = {
  court(el) {
    el.innerHTML = `<div class="court-w"><div class="court-scroll"><svg viewBox="0 0 480 326" class="court-svg" role="img" aria-label="Spielfeldplan, Zonen antippbar">
      <defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" class="h-bg"/><line x1="0" y1="0" x2="0" y2="8" class="h-ln"/></pattern></defs>
      <rect class="z c-free" data-z="frei" x="0" y="0" width="480" height="300"/>
      <rect class="z c-serve" data-z="aufschlag" x="0" y="60" width="60" height="180" fill="url(#hatch)"/>
      <rect class="z c-serve" data-z="aufschlag" x="420" y="60" width="60" height="180" fill="url(#hatch)"/>
      <rect class="z c-lib" data-z="libero" x="60" y="240" width="120" height="60"/>
      <rect class="z c-lib" data-z="libero" x="300" y="240" width="120" height="60"/>
      <rect class="z c-sub" data-z="wechsel" x="180" y="240" width="120" height="60"/>
      <rect class="z c-court" data-z="feld" x="60" y="60" width="360" height="180"/>
      <rect class="z c-front" data-z="vorn" x="180" y="60" width="120" height="180"/>
      <g class="nopoint"><rect x="60" y="60" width="360" height="180" class="c-bound"/><line x1="180" y1="60" x2="180" y2="240" class="c-line"/><line x1="300" y1="60" x2="300" y2="240" class="c-line"/>
      <line x1="180" y1="240" x2="180" y2="300" class="c-dash"/><line x1="300" y1="240" x2="300" y2="300" class="c-dash"/></g>
      <rect class="z c-netz" data-z="netz" x="235" y="44" width="10" height="212"/>
      <rect x="236" y="54" width="8" height="8" class="c-ant nopoint"/><rect x="236" y="238" width="8" height="8" class="c-ant nopoint"/>
      <g class="z z-mark" data-z="sr1"><rect x="226" y="8" width="28" height="24" rx="4"/><text x="240" y="25">1</text></g>
      <g class="z z-mark" data-z="sr2"><circle cx="240" cy="276" r="13"/><text x="240" y="281">2</text></g>
      <g class="z z-mark z-lr" data-z="lr"><circle cx="44" cy="44" r="10"/><text x="44" y="48">L</text></g>
      <g class="z z-mark z-lr" data-z="lr"><circle cx="436" cy="256" r="10"/><text x="436" y="260">L</text></g>
      <g class="z z-mark" data-z="schreiber"><rect x="196" y="304" width="88" height="18" rx="3"/><text x="240" y="317">Schreiber</text></g>
      <g class="nopoint"><rect x="80" y="306" width="84" height="14" rx="3" class="c-bench"/><rect x="316" y="306" width="84" height="14" rx="3" class="c-bench"/><text x="122" y="317" class="c-small">Bank</text><text x="358" y="317" class="c-small">Bank</text>
      <text x="120" y="154" class="c-big">9 m</text><text x="360" y="154" class="c-big">9 m</text><text x="210" y="154" class="c-small">3 m</text><text x="270" y="154" class="c-small">3 m</text></g>
    </svg></div><div class="court-info" aria-live="polite"><p class="eyebrow">Tipp auf eine Zone</p><p>Spielfeld, Vorderzone, Aufschlagzone, Netz, Schiedsrichter, Linienrichter und Schreiber sind antippbar.</p></div></div>`;
    const info = $('.court-info', el);
    $$('.z', el).forEach(z => {
      z.setAttribute('tabindex', '0');
      const act = e => {
        e.stopPropagation();
        const [t, d, r] = ZONES[z.dataset.z];
        $$('.z', el).forEach(x => x.classList.toggle('sel', x.dataset.z === z.dataset.z));
        info.innerHTML = `<h4>${t}</h4><p>${d}</p>${rulePill('Regel ' + r)}`;
      };
      z.addEventListener('click', act);
      z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(e); } });
    });
  },
  positions(el) {
    const c = { 4: [70, 60], 3: [150, 60], 2: [230, 60], 5: [70, 180], 6: [150, 180], 1: [230, 180] };
    const node = p => `<g transform="translate(${c[p][0]} ${c[p][1]})"><circle r="22" class="pw-n${p === 1 ? ' srv' : ''}"/><text y="6" class="pw-t">${ROM[p]}</text></g>`;
    el.innerHTML = `<div class="pw"><svg viewBox="0 0 300 250" class="pw-svg" role="img" aria-label="Positionen I bis VI mit Rotationsrichtung">
      <rect x="30" y="10" width="240" height="235" class="c-court"/><rect x="30" y="10" width="240" height="80" class="c-front"/>
      <line x1="30" y1="90" x2="270" y2="90" class="c-line"/><rect x="30" y="10" width="240" height="235" class="c-bound"/>
      <line x1="0" y1="10" x2="300" y2="10" class="c-net"/>
      <line x1="70" y1="82" x2="70" y2="158" class="pw-pair"/><line x1="150" y1="82" x2="150" y2="158" class="pw-pair"/><line x1="230" y1="82" x2="230" y2="158" class="pw-pair"/>
      ${arr('M254 80 Q268 120 254 160', 254, 160, 100)}${arr('M208 204 Q190 222 172 204', 172, 204, 225)}${arr('M128 204 Q110 222 92 204', 92, 204, 225)}
      ${arr('M46 160 Q32 120 46 80', 46, 80, -80)}${arr('M92 36 Q110 20 128 36', 128, 36, 40)}${arr('M172 36 Q190 20 208 36', 208, 36, 40)}
      ${[4, 3, 2, 5, 6, 1].map(node).join('')}
      <text x="150" y="238" class="c-small">Blick von hinten Richtung Netz</text></svg>
      <div><p><b>Vorne:</b> IV – III – II. <b>Hinten:</b> V – VI – I.</p><p>Die Pfeile zeigen die Rotation im Uhrzeigersinn. Die gestrichelten Linien markieren die Paare, die vorne/hinten verglichen werden. Position I (orange umrandet) schlägt auf.</p></div></div>`;
  },
  sanktion(el) {
    const T = {
      gering: ['Geringfügiges Fehlverhalten', [['Stufe 1: mündliche Verwarnung über den Spielkapitän', null, 'Keine Sanktion, nur Vorbeugung.'], ['Stufe 2: gelbe Karte', 'y', 'Formelle Verwarnung, wird eingetragen, keine unmittelbare Folge. Das Team hat die Sanktionsschwelle erreicht.'], ['Wiederholung: wie Unhöflichkeit, Bestrafung', 'r', 'Punkt und Aufschlag für den Gegner.']]],
      unh: ['Unhöflichkeit', [['Bestrafung', 'r', 'Punkt und Aufschlag für den Gegner. Gilt für das erste Mal durch irgendein Teammitglied.'], ['Hinausstellung', 'ry', 'Dieselbe Person zum zweiten Mal: Rest des Satzes in der Umkleide.'], ['Disqualifikation', 'r|y', 'Dieselbe Person zum dritten Mal: Rest des Spiels in der Umkleide.']]],
      bel: ['Beleidigung', [['Hinausstellung', 'ry', 'Schon beim ersten Mal. Rest des Satzes in der Umkleide.'], ['Disqualifikation', 'r|y', 'Dieselbe Person zum zweiten Mal: Rest des Spiels.'], null]],
      tat: ['Tätlichkeit', [['Disqualifikation', 'r|y', 'Sofort, beim ersten Mal. Rest des Spiels in der Umkleide.'], null, null]]
    };
    let cat = 'unh', occ = 0;
    const cards = c => !c ? '<span class="cards"><span class="mouth">mündlich</span></span>' : c === 'y' ? '<span class="cards"><span class="cd y"></span></span>' : c === 'r' ? '<span class="cards"><span class="cd r"></span></span>' : c === 'ry' ? '<span class="cards"><span class="cd y tilt"></span><span class="cd r over"></span><em>gemeinsam, eine Hand</em></span>' : '<span class="cards"><span class="cd y"></span><span class="gap"></span><span class="cd r"></span><em>getrennt, zwei Hände</em></span>';
    const draw = () => {
      const row = T[cat][1];
      const x = row[occ];
      el.innerHTML = `<div class="widget sank"><div class="chips">${Object.entries(T).map(([k, v]) => `<button type="button" class="chip${k === cat ? ' on' : ''}" data-c="${k}">${v[0]}</button>`).join('')}</div>
        <div class="chips">${[0, 1, 2].map(i => `<button type="button" class="chip${i === occ ? ' on' : ''}" data-o="${i}"${row[i] ? '' : ' disabled'}>${i + 1}. Mal</button>`).join('')}</div>
        ${x ? `<div class="sank-out">${cards(x[1])}<div><p class="fb-h">${x[0]}</p><p>${x[2]}</p></div></div>` : ''}</div>`;
      $$('[data-c]', el).forEach(b => b.addEventListener('click', () => { cat = b.dataset.c; occ = 0; draw(); }));
      $$('[data-o]', el).forEach(b => b.addEventListener('click', () => { occ = +b.dataset.o; draw(); }));
    };
    draw();
  },
  wer(el) {
    const items = [
      ['Positionsfehler der annehmenden Mannschaft', '2. SR'], ['Doppelberührung beim Zuspiel', '1. SR'], ['Fuß komplett im gegnerischen Feld', '2. SR'],
      ['Falscher Spieler schlägt auf (Rotationsfehler)', 'Schreiber'], ['Netzberührung eines Blockers', '2. SR'], ['Ball landet knapp neben der Seitenlinie', 'Linienrichter'],
      ['Auszeit genehmigen', '2. SR'], ['Sichtblock der aufschlagenden Mannschaft', '1. SR'], ['Gehaltener Ball bei der Abwehr', '1. SR'],
      ['Ball berührt einen Fremdkörper (z. B. Basketballkorb)', '2. SR'], ['Fußfehler des Aufschlägers anzeigen', 'Linienrichter'], ['8. Punkt im Entscheidungssatz ansagen', 'Schreiber']
    ];
    const why = { '2. SR': 'Das gehört zum Bereich des 2. SR. ' + rulePill('Regel 24.3.2'), '1. SR': 'Das entscheidet der 1. SR. ' + rulePill('Regel 23.3.2.3'), 'Schreiber': 'Das ist Aufgabe des Schreibers, er meldet mit dem Summer. ' + rulePill('Regel 27.2.2'), 'Linienrichter': 'Das zeigt der Linienrichter mit der Flagge an, der 1. SR entscheidet. ' + rulePill('Regel 29.2') };
    let order = shuffle(items), i = 0, r = 0;
    const draw = () => {
      if (i >= order.length) {
        el.innerHTML = `<div class="widget"><p class="eyebrow">Wer ist zuständig?</p><p class="fb-h">${r} von ${order.length} richtig.</p><button type="button" class="btn btn-ghost btn-s">Nochmal</button></div>`;
        $('button', el).addEventListener('click', () => { order = shuffle(items); i = 0; r = 0; draw(); });
        return;
      }
      const [t, a] = order[i];
      el.innerHTML = `<div class="widget"><p class="eyebrow">Wer ist zuständig? · ${i + 1}/${order.length}</p><p class="q-text">${t}</p><div class="chips">${['1. SR', '2. SR', 'Schreiber', 'Linienrichter'].map(x => `<button type="button" class="chip big" data-a="${x}">${x}</button>`).join('')}</div><div class="fb" hidden></div></div>`;
      $$('[data-a]', el).forEach(b => b.addEventListener('click', () => {
        if (el.dataset.lock === '1') return;
        el.dataset.lock = '1';
        const ok = b.dataset.a === a;
        if (ok) r++;
        $$('[data-a]', el).forEach(x => { x.disabled = true; if (x.dataset.a === a) x.classList.add('on'); });
        const fb = $('.fb', el);
        fb.hidden = false; fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
        fb.innerHTML = `<p>${ok ? 'Richtig.' : 'Zuständig: ' + a + '.'} ${why[a]}</p><div class="fb-row"><button type="button" class="btn btn-primary btn-s">Weiter</button></div>`;
        $('.fb button', el).addEventListener('click', () => { el.dataset.lock = ''; i++; draw(); });
      }));
    };
    draw();
  },
  wechsel(el) {
    const steps = [
      { t: 'Der Trainer wechselt: Nr. 7 kommt für Nr. 3.', ok: true, e: 'Ersatzspieler 7 kommt zum ersten Mal, Startspieler 3 verlässt zum ersten Mal das Feld (15.6.1, 15.6.2).', ap: [[7, 3]] },
      { t: 'Gleich danach, ohne Ballwechsel dazwischen: Nr. 8 soll für Nr. 1 kommen.', ok: false, e: 'Zwischen zwei Wechselanträgen derselben Mannschaft muss ein abgeschlossener Ballwechsel liegen. Beide Wechsel hätten in einem Antrag kommen müssen (15.2.3).' },
      { t: 'Nach einem Ballwechsel: Nr. 8 soll für Nr. 7 kommen.', ok: false, e: 'Ein Ersatzspieler kann nur von dem Startspieler ersetzt werden, für den er gekommen ist. 7 kann nur durch 3 ersetzt werden (15.6.2).' },
      { t: 'Nr. 3 kommt für Nr. 7 zurück.', ok: true, e: 'Der Startspieler kehrt einmal zurück, auf seine ursprüngliche Position (15.6.1).', ap: [[3, 7]] },
      { t: 'Später im Satz: Nr. 7 soll wieder für Nr. 3 kommen.', ok: false, e: '3 hat das Feld schon einmal verlassen und ist zurückgekehrt. 7 war in diesem Satz schon im Spiel (15.6).' },
      { t: 'Ein Antrag: Nr. 9 für Nr. 5 und Nr. 10 für Nr. 2.', ok: true, e: 'Mehrere Spieler im selben Antrag sind erlaubt. Sie wechseln nacheinander, Paar für Paar (15.2.2, 15.10.4).', ap: [[9, 5], [10, 2]] },
      { t: 'Nach einem Ballwechsel: Nr. 11 für Nr. 4.', ok: true, e: 'Das ist der 5. Wechsel. Der 2. SR meldet ihn dem 1. SR und dem Trainer (24.2.7).', ap: [[11, 4]] },
      { t: 'Nach einem Ballwechsel: Nr. 12 für Nr. 6.', ok: true, e: 'Der 6. und letzte reguläre Wechsel in diesem Satz, ebenfalls zu melden (15.1, 24.2.7).', ap: [[12, 6]] },
      { t: 'Nach einem Ballwechsel: Nr. 5 soll für Nr. 9 zurück.', ok: false, e: 'Alle 6 Wechsel sind verbraucht. Das ist eine unzulässige Anfrage: beim ersten Mal ohne Verzögerung zurückweisen und eintragen (15.11).' },
      { t: 'Nr. 12 verletzt sich und kann nicht weiterspielen. Darf Nr. 7 für ihn aufs Feld?', ok: true, e: 'Regulär geht nichts mehr (6 Wechsel verbraucht). Ausnahmewechsel: jeder, der nicht am Feld ist, außer dem Libero. 12 darf in diesem Spiel nicht mehr zurück (15.7).', ap: [[7, 12]], exc: true }
    ];
    let i = 0, field = [1, 2, 3, 4, 5, 6], n = 0, r = 0, answered = false, last = null;
    const draw = () => {
      if (i >= steps.length) {
        el.innerHTML = `<div class="widget"><p class="eyebrow">Wechsel-Simulator</p><p class="fb-h">${r} von ${steps.length} richtig entschieden.</p><button type="button" class="btn btn-ghost btn-s">Nochmal von vorn</button></div>`;
        $('button', el).addEventListener('click', () => { i = 0; field = [1, 2, 3, 4, 5, 6]; n = 0; r = 0; answered = false; draw(); });
        return;
      }
      const s = steps[i];
      el.innerHTML = `<div class="widget"><p class="eyebrow">Wechsel-Simulator · Schritt ${i + 1}/${steps.length}</p>
        <div class="wx-state"><span>Am Feld: ${field.map(x => `<b class="jersey">${x}</b>`).join('')}</span><span>Reguläre Wechsel: <b>${n}/6</b></span></div>
        <p class="q-text">${s.t}</p>
        ${answered ? `<div class="fb ${last ? 'fb-ok' : 'fb-bad'}"><p class="fb-h">${last ? 'Richtig' : 'Falsch'}: ${s.ok ? 'erlaubt' : 'nicht erlaubt'}.</p><p>${s.e.replace(/ \(([\d.,– ]+)\)/g, (m, g) => ' ' + rulePill('Regel ' + g))}</p><div class="fb-row"><button type="button" class="btn btn-primary btn-s" id="wx-next">Weiter</button></div></div>`
        : '<div class="chips"><button type="button" class="chip big" data-v="1">Erlaubt</button><button type="button" class="chip big" data-v="0">Nicht erlaubt</button></div>'}
        <p class="muted small">Startaufstellung 1–6, auf der Bank 7–12. Ein Satz, alles in Reihenfolge.</p></div>`;
      $$('[data-v]', el).forEach(b => b.addEventListener('click', () => {
        last = (b.dataset.v === '1') === s.ok; if (last) r++;
        if (s.ok && s.ap) { s.ap.forEach(([inn, out]) => { field = field.map(x => x === out ? inn : x); }); if (!s.exc) n += s.ap.length; }
        answered = true; draw();
      }));
      if ($('#wx-next', el)) $('#wx-next', el).addEventListener('click', () => { i++; answered = false; draw(); });
    };
    draw();
  }
};

/* ---------- Coach (fragt Claude, falls verfügbar) ---------- */
let sample = null, coachReady = false, coachTurns = [], coachCtl = null;
const strip = h => h.replace(/<\/(li|p|h3|div)>/g, '\n').replace(/<br>/g, '\n').replace(/<[^>]+>/g, '').replace(/\n\s*\n+/g, '\n').trim();
const CONTEXT = D.CH.map(c => '## ' + c.t + '\n' + strip(c.html)).join('\n\n').slice(0, 34000);
const INSTR = `Du bist ein geduldiger Ausbildner für Volleyball-Schiedsrichter in Österreich. Der Lernende bereitet sich auf die Schiedsrichterprüfung des ÖVV vor (Online-Kurs, Multiple-Choice-Test, Praxis).
Grundlage sind die FIVB Official Volleyball Rules 2025–2028. Antworte auf Deutsch (österreichische Begriffe sind willkommen), kurz und klar: erst die Antwort in einem Satz, dann die Begründung, dann die Regelnummer. Nutze gern ein kurzes Praxisbeispiel aus Spielsicht. Wenn eine Frage nationale Durchführungsbestimmungen des ÖVV oder eines Landesverbands betrifft, sag offen, dass das hier nicht abgedeckt ist und im Kurs geklärt werden sollte. Erfinde keine Regelnummern.
Hier die Regelzusammenfassung dieser Lernseite als Bezug:
${CONTEXT}`;
function coachErr(code) {
  return ({
    not_granted: 'Du hast der Seite den Zugriff auf Claude nicht erlaubt. Der Coach bleibt deshalb aus.',
    sampling_disabled: 'Claude ist für dieses Konto nicht verfügbar.',
    rate_limited: 'Gerade zu viele Anfragen. Versuch es in ein paar Minuten noch einmal.',
    session_expired: 'Bitte melde dich neu an und lade die Seite neu.',
    refused: 'Darauf antwortet der Coach nicht. Formuliere die Frage anders.',
    prompt_too_large: 'Das Gespräch ist zu lang geworden. Starte ein neues.'
  })[code] || 'Die Antwort ist nicht angekommen. Versuch es noch einmal.';
}
function renderCoach() {
  $('#coach-off').hidden = coachReady;
  $('#coach-on').hidden = !coachReady;
}
function bubble(role, text) {
  const d = document.createElement('div');
  d.className = 'msg ' + (role === 'user' ? 'me' : 'ai');
  d.textContent = text;
  $('#coach-log').appendChild(d);
  d.scrollIntoView({ block: 'nearest' });
  return d;
}
async function coachSend(text) {
  text = (text || '').trim();
  if (!text || !sample || coachCtl) return;
  $('#coach-in').value = '';
  $('#coach-empty').hidden = true;
  coachTurns.push({ role: 'user', content: text });
  bubble('user', text);
  const out = bubble('assistant', 'Denkt nach …');
  out.classList.add('pending');
  coachCtl = new AbortController();
  $('#coach-send').hidden = true; $('#coach-stop').hidden = false;
  const turns = coachTurns.slice(-10);
  if (turns[0].role !== 'user') turns.shift();
  try {
    const { text: ans } = await sample([{ role: 'user', content: INSTR }].concat(turns), {
      cache: false, signal: coachCtl.signal,
      onText: ({ text: t }) => { out.classList.remove('pending'); out.textContent = t; }
    });
    out.classList.remove('pending');
    out.innerHTML = linkFreeText(ans);
    coachTurns.push({ role: 'assistant', content: ans });
  } catch (e) {
    out.classList.remove('pending');
    if (e && e.code === 'cancelled') { out.textContent = (e.text || '') + ' [gestoppt]'; if (e.text) coachTurns.push({ role: 'assistant', content: e.text }); }
    else {
      out.textContent = (e && e.text ? e.text + '\n\n' : '') + coachErr(e && e.code);
      out.classList.add('err');
      if (e && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(e.code)) { coachReady = false; }
    }
  } finally {
    coachCtl = null;
    $('#coach-send').hidden = false; $('#coach-stop').hidden = true;
  }
}
function askCoachAbout(q, chosen) {
  go('coach');
  if (!coachReady) return;
  coachSend(`Prüfungsfrage: ${q.q}\nMeine Antwort: ${q.o[chosen]}\nRichtig ist: ${q.o[q.c]} (Regel ${q.r})\nErklär mir bitte genauer, warum das so ist, und gib mir ein Beispiel aus einem Spiel.`);
}
$('#coach-form').addEventListener('submit', e => { e.preventDefault(); coachSend($('#coach-in').value); });
$('#coach-in').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); coachSend($('#coach-in').value); } });
$('#coach-stop').addEventListener('click', () => { if (coachCtl) coachCtl.abort(); });
$$('#coach-sugg button').forEach(b => b.addEventListener('click', () => coachSend(b.textContent)));
$('#coach-new').addEventListener('click', () => { if (coachCtl) coachCtl.abort(); coachTurns = []; $('#coach-log').innerHTML = ''; $('#coach-empty').hidden = false; });
onShow.coach = renderCoach;
(async () => {
  try { if (window.claude && typeof window.claude.use === 'function') sample = await window.claude.use('sample'); } catch (e) { sample = null; }
  coachReady = !!sample;
  renderCoach();
})();

/* ---------- Start ---------- */
$('#reset-progress').addEventListener('click', e => {
  const b = e.currentTarget;
  if (b.dataset.arm !== '1') { b.dataset.arm = '1'; b.textContent = 'Wirklich alles löschen?'; setTimeout(() => { b.dataset.arm = ''; b.textContent = 'Fortschritt zurücksetzen'; }, 4000); return; }
  P = { ch: {}, q: {}, sig: {}, sit: {}, exams: [], lastCh: 'feld', resetAt: Date.now() }; save();
  b.dataset.arm = ''; b.textContent = 'Fortschritt zurücksetzen';
  renderStart();
});
/* Schnittstelle für sync.js: Fortschritt lesen und nach dem Zusammenführen ersetzen */
window.SCHIRI_APP = {
  get: () => JSON.parse(JSON.stringify(P)),
  replace(np) {
    P = Object.assign({ ch: {}, q: {}, sig: {}, sit: {}, exams: [], lastCh: 'feld' }, np);
    try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {}
    if (curView === 'start' || curView === 'quiz') onShow[curView]();
  }
};
go((location.hash || '#start').slice(1));
})();

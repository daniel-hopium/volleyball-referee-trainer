/* Pfiff-Timing: animierte Ballwechsel in der Seitenansicht. Im richtigen Moment pfeifen, dann entscheiden. */
window.SCHIRI_PLAYS = (function () {
'use strict';

const FLOOR = 220, NET = 320, NETTOP = 145, END_L = 40, END_R = 600;
/* Spieler: x, Seite (l/r), Haltung (low = Annahme, up = Arme oben, srv = Aufschläger), lift = Sprunghöhe */
const SERVE = [{ x: 22, y: 160, t: 0 }, { x: 26, y: 150, t: 0.9, h: 50 }];
const RECV = [{ x: 470, y: 188, t: 2.1, h: 95, p: 'r0' }, { x: 395, y: 150, t: 2.8, h: 85, p: 'r1' }, { x: 352, y: 124, t: 3.5, h: 70, p: 'r2' }];
const PL_STD = { l0: { x: 16, s: 'l', k: 'srv' }, l1: { x: 110, s: 'l', k: 'low' }, l2: { x: 230, s: 'l', k: 'low' }, r0: { x: 470, s: 'r', k: 'low' }, r1: { x: 395, s: 'r', k: 'up' }, r2: { x: 350, s: 'r', k: 'up', lift: 28 } };
const withPl = extra => Object.assign({}, PL_STD, extra);

const SCN = [
  { id: 'in', t: 'Angriff ins Feld', pl: PL_STD,
    path: SERVE.concat(RECV, [{ x: 170, y: 220, t: 3.9, h: -6 }, { x: 120, y: 220, t: 4.4, h: 30 }]),
    at: 3.9, win: 0.8, sig: '14', opts: ['14', '15', '24'],
    e: 'Der Ballwechsel endet erst, wenn der Ball den Boden berührt. Pfeifst du vorher, nimmst du einer Mannschaft eine mögliche Abwehr weg.',
    look: 'Blick: beim Angriff auf Angreifer und Block, dann mit dem Ball zum Aufprallpunkt.', r: 'Regel 8.3, 6.1.3' },
  { id: 'out', t: 'Angriff hinter die Grundlinie', pl: PL_STD,
    path: SERVE.concat(RECV, [{ x: 26, y: 220, t: 3.95, h: -4 }, { x: 4, y: 214, t: 4.3, h: 20 }]),
    at: 3.95, win: 0.8, sig: '15', opts: ['15', '14', '24'],
    e: 'Der Ball landet komplett hinter der Grundlinie und niemand von Heim hat ihn berührt: aus, Punkt für Heim.',
    look: 'Blick: bei Bällen Richtung Linie zum Aufprallpunkt. Der Linienrichter hilft mit der Flagge, entscheiden musst du.', r: 'Regel 8.4.1' },
  { id: 'touch', t: 'Block berührt, Ball geht aus', pl: withPl({ l3: { x: 300, s: 'l', k: 'up', lift: 25 } }),
    path: SERVE.concat(RECV, [{ x: 308, y: 124, t: 3.6, h: 2, p: 'l3' }, { x: 8, y: 220, t: 4.45, h: 70 }]),
    at: 4.45, win: 0.8, sig: '24', opts: ['24', '15', '12'],
    e: 'Der Ball ist aus, aber zuletzt hat ihn der Heimblock berührt. Deshalb ist es kein „aus“ für Gast, sondern „Ball berührt“: Punkt für Gast.',
    look: 'Blick: im Moment des Angriffs auf die Blockhände, sonst siehst du die Berührung nicht.', r: 'Regel 8.4, 14.2' },
  { id: 'four', t: 'Vier Berührungen', pl: withPl({ r0: { x: 470, s: 'r', k: 'low' }, r1: { x: 430, s: 'r', k: 'low' }, r2: { x: 395, s: 'r', k: 'up' }, r3: { x: 455, s: 'r', k: 'low' } }),
    path: SERVE.concat([{ x: 470, y: 188, t: 2.1, h: 95, p: 'r0' }, { x: 430, y: 188, t: 2.8, h: 60, p: 'r1' }, { x: 395, y: 150, t: 3.5, h: 60, p: 'r2' }, { x: 455, y: 188, t: 4.2, h: 55, p: 'r3' }, { x: 490, y: 220, t: 4.8, h: 40 }]),
    at: 4.2, win: 0.6, sig: '18', opts: ['18', '17', '16'],
    e: 'Gast spielt den Ball ein viertes Mal. Der Fehler passiert in genau diesem Moment, also pfeifst du sofort und nicht erst, wenn der Ball am Boden liegt.',
    look: 'Blick: mitzählen. Nach der dritten Berührung muss der Ball über das Netz.', r: 'Regel 9.3.1' },
  { id: 'net', t: 'Blocker landet im Netz', pl: withPl({ l3: { x: 300, s: 'l', k: 'up', lift: 25, net: 3.95 } }),
    path: SERVE.concat(RECV, [{ x: 310, y: 126, t: 3.6, h: 2, p: 'l3' }, { x: 420, y: 220, t: 4.3, h: 50 }]),
    fx: [{ k: 'net', t: 3.95 }],
    at: 3.95, win: 0.3, sig: '19', opts: ['19', '12', '20'],
    e: 'Der Block selbst war in Ordnung. Beim Landen berührt der Blocker aber das Netz zwischen den Antennen. Das gehört noch zur Aktion, also Fehler, und zwar in diesem Moment, nicht erst beim Aufprall des Balls.',
    look: 'Blick: nach dem Block kurz am Netz bleiben, bis die Blocker gelandet sind. Erst dann zum Ball.', r: 'Regel 11.3.1, 11.4.4' },
  { id: 'servenet', t: 'Aufschlag ins Netz', pl: PL_STD,
    path: SERVE.concat([{ x: 316, y: 160, t: 1.7, h: 55 }, { x: 292, y: 220, t: 2.15, h: 6 }]),
    fx: [{ k: 'net', t: 1.7 }],
    at: 1.7, win: 0.9, sig: '19', opts: ['19', '10', '22'],
    e: 'Der Aufschlag berührt das Netz und kommt nicht auf die andere Seite. Sobald das klar ist, pfeifst du.',
    look: 'Blick: beim Aufschlag erst auf den Aufschläger (Fuß, Hochwurf), dann dem Ball bis übers Netz folgen.', r: 'Regel 12.6.2.1' },
  { id: 'held', t: 'Zuspieler hält den Ball', pl: PL_STD,
    path: SERVE.concat([{ x: 470, y: 188, t: 2.1, h: 95, p: 'r0' }, { x: 395, y: 150, t: 2.8, h: 85, p: 'r1' }, { x: 395, y: 150, t: 3.45, h: 0, p: 'r1' }, { x: 352, y: 124, t: 4.1, h: 60, p: 'r2' }, { x: 170, y: 220, t: 4.5, h: -6 }]),
    at: 2.95, early: 2.8, win: 0.8, sig: '16', opts: ['16', '17', '18'],
    e: 'Der Ball bleibt in den Händen des Zuspielers liegen, er wird gefangen statt gespielt. Das siehst du, sobald der Ball zur Ruhe kommt.',
    look: 'Blick: beim Zuspiel auf die Hände des Zuspielers, nicht auf den Angreifer.', r: 'Regel 9.2.2, 9.3.3' },
  { id: 'foot', t: 'Aufschläger steht auf der Linie', pl: withPl({ l0: { x: 44, s: 'l', k: 'srv' } }),
    path: [{ x: 50, y: 160, t: 0 }, { x: 54, y: 150, t: 0.9, h: 50 }, { x: 470, y: 188, t: 2.1, h: 95, p: 'r0' }, { x: 395, y: 150, t: 2.8, h: 85, p: 'r1' }],
    at: 0.9, win: 0.6, sig: '22', opts: ['22', '11', '13'],
    e: 'Beim Aufschlagschlag steht der Aufschläger auf der Grundlinie. Die Linie gehört zum Feld, also Fußfehler. Gepfiffen wird im Moment des Schlags.',
    look: 'Blick: vor dem Schlag auf die Füße des Aufschlägers, im Schlag auf den Ball.', r: 'Regel 12.4.3' }
];

let played = false;
let root = null, D = null, run = null, stats = { n: 0, time: 0, dec: 0 }, order = [], oi = 0, slow = false;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sigName = id => (D.SIG.find(s => s.id === id) || { n: id }).n;

function ballAt(path, t) {
  if (t <= path[0].t) return path[0];
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    if (t <= b.t) {
      const u = (t - a.t) / (b.t - a.t || 1);
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u - (b.h || 0) * 4 * u * (1 - u) };
    }
  }
  return path[path.length - 1];
}
function figure(id, p) {
  const feet = FLOOR - (p.lift || 0), x = p.x;
  const arms = p.k === 'low' ? `M${x} ${feet - 42}L${x - 9} ${feet - 31}M${x} ${feet - 42}L${x + 9} ${feet - 31}`
    : p.k === 'srv' ? `M${x} ${feet - 42}L${x + 7} ${feet - 66}M${x} ${feet - 42}L${x - 9} ${feet - 32}`
    : `M${x} ${feet - 42}L${x - 11} ${feet - 70}M${x} ${feet - 42}L${x + 11} ${feet - 70}`;
  return `<g class="pz-pl pz-${p.s}" data-p="${id}"><circle cx="${x}" cy="${feet - 55}" r="7"/><path d="M${x} ${feet - 48}L${x} ${feet - 22}M${x} ${feet - 22}L${x - 6} ${feet}M${x} ${feet - 22}L${x + 6} ${feet}${arms}"/></g>`;
}
function scene(sc) {
  return `<svg viewBox="0 0 640 240" class="pz-svg" role="img" aria-label="Seitenansicht: ${esc(sc.t)}">
    <rect x="0" y="${FLOOR}" width="640" height="20" class="pz-free"/><rect x="${END_L}" y="${FLOOR}" width="${END_R - END_L}" height="20" class="pz-court"/>
    <line x1="${END_L}" y1="${FLOOR}" x2="${END_L}" y2="${FLOOR + 20}" class="pz-line"/><line x1="${END_R}" y1="${FLOOR}" x2="${END_R}" y2="${FLOOR + 20}" class="pz-line"/>
    <text x="${END_L + 4}" y="${FLOOR + 14}" class="pz-lbl">Grundlinie</text><text x="180" y="30" class="pz-lbl pz-side">Heim</text><text x="460" y="30" class="pz-lbl pz-side">Gast</text>
    <line x1="${NET}" y1="${NETTOP}" x2="${NET}" y2="${FLOOR}" class="pz-post"/><rect x="${NET - 3}" y="${NETTOP}" width="6" height="32" class="pz-net" id="pz-net"/>
    ${Object.entries(sc.pl).map(([id, p]) => figure(id, p)).join('')}
    <circle r="6.5" class="pz-ball" id="pz-ball" cx="${sc.path[0].x}" cy="${sc.path[0].y}"/>
  </svg>`;
}

function render() {
  const sc = SCN[order[oi]];
  root.innerHTML = `
    <div class="pz-head"><p class="q-meta"><span>Spielzug ${oi + 1} von ${order.length}: <b>${esc(sc.t)}</b></span><span>Timing ${stats.time}/${stats.n} · Entscheidung ${stats.dec}/${stats.n}</span></p></div>
    <div class="pz-stage">${scene(sc)}<p class="pz-flash" id="pz-flash" hidden></p></div>
    <div class="row-btns pz-ctl">
      <button type="button" class="btn btn-primary" id="pz-play">Abspielen</button>
      <button type="button" class="btn pz-whistle" id="pz-whistle" disabled>Pfiff</button>
      <button type="button" class="btn btn-ghost pz-replay" id="pz-replay" disabled title="Spielzug wiederholen">Wiederholen</button>
      <label class="toggle"><input type="checkbox" id="pz-slow"${slow ? ' checked' : ''}> Zeitlupe</label>
    </div>
    <p class="muted small">Drück „Pfiff“ (oder die Leertaste) genau dann, wenn der Ballwechsel zu Ende ist oder ein Fehler passiert. Nicht vorher.</p>
    <div id="pz-out"></div>`;
  played = false;
  root.querySelector('#pz-play').addEventListener('click', () => start(sc));
  root.querySelector('#pz-replay').addEventListener('click', () => start(sc, true));
  root.querySelector('#pz-whistle').addEventListener('click', () => whistle());
  root.querySelector('#pz-slow').addEventListener('change', e => { slow = e.target.checked; });
}
function start(sc, replay) {
  stop();
  if (!replay) root.querySelector('#pz-out').innerHTML = '';
  root.querySelector('#pz-replay').disabled = true;
  root.querySelector('#pz-flash').hidden = true;
  root.querySelector('#pz-net').classList.remove('hit');
  root.querySelector('#pz-play').disabled = true;
  const w = root.querySelector('#pz-whistle'); w.disabled = false; w.focus();
  const endT = Math.max(sc.path[sc.path.length - 1].t, sc.at + sc.win) + 0.6;
  run = { sc, t0: performance.now(), t: 0, endT, done: false, replay: !!replay };
  const ball = root.querySelector('#pz-ball'), pls = root.querySelectorAll('.pz-pl'), net = root.querySelector('#pz-net');
  const frame = now => {
    if (!run || run.done) return;
    run.t = (now - run.t0) / 1000 * (slow ? 0.5 : 1);
    const b = ballAt(sc.path, run.t);
    ball.setAttribute('cx', b.x.toFixed(1)); ball.setAttribute('cy', b.y.toFixed(1));
    pls.forEach(g => {
      const id = g.dataset.p;
      const hit = sc.path.some(pt => pt.p === id && run.t >= pt.t - 0.05 && run.t <= pt.t + 0.3) || (sc.pl[id].net && run.t >= sc.pl[id].net && run.t <= sc.pl[id].net + 0.5);
      g.classList.toggle('hit', hit);
    });
    (sc.fx || []).forEach(f => { if (f.k === 'net') net.classList.toggle('hit', run.t >= f.t && run.t <= f.t + 0.5); });
    if (run.t >= run.endT) { finish(null); return; }
    run.raf = requestAnimationFrame(frame);
  };
  run.raf = requestAnimationFrame(frame);
}
function stop() { if (run) { run.done = true; cancelAnimationFrame(run.raf); } }
function whistle() {
  if (!run || run.done) return;
  finish((performance.now() - run.t0) / 1000 * (slow ? 0.5 : 1));
}
function finish(tp) {
  const sc = run.sc;
  stop();
  root.querySelector('#pz-whistle').disabled = true;
  root.querySelector('#pz-replay').disabled = false;
  played = true;
  const early = sc.early != null ? sc.early : sc.at - 0.08;
  const d = tp == null ? null : tp - sc.at;
  const verdict = tp == null ? 'none' : tp < early ? 'early' : d <= sc.win ? 'ok' : 'late';
  const fl = root.querySelector('#pz-flash');
  fl.hidden = false;
  fl.className = 'pz-flash ' + (verdict === 'ok' ? 'ok' : 'bad');
  fl.textContent = verdict === 'ok' ? `Pfiff! Reaktion ${Math.max(0, d).toFixed(2)} s` : verdict === 'early' ? 'Zu früh gepfiffen' : verdict === 'late' ? `Zu spät (${d.toFixed(2)} s nach dem Moment)` : 'Kein Pfiff';
  if (run.replay) return;
  stats.n++; if (verdict === 'ok') stats.time++;
  showStats();
  const out = root.querySelector('#pz-out');
  if (verdict === 'early') {
    out.innerHTML = `<div class="fb fb-bad"><p class="fb-h">Da war noch kein Fehler.</p><p>${esc(sc.e)}</p><p class="muted">${esc(sc.look)}</p><div class="fb-row"><span class="r">${esc(sc.r)}</span><button type="button" class="btn btn-primary btn-s" id="pz-next">Nächster Spielzug</button></div></div>`;
    bindNext();
    return;
  }
  const pict = window.SCHIRI_PICT || (() => '');
  out.innerHTML = `<div class="qcard"><p class="q-text">${verdict === 'ok' ? 'Gut getroffen.' : verdict === 'late' ? 'Der Moment war etwas früher.' : 'Hier hättest du pfeifen müssen.'} Welches Zeichen zeigst du?</p>
    <div class="pict-opts">${shuffle(sc.opts).map(id => `<button type="button" class="opt opt-pict pz-opt" data-id="${id}">${pict(id)}<span>${esc(sigName(id))}</span></button>`).join('')}</div><div class="fb" hidden></div></div>`;
  out.querySelectorAll('.pz-opt').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.id === sc.sig;
    out.querySelectorAll('.pz-opt').forEach(x => { x.disabled = true; if (x.dataset.id === sc.sig) x.classList.add('is-right'); });
    if (!ok) b.classList.add('is-wrong');
    if (ok) stats.dec++;
    const fb = out.querySelector('.fb');
    fb.hidden = false; fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
    fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig.' : 'Richtig wäre: ' + esc(sigName(sc.sig))}</p><p>${esc(sc.e)}</p><p class="muted">${esc(sc.look)}</p><div class="fb-row"><span class="r">${esc(sc.r)}</span><button type="button" class="btn btn-primary btn-s" id="pz-next">Nächster Spielzug</button></div>`;
    bindNext();
    showStats();
  }));
}
function showStats() { root.querySelector('.pz-head .q-meta span:last-child').textContent = `Timing ${stats.time}/${stats.n} · Entscheidung ${stats.dec}/${stats.n}`; }
function bindNext() {
  root.querySelector('#pz-next').addEventListener('click', () => {
    oi++;
    if (oi >= order.length) { order = shuffle(SCN.map((s, i) => i)); oi = 0; }
    render();
    root.querySelector('#pz-play').focus();
  });
}
document.addEventListener('keydown', e => {
  if (e.code !== 'Space' || !run || run.done || !root || !root.isConnected || root.offsetParent === null) return;
  if (e.target.closest && e.target.closest('input, textarea, select, button')) { if (e.target.id !== 'pz-whistle') return; }
  e.preventDefault();
  whistle();
});

return {
  mount(el) {
    D = window.SCHIRI_DATA;
    root = el;
    if (!order.length) order = shuffle(SCN.map((s, i) => i));
    render();
  },
  pause() { if (run && !run.done) { stop(); root.querySelector(played ? '#pz-replay' : '#pz-play').disabled = false; root.querySelector('#pz-whistle').disabled = true; } }
};
})();

/* Spielbericht-Trainer: Eingaben wie im elektronischen Spielbericht, Ablauf nach FIVB-Regeln. */
window.SCHIRI_SHEET = (function () {
'use strict';

const TEAMS = {
  H: { n: 'Heim', start: [7, 12, 3, 9, 1, 14] },
  G: { n: 'Gast', start: [5, 10, 2, 8, 11, 4] }
};
const OTHER = { H: 'G', G: 'H' };
const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const ACTS = [['pt', 'Punkt'], ['to', 'Auszeit'], ['sub', 'Wechsel'], ['sanc', 'Sanktion'], ['imp', 'Unzulässige Anfrage']];
const SANC = ['Verzögerungsverwarnung', 'Verzögerungsstrafe', 'Verwarnung', 'Bestrafung', 'Hinausstellung', 'Disqualifikation'];
/* Ablauf eines Satzausschnitts. Ballwechsel ohne w werden beim Start zufällig entschieden. */
const SCRIPT = [
  { k: 'lineup' },
  { k: 'rally' }, { k: 'rally' }, { k: 'rally', w: 'G' }, { k: 'rally' }, { k: 'rally' },
  { k: 'to', t: 'G' },
  { k: 'rally' }, { k: 'rally' },
  { k: 'sub', t: 'H', inn: 10, out: 3 },
  { k: 'rally' }, { k: 'rally' },
  { k: 'sub', t: 'H', inn: 11, out: 10 },
  { k: 'rally' }, { k: 'to', t: 'G' }, { k: 'rally' },
  { k: 'to', t: 'G' },
  { k: 'rally' },
  { k: 'delay', t: 'G' },
  { k: 'rally' },
  { k: 'sub', t: 'H', inn: 3, out: 10 },
  { k: 'rally' },
  { k: 'misc', t: 'H', p: 12 },
  { k: 'rally' }
];

let S = null, root = null;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pill = t => `<span class="r">${esc(t)}</span>`;
const nm = t => TEAMS[t].n;
const $ = s => root.querySelector(s);

function fresh() {
  const team = t => ({ slots: TEAMS[t].start.map(n => ({ st: n, sub: null, out: false, back: false })), rot: [0, 1, 2, 3, 4, 5], to: 0, subs: 0, pts: 0, delays: 0, imp: 0 });
  S = {
    T: { H: team('H'), G: team('G') }, srv: 'H',
    queue: SCRIPT.map(e => Object.assign({}, e, e.k === 'rally' && !e.w ? { w: Math.random() < 0.5 ? 'H' : 'G' } : {})),
    i: 0, step: 0, steps: null, checked: false, right: 0, total: 0, log: []
  };
}
const cur = (t, s) => { const sl = S.T[t].slots[s]; return sl.out && !sl.back ? sl.sub : sl.st; };
const srvNum = t => cur(t, S.T[t].rot[0]);
const pts = t => S.T[t].pts;
const courtOpts = () => ['H', 'G'].flatMap(t => S.T[t].rot.map(s => ({ v: t + cur(t, s), l: `${nm(t)} Nr. ${cur(t, s)}` })));
const opts = a => a.map(v => ({ v, l: v }));

function subCheck(t, inn, out) {
  const T = S.T[t];
  if (T.subs >= 6) return { ok: false, why: 'Alle 6 Wechsel sind verbraucht.' };
  const s = T.slots.findIndex((sl, i) => cur(t, i) === out);
  if (s < 0) return { ok: false, why: `Nr. ${out} ist gar nicht am Feld.` };
  const sl = T.slots[s];
  if (!sl.out) {
    const used = T.slots.some(x => x.sub === inn) || TEAMS[t].start.includes(inn);
    return used ? { ok: false, why: `Nr. ${inn} war in diesem Satz schon im Spiel.` } : { ok: true, slot: s, kind: 'in' };
  }
  if (!sl.back) return inn === sl.st ? { ok: true, slot: s, kind: 'back' } : { ok: false, why: `Nr. ${out} ist für Nr. ${sl.st} gekommen und darf nur von Nr. ${sl.st} ersetzt werden.` };
  return { ok: false, why: `Nr. ${out} hat das Feld schon einmal verlassen und ist zurückgekehrt.` };
}

function describe(ev) {
  if (ev.k === 'lineup') return `Vor dem Satz. Der Trainer von <b>Heim</b> hat die Aufstellung elektronisch übermittelt: <span class="ec-slip">${TEAMS.H.start.map((n, i) => `<span><i>${ROM[i]}</i>${n}</span>`).join('')}</span> Die App kennt sie schon. Du kontrollierst am Feld, ob die Spieler richtig stehen.`;
  if (ev.k === 'rally') return `<b>${nm(ev.w)}</b> gewinnt den Ballwechsel.`;
  if (ev.k === 'to') return `Der Trainer von <b>${nm(ev.t)}</b> zeigt das Zeichen für eine Auszeit.`;
  if (ev.k === 'sub') return `<b>${nm(ev.t)}</b>: Nr. ${ev.inn} betritt die Auswechselzone und will für Nr. ${ev.out} hinein.`;
  if (ev.k === 'delay') return `<b>${nm(ev.t)}</b> verzögert trotz Aufforderung die Wiederaufnahme des Spiels. Es ist die erste Verzögerung dieser Mannschaft im Spiel.`;
  if (ev.k === 'misc') return `Spieler Nr. ${ev.p} von <b>${nm(ev.t)}</b> ist gegenüber dem 1. SR unhöflich. Der 1. SR ahndet es. Es ist das erste Fehlverhalten dieser Art im Spiel.`;
  return '';
}

/* Jede Aufgabe besteht aus Schritten: entweder eine Taste der App (btn) oder Felder (fields). */
function stepsFor(ev) {
  if (ev.k === 'lineup') {
    const st = TEAMS.H.start;
    return [{ fields: [
      { label: 'Wer muss vorne links stehen (Position IV)?', type: 'num', ans: st[3] },
      { label: 'Wer muss hinten in der Mitte stehen (Position VI)?', type: 'num', ans: st[5] },
      { label: 'Heim hat den ersten Aufschlag. Wer schlägt auf?', type: 'num', ans: st[0] }],
      e: `Position I ist hinten rechts, von dort geht es gegen den Uhrzeigersinn weiter: II vorne rechts, III vorne Mitte, IV vorne links, V hinten links, VI hinten Mitte. Der erste Aufschläger ist der Spieler auf Position I. Stimmt das Feld nicht mit der Aufstellung überein, wird es vor dem Satz nach der Aufstellung korrigiert. ${pill('Regel 7.3.2, 7.3.5, 7.4, 27.2.1.2')}` }];
  }
  if (ev.k === 'rally') {
    const w = ev.w, s = S.srv;
    if (w === s) return [{ btn: w + ':pt', e: `Punkt für ${nm(w)}. ${nm(w)} hatte schon Aufschlag, also schlägt Nr. ${srvNum(w)} noch einmal auf. Keine Rotation. ${pill('Regel 6.1.3, 12.2.2.1, 27.2.2.1')}` }];
    const nextNum = cur(w, S.T[w].rot[1]);
    return [
      { btn: w + ':pt', e: `Punkt für ${nm(w)}, und ${nm(w)} bekommt den Aufschlag. ${pill('Regel 6.1.3, 27.2.2.1')}` },
      { fields: [{ label: 'Kontrolle am Feld: Wer muss jetzt aufschlagen?', type: 'select', opts: courtOpts(), ans: w + nextNum }],
        e: `${nm(w)} rotiert: Nr. ${nextNum} geht von Position II (vorne rechts) auf I und schlägt auf. Die App rotiert von selbst. Deine Aufgabe ist, die Anzeige mit dem Feld zu vergleichen und einen falschen Aufschläger nach dem Aufschlagschlag sofort zu melden. ${pill('Regel 12.2.2.2, 27.2.2.2')}` }];
  }
  if (ev.k === 'to') {
    const n = S.T[ev.t].to + 1;
    if (n <= 2) return [{ btn: ev.t + ':to', e: `Das ist die ${n}. Auszeit von ${nm(ev.t)} in diesem Satz. Die App speichert den Spielstand dazu selbst.${n === 2 ? ' Nach der 2. Auszeit informierst du den 2. SR, er meldet sie dem Trainer und dem 1. SR.' : ''} ${pill('Regel 15.1, 24.2.7, 27.2.2.3')}` }];
    return [{ btn: ev.t + ':imp', e: `Beide Auszeiten sind verbraucht. Die Anfrage wird zurückgewiesen und als unzulässige Anfrage erfasst. Die erste im Spiel hat keine weitere Folge, jede weitere derselben Mannschaft ist eine Verzögerung. ${pill('Regel 15.11.1.4, 15.11.2, 15.11.3, 27.2.2.4')}` }];
  }
  if (ev.k === 'sub') {
    const c = subCheck(ev.t, ev.inn, ev.out); ev.c = c;
    if (!c.ok) return [
      { btn: ev.t + ':sanc', e: `${c.why} Einen regelwidrigen Wechsel beantragen ist keine „unzulässige Anfrage“, sondern eine Verzögerung. Du erfasst also eine Sanktion. ${pill('Regel 15.6, 16.1.3')}` },
      sancStep(ev.t)];
    const n = S.T[ev.t].subs + 1;
    const q = c.kind === 'in'
      ? { label: `Wer darf in diesem Satz noch für Nr. ${ev.inn} hereinkommen?`, type: 'select', opts: opts([`Nur Nr. ${ev.out}`, 'Jeder Ersatzspieler', 'Niemand mehr']), ans: `Nur Nr. ${ev.out}` }
      : { label: `Darf Nr. ${ev.inn} in diesem Satz noch einmal regulär ausgewechselt werden?`, type: 'select', opts: opts(['Nein', 'Ja, noch einmal', 'Ja, beliebig oft']), ans: 'Nein' };
    return [
      { btn: ev.t + ':sub', e: `Der Wechsel ist erlaubt. Das ist der ${n}. Wechsel von ${nm(ev.t)}.${n >= 5 ? ' Ab dem 5. Wechsel informierst du den 2. SR, er meldet es dem Trainer.' : ''} ${pill('Regel 15.6, 24.2.7, 27.2.2.3')}` },
      { fields: [q], e: c.kind === 'in'
        ? `Ein Ersatzspieler kommt einmal pro Satz für einen Startspieler und kann nur von genau diesem Startspieler wieder ersetzt werden. ${pill('Regel 15.6.2')}`
        : `Ein Startspieler darf einmal pro Satz hinaus und einmal zurück, und zwar auf seine alte Position. Danach geht nur noch ein Ausnahmewechsel. ${pill('Regel 15.6.1, 15.7')}` }];
  }
  if (ev.k === 'delay') return [{ btn: ev.t + ':sanc', e: `Eine Verzögerung ist eine Mannschaftssanktion und wird immer erfasst. ${pill('Regel 16.1.2, 16.2.1.2')}` }, sancStep(ev.t)];
  if (ev.k === 'misc') return [
    { btn: ev.t + ':sanc', e: `Sanktionen für Fehlverhalten erfasst du ebenfalls über „Sanktion“. ${pill('Regel 27.2.2.6')}` },
    { fields: [{ label: 'Welche Sanktion?', type: 'select', opts: opts(SANC), ans: 'Bestrafung' }, { label: 'Für welchen Spieler?', type: 'num', ans: ev.p }],
      e: `Die erste Unhöflichkeit im Spiel wird mit einer Bestrafung (rote Karte) geahndet: Punkt und Aufschlag für den Gegner. Die App vergibt den Punkt nach dem Eintrag selbst. ${pill('Regel 21.2.1, 21.3.1')}` }];
  return [];
}
function sancStep(t) {
  const first = S.T[t].delays === 0;
  return { fields: [{ label: 'Welche Sanktion wählst du?', type: 'select', opts: opts(SANC), ans: first ? 'Verzögerungsverwarnung' : 'Verzögerungsstrafe' }],
    e: first ? `Die erste Verzögerung einer Mannschaft im Spiel ist eine Verzögerungsverwarnung (gelbe Karte ans Handgelenk). Sie hat keine weitere Folge und gilt für das ganze Spiel. ${pill('Regel 16.2')}`
      : `Jede weitere Verzögerung im selben Spiel ist eine Verzögerungsstrafe: Punkt und Aufschlag für den Gegner, den die App selbst vergibt. ${pill('Regel 16.2')}` };
}

function apply(ev) {
  const add = t => S.log.unshift(`${pts('H')}:${pts('G')} · ${t}`);
  if (ev.k === 'lineup') { add('Aufstellungen bestätigt'); return; }
  if (ev.k === 'rally') point(ev.w, add);
  else if (ev.k === 'to') {
    if (S.T[ev.t].to < 2) { S.T[ev.t].to++; add(`Auszeit ${nm(ev.t)} (${S.T[ev.t].to}.)`); }
    else { S.T[ev.t].imp++; add(`Unzulässige Anfrage ${nm(ev.t)}`); }
  } else if (ev.k === 'sub') {
    const c = ev.c;
    if (c.ok) {
      const sl = S.T[ev.t].slots[c.slot];
      if (c.kind === 'in') { sl.sub = ev.inn; sl.out = true; } else sl.back = true;
      S.T[ev.t].subs++;
      add(`Wechsel ${nm(ev.t)}: ${ev.inn} für ${ev.out} (${S.T[ev.t].subs}.)`);
    } else applyDelay(ev.t, add);
  } else if (ev.k === 'delay') applyDelay(ev.t, add);
  else if (ev.k === 'misc') {
    add(`Bestrafung ${nm(ev.t)} Nr. ${ev.p}`);
    point(OTHER[ev.t], add);
  }
}
/* Punkt vergeben; wer das Aufschlagrecht zurückgewinnt, rotiert */
function point(w, add) {
  S.T[w].pts++;
  if (w !== S.srv) { S.T[w].rot = S.T[w].rot.slice(1).concat(S.T[w].rot[0]); S.srv = w; }
  add(`Punkt ${nm(w)}, Aufschlag Nr. ${srvNum(w)}`);
}
function applyDelay(t, add) {
  const first = S.T[t].delays === 0;
  S.T[t].delays++;
  add(`${first ? 'Verzögerungsverwarnung' : 'Verzögerungsstrafe'} ${nm(t)}`);
  if (!first) point(OTHER[t], add);
}

/* ---------- Darstellung ---------- */
function teamPanel(t, st) {
  const T = S.T[t], hide = S.queue[S.i] && S.queue[S.i].k === 'lineup';
  const cell = p => { const n = cur(t, T.rot[p]); const srv = !hide && S.srv === t && p === 0; return `<span class="${srv ? 'srv' : ''}">${hide ? '?' : n}${srv ? '<i>Aufschlag</i>' : ''}</span>`; };
  const active = st && st.btn && !S.checked;
  return `<div class="ec-team"><div class="ec-th"><b>${nm(t)}</b><span class="ec-pts">${T.pts}</span></div>
    <div class="ec-court" aria-label="Feld ${nm(t)}, Netz oben"><span class="ec-net">Netz</span>${[3, 2, 1, 4, 5, 0].map(cell).join('')}</div>
    <p class="ec-meta"><span>Auszeiten <b>${T.to}</b>/2</span><span>Wechsel <b>${T.subs}</b>/6</span></p>
    <div class="ec-acts">${ACTS.map(([a, l]) => `<button type="button" class="ec-b" data-act="${t}:${a}"${active ? '' : ' disabled'}>${l}</button>`).join('')}</div></div>`;
}
function fieldHtml(f, k) {
  const id = 'sb-f' + k;
  const inp = f.type === 'select'
    ? `<select id="${id}"><option value="">Bitte wählen</option>${f.opts.map(o => `<option value="${esc(o.v)}">${esc(o.l)}</option>`).join('')}</select>`
    : `<input id="${id}" type="text" inputmode="numeric" autocomplete="off" placeholder="Nr.">`;
  return `<div class="sb-field" data-k="${k}"><label for="${id}">${f.label}</label>${inp}<span class="sb-res" aria-live="polite"></span></div>`;
}
const norm = v => String(v).trim().toLowerCase().replace(/\s+/g, '');
const logHtml = () => `<div class="ec-log"><p class="sheet-h">Ereignisliste der App</p>${S.log.length ? `<ol>${S.log.slice(0, 8).map(l => `<li>${esc(l)}</li>`).join('')}</ol>` : '<p class="muted small">Noch leer.</p>'}</div>`;

function render() {
  if (S.i >= S.queue.length) {
    root.innerHTML = `<div class="qsum"><p class="qsum-v">${S.right}<small>/${S.total}</small></p><div><p class="fb-h">Satzausschnitt fertig erfasst. Stand ${pts('H')}:${pts('G')}.</p>
      <p class="muted">Du hast Punkte, Auszeiten, Wechsel, eine unzulässige Anfrage und Sanktionen erfasst und die Aufschlagfolge kontrolliert. Jeder Durchgang entscheidet die Ballwechsel neu.</p>
      <button type="button" class="btn btn-primary" id="sb-restart">Neuer Durchgang</button></div></div>${logHtml()}`;
    $('#sb-restart').addEventListener('click', () => { fresh(); render(); });
    return;
  }
  const ev = S.queue[S.i];
  if (!S.steps) { S.steps = stepsFor(ev); S.step = 0; S.checked = false; }
  const st = S.steps[S.step];
  root.innerHTML = `
    <div class="ec-task">
      <p class="q-meta"><span>Ereignis ${S.i + 1} von ${S.queue.length}${S.steps.length > 1 ? ` · Schritt ${S.step + 1} von ${S.steps.length}` : ''}</span><span>${S.right}/${S.total} richtig</span></p>
      <p class="sb-ev">${describe(ev)}</p>
      ${st.btn ? '<p class="muted small ec-hint">Tippe unten in der App auf die passende Taste.</p>' : `<form class="sb-form" id="sb-form">${st.fields.map(fieldHtml).join('')}<button type="submit" class="btn btn-primary btn-s" id="sb-check">Prüfen</button></form>`}
      <div class="fb" id="sb-fb" hidden></div>
    </div>
    <div class="ec" role="group" aria-label="Elektronischer Spielbericht (Übung)">
      <div class="ec-bar"><span>Satz 1</span><span class="ec-score">${pts('H')} : ${pts('G')}</span><span>Aufschlag ${ev.k === 'lineup' ? 'Heim' : nm(S.srv) + ' Nr. ' + srvNum(S.srv)}</span></div>
      <div class="ec-teams">${teamPanel('H', st)}${teamPanel('G', st)}</div>
    </div>
    ${logHtml()}`;
  root.querySelectorAll('.ec-b').forEach(b => b.addEventListener('click', () => checkBtn(st, b)));
  const f = $('#sb-form');
  if (f) f.addEventListener('submit', e => { e.preventDefault(); checkFields(st); });
}
function feedback(ok, e) {
  S.total++; if (ok) S.right++;
  S.checked = true;
  const fb = $('#sb-fb');
  fb.hidden = false; fb.className = 'fb ' + (ok ? 'fb-ok' : 'fb-bad');
  fb.innerHTML = `<p class="fb-h">${ok ? 'Richtig.' : 'Nicht ganz.'}</p><p>${e}</p><div class="fb-row"><button type="button" class="btn btn-primary btn-s" id="sb-next">Weiter</button></div>`;
  $('#sb-next').addEventListener('click', next);
  $('#sb-next').focus();
}
function checkBtn(st, b) {
  if (S.checked) return;
  const ok = b.dataset.act === st.btn;
  root.querySelectorAll('.ec-b').forEach(x => { x.disabled = true; if (x.dataset.act === st.btn) x.classList.add('is-right'); });
  if (!ok) b.classList.add('is-wrong');
  const [t, a] = st.btn.split(':');
  feedback(ok, (ok ? '' : `Richtig wäre <b>${nm(t)} → ${ACTS.find(x => x[0] === a)[1]}</b>. `) + st.e);
}
function checkFields(st) {
  if (S.checked) return;
  let all = true;
  st.fields.forEach((f, k) => {
    const inp = $('#sb-f' + k), res = root.querySelector(`.sb-field[data-k="${k}"] .sb-res`);
    const ok = norm(inp.value) === norm(f.ans);
    if (!ok) all = false;
    inp.disabled = true;
    const shown = f.type === 'select' ? (f.opts.find(o => o.v === String(f.ans)) || { l: f.ans }).l : f.ans;
    res.className = 'sb-res ' + (ok ? 'ok' : 'bad');
    res.textContent = ok ? '✓' : '✕ richtig: ' + shown;
  });
  $('#sb-check').hidden = true;
  feedback(all, st.e);
}
function next() {
  if (S.step + 1 < S.steps.length) { S.step++; S.checked = false; }
  else { apply(S.queue[S.i]); S.i++; S.steps = null; }
  render();
}

return {
  mount(el) { root = el; if (!S) fresh(); render(); }
};
})();

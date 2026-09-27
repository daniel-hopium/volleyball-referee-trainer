/* Erklärgrafiken „Erlaubt vs. Fehler“ für die Kapitel. Schematisch, nicht maßstabsgetreu. */
window.SCHIRI_FIGS = (function () {
'use strict';

/* ---------- Bausteine ---------- */
function panel(svg, ok, cap) {
  return `<div class="cmp-item ${ok ? 'is-ok' : 'is-bad'}">${svg}<p class="cmp-tag">${ok ? '✓ Erlaubt' : '✕ Fehler'}</p><p class="cmp-cap">${cap}</p></div>`;
}
function figure(title, rule, body, note) {
  return `<figure class="cmp"><figcaption><b>${title}</b> <span class="r">Regel ${rule}</span></figcaption>${body}${note ? `<p class="cmp-note">${note}</p>` : ''}</figure>`;
}
const grid = items => `<div class="cmp-grid">${items.join('')}</div>`;
function arrow(x1, y1, x2, y2, cls = 'fg-arrow') {
  const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/><polygon points="0,0 -7,-4 -7,4" class="${cls}-h" transform="translate(${x2} ${y2}) rotate(${a})"/>`;
}
const ball = (x, y, r = 7) => `<g class="fg-ball"><circle cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r} ${y} Q${x} ${y - r * 0.6} ${x + r} ${y}"/></g>`;
const mark = (x, y) => `<g class="fg-mark"><circle cx="${x}" cy="${y}" r="7"/><path d="M${x - 3} ${y - 3} L${x + 3} ${y + 3} M${x + 3} ${y - 3} L${x - 3} ${y + 3}"/></g>`;
const svg = (w, h, inner, label) => `<svg viewBox="0 0 ${w} ${h}" class="fg" role="img" aria-label="${label}">${inner}</svg>`;

/* Seitenansicht: Netz links, eigenes Feld rechts */
const FLOOR = 155, NETX = 30, NETTOP = 40, ATT = 112;
function sideScene(extra) {
  return `<rect x="0" y="${FLOOR}" width="${NETX}" height="8" class="fg-court2"/>
    <rect x="${NETX}" y="${FLOOR}" width="${ATT - NETX}" height="8" class="fg-court2"/>
    <rect x="${ATT}" y="${FLOOR}" width="${220 - ATT}" height="8" class="fg-court"/>
    <rect x="${ATT - 2}" y="${FLOOR}" width="4" height="8" class="fg-white"/>
    <line x1="${NETX}" y1="${NETTOP}" x2="220" y2="${NETTOP}" class="fg-ref"/>
    <rect x="${NETX - 2}" y="${NETTOP}" width="4" height="46" class="fg-netside"/>
    <rect x="${NETX - 3}" y="${NETTOP - 2}" width="6" height="5" class="fg-white"/>
    <line x1="${NETX}" y1="${NETTOP + 46}" x2="${NETX}" y2="${FLOOR}" class="fg-post"/>
    <text x="216" y="${NETTOP - 5}" class="fg-t end">Netzoberkante</text>
    <text x="${(NETX + ATT) / 2}" y="173" class="fg-t mid">Vorderzone</text>
    <text x="${ATT}" y="173" class="fg-t mid">|</text>
    <text x="${(ATT + 220) / 2}" y="173" class="fg-t mid">Hinterzone</text>${extra}`;
}
/* Strichfigur von der Seite, Füße bei feetY */
function sfig(x, feetY, hands, cls = '', label = '') {
  const t = feetY - 82, sy = t + 22;
  return `<g class="fg-p ${cls}"><circle cx="${x}" cy="${t + 8}" r="7"/><line x1="${x}" y1="${t + 15}" x2="${x}" y2="${t + 50}"/><line x1="${x}" y1="${t + 50}" x2="${x - 8}" y2="${feetY}"/><line x1="${x}" y1="${t + 50}" x2="${x + 8}" y2="${feetY}"/>${hands.map(h => `<line x1="${x}" y1="${sy}" x2="${h[0]}" y2="${h[1]}"/>`).join('')}</g>${label ? `<text x="${x + 11}" y="${t + 6}" class="fg-t fg-lbl">${label}</text>` : ''}`;
}
const foot = (x, bad) => `<ellipse cx="${x}" cy="${FLOOR - 1.5}" rx="8" ry="2.6" class="fg-fp${bad ? ' bad' : ''}"/>`;
const jump = (x1, x2, y2) => `<path d="M${x1} ${FLOOR - 4} Q${(x1 + x2) / 2 + 6} ${y2 - 18} ${x2} ${y2}" class="fg-dash"/>`;

/* ---------- 1. Übertritt (interaktiv) ---------- */
function uebertritt(el) {
  const id = 'rng-uebertritt';
  el.innerHTML = figure('Übertritt unter dem Netz: Wann ist der Fuß „drüben“?', '11.2.2, 11.4.3', `
    <div class="fg-live">
      <svg viewBox="0 0 360 150" class="fg fg-wide" role="img" aria-label="Draufsicht auf die Mittellinie mit verschiebbarem Fuß">
        <rect x="0" y="0" width="172" height="150" class="fg-court"/>
        <rect x="188" y="0" width="172" height="150" class="fg-court2"/>
        <rect x="172" y="0" width="16" height="150" class="fg-white"/>
        <line x1="180" y1="0" x2="180" y2="150" class="fg-netline"/>
        <text x="86" y="18" class="fg-t mid on-dark">eigenes Feld</text>
        <text x="274" y="18" class="fg-t mid on-dark">gegnerisches Feld</text>
        <text x="180" y="143" class="fg-t mid on-light">Mittellinie</text>
        <g id="ue-foot"><path d="M10 0 H70 Q94 0 94 17 Q94 34 70 34 H10 Q0 34 0 17 Q0 0 10 0Z" class="fg-shoe"/><text x="12" y="21" class="fg-t on-dark">Ferse</text><text x="62" y="21" class="fg-t on-dark">Zehen</text></g>
      </svg>
      <label class="fg-range" for="${id}">Fuß verschieben <input type="range" id="${id}" min="30" max="240" value="120"></label>
      <div class="fg-verdict" aria-live="polite"></div>
    </div>`,
    'Der Fuß darf ins gegnerische Feld, solange ein Teil von ihm die Mittellinie berührt oder direkt über ihr ist (z. B. die Ferse in der Luft). Hände, Knie oder andere Körperteile dürfen das gegnerische Feld berühren, wenn sie den Gegner nicht behindern. Nach dem Pfiff darf man das gegnerische Feld betreten.');
  const r = el.querySelector('input'), f = el.querySelector('#ue-foot'), v = el.querySelector('.fg-verdict');
  const upd = () => {
    const x = +r.value, right = x + 94;
    f.setAttribute('transform', `translate(${x} 58)`);
    let ok, t;
    if (right <= 172) { ok = true; t = 'Fuß komplett im eigenen Feld. Kein Thema.'; }
    else if (x < 188) { ok = true; t = 'Ein Teil des Fußes ist noch auf der Mittellinie: erlaubt, solange der Gegner nicht behindert wird.'; }
    else { ok = false; t = 'Der ganze Fuß ist im gegnerischen Feld: Fehler, auch wenn niemand behindert wird. Der 2. SR pfeift und zeigt auf die Mittellinie.'; }
    f.classList.toggle('bad', !ok);
    v.className = 'fg-verdict ' + (ok ? 'is-ok' : 'is-bad');
    v.innerHTML = `<b>${ok ? '✓ Erlaubt' : '✕ Fehler'}</b> ${t}`;
  };
  r.addEventListener('input', upd);
  upd();
}

/* ---------- 2. Ball in/aus (interaktiv) ---------- */
function ballInOut(el) {
  const id = 'rng-ballinout';
  el.innerHTML = figure('Ball auf der Linie: Was zählt?', '8.3, 8.4.1', `
    <div class="fg-live">
      <svg viewBox="0 0 360 150" class="fg fg-wide" role="img" aria-label="Draufsicht auf eine Seitenlinie mit verschiebbarem Ball">
        <rect x="0" y="0" width="196" height="150" class="fg-court"/>
        <rect x="196" y="0" width="164" height="150" class="fg-free"/>
        <rect x="180" y="0" width="16" height="150" class="fg-white"/>
        <text x="90" y="18" class="fg-t mid on-dark">Spielfeld</text>
        <text x="280" y="18" class="fg-t mid on-dark">außerhalb</text>
        <text x="188" y="143" class="fg-t mid on-light">Linie</text>
        <g id="bio-ball"><circle r="34" class="fg-shadow"/><ellipse rx="12" ry="12" class="fg-patch"/></g>
      </svg>
      <label class="fg-range" for="${id}">Ball verschieben <input type="range" id="${id}" min="120" max="300" value="222"></label>
      <p class="fg-legend"><span class="lg lg-shadow"></span> Umriss des Balles von oben <span class="lg lg-patch"></span> Aufsetzfläche am Boden</p>
      <div class="fg-verdict" aria-live="polite"></div>
    </div>`,
    'Entscheidend ist nur, ob die Aufsetzfläche das Feld oder die Linie berührt. Dass der Ball von oben gesehen über der Linie „hängt“, zählt nicht. Die Linien gehören zum Feld.');
  const r = el.querySelector('input'), b = el.querySelector('#bio-ball'), v = el.querySelector('.fg-verdict');
  const upd = () => {
    const x = +r.value, inn = x - 12 <= 196;
    b.setAttribute('transform', `translate(${x} 75)`);
    b.classList.toggle('bad', !inn);
    v.className = 'fg-verdict ' + (inn ? 'is-ok' : 'is-bad');
    v.innerHTML = inn
      ? `<b>✓ In</b> ${x + 12 <= 196 ? 'Die Aufsetzfläche liegt im Feld.' : 'Die Aufsetzfläche berührt die Linie. Ein kleinster Teil reicht.'} Zeichen: Arm und Finger zum Boden.`
      : `<b>✕ Aus</b> ${x - 34 <= 196 ? 'Der Umriss ragt zwar über die Linie, die Aufsetzfläche liegt aber ganz außerhalb.' : 'Der Ball landet klar außerhalb.'} Zeichen: Unterarme senkrecht, Handflächen zum Körper.`;
  };
  r.addEventListener('input', upd);
  upd();
}

/* ---------- 3. Überquerungsraum ---------- */
function crossing(el) {
  const s = svg(360, 230, `
    <rect x="70" y="0" width="220" height="110" class="fg-okzone"/>
    <rect x="0" y="0" width="70" height="150" class="fg-badzone"/><rect x="290" y="0" width="70" height="150" class="fg-badzone"/>
    <rect x="50" y="150" width="260" height="65" class="fg-lowzone"/>
    <line x1="0" y1="215" x2="360" y2="215" class="fg-floor"/>
    <line x1="40" y1="100" x2="40" y2="215" class="fg-post"/><line x1="320" y1="100" x2="320" y2="215" class="fg-post"/>
    ${netFront(50, 310, 110, 40)}
    ${antenna(70, 78, 150)}${antenna(290, 78, 150)}
    <text x="180" y="24" class="fg-t mid">Überquerungsraum</text>
    <text x="35" y="20" class="fg-t mid">außen</text><text x="325" y="20" class="fg-t mid">außen</text>
    <text x="180" y="200" class="fg-t mid">unterer Raum</text>
    ${ball(150, 72, 10)}<text x="150" y="76" class="fg-num">1</text>
    ${ball(70, 88, 10)}<text x="70" y="92" class="fg-num">2</text>
    ${ball(28, 95, 10)}<text x="28" y="99" class="fg-num">3</text>
    ${ball(240, 182, 10)}<text x="240" y="186" class="fg-num">4</text>
    ${ball(214, 102, 10)}<text x="214" y="106" class="fg-num">5</text>`, 'Netz von vorn mit Überquerungsraum, Außenraum und unterem Raum');
  const li = (n, ok, t) => `<li><span class="fg-n">${n}</span><span class="cmp-tag ${ok ? 'is-ok' : 'is-bad'}">${ok ? '✓' : '✕'}</span> ${t}</li>`;
  el.innerHTML = figure('Wo darf der Ball über das Netz?', '10.1, 10.2, 8.4', `
    <div class="fg-side">${s}<ol class="fg-list">
      ${li(1, true, 'Durch den Überquerungsraum zwischen den Antennen: korrekt.')}
      ${li(5, true, 'Streift beim Überqueren die Netzkante: korrekt, auch beim Aufschlag.')}
      ${li(2, false, 'Berührt die Antenne: aus. Die Antenne gehört zum Netz.')}
      ${li(3, false, 'Außerhalb der Antenne: aus. Neu seit 2025: nach der 2. oder 3. Berührung sofort. Nur nach der 1. Berührung darf man ihn aus der gegnerischen Freizone zurückholen, wieder außen herum.')}
      ${li(4, false, 'Komplett unter dem Netz durch: aus. Bis er die Netzebene ganz überquert hat, ist er noch im Spiel.')}
    </ol></div>`);
}
function netFront(x1, x2, top, h) {
  let m = '';
  for (let x = x1 + 10; x < x2; x += 10) m += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + h}" class="fg-mesh"/>`;
  for (let y = top + 10; y < top + h; y += 10) m += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="fg-mesh"/>`;
  return `<rect x="${x1}" y="${top}" width="${x2 - x1}" height="${h}" class="fg-netbg"/>${m}<rect x="${x1}" y="${top - 2}" width="${x2 - x1}" height="6" class="fg-tape"/>`;
}
const antenna = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="fg-ant-w"/><line x1="${x}" y1="${y1}" x2="${x}" y2="${y1 + 32}" class="fg-ant-r"/>`;

/* ---------- 4. Hinterspieler-Angriff ---------- */
function backrow(el) {
  const a = svg(220, 178, sideScene(`${foot(142)}${jump(142, 93, 118)}${sfig(85, 118, [[46, 30], [98, 70]])}${ball(42, 26)}`), 'Hinterspieler springt hinter der Angriffslinie ab');
  const b = svg(220, 178, sideScene(`${foot(ATT, true)}${jump(ATT, 90, 118)}${sfig(82, 118, [[46, 30], [95, 70]])}${ball(42, 26)}${mark(ATT, FLOOR - 14)}`), 'Hinterspieler berührt beim Absprung die Angriffslinie');
  const c = svg(220, 178, sideScene(`${foot(74)}${sfig(66, 140, [[46, 50], [78, 92]])}${ball(40, 45)}`), 'Hinterspieler in der Vorderzone, Ball teilweise unter der Netzoberkante');
  el.innerHTML = figure('Angriff eines Hinterspielers', '13.2.2, 13.2.3, 13.3.3', grid([
    panel(a, true, 'Absprung hinter der Angriffslinie, Ball über Netzhöhe. Landen in der Vorderzone ist erlaubt.'),
    panel(b, false, 'Beim Absprung berührt der Fuß die Angriffslinie, der Ball ist ganz über der Netzoberkante.'),
    panel(c, true, 'In der Vorderzone, aber der Ball ist beim Schlag teilweise unter der Netzoberkante.')
  ]), 'Entscheidend sind zwei Dinge: wo der Absprung war und wie hoch der Ball beim Kontakt ist. Der Landeort spielt keine Rolle.');
}

/* ---------- 5. Libero-Zuspiel ---------- */
function libero(el) {
  const a = svg(220, 178, sideScene(`${sfig(98, FLOOR, [[92, 70], [104, 70]], 'lib', 'L')}${arrow(96, 66, 50, 30)}${jump(60, 60, 118)}${sfig(60, 118, [[44, 27], [70, 70]])}${ball(42, 24)}`), 'Libero spielt in der Vorderzone oberes Zuspiel');
  const b = svg(220, 178, sideScene(`${sfig(160, FLOOR, [[154, 70], [166, 70]], 'lib', 'L')}${arrow(156, 66, 52, 28)}${sfig(60, 118, [[44, 27], [70, 70]])}${ball(42, 24)}`), 'Libero spielt hinter der Angriffslinie oberes Zuspiel');
  el.innerHTML = figure('Oberes Zuspiel des Libero', '19.3.1.4, 13.3.6', grid([
    panel(a, false, 'Libero pritscht in seiner Vorderzone, der Mitspieler greift den Ball ganz über Netzhöhe an.'),
    panel(b, true, 'Libero pritscht hinter der Angriffslinie. Der Angriff über Netzhöhe ist frei.')
  ]), 'Baggert der Libero in der Vorderzone, gilt die Einschränkung nicht, sie betrifft nur das obere Zuspiel mit den Fingern. Greift der Mitspieler den Ball unter Netzhöhe an, ist es ebenfalls erlaubt.');
}

/* ---------- 6. Übergreifen beim Block ---------- */
function reach(el) {
  const scene = extra => `<rect x="0" y="${FLOOR}" width="220" height="8" class="fg-court"/><rect x="108" y="${NETTOP}" width="4" height="46" class="fg-netside"/><rect x="107" y="${NETTOP - 2}" width="6" height="5" class="fg-white"/><line x1="110" y1="${NETTOP + 46}" x2="110" y2="${FLOOR}" class="fg-post"/>
    <text x="55" y="173" class="fg-t mid">eigenes Feld</text><text x="165" y="173" class="fg-t mid">Gegner</text>${extra}`;
  const a = svg(220, 178, scene(`${sfig(94, 124, [[120, 33], [116, 36]])}${sfig(170, FLOOR, [[164, 70], [176, 70]], 'opp')}${arrow(168, 64, 132, 32, 'fg-arrow-soft')}${ball(126, 30)}${mark(126, 14)}`), 'Blocker greift über und berührt das gegnerische Zuspiel');
  const b = svg(220, 178, scene(`${sfig(94, 124, [[118, 33], [114, 36]])}${sfig(150, 120, [[132, 26], [160, 64]], 'opp')}${arrow(134, 30, 124, 32)}${ball(122, 32)}`), 'Blocker berührt den Ball nach dem gegnerischen Angriffsschlag');
  el.innerHTML = figure('Über das Netz greifen beim Block', '11.1.1, 14.3, 14.6.1', grid([
    panel(a, false, 'Der Gegner stellt gerade zu, sein Angreifer hat noch nicht geschlagen. Der Blocker greift hinüber und berührt den Ball.'),
    panel(b, true, 'Der Gegner hat den Angriffsschlag ausgeführt. Jetzt darf der Block den Ball auch jenseits des Netzes berühren.')
  ]), 'Faustregel: Über das Netz greifen ist beim Block erlaubt, den Gegner vor oder während seines Angriffsschlags zu stören nicht. Ein Zuspiel, das von selbst über das Netz fliegt, darf man dagegen blocken.');
}

/* ---------- 7. Netzberührung ---------- */
function nettouch(el) {
  const front = extra => `${netFront(20, 180, 40, 40)}${antenna(40, 14, 80)}${antenna(160, 14, 80)}<line x1="0" y1="145" x2="200" y2="145" class="fg-floor"/>${extra}`;
  const ffig = (x, hands) => `<g class="fg-p"><circle cx="${x}" cy="94" r="7"/><line x1="${x}" y1="101" x2="${x}" y2="124"/><line x1="${x}" y1="124" x2="${x - 7}" y2="143"/><line x1="${x}" y1="124" x2="${x + 7}" y2="143"/>${hands.map(h => `<line x1="${x}" y1="106" x2="${h[0]}" y2="${h[1]}"/>`).join('')}</g>`;
  const a = svg(200, 150, front(`${ffig(100, [[90, 44], [110, 60]])}${mark(90, 44)}`), 'Spieler berührt das Netz zwischen den Antennen');
  const b = svg(200, 150, front(`${ffig(26, [[26, 58], [38, 118]])}${mark(26, 58)}`), 'Spieler berührt das Netz außerhalb der Antenne');
  const c = svg(200, 150, `<line x1="0" y1="145" x2="200" y2="145" class="fg-floor"/><path d="M100 30 Q128 62 100 94" class="fg-netcurve"/><rect x="97" y="26" width="6" height="5" class="fg-white"/><line x1="100" y1="94" x2="100" y2="145" class="fg-post"/>${arrow(40, 62, 100, 62)}${ball(110, 62)}<g class="fg-p opp"><circle cx="150" cy="70" r="7"/><line x1="150" y1="77" x2="150" y2="112"/><line x1="150" y1="112" x2="143" y2="143"/><line x1="150" y1="112" x2="157" y2="143"/><line x1="150" y1="84" x2="124" y2="66"/></g>
    <text x="50" y="135" class="fg-t mid">Seitenansicht</text>`, 'Ball drückt das Netz gegen einen Gegenspieler');
  el.innerHTML = figure('Netzberührung', '11.3, 11.4.4', grid([
    panel(a, false, 'Berührung zwischen den Antennen während der Aktion des Ballspielens (Absprung, Schlag, Landung).'),
    panel(b, true, 'Berührung außerhalb der Antenne, ohne das Spiel zu beeinflussen.'),
    panel(c, true, 'Der Ball wird ins Netz geschlagen und drückt es gegen den Gegner. Das ist kein Fehler des Gegners.')
  ]), 'Auch ein Fehler: sich am Netz festhalten oder abstützen, oder durch die Berührung einen Vorteil bekommen. Wer gar nicht am Ball beteiligt ist und das Netz streift, macht keinen Fehler, solange er das Spiel nicht beeinflusst.');
}

/* ---------- 8. Fußfehler beim Aufschlag ---------- */
function servefoot(el) {
  const scene = extra => `<rect x="20" y="0" width="160" height="84" class="fg-court"/><rect x="0" y="0" width="20" height="160" class="fg-free"/><rect x="180" y="0" width="20" height="160" class="fg-free"/><rect x="20" y="84" width="160" height="76" class="fg-free"/>
    <rect x="20" y="78" width="160" height="6" class="fg-white"/><line x1="20" y1="0" x2="20" y2="84" class="fg-wline"/><line x1="180" y1="0" x2="180" y2="84" class="fg-wline"/>
    <line x1="20" y1="90" x2="20" y2="100" class="fg-wline"/><line x1="180" y1="90" x2="180" y2="100" class="fg-wline"/>
    <line x1="20" y1="100" x2="20" y2="160" class="fg-zone"/><line x1="180" y1="100" x2="180" y2="160" class="fg-zone"/>
    <text x="100" y="70" class="fg-t mid on-dark">Spielfeld</text><text x="100" y="152" class="fg-t mid on-dark">Aufschlagzone</text>${extra}`;
  const shoes = (x, y, bad) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="12" class="fg-shoe${bad ? ' bad' : ''}"/><ellipse cx="${x + 18}" cy="${y + 6}" rx="6" ry="12" class="fg-shoe"/>`;
  el.innerHTML = figure('Fußfehler beim Aufschlag', '12.4.3', grid([
    panel(svg(200, 160, scene(shoes(88, 112)), 'Aufschläger steht hinter der Grundlinie'), true, 'Beim Schlag bzw. Absprung ganz hinter der Grundlinie und innerhalb der Zone.'),
    panel(svg(200, 160, scene(shoes(88, 90, true) + mark(70, 80)), 'Aufschläger berührt die Grundlinie'), false, 'Der Fuß berührt beim Schlag oder Absprung die Grundlinie.'),
    panel(svg(200, 160, scene(`<ellipse cx="8" cy="118" rx="6" ry="12" class="fg-shoe bad"/>${mark(8, 100)}`), 'Aufschläger steht seitlich außerhalb der Aufschlagzone'), false, 'Außerhalb der seitlichen Verlängerung der Seitenlinie.')
  ]), 'Nach dem Schlag darf der Aufschläger ins Feld laufen oder dort landen. Beim Sprungaufschlag zählt der Absprung, nicht die Landung. Der Linienrichter zeigt den Fußfehler an.');
}

/* ---------- 9. Sichtblock ---------- */
function screen(el) {
  const scene = (extra, bad) => `<rect x="0" y="20" width="200" height="130" class="fg-court"/><rect x="0" y="150" width="200" height="30" class="fg-free"/><rect x="0" y="148" width="200" height="4" class="fg-white"/>
    <line x1="0" y1="20" x2="200" y2="20" class="fg-netline"/>
    <circle cx="100" cy="8" r="7" class="fg-rec"/><text x="112" y="12" class="fg-t">Annahme</text>
    <line x1="100" y1="15" x2="130" y2="164" class="${bad ? 'fg-sight-bad' : 'fg-sight-ok'}"/>
    <circle cx="130" cy="166" r="8" class="fg-srv"/><text x="146" y="170" class="fg-t on-dark">Aufschläger</text>${extra}`;
  const mate = (x, y, up) => `<circle cx="${x}" cy="${y}" r="9" class="fg-mate"/>${up ? `<line x1="${x - 5}" y1="${y - 8}" x2="${x - 7}" y2="${y - 17}" class="fg-armup"/><line x1="${x + 5}" y1="${y - 8}" x2="${x + 7}" y2="${y - 17}" class="fg-armup"/>` : ''}`;
  el.innerHTML = figure('Sichtblock', '12.5', grid([
    panel(svg(200, 180, scene(mate(108, 96, true) + mate(126, 94, true) + mate(117, 80, true), true), 'Gruppe mit erhobenen Armen verdeckt den Aufschläger'), false, 'Die Mitspieler stehen gruppiert mit erhobenen Armen genau in der Sichtlinie. Die Annahme sieht weder Schlag noch Flugbahn.'),
    panel(svg(200, 180, scene(mate(55, 90) + mate(165, 96) + mate(80, 58), false), 'Mitspieler stehen verteilt, Sicht ist frei'), true, 'Die Mitspieler stehen verteilt, die Sicht auf Schlag und Flugbahn ist frei.')
  ]), 'Ein Sichtblock liegt nur vor, wenn Aufschlagschlag und Flugbahn beide verdeckt sind. Unabhängig davon dürfen Spieler der aufschlagenden Mannschaft während des Aufschlags die Hände nicht über den Kopf heben.');
}

return { figUebertritt: uebertritt, figBall: ballInOut, figCrossing: crossing, figBackrow: backrow, figLibero: libero, figReach: reach, figNet: nettouch, figServeFoot: servefoot, figScreen: screen };
})();

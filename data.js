/* Lerninhalte für den Schiri-Trainer. Grundlage: FIVB Official Volleyball Rules 2025–2028. */
window.SCHIRI_DATA = (function () {

const CH = [
{
  k: 'feld', t: 'Spielfeld & Ausrüstung', s: 'Maße, Zonen, Netz, Antennen, Ball',
  html: `
<p>Tipp auf eine Zone im Plan, um zu sehen, was dort gilt. Die Maße kommen in fast jedem Regeltest vor.</p>
<div data-widget="court"></div>
<h3>Spielfeld und Linien</h3>
<ul>
<li>Spielfeld <b>18 × 9 m</b>, rundherum eine <b>Freizone von mindestens 3 m</b> (bei FIVB-Bewerben 5 m seitlich, 6,5 m hinter den Grundlinien). Freier Spielraum darüber mindestens 7 m hoch. <span class="r">1.1</span></li>
<li>Alle Linien sind <b>5 cm</b> breit und gehören zum Feld: Seiten- und Grundlinien liegen innerhalb der 18 × 9 m. <span class="r">1.3.1–1.3.2</span></li>
<li>Die <b>Mittellinie</b> teilt das Feld in zwei 9 × 9 m-Hälften. Ihre ganze Breite gehört <b>beiden</b> Feldern. <span class="r">1.3.3</span></li>
<li>Die <b>Angriffslinie</b>: Hinterkante 3 m von der Achse der Mittellinie. Sie begrenzt die <b>Vorderzone</b>, die seitlich bis zum Ende der Freizone verlängert gilt. <span class="r">1.3.4, 1.4.1</span></li>
<li><b>Aufschlagzone</b>: 9 m breit hinter jeder Grundlinie, seitlich durch zwei 15 cm lange Striche 20 cm hinter der Grundlinie begrenzt, in der Tiefe bis zum Ende der Freizone. <span class="r">1.4.2</span></li>
<li><b>Auswechselzone</b>: zwischen den Verlängerungen der beiden Angriffslinien bis zum Schreibertisch. <b>Libero-Austauschzone</b>: Freizone auf der Bankseite zwischen Verlängerung der Angriffslinie und Grundlinie. <span class="r">1.4.3–1.4.4</span></li>
<li>Mindesttemperatur 10 °C, Beleuchtung mindestens 300 Lux. <span class="r">1.5–1.6</span></li>
</ul>
<h3>Netz, Antennen, Pfosten</h3>
<ul>
<li>Netzhöhe <b>2,43 m Männer</b>, <b>2,24 m Frauen</b>, gemessen in der Feldmitte. Über beiden Seitenlinien gleich hoch und höchstens 2 cm über der offiziellen Höhe. <span class="r">2.1</span></li>
<li>Netz 1 m breit, 9,50–10 m lang, 10 cm-Maschen, oben ein 7 cm breites Band. <span class="r">2.2</span></li>
<li><b>Seitenbänder</b>: 5 cm × 1 m, senkrecht über den Seitenlinien, gehören zum Netz. <span class="r">2.3</span></li>
<li><b>Antennen</b>: 1,80 m lang, 10 mm dick, an der Außenkante der Seitenbänder, ragen <b>80 cm</b> über das Netz, rot-weiß in 10 cm-Streifen. Sie gehören zum Netz und begrenzen seitlich den Überquerungsraum. <span class="r">2.4</span></li>
<li>Pfosten 0,50–1 m außerhalb der Seitenlinien, 2,55 m hoch, rund, ohne Spannseile. <span class="r">2.5</span></li>
</ul>
<h3>Ball</h3>
<ul>
<li>Umfang <b>65–67 cm</b>, Gewicht <b>260–280 g</b>, Innendruck <b>0,30–0,325 kg/cm²</b>. Alle Bälle eines Spiels müssen gleich sein. <span class="r">3.1–3.2</span></li>
</ul>
<div class="merke"><b>Merke</b> Linie ist drin. Antenne ist Netz. Die Mittellinie gehört beiden Mannschaften.</div>`
},
{
  k: 'team', t: 'Mannschaft & Spielablauf', s: 'Spieler, Kapitän, Trainer, Punkte, Sätze',
  html: `
<h3>Wer gehört zur Mannschaft?</h3>
<ul>
<li>Bis zu <b>12 Spieler</b> (bei FIVB-Seniorenbewerben bis 14), dazu Trainer, höchstens zwei Co-Trainer, ein Therapeut und ein Arzt. <span class="r">4.1.1</span></li>
<li>Nur wer im Spielbericht steht, darf spielen. Haben Trainer und Kapitän unterschrieben, sind die Spieler fix. <span class="r">4.1.3</span></li>
<li>Einheitliche Kleidung (außer Libero), Nummern <b>1–20</b>, auf der Brust mindestens 15 cm, am Rücken 20 cm hoch. Der Kapitän trägt einen Streifen <b>8 × 2 cm</b> unter der Brustnummer. <span class="r">4.3</span></li>
<li>Der 1. SR kann erlauben: barfuß spielen, nasse Trikots zwischen den Sätzen tauschen (gleiche Farbe und Nummer), Trainingsanzüge bei Kälte. Gegenstände, die verletzen können, sind verboten; Brillen auf eigenes Risiko. <span class="r">4.4–4.5</span></li>
</ul>
<h3>Kapitän und Trainer</h3>
<ul>
<li><b>Vor dem Spiel</b> macht der Kapitän die Auslosung und unterschreibt den Spielbericht. <span class="r">5.1.1</span></li>
<li><b>Während des Spiels</b> ist er Spielkapitän. Ist er nicht am Feld, bestimmt Trainer oder Kapitän einen anderen Spielkapitän. <span class="r">5.1.2</span></li>
<li>Nur der <b>Spielkapitän</b> darf bei totem Ball mit den Schiedsrichtern sprechen: Regelerklärung verlangen, Protest vorbehalten, Ausrüstungswechsel, Positionskontrolle, Boden, Netz oder Ball prüfen lassen. <span class="r">5.1.2.1–5.1.2.2</span></li>
<li><b>Nach dem Spiel</b> dankt er den Schiedsrichtern, unterschreibt und trägt einen vorher angekündigten Protest ein. <span class="r">5.1.3</span></li>
<li>Der <b>Trainer</b> gibt vor jedem Satz die Aufstellung ab, beantragt Auszeiten und Wechsel. Ansprechpartner ist der <b>2. SR</b>. Er darf in der Freizone vor seiner Bank stehen und gehen, von der Verlängerung der Angriffslinie bis zum Aufwärmbereich. <span class="r">5.2</span></li>
</ul>
<h3>Punkt, Satz, Spiel</h3>
<ul>
<li>Punkt: Ball landet im gegnerischen Feld, Gegner macht einen Fehler oder bekommt eine Strafe. <span class="r">6.1.1</span></li>
<li>Mehrere Fehler <b>nacheinander</b>: nur der erste zählt. Fehler beider Mannschaften <b>gleichzeitig</b>: <b>Doppelfehler</b>, der Ballwechsel wird wiederholt. <span class="r">6.1.2</span></li>
<li>Satz: <b>25 Punkte mit 2 Punkten Vorsprung</b>, ohne Obergrenze (26:24, 27:25 …). <span class="r">6.2</span></li>
<li>Spiel: <b>3 Gewinnsätze</b>. Bei 2:2 geht der Entscheidungssatz auf <b>15</b> mit 2 Punkten Vorsprung. <span class="r">6.3</span></li>
<li>Nichtantreten: 0:3, jeder Satz 0:25. Eine unvollständige Mannschaft verliert Satz oder Spiel, behält aber ihre Punkte. <span class="r">6.4</span></li>
</ul>
<h3>Vor dem Spiel und zwischen den Sätzen</h3>
<ul>
<li><b>Auslosung</b> in Anwesenheit beider Kapitäne, vor dem Spiel und erneut vor dem 5. Satz. Der Gewinner wählt <b>entweder</b> Aufschlag/Annahme <b>oder</b> Seite, der Verlierer bekommt das andere. <span class="r">7.1</span></li>
<li><b>Einspielen am Netz</b>: 6 Minuten gemeinsam, wenn die Teams vorher ein eigenes Feld hatten, sonst 10 Minuten. Getrennt: je 3 bzw. 5 Minuten; wer zuerst aufschlägt, beginnt. <span class="r">7.2</span></li>
<li>Satz 2–4 beginnt die Mannschaft mit Aufschlag, die im vorigen Satz <b>nicht</b> zuerst aufgeschlagen hat. <span class="r">12.1.2</span></li>
<li><b>Satzpausen</b>: 3 Minuten, zwischen 2. und 3. Satz auf Antrag bis 10 Minuten. <span class="r">18.1</span></li>
<li><b>Seitenwechsel</b> nach jedem Satz. Im Entscheidungssatz, sobald die führende Mannschaft <b>8 Punkte</b> hat; die Positionen bleiben gleich. Vergessen? Wechsel sofort nachholen, der Spielstand bleibt. <span class="r">18.2</span></li>
</ul>
<div class="merke"><b>Merke</b> Mit den Schiedsrichtern spricht nur der Spielkapitän, Anträge stellt der Trainer beim 2. SR.</div>`
},
{
  k: 'rotation', t: 'Aufstellung & Rotation', s: 'Positionen, Positions- und Rotationsfehler',
  html: `
<div class="neu"><span class="tag">Neu seit 2025</span> Nur die <b>annehmende</b> Mannschaft muss beim Aufschlagschlag in ihrer Rotationsordnung stehen. Die <b>aufschlagende</b> Mannschaft darf jede Position einnehmen, ihre Spieler müssen aber (außer dem Aufschläger) im eigenen Feld stehen. <span class="r">7.4</span></div>
<div data-widget="positions"></div>
<h3>Positionen</h3>
<ul>
<li>Sechs Spieler pro Mannschaft. Die Aufstellung vor jedem Satz legt die Rotationsordnung für den ganzen Satz fest. <span class="r">7.3.1</span></li>
<li>Vorderspieler: <b>IV</b> vorne links, <b>III</b> vorne Mitte, <b>II</b> vorne rechts. Hinterspieler: <b>V</b> hinten links, <b>VI</b> hinten Mitte, <b>I</b> hinten rechts. Der Spieler auf <b>I</b> schlägt auf. <span class="r">7.4.1</span></li>
<li>Jeder Hinterspieler steht weiter von der Mittellinie weg als <b>sein</b> Vorderspieler: V hinter IV, VI hinter III, I hinter II. <span class="r">7.4.2.1</span></li>
<li>In jeder Reihe gilt links-Mitte-rechts: IV links von III links von II, V links von VI links von I. <span class="r">7.4.2.2</span></li>
<li>Diagonale Paare wie IV und I oder II und V werden <b>nicht</b> verglichen.</li>
</ul>
<h3>Was genau zählt?</h3>
<ul>
<li>Entscheidend ist der <b>Bodenkontakt der Füße</b>. Der letzte Bodenkontakt legt die Position fest. <span class="r">7.4.3</span></li>
<li>Der Hinterspieler muss mit mindestens einem Teil eines Fußes gleich weit oder weiter von der Mittellinie entfernt sein als der <b>vordere Fuß</b> seines Vorderspielers. Seitlich gilt dasselbe zur jeweiligen Seitenlinie. Gleichauf ist erlaubt. <span class="r">7.4.3.1–7.4.3.2</span></li>
<li>Nach dem Aufschlagschlag dürfen sich alle frei bewegen. <span class="r">7.4.4</span></li>
</ul>
<h3>Positionsfehler</h3>
<ul>
<li>Steht ein Spieler der annehmenden Mannschaft beim Aufschlagschlag falsch: <b>Punkt und Aufschlag für den Gegner</b>, Positionen werden korrigiert. <span class="r">7.5.4</span></li>
<li>Macht der Aufschläger <b>beim Schlag</b> einen Fehler (z. B. Fußfehler) und der Gegner steht falsch, zählt der <b>Aufschlagfehler</b>. <span class="r">7.5.2, 12.7.1</span></li>
<li>Ist der Aufschlag korrekt und wird <b>danach</b> fehlerhaft (Aus, Sichtblock), zählt der <b>Positionsfehler</b>, weil er zuerst passiert ist. <span class="r">7.5.3, 12.7.2</span></li>
<li>Den Positionsfehler der annehmenden Mannschaft pfeift der <b>2. SR</b>. <span class="r">24.3.2.2</span></li>
</ul>
<h3>Rotation und Rotationsfehler</h3>
<ul>
<li>Gewinnt die annehmende Mannschaft den Ballwechsel, rotiert sie <b>im Uhrzeigersinn</b>: II→I (schlägt auf), I→VI, VI→V, V→IV, IV→III, III→II. <span class="r">7.6.2</span></li>
<li><b>Rotationsfehler</b>: Der falsche Spieler schlägt auf. Der Schreiber meldet mit dem Summer, der Gegner bekommt <b>Punkt und Aufschlag</b>, die Reihenfolge wird korrigiert. Punkte der fehlerhaften Mannschaft seit dem Fehler werden gestrichen, wenn sich der Zeitpunkt feststellen lässt. <span class="r">7.7</span></li>
<li>Wird vor Satzbeginn ein Unterschied zwischen Aufstellungsblatt und Feld entdeckt, wird ohne Strafe korrigiert. Später entdeckt: Rückkehr zu den richtigen Positionen, Punkt und Aufschlag für den Gegner, Punkte seit dem Fehler gestrichen. <span class="r">7.3.5</span></li>
</ul>
<p><button class="btn btn-ghost" data-goto="aufstellung">Zum Aufstellungs-Trainer</button></p>
<div class="merke"><b>Merke</b> Nur Nachbarn vergleichen: vorne gegen hinten in derselben Spalte, links gegen rechts in derselben Reihe.</div>`
},
{
  k: 'spiel', t: 'Ball im Spiel', s: 'In/Aus, Berührungen, Spielfehler',
  html: `
<h3>Ball im Spiel, Ball tot</h3>
<ul>
<li>Der Ball ist ab dem genehmigten Aufschlagschlag im Spiel und außer Spiel ab dem Pfiff (bzw. dem Fehler, der gepfiffen wird). <span class="r">8.1–8.2</span></li>
<li><b>In</b>: Irgendein Teil des Balles berührt beim Bodenkontakt das Feld, Linien eingeschlossen. <span class="r">8.3</span></li>
<li><b>Aus</b>: Ball landet komplett außerhalb, berührt einen Gegenstand außerhalb, die Decke oder eine Person außerhalb des Spiels, berührt Antenne, Seile, Pfosten oder das Netz außerhalb der Seitenbänder, überquert die Netzebene ganz oder teilweise außerhalb des Überquerungsraums (Ausnahme 10.1.2) oder fliegt komplett unter dem Netz durch. <span class="r">8.4</span></li>
</ul>
<h3>Berührungen</h3>
<ul>
<li>Höchstens <b>drei Berührungen</b> pro Mannschaft, der Block zählt nicht dazu. Sonst: Fehler „vier Berührungen“. <span class="r">9.1</span></li>
<li>Kein Spieler darf den Ball zweimal hintereinander spielen. Ausnahmen: Block und die erste Mannschaftsberührung. <span class="r">9.1.1</span></li>
<li>Zwei Mitspieler gleichzeitig: zählt als <b>zwei</b> Berührungen. Greifen beide hin und nur einer trifft: eine. Zusammenstoßen ist kein Fehler. <span class="r">9.1.2.1</span></li>
<li>Zwei <b>Gegner</b> gleichzeitig über dem Netz: Bleibt der Ball im Spiel, hat die Mannschaft, auf deren Seite er fällt, wieder drei Berührungen. Geht er ins Aus, ist es der Fehler der Mannschaft auf der <b>anderen</b> Seite. <span class="r">9.1.2.2</span></li>
<li><b>Unterstützter Schlag</b>: Abstützen an Mitspieler oder Gegenständen, um den Ball zu spielen, ist verboten. Einen Mitspieler festhalten, der gleich einen Fehler machen würde, ist erlaubt. <span class="r">9.1.3</span></li>
</ul>
<h3>Wie darf der Ball berührt werden?</h3>
<ul>
<li>Mit jedem Körperteil, auch mit dem Fuß. <span class="r">9.2.1</span></li>
<li>Der Ball muss abprallen, er darf nicht gefangen oder geworfen werden. <span class="r">9.2.2</span></li>
<li>Mehrere Körperteile sind erlaubt, wenn die Kontakte <b>gleichzeitig</b> sind. Nacheinander nur beim Block und bei der <b>ersten Mannschaftsberührung</b>, jeweils innerhalb einer Aktion. <span class="r">9.2.3</span></li>
<li>Ein Ball darf auch außerhalb der eigenen Freizone und über dem Schreibertisch gespielt werden. <span class="r">9</span></li>
</ul>
<h3>Spielfehler</h3>
<ul>
<li><b>Vier Berührungen</b>, <b>unterstützter Schlag</b>, <b>gehaltener Ball</b> (gefangen/geworfen), <b>Doppelberührung</b> (zweimal hintereinander oder nacheinander an verschiedenen Körperteilen). <span class="r">9.3</span></li>
</ul>
<div class="merke"><b>Merke</b> Bei der Annahme ist ein „Nachkontakt“ in einer Aktion erlaubt, beim Zuspiel (2. Berührung) nicht.</div>`
},
{
  k: 'netz', t: 'Ball & Spieler am Netz', s: 'Überquerungsraum, Netzberührung, Übertritt',
  html: `
<div class="neu"><span class="tag">Neu seit 2025</span> Ein Ball, der nach der <b>2. oder 3. Berührung</b> ganz oder teilweise außerhalb der Antennen in die gegnerische Freizone fliegt, darf <b>nicht</b> zurückgeholt werden. Er ist in dem Moment „aus“, in dem er die Netzebene überquert. <span class="r">10.1.2.3</span></div>
<h3>Ball am Netz</h3>
<ul>
<li>Der Ball muss durch den <b>Überquerungsraum</b>: unten die Netzoberkante, seitlich die Antennen und ihre gedachte Verlängerung, oben die Decke. <span class="r">10.1.1</span></li>
<li>Nach der <b>1. Mannschaftsberührung</b> darf ein Ball, der außerhalb der Antennen in die gegnerische Freizone fliegt, zurückgeholt werden: Das gegnerische Feld darf dabei nicht betreten werden, der Ball muss auf derselben Seite wieder außerhalb zurück, der Gegner darf nicht behindern. <span class="r">10.1.2</span></li>
<li>Ein Ball Richtung Gegner unter dem Netz ist im Spiel, bis er die Netzebene vollständig überquert hat. <span class="r">10.1.3</span></li>
<li>Der Ball darf das Netz beim Überqueren berühren. <span class="r">10.2</span></li>
<li>Ball ins Netz geschlagen: darf innerhalb der drei Berührungen weitergespielt werden. Zerreißt er das Netz oder reißt es herunter: Wiederholung. <span class="r">10.3</span></li>
</ul>
<h3>Über das Netz greifen</h3>
<ul>
<li>Beim <b>Block</b> darf der Ball jenseits des Netzes berührt werden, aber nicht vor oder während des gegnerischen Angriffsschlags. <span class="r">11.1.1, 14.3</span></li>
<li>Nach einem <b>Angriffsschlag</b> darf die Hand über das Netz, wenn der Kontakt im eigenen Raum war. <span class="r">11.1.2</span></li>
</ul>
<h3>Unter dem Netz</h3>
<ul>
<li>Eindringen in den gegnerischen Raum unter dem Netz ist erlaubt, wenn es den Gegner nicht behindert. <span class="r">11.2.1</span></li>
<li>Fuß im gegnerischen Feld: erlaubt, solange ein Teil des Fußes <b>auf oder direkt über der Mittellinie</b> bleibt. Fuß komplett drüben: Fehler. <span class="r">11.2.2.1, 11.4.3</span></li>
<li>Andere Körperteile oberhalb der Füße dürfen das gegnerische Feld berühren, wenn sie nicht behindern. <span class="r">11.2.2.2</span></li>
<li>Nach Ende des Ballwechsels darf man das gegnerische Feld betreten; die gegnerische Freizone jederzeit, solange man nicht behindert. <span class="r">11.2.3–11.2.4</span></li>
</ul>
<h3>Netzberührung</h3>
<ul>
<li>Netzberührung <b>zwischen den Antennen während der Aktion des Ballspielens</b> ist ein Fehler. Die Aktion umfasst Absprung, Schlag oder Schlagversuch und die sichere Landung. <span class="r">11.3.1</span></li>
<li>Außerdem Fehler: Netz als Stütze nutzen, sich durch Netzberührung einen Vorteil verschaffen, den Gegner behindern, sich am Netz festhalten. Wer nahe am Ball ist und ihn spielen will, gilt als in Aktion, auch ohne Ballkontakt. <span class="r">11.4.4</span></li>
<li>Pfosten, Seile und Netz <b>außerhalb der Antennen</b> berühren ist kein Fehler, solange es das Spiel nicht beeinflusst. <span class="r">11.3.2</span></li>
<li>Wird das Netz durch den Ball gegen einen Gegner gedrückt, ist das kein Fehler. <span class="r">11.3.3</span></li>
</ul>
<div class="merke"><b>Merke</b> Fuß: ein Teil muss auf oder über der Mittellinie bleiben. Netz: nur zwischen den Antennen und nur in Aktion ist Berührung ein Fehler.</div>`
},
{
  k: 'aufschlag', t: 'Aufschlag, Angriff & Block', s: 'Aufschlagfehler, Sichtblock, Hinterspieler',
  html: `
<div class="neu"><span class="tag">Sichtblock</span> Spieler der aufschlagenden Mannschaft dürfen während des Aufschlags die <b>Hände nicht über den Kopf heben</b>, bis der Ball das Netz passiert hat. <span class="r">12.5.3</span></div>
<h3>Aufschlag</h3>
<ul>
<li>Der Spieler auf Position I schlägt aus der Aufschlagzone auf. Der 1. SR pfeift, wenn beide Teams bereit sind und der Aufschläger den Ball hat. <span class="r">12, 12.3</span></li>
<li>Geschlagen wird mit einer Hand oder einem Teil des Armes, nachdem der Ball <b>hochgeworfen oder losgelassen</b> wurde. Nur <b>ein</b> Hochwurf, Prellen ist erlaubt. <span class="r">12.4.1–12.4.2</span></li>
<li>Beim Schlag bzw. Absprung darf der Aufschläger weder das Feld (inkl. Grundlinie) noch den Boden außerhalb der Aufschlagzone berühren. Danach darf er ins Feld laufen oder landen. <span class="r">12.4.3</span></li>
<li>Zeit: <b>8 Sekunden</b> nach dem Pfiff. Aufschlag vor dem Pfiff: annulliert und wiederholt. <span class="r">12.4.4–12.4.5</span></li>
<li>Gewinnt die aufschlagende Mannschaft, schlägt derselbe Spieler wieder auf. Gewinnt die annehmende, rotiert sie und der Spieler von II→I schlägt auf. <span class="r">12.2.2</span></li>
</ul>
<h3>Aufschlagfehler</h3>
<ul>
<li>Beim Schlag: falsche Reihenfolge oder falsche Ausführung. Das führt zum Aufschlagwechsel, auch wenn der Gegner falsch steht. <span class="r">12.6.1</span></li>
<li>Nach dem Schlag: Ball berührt einen Mitspieler, geht nicht vollständig durch den Überquerungsraum, geht aus oder fliegt über einen Sichtblock. <span class="r">12.6.2</span></li>
</ul>
<h3>Sichtblock</h3>
<ul>
<li>Ein Sichtblock liegt vor, wenn Spieler der aufschlagenden Mannschaft durch Armschwenken, Springen, seitliches Bewegen oder Gruppenbildung verhindern, dass der Gegner <b>den Aufschlagschlag und die Flugbahn</b> sieht, bis der Ball die Netzebene erreicht. Ist eines davon sichtbar, ist es <b>kein</b> Sichtblock. <span class="r">12.5.1–12.5.2</span></li>
<li>Vermutet der 1. SR absichtliches Abschirmen, kann er die Mannschaft über den Spielkapitän ermahnen. <span class="r">12.5.3</span></li>
</ul>
<h3>Angriffsschlag</h3>
<ul>
<li>Jede Aktion, die den Ball Richtung Gegner spielt, außer Aufschlag und Block. Lob und Finte sind erlaubt, wenn der Ball sauber geschlagen wird. <span class="r">13.1.1–13.1.2</span></li>
<li>Vollendet ist er, wenn der Ball die Netzebene vollständig überquert hat oder vom Gegner berührt wird. <span class="r">13.1.3</span></li>
<li><b>Vorderspieler</b> dürfen in jeder Höhe angreifen, wenn der Kontakt im eigenen Raum ist. <span class="r">13.2.1</span></li>
<li><b>Hinterspieler</b> dürfen in jeder Höhe angreifen, wenn sie <b>hinter der Angriffslinie</b> abspringen (Linie weder berührt noch übertreten). Landen dürfen sie in der Vorderzone. Aus der Vorderzone nur, wenn der Ball beim Kontakt <b>teilweise unter der Netzoberkante</b> ist. <span class="r">13.2.2–13.2.3</span></li>
<li>Den gegnerischen <b>Aufschlag</b> in der Vorderzone vollständig über Netzhöhe angreifen: Fehler. <span class="r">13.2.4</span></li>
</ul>
<h3>Block</h3>
<ul>
<li>Block: Spieler nahe am Netz fangen den Ball vom Gegner ab, indem sie über die Netzoberkante reichen. Nur <b>Vorderspieler</b> dürfen blocken. <span class="r">14.1.1</span></li>
<li>Blockversuch = ohne Ballberührung. Vollendet = Ball berührt. Gemeinschaftsblock = zwei oder drei Spieler nahe beieinander. <span class="r">14.1.2–14.1.4</span></li>
<li>Mehrere schnelle Kontakte in einer Aktion sind erlaubt. Der Block <b>zählt nicht</b> als Mannschaftsberührung, die erste Berührung danach darf jeder machen, auch der Blocker. <span class="r">14.2, 14.4</span></li>
<li>Fehler: Ball im gegnerischen Raum vor dessen Angriffsschlag berühren, Hinterspieler oder Libero vollendet einen Block oder ist beteiligt, Aufschlag blocken, Ball vom Block ins Aus, Block im gegnerischen Raum von außerhalb der Antenne, Blockversuch des Libero. <span class="r">14.6</span></li>
</ul>
<div class="merke"><b>Merke</b> Hinterspieler: Absprungort und Ballhöhe entscheiden. Aufschlag: nie blocken, in der Vorderzone nie über Netzhöhe angreifen.</div>`
},
{
  k: 'unterbr', t: 'Unterbrechungen & Verzögerungen', s: 'Auszeiten, Wechsel, Verzögerungsstrafen',
  html: `
<h3>Reguläre Unterbrechungen</h3>
<ul>
<li>Nur <b>Auszeiten</b> und <b>Spielerwechsel</b>. Pro Satz und Mannschaft: <b>2 Auszeiten</b> zu je <b>30 Sekunden</b> und <b>6 Wechsel</b>. <span class="r">15, 15.1, 15.4.1</span></li>
<li>Beantragen darf nur der Trainer, ohne Trainer der Co-Trainer oder Spielkapitän. Nur bei totem Ball und vor dem Aufschlagpfiff. Die Auszeit wird mit dem Handzeichen beantragt. <span class="r">15.3.1, 15.4.1</span></li>
<li>In der Auszeit gehen die Spieler in die Freizone nahe ihrer Bank. <span class="r">15.4.2</span></li>
<li>In derselben Unterbrechung sind eine oder zwei Auszeiten und <b>ein</b> Wechselantrag je Mannschaft möglich. Zwei Wechselanträge hintereinander sind verboten, aber ein Antrag darf mehrere Spieler umfassen. Zwischen zwei Wechselanträgen derselben Mannschaft muss ein <b>abgeschlossener Ballwechsel</b> liegen (Ausnahme: Verletzung, Hinausstellung, Disqualifikation). <span class="r">15.2</span></li>
</ul>
<h3>Spielerwechsel</h3>
<ul>
<li>Ein <b>Startspieler</b> darf das Spiel <b>einmal pro Satz</b> verlassen und <b>einmal</b> zurückkehren, nur auf seine ursprüngliche Position. <span class="r">15.6.1</span></li>
<li>Ein <b>Ersatzspieler</b> darf <b>einmal pro Satz</b> für einen Startspieler hinein und nur von <b>diesem</b> Startspieler wieder ersetzt werden. <span class="r">15.6.2</span></li>
<li>Der Antrag beginnt, wenn der Ersatzspieler spielbereit die Auswechselzone betritt. Ist er nicht bereit: Wechsel abgelehnt, Verzögerungssanktion. Schreiber (Summer) oder 2. SR (Pfiff) bestätigen, der <b>2. SR genehmigt</b>. <span class="r">15.10</span></li>
<li>Ein Wechsel vor Satzbeginn ist erlaubt und zählt als regulärer Wechsel. <span class="r">15.3.2</span></li>
</ul>
<div data-widget="wechsel"></div>
<h3>Ausnahmewechsel</h3>
<ul>
<li>Kann ein Spieler (nicht der Libero) wegen Verletzung, Krankheit, Hinausstellung oder Disqualifikation nicht weiterspielen und ist kein regulärer Wechsel möglich, darf <b>jeder Spieler, der nicht am Feld ist</b> (außer Libero, 2. Libero und deren Ersatzspieler), hinein. Der ersetzte Spieler darf in diesem Spiel nicht mehr zurück. <span class="r">15.7</span></li>
<li>Der Ausnahmewechsel zählt nicht als regulärer Wechsel, wird aber im Spielbericht eingetragen. <span class="r">15.7</span></li>
<li>Geht gar kein Wechsel: 3 Minuten Erholungszeit (einmal pro Spieler und Spiel), danach ist die Mannschaft unvollständig. <span class="r">17.1.2</span></li>
</ul>
<h3>Regelwidrige Wechsel und unzulässige Anträge</h3>
<ul>
<li>Regelwidriger Wechsel, entdeckt nach Wiederaufnahme des Spiels: Punkt und Aufschlag für den Gegner, Wechsel korrigieren, Punkte der fehlerhaften Mannschaft seit dem Fehler streichen. <span class="r">15.9</span></li>
<li><b>Unzulässig</b> sind Anträge während des Ballwechsels oder beim/nach dem Aufschlagpfiff, von einer nicht berechtigten Person, ein zweiter Wechselantrag ohne Ballwechsel dazwischen oder nach Ausschöpfung. <span class="r">15.11.1</span></li>
<li>Der <b>erste</b> unzulässige Antrag im Spiel, der nicht verzögert: zurückweisen und eintragen, ohne weitere Folgen. Jeder weitere ist eine Verzögerung. <span class="r">15.11.2–15.11.3</span></li>
</ul>
<h3>Verzögerungen</h3>
<ul>
<li>Beispiele: Unterbrechungen verzögern, nach Aufforderung weiter unterbrechen, illegaler Wechselantrag, wiederholter unzulässiger Antrag, Spielverzögerung durch ein Teammitglied. <span class="r">16.1</span></li>
<li>Verzögerungssanktionen treffen die <b>Mannschaft</b> und gelten für das <b>ganze Spiel</b>. 1. Verzögerung: <b>Verzögerungsverwarnung</b> (gelbe Karte ans Handgelenk). Jede weitere: <b>Verzögerungsstrafe</b> (rote Karte ans Handgelenk) mit Punkt und Aufschlag für den Gegner. <span class="r">16.2</span></li>
<li>Vor oder zwischen Sätzen verhängt: gilt im folgenden Satz. <span class="r">16.2.4</span></li>
</ul>
<h3>Außergewöhnliche Unterbrechungen</h3>
<ul>
<li>Schwere Verletzung im Ballwechsel: sofort unterbrechen, Wiederholung. <span class="r">17.1.1</span></li>
<li>Äußere Störung (z. B. fremder Ball rollt ins Feld): unterbrechen, Wiederholung. <span class="r">17.2</span></li>
<li>Unterbrechungen bis insgesamt 4 Stunden: am selben Feld mit gleichem Stand weiter; auf anderem Feld wird der unterbrochene Satz neu gespielt, gespielte Sätze bleiben. Über 4 Stunden: ganzes Spiel neu. <span class="r">17.3</span></li>
</ul>
<div class="merke"><b>Merke</b> Verzögerung = Karte ans Handgelenk, trifft die Mannschaft. Fehlverhalten = Karte hochhalten, trifft die Person.</div>`
},
{
  k: 'libero', t: 'Der Libero', s: 'Rechte, Verbote, Austausch, Neubestimmung',
  html: `
<h3>Bestimmung und Ausrüstung</h3>
<ul>
<li>Jede Mannschaft darf bis zu <b>zwei Libero</b> bestimmen, eingetragen in eigenen Zeilen des Spielberichts. Am Feld ist immer nur <b>einer</b> (der „Acting Libero“). Bei FIVB-Seniorenbewerben mit mehr als 12 Spielern sind zwei Pflicht. <span class="r">19.1</span></li>
<li>Trikot in einer anderen, klar kontrastierenden Grundfarbe, nummeriert wie die anderen. Der Libero darf Mannschafts- oder Spielkapitän sein. <span class="r">19.2, 5</span></li>
</ul>
<h3>Was der Libero nicht darf</h3>
<ul>
<li>Er ersetzt nur <b>Hinterspieler</b>. <span class="r">19.3.1.1</span></li>
<li>Kein Angriffsschlag, wenn der Ball beim Kontakt <b>vollständig über der Netzoberkante</b> ist, egal wo (auch in der Freizone). <span class="r">19.3.1.2</span></li>
<li>Kein <b>Aufschlag</b>, kein <b>Block</b>, kein <b>Blockversuch</b>. <span class="r">19.3.1.3</span></li>
<li>Spielt er den Ball <b>mit den Fingern im oberen Zuspiel</b> in seiner <b>Vorderzone</b> (oder deren Verlängerung), darf ein Mitspieler diesen Ball nicht vollständig über Netzhöhe angreifen. Macht er dasselbe <b>hinter</b> der Vorderzone, ist der Angriff frei. <span class="r">19.3.1.4</span></li>
</ul>
<h3>Libero-Austausch</h3>
<ul>
<li>Ist <b>kein Wechsel</b>, unbegrenzt oft möglich, aber zwischen zwei Austauschen muss ein <b>abgeschlossener Ballwechsel</b> liegen (Ausnahmen: eine Strafe lässt das Team rotieren und der Libero käme auf IV, oder der Libero wird spielunfähig). <span class="r">19.3.2.1</span></li>
<li>Der ersetzte Spieler („regulärer Ersatzspieler“) kann jeden Libero ersetzen und von jedem ersetzt werden. Der Libero am Feld kann nur von diesem Spieler oder vom 2. Libero ersetzt werden. <span class="r">19.3.2.2</span></li>
<li>Zu Satzbeginn erst nach Kontrolle der Aufstellung durch den 2. SR. Sonst nur bei totem Ball vor dem Aufschlagpfiff, und nur durch die <b>Libero-Austauschzone</b>. <span class="r">19.3.2.3–19.3.2.7</span></li>
<li>Austausch nach dem Pfiff, aber vor dem Schlag: nicht zurückweisen, nach dem Ballwechsel den Spielkapitän informieren. Wiederholung: sofort unterbrechen, Verzögerungssanktion. <span class="r">19.3.2.5–19.3.2.6</span></li>
<li>Regelwidriger Austausch vor dem nächsten Ballwechsel entdeckt: korrigieren und Verzögerungssanktion. Nach dem Aufschlagschlag entdeckt: wie ein regelwidriger Wechsel. <span class="r">19.3.2.9</span></li>
<li>Austausche werden auf dem Libero-Kontrollblatt oder im elektronischen Spielbericht festgehalten (Assistent des Schreibers). <span class="r">19.3.2.8, 28.2</span></li>
</ul>
<h3>Neubestimmung</h3>
<ul>
<li>Spielunfähig ist der Libero bei Verletzung, Krankheit, Hinausstellung oder Disqualifikation, oder wenn der Trainer ihn dazu erklärt. <span class="r">19.4.1</span></li>
<li><b>Ein</b> Libero: Der Trainer darf einen Spieler, der nicht am Feld ist (nicht den regulären Ersatzspieler), für den Rest des Spiels zum Libero bestimmen. Der ersetzte Libero darf nicht mehr spielen. <span class="r">19.4.2</span></li>
<li><b>Zwei</b> Libero: Fällt einer aus, spielt die Mannschaft mit einem weiter. Neubestimmung erst, wenn auch der zweite ausfällt. <span class="r">19.4.3</span></li>
</ul>
<div class="merke"><b>Merke</b> Libero: kein Aufschlag, kein Block, kein Angriff über Netzhöhe. Oberes Zuspiel vorne macht den Ball für Angriffe über Netzhöhe „tabu“.</div>`
},
{
  k: 'verhalten', t: 'Verhalten & Sanktionen', s: 'Verwarnung, Bestrafung, Hinausstellung, Disqualifikation',
  html: `
<h3>Grundsätze</h3>
<ul>
<li>Alle müssen die Regeln kennen, Entscheidungen sportlich akzeptieren und dürfen nicht versuchen, die Schiedsrichter zu beeinflussen. Rückfragen nur über den Spielkapitän. Kommunikation im Team ist erlaubt. <span class="r">20</span></li>
</ul>
<h3>Geringfügiges Fehlverhalten</h3>
<ul>
<li>Wird nicht sanktioniert. Der 1. SR soll verhindern, dass die Sanktionsschwelle erreicht wird, in zwei Stufen: <span class="r">21.1</span>
<br><b>Stufe 1</b>: mündliche Verwarnung über den Spielkapitän.
<br><b>Stufe 2</b>: <b>gelbe Karte</b> an das betroffene Teammitglied. Das ist keine Sanktion, sondern das Zeichen, dass die Mannschaft die Sanktionsschwelle erreicht hat. Wird eingetragen, hat aber keine unmittelbare Folge.</li>
</ul>
<h3>Fehlverhalten mit Sanktion</h3>
<ul>
<li><b>Unhöflichkeit</b>: gegen gute Sitten oder Moral. <span class="r">21.2.1</span></li>
<li><b>Beleidigung</b>: verleumderische oder beleidigende Worte, Gesten oder Verachtung. <span class="r">21.2.2</span></li>
<li><b>Tätlichkeit</b>: körperlicher Angriff, aggressives oder drohendes Verhalten. <span class="r">21.2.3</span></li>
</ul>
<p>Probier die Sanktionsskala aus:</p>
<div data-widget="sanktion"></div>
<h3>Anwendung</h3>
<ul>
<li><b>Bestrafung</b> (rote Karte): Punkt und Aufschlag für den Gegner. <span class="r">21.3.1</span></li>
<li><b>Hinausstellung</b> (rot und gelb <b>gemeinsam</b> in einer Hand): sofort legal oder per Ausnahmewechsel ersetzen, Rest des Satzes in der Umkleide. Ein hinausgestellter Trainer verliert für den Satz sein Recht einzugreifen. <span class="r">21.3.2</span></li>
<li><b>Disqualifikation</b> (rot und gelb <b>getrennt</b>, in jeder Hand eine): Rest des Spiels in der Umkleide. <span class="r">21.3.3</span></li>
<li>Alle Fehlverhaltenssanktionen sind <b>individuell</b>, gelten für das ganze Spiel und werden eingetragen. Wiederholung durch dieselbe Person wird immer schärfer bestraft. Beleidigung und Tätlichkeit brauchen keine vorherige Sanktion. <span class="r">21.4</span></li>
<li>Fehlverhalten vor oder zwischen Sätzen: Sanktion gilt im folgenden Satz. <span class="r">21.5</span></li>
</ul>
<div class="merke"><b>Merke</b> Gemeinsam in einer Hand = Hinausstellung (Satz). Getrennt in zwei Händen = Disqualifikation (Spiel).</div>`
},
{
  k: 'sr', t: 'Schiedsgericht & Abläufe', s: 'Wer pfeift was, Reihenfolge der Zeichen, Schreiber, Linienrichter',
  html: `
<h3>Zusammensetzung und Pfiff</h3>
<ul>
<li>1. SR, 2. SR, Schreiber und vier (oder zwei) Linienrichter. Bei FIVB-Bewerben zusätzlich Challenge-SR, Reserve-SR und Assistent des Schreibers. <span class="r">22.1</span></li>
<li>Pfeifen dürfen nur der <b>1. und 2. SR</b>. Der 1. SR pfeift den Aufschlag. Das Ende eines Ballwechsels pfeifen sie nur, wenn sie sicher sind, dass ein Fehler passiert ist, und wissen, welcher. <span class="r">22.2.1</span></li>
</ul>
<h3>Reihenfolge der Handzeichen</h3>
<ul>
<li><b>1. SR pfeift</b>: (a) aufschlagende Mannschaft, (b) Art des Fehlers, (c) Spieler, falls nötig. <span class="r">22.2.3.1</span></li>
<li><b>2. SR pfeift</b>: (a) Art des Fehlers, (b) Spieler, (c) er übernimmt das Zeichen des 1. SR für die aufschlagende Mannschaft. Der 1. SR zeigt dann nur die aufschlagende Mannschaft. <span class="r">22.2.3.2</span></li>
<li>Angriffs- oder Blockfehler von Hinterspieler oder Libero: beide zeigen nach diesem Schema. <span class="r">22.2.3.3</span></li>
<li><b>Doppelfehler</b>: beide zeigen Art und Spieler, danach zeigt der 1. SR die aufschlagende Mannschaft. <span class="r">22.2.3.4</span></li>
<li>Wird ein Zeichen mit einer Hand gezeigt, ist es die Hand auf der Seite der Mannschaft, die den Fehler gemacht oder den Antrag gestellt hat. <span class="r">30.1</span></li>
</ul>
<h3>1. Schiedsrichter</h3>
<ul>
<li>Steht auf dem Schiedsrichterstuhl an einem Netzende, gegenüber dem Schreiber. Blickhöhe etwa <b>50 cm über dem Netz</b>. <span class="r">23.1</span></li>
<li>Leitet das Spiel, seine Entscheidungen sind endgültig. Er kann Entscheidungen anderer Mitglieder des Schiedsgerichts aufheben und sie ersetzen. Er entscheidet auch Fragen, die die Regeln nicht regeln. Keine Diskussionen, aber eine Regelerklärung auf Wunsch des Spielkapitäns. <span class="r">23.2</span></li>
<li>Vor dem Spiel: Halle, Bälle und Ausrüstung prüfen, Auslosung, Einspielen überwachen. Am Ende: Spielbericht prüfen und unterschreiben. <span class="r">23.3.1, 23.3.3</span></li>
<li>Er entscheidet u. a.: Fehler des Aufschlägers und der aufschlagenden Mannschaft inkl. Sichtblock, Fehler beim Spielen des Balles, Fehler über dem Netz und Netzberührung vor allem auf der <b>Angreiferseite</b>, Angriffsfehler von Libero und Hinterspielern, Ball komplett unter dem Netz durch, Block von Hinterspieler oder Blockversuch des Libero, Ball außerhalb des Überquerungsraums oder Antenne auf seiner Seite. <span class="r">23.3.2.3</span></li>
</ul>
<h3>2. Schiedsrichter</h3>
<ul>
<li>Steht außerhalb des Feldes nahe dem Pfosten, gegenüber dem 1. SR. Er assistiert und hat eigene Zuständigkeiten; er kann den 1. SR ersetzen. <span class="r">24.1–24.2.1</span></li>
<li>Fehler außerhalb seines Bereichs darf er ohne Pfiff anzeigen, aber nicht darauf bestehen. <span class="r">24.2.2</span></li>
<li>Kontrolliert Schreiber, Bank und Aufwärmbereich. <b>Genehmigt Auszeiten und Wechsel</b>, kontrolliert ihre Dauer und Anzahl und meldet die <b>2. Auszeit</b> sowie den <b>5. und 6. Wechsel</b> dem 1. SR und dem Trainer. Genehmigt Ausnahmewechsel und Erholungszeit, prüft Boden und Bälle. <span class="r">24.2.3–24.2.9</span></li>
<li>Prüft die Positionen zu Satzbeginn, beim Seitenwechsel im 5. Satz und wenn nötig. <span class="r">24.3.1</span></li>
<li>Er pfeift: Eindringen ins gegnerische Feld und in den Raum unter dem Netz, <b>Positionsfehler der annehmenden Mannschaft</b>, Netzberührung vor allem auf der <b>Blockerseite</b> und Antenne auf seiner Seite, Block von Hinterspieler/Blockversuch des Libero, Angriffsfehler von Hinterspieler oder Libero, Ball berührt einen Fremdkörper, Bodenkontakt, wenn der 1. SR ihn nicht sieht, Ball außerhalb des Überquerungsraums auf seiner Seite. <span class="r">24.3.2</span></li>
</ul>
<h3>Schreiber</h3>
<ul>
<li>Sitzt am Schreibertisch gegenüber dem 1. SR und arbeitet mit dem 2. SR zusammen. Signalisiert mit dem Summer. <span class="r">27</span></li>
<li>Vorher: Daten, Mannschaften, Libero eintragen, Unterschriften von Kapitänen und Trainern, Aufstellungen eintragen. <span class="r">27.2.1</span></li>
<li>Während: Punkte eintragen, <b>Aufschlagfolge kontrollieren</b> und Fehler sofort nach dem Aufschlagschlag melden, Wechselanträge mit dem Summer bestätigen, Wechsel und Auszeiten eintragen, unzulässige Anträge melden, Satzende und den <b>8. Punkt im Entscheidungssatz</b> ansagen, Sanktionen und Sonderfälle eintragen, Satzpausen kontrollieren. <span class="r">27.2.2</span></li>
<li>Am Ende: Ergebnis eintragen, einen Protest (mit Erlaubnis des 1. SR) eintragen lassen, <b>selbst unterschreiben, dann die Kapitäne, dann die Schiedsrichter</b>. <span class="r">27.2.3</span></li>
</ul>
<h3>Linienrichter</h3>
<ul>
<li>Flaggen <b>40 × 40 cm</b>. Bei zwei Linienrichtern: an den Ecken rechts vom jeweiligen Schiedsrichter, diagonal 1–2 m von der Ecke; jeder kontrolliert Grund- und Seitenlinie seiner Seite. Bei vier: 1–3 m von jeder Ecke in der Verlängerung ihrer Linie. <span class="r">29.1</span></li>
<li>Sie zeigen: in und aus nahe ihrer Linie, Berührung von Aus-Bällen durch die annehmende Mannschaft, Antenne und Überquerung außerhalb, Spieler (außer Aufschläger) außerhalb des Feldes beim Aufschlagschlag, Fußfehler des Aufschlägers, Berührung der oberen 80 cm der Antenne. Auf Wunsch des 1. SR wiederholen sie ihr Zeichen. <span class="r">29.2</span></li>
</ul>
<div data-widget="wer"></div>
<div class="merke"><b>Merke</b> 1. SR: erst Mannschaft, dann Fehler. 2. SR: erst Fehler, dann übernimmt er die Mannschaft vom 1. SR.</div>`
}
];

/* [id, Kapitel, Frage, Optionen, richtiger Index, Erklärung, Regel] */
const Q = [
[1,'feld','Wie groß ist das Spielfeld?',['18 × 9 m','18 × 8 m','16 × 9 m','20 × 10 m'],0,'Das Spielfeld ist ein Rechteck von 18 × 9 m, jede Hälfte 9 × 9 m.','1.1'],
[2,'feld','Wie breit muss die Freizone mindestens sein (allgemeine Regel)?',['3 m','2 m','5 m','6,5 m'],0,'Mindestens 3 m auf allen Seiten. 5 m seitlich und 6,5 m hinten gelten nur für FIVB-Bewerbe.','1.1'],
[3,'feld','Wie breit sind die Linien, und wozu gehören Seiten- und Grundlinien?',['5 cm, sie gehören zum Spielfeld','5 cm, sie gehören zur Freizone','8 cm, sie gehören zum Spielfeld','3 cm, sie gehören zur Freizone'],0,'Alle Linien sind 5 cm breit. Seiten- und Grundlinien liegen innerhalb der 18 × 9 m, ein Ball auf der Linie ist also „in“.','1.3'],
[4,'feld','Wo liegt die Angriffslinie?',['Ihre Hinterkante ist 3 m von der Achse der Mittellinie entfernt','Ihre Vorderkante ist 3 m vom Netz entfernt','Ihre Mitte ist 3 m von der Mittellinie entfernt','Sie liegt 3 m vor der Grundlinie'],0,'Gemessen wird von der Achse der Mittellinie bis zur Hinterkante der Angriffslinie; die Linie gehört damit zur Vorderzone.','1.3.4'],
[5,'feld','Wie hoch ist das Netz bei den Männern?',['2,43 m','2,24 m','2,35 m','2,50 m'],0,'Männer 2,43 m, Frauen 2,24 m.','2.1.1'],
[6,'feld','Wie hoch ist das Netz bei den Frauen?',['2,24 m','2,15 m','2,43 m','2,30 m'],0,'Frauen 2,24 m, Männer 2,43 m.','2.1.1'],
[7,'feld','Wo wird die Netzhöhe gemessen?',['In der Mitte des Spielfeldes; über den Seitenlinien darf sie höchstens 2 cm höher sein','Nur an den Pfosten','An den Antennen','An einer beliebigen Stelle, Toleranz 5 cm'],0,'Gemessen in der Feldmitte. Über beiden Seitenlinien muss sie gleich hoch sein und darf die offizielle Höhe um höchstens 2 cm überschreiten.','2.1.2'],
[8,'feld','Wie weit ragen die Antennen über das Netz?',['80 cm','1 m','1,80 m','50 cm'],0,'Die Antenne ist 1,80 m lang, die oberen 80 cm ragen über das Netz und sind rot-weiß gestreift.','2.4'],
[9,'feld','Welche Angabe zum Ball stimmt?',['Umfang 65–67 cm, Gewicht 260–280 g','Umfang 62–64 cm, Gewicht 260–280 g','Umfang 65–67 cm, Gewicht 280–300 g','Umfang 68–70 cm, Gewicht 250–270 g'],0,'Umfang 65–67 cm, Gewicht 260–280 g, Druck 0,30–0,325 kg/cm².','3.1'],
[10,'feld','Welcher Innendruck ist für den Ball vorgeschrieben?',['0,30–0,325 kg/cm²','0,20–0,25 kg/cm²','0,40–0,45 kg/cm²','0,35–0,40 kg/cm²'],0,'0,30 bis 0,325 kg/cm² (294,3 bis 318,82 mbar).','3.1'],
[11,'feld','Wie tief reicht die Aufschlagzone?',['Bis zum Ende der Freizone','3 m hinter die Grundlinie','Genau 2 m','So weit, wie die Halle es erlaubt'],0,'Die Aufschlagzone ist 9 m breit und reicht in der Tiefe bis zum Ende der Freizone.','1.4.2'],
[12,'feld','Zu welchem Feld gehört die Mittellinie?',['Ihre ganze Breite gehört zu beiden Feldern','Zu der Mannschaft, die aufschlägt','Zur Hälfte zu jedem Feld, geteilt an der Achse','Zu keinem Feld'],0,'Die Achse teilt das Feld, aber die ganze Breite der Mittellinie gehört beiden Feldern gleichermaßen.','1.3.3'],
[13,'feld','Wie weit gilt die Vorderzone seitlich?',['Bis zum Ende der Freizone','Nur bis zu den Seitenlinien','Bis 1 m außerhalb der Seitenlinie','Bis zu den Pfosten'],0,'Die Vorderzone gilt als über die Seitenlinien hinaus bis zum Ende der Freizone verlängert. Wichtig für Hinterspieler und Libero.','1.4.1'],
[14,'feld','Wo liegt die Libero-Austauschzone?',['In der Freizone auf der Bankseite zwischen Verlängerung der Angriffslinie und Grundlinie','Zwischen den Verlängerungen der Angriffslinien vor dem Schreibertisch','Hinter der Grundlinie','Überall in der Freizone'],0,'Die Zone zwischen den Angriffslinien-Verlängerungen ist die Auswechselzone. Der Libero tauscht auf der Bankseite zwischen Angriffslinie und Grundlinie.','1.4.4'],
[15,'feld','Welche Mindesttemperatur ist vorgeschrieben?',['10 °C','5 °C','15 °C','18 °C'],0,'Die Temperatur darf nicht unter 10 °C liegen.','1.5'],
[16,'team','Wie viele Spieler darf eine Mannschaft laut allgemeiner Regel im Spielbericht haben?',['12','10','14','16'],0,'Bis zu 12 Spieler. Bis zu 14 nur bei FIVB-Seniorenbewerben.','4.1.1'],
[17,'team','Wie ist der Mannschaftskapitän gekennzeichnet?',['Streifen 8 × 2 cm unter der Brustnummer','Armbinde am linken Arm','Andersfarbiges Trikot','Streifen unter der Rückennummer'],0,'Ein Streifen von 8 × 2 cm unter der Nummer auf der Brust.','4.3.4'],
[18,'team','Welche Trikotnummern sind nach der allgemeinen Regel erlaubt?',['1 bis 20','0 bis 99','1 bis 18','1 bis 12'],0,'Nummern von 1 bis 20. Bei FIVB-Seniorenbewerben mit großen Kadern dürfen es mehr sein.','4.3.3'],
[19,'team','Wer darf bei totem Ball mit den Schiedsrichtern sprechen?',['Nur der Spielkapitän','Jeder Spieler am Feld','Der Trainer und der Kapitän','Nur der Trainer'],0,'Nur der Spielkapitän, z. B. um eine Regelerklärung zu verlangen oder Anträge der Mitspieler vorzubringen.','5.1.2'],
[20,'team','Wer ist der Ansprechpartner des Trainers für Auszeiten und Wechsel?',['Der 2. Schiedsrichter','Der 1. Schiedsrichter','Der Schreiber','Der Linienrichter'],0,'Bei Aufstellung, Wechseln und Auszeiten ist der 2. SR der Ansprechpartner des Trainers.','5.2.1'],
[21,'team','Wann ist ein Satz (Satz 1–4) gewonnen?',['Mit 25 Punkten und mindestens 2 Punkten Vorsprung','Mit 25 Punkten, auch 25:24','Mit 25 Punkten, spätestens bei 30','Mit 21 Punkten und 2 Punkten Vorsprung'],0,'25 Punkte mit mindestens zwei Punkten Vorsprung, ohne Obergrenze.','6.2'],
[22,'team','Bis wie viele Punkte geht der Entscheidungssatz?',['15, mit 2 Punkten Vorsprung','15, der erste mit 15 gewinnt','25, mit 2 Punkten Vorsprung','21, mit 2 Punkten Vorsprung'],0,'Beim Stand von 2:2 Sätzen wird der 5. Satz bis 15 mit mindestens zwei Punkten Vorsprung gespielt.','6.3.2'],
[23,'team','Wann wechseln die Mannschaften im Entscheidungssatz die Seiten?',['Sobald die führende Mannschaft 8 Punkte hat','Bei 8:8','Bei 7 Punkten der führenden Mannschaft','Gar nicht'],0,'Bei 8 Punkten der führenden Mannschaft, ohne Verzögerung. Die Positionen bleiben gleich.','18.2.2'],
[24,'team','Wie lange dauert eine Satzpause?',['3 Minuten','2 Minuten','5 Minuten','10 Minuten'],0,'Alle Satzpausen dauern 3 Minuten. Zwischen 2. und 3. Satz kann sie auf Antrag des Veranstalters auf bis zu 10 Minuten verlängert werden.','18.1'],
[25,'team','Was wählt der Gewinner der Auslosung?',['Entweder Aufschlag/Annahme oder die Seite','Aufschlag und Seite','Nur die Seite','Nur den Aufschlag'],0,'Er wählt eines von beiden, der Verlierer bekommt das andere.','7.1.2'],
[26,'team','Eine Mannschaft tritt ohne triftigen Grund nicht an. Welches Ergebnis wird gewertet?',['0:3, jeder Satz 0:25','0:3, jeder Satz 0:21','0:2','Das Spiel wird nachgeholt'],0,'Nichtantreten: das Spiel ist mit 0:3 und jeder Satz mit 0:25 verloren.','6.4'],
[27,'team','Wie lange spielen sich die Teams gemeinsam am Netz ein, wenn sie vorher kein eigenes Feld zur Verfügung hatten?',['10 Minuten','6 Minuten','5 Minuten','15 Minuten'],0,'6 Minuten, wenn vorher ein eigenes Feld verfügbar war, sonst 10 Minuten.','7.2.1'],
[28,'team','Beide Mannschaften begehen gleichzeitig einen Fehler. Was passiert?',['Doppelfehler, der Ballwechsel wird wiederholt','Die aufschlagende Mannschaft bekommt den Punkt','Beide bekommen einen Punkt','Der 1. SR entscheidet, welcher Fehler schwerer war'],0,'Gleichzeitige Fehler beider Mannschaften sind ein Doppelfehler, der Ballwechsel wird wiederholt.','6.1.2.2'],
[29,'team','Welche Mannschaft beginnt den 2. Satz mit Aufschlag?',['Die, die im 1. Satz nicht zuerst aufgeschlagen hat','Der Sieger des 1. Satzes','Der Verlierer des 1. Satzes','Es wird neu gelost'],0,'Die Sätze 2–4 beginnt die Mannschaft, die im vorherigen Satz nicht zuerst aufgeschlagen hat. Gelost wird nur vor dem 1. und 5. Satz.','12.1.2'],
[30,'team','Wie wird ein Protest vorbereitet?',['Der Spielkapitän behält sich das Recht sofort beim 1. SR vor und trägt ihn am Spielende ein','Der Trainer schreibt ihn sofort in den Spielbericht','Der Spielkapitän reicht ihn nach dem Spiel beim Verband ein','Jeder Spieler kann in der Satzpause protestieren'],0,'Der Spielkapitän muss den Protestvorbehalt sofort beim 1. SR anmelden; eingetragen wird er am Ende des Spiels.','5.1.2.1'],
[31,'rotation','Welche Position hat der Aufschläger?',['I (hinten rechts)','II (vorne rechts)','VI (hinten Mitte)','V (hinten links)'],0,'Der Spieler auf Position I, hinten rechts, schlägt auf.','7.4.1'],
[32,'rotation','In welche Richtung wird rotiert?',['Im Uhrzeigersinn: II→I, I→VI, VI→V …','Gegen den Uhrzeigersinn: I→II, II→III …','Vorne und hinten tauschen','Der Trainer entscheidet'],0,'Im Uhrzeigersinn. Der Spieler von Position II rückt auf I und schlägt auf.','7.6.2'],
[33,'rotation','Wann rotiert eine Mannschaft?',['Wenn sie als annehmende Mannschaft den Ballwechsel gewinnt','Nach jedem Punkt','Wenn sie als aufschlagende Mannschaft einen Punkt macht','Nach jeder Auszeit'],0,'Rotiert wird, wenn die annehmende Mannschaft das Aufschlagrecht gewinnt.','6.1.3.2'],
[34,'rotation','Wonach wird die Position eines Spielers beurteilt?',['Nach dem Bodenkontakt seiner Füße','Nach der Position seines Oberkörpers','Nach der Position seiner Hände','Nach seiner Kopfposition'],0,'Die Füße mit Bodenkontakt zählen; der letzte Bodenkontakt legt die Position fest.','7.4.3'],
[35,'rotation','Welche Mannschaft muss seit 2025 beim Aufschlagschlag in ihrer Rotationsordnung stehen?',['Nur die annehmende Mannschaft','Nur die aufschlagende Mannschaft','Beide Mannschaften','Keine'],0,'Neu in 7.4: Die aufschlagende Mannschaft darf beliebige Positionen einnehmen, nur die annehmende muss in Rotationsordnung stehen.','7.4'],
[36,'rotation','Was folgt auf einen Positionsfehler?',['Punkt und Aufschlag für den Gegner, Positionen werden korrigiert','Nur eine Verwarnung','Wiederholung des Ballwechsels','Punkt für den Gegner, aber kein Aufschlagwechsel'],0,'Die Mannschaft wird mit Punkt und Aufschlag für den Gegner bestraft, die Positionen werden korrigiert.','7.5.4'],
[37,'rotation','Der Aufschläger tritt beim Schlag auf die Grundlinie, gleichzeitig steht die annehmende Mannschaft falsch. Was wird bestraft?',['Der Aufschlagfehler','Der Positionsfehler','Doppelfehler, Wiederholung','Beide Fehler, zwei Punkte'],0,'Ein Fehler des Aufschlägers im Moment des Schlags wird vor dem Positionsfehler gezählt.','12.7.1'],
[38,'rotation','Der Aufschlag ist korrekt ausgeführt, landet aber im Aus. Die annehmende Mannschaft stand falsch. Was gilt?',['Positionsfehler der annehmenden Mannschaft','Aufschlagfehler','Doppelfehler','Wiederholung'],0,'Wird der Aufschlag erst nach dem Schlag fehlerhaft, ist der Positionsfehler zuerst passiert und wird bestraft.','12.7.2'],
[39,'rotation','Wer pfeift den Positionsfehler der annehmenden Mannschaft?',['Der 2. Schiedsrichter','Der 1. Schiedsrichter','Der Schreiber','Der Linienrichter'],0,'Positionsfehler der annehmenden Mannschaft sind Sache des 2. SR.','24.3.2.2'],
[40,'rotation','Welche Spieler werden beim Positionsvergleich vorne–hinten miteinander verglichen?',['IV–V, III–VI, II–I','IV–I, III–VI, II–V','Alle Vorderspieler mit allen Hinterspielern','Nur III und VI'],0,'Jeder Hinterspieler nur mit seinem direkten Vordermann in derselben Spalte.','7.4.2.1'],
[41,'rotation','Ein Hinterspieler steht mit einem Fuß genau auf gleicher Höhe wie der vordere Fuß seines Vorderspielers. Ist das ein Positionsfehler?',['Nein, gleichauf ist erlaubt','Ja, er muss deutlich dahinter stehen','Ja, er muss mit beiden Füßen dahinter stehen','Nur beim Aufschlag der eigenen Mannschaft'],0,'Der Hinterspieler muss mit mindestens einem Teil eines Fußes gleich weit oder weiter von der Mittellinie entfernt sein.','7.4.3.1'],
[42,'rotation','Ab wann dürfen sich die Spieler frei bewegen?',['Nach dem Aufschlagschlag','Nach dem Aufschlagpfiff','Wenn der Ball das Netz überquert','Nach der ersten Ballberührung der Annahme'],0,'Nach dem Aufschlagschlag dürfen alle Spieler jede Position auf ihrem Feld und in der Freizone einnehmen.','7.4.4'],
[43,'rotation','Ein Rotationsfehler wird entdeckt. Was passiert?',['Punkt und Aufschlag für den Gegner, Reihenfolge korrigieren, Punkte seit dem Fehler streichen','Nur die Reihenfolge wird korrigiert','Der Satz wird wiederholt','Eine Verzögerungsverwarnung'],0,'Der Gegner bekommt Punkt und Aufschlag, die Reihenfolge wird korrigiert und Punkte der fehlerhaften Mannschaft seit dem Fehler werden gestrichen, sofern der Zeitpunkt feststellbar ist.','7.7'],
[44,'rotation','Vor Satzbeginn stellt der 2. SR fest, dass ein Spieler anders steht als auf dem Aufstellungsblatt. Was passiert?',['Die Position wird ohne Sanktion korrigiert','Punkt für den Gegner','Verzögerungsverwarnung','Der Trainer muss einen Wechsel beantragen'],0,'Vor Satzbeginn wird einfach gemäß Aufstellungsblatt korrigiert, ohne Sanktion.','7.3.5.1'],
[45,'spiel','Wie viele Berührungen hat eine Mannschaft höchstens, um den Ball zurückzuspielen?',['Drei, der Block zählt nicht mit','Drei, inklusive Block','Vier, inklusive Block','Zwei plus Block'],0,'Drei Berührungen zusätzlich zum Block.','9.1'],
[46,'spiel','Nach einem Block: Wer darf den Ball als Nächstes spielen?',['Jeder Spieler, auch der Blocker','Jeder außer dem Blocker','Nur ein Hinterspieler','Nur der Zuspieler'],0,'Die erste Berührung nach dem Block darf jeder Spieler ausführen, auch derjenige, der geblockt hat.','14.4.2'],
[47,'spiel','Bei der Annahme springt der Ball vom Unterarm an die Schulter, alles in einer Aktion. Wie entscheidest du?',['Erlaubt, bei der ersten Mannschaftsberührung sind aufeinanderfolgende Kontakte in einer Aktion zulässig','Doppelberührung','Gehaltener Ball','Erlaubt nur, wenn der Ball danach übers Netz geht'],0,'Bei der ersten Berührung der Mannschaft darf der Ball in einer Aktion nacheinander verschiedene Körperteile berühren.','9.2.3.2'],
[48,'spiel','Zwei Mitspieler berühren den Ball gleichzeitig. Wie viele Berührungen sind das?',['Zwei','Eine','Keine, der Ballwechsel wird wiederholt','Es ist ein Fehler'],0,'Gleichzeitige Berührung durch zwei (drei) Mitspieler zählt als zwei (drei) Berührungen, außer beim Block.','9.1.2.1'],
[49,'spiel','Zwei Gegenspieler berühren den Ball gleichzeitig über dem Netz, der Ball fällt dann auf der Seite von Team A ins Aus. Wer macht den Fehler?',['Team B','Team A','Doppelfehler','Keiner, Wiederholung'],0,'Geht ein solcher Ball ins Aus, ist es der Fehler der Mannschaft auf der gegenüberliegenden Seite, hier also Team B.','9.1.2.2'],
[50,'spiel','Ein Spieler hält einen Mitspieler zurück, damit dieser nicht ins Netz fällt. Wie entscheidest du?',['Erlaubt','Unterstützter Schlag','Behinderung','Verwarnung'],0,'Ein Spieler, der gleich einen Fehler machen würde, darf von einem Mitspieler aufgehalten werden.','9.1.3'],
[51,'spiel','Darf der Ball mit dem Fuß gespielt werden?',['Ja, mit jedem Körperteil','Nein, nur oberhalb der Hüfte','Nur bei der Annahme','Nur vom Libero'],0,'Der Ball darf jeden Körperteil berühren.','9.2.1'],
[52,'spiel','Der Ball berührt die Hallendecke und fällt ins gegnerische Feld. Wie ist die Entscheidung?',['Aus','Weiterspielen','Wiederholung','Weiterspielen, wenn noch eine Berührung übrig ist'],0,'Ein Ball, der die Decke berührt, ist aus.','8.4.2'],
[53,'spiel','Ein Ball landet mit einem kleinen Teil auf der Seitenlinie. Entscheidung?',['In','Aus','Wiederholung','Je nach Linienrichter'],0,'Der Ball ist „in“, wenn irgendein Teil bei Bodenkontakt das Feld oder die Linien berührt.','8.3'],
[54,'spiel','Welcher Fehler liegt vor, wenn ein Spieler den Ball zweimal nacheinander spielt (nicht beim Block, nicht bei der ersten Berührung)?',['Doppelberührung','Gehaltener Ball','Vier Berührungen','Unterstützter Schlag'],0,'Zweimal hintereinander spielen oder nacheinander verschiedene Körperteile berühren ist eine Doppelberührung.','9.3.4'],
[55,'spiel','Der Ball berührt das Netz außerhalb der Seitenbänder. Entscheidung?',['Aus','Weiterspielen','Wiederholung','Nur aus, wenn er dann den Boden berührt'],0,'Berührt der Ball Antenne, Seile, Pfosten oder das Netz außerhalb der Seitenbänder, ist er aus.','8.4.3'],
[56,'netz','Wodurch ist der Überquerungsraum begrenzt?',['Netzoberkante, Antennen samt gedachter Verlängerung, Decke','Netzoberkante, Pfosten, Decke','Netzunterkante, Antennen, 7 m Höhe','Seitenbänder, Netzoberkante, Hallenwand'],0,'Unten Netzoberkante, seitlich Antennen und ihre gedachte Verlängerung, oben die Decke.','10.1.1'],
[57,'netz','Nach der 1. Berührung fliegt der Ball außerhalb der Antenne in die gegnerische Freizone. Darf er zurückgeholt werden?',['Ja, außerhalb der Antenne auf derselben Seite zurück, ohne das gegnerische Feld zu betreten','Nein, er ist sofort aus','Ja, auch durch den Überquerungsraum','Nur vom Libero'],0,'Nach der ersten Mannschaftsberührung ist das Zurückholen erlaubt, wenn der Ball auf derselben Seite außerhalb zurückgespielt wird.','10.1.2'],
[58,'netz','Nach der 3. Berührung fliegt der Ball außerhalb der Antenne Richtung gegnerische Freizone. Was gilt seit 2025?',['Der Ball ist aus, sobald er die Netzebene überquert','Er darf zurückgeholt werden','Er ist erst aus, wenn er den Boden berührt','Wiederholung'],0,'Neu 10.1.2.3: Nach der 2. oder 3. Berührung darf ein solcher Ball nicht zurückgespielt werden, er ist aus, sobald er die Netzebene überquert.','10.1.2.3'],
[59,'netz','Ein Ball wird ins Netz geschlagen und zerreißt es. Was passiert?',['Der Ballwechsel wird annulliert und wiederholt','Punkt für den Gegner','Weiterspielen','Punkt für die angreifende Mannschaft'],0,'Zerreißt der Ball die Maschen oder reißt das Netz herunter, wird der Ballwechsel wiederholt.','10.3.2'],
[60,'netz','Ein Spieler berührt beim Blocken das Netz zwischen den Antennen. Fehler?',['Ja, Netzberührung während der Aktion des Ballspielens','Nein, nur Berührung der Netzoberkante ist ein Fehler','Nein, beim Block ist Netzberührung erlaubt','Nur wenn er den Ball berührt'],0,'Netzberührung zwischen den Antennen während der Aktion des Ballspielens ist ein Fehler.','11.3.1'],
[61,'netz','Was gehört zur „Aktion des Ballspielens“?',['Absprung, Schlag oder Schlagversuch und sichere Landung','Nur der Moment der Ballberührung','Nur Schlag und Landung','Der ganze Ballwechsel'],0,'Dazu gehören unter anderem Absprung, Schlag (oder Versuch) und die sichere Landung, bereit für eine neue Aktion.','11.3.1'],
[62,'netz','Ein Spieler berührt das Netz außerhalb der Antenne, ohne das Spiel zu beeinflussen. Fehler?',['Nein','Ja','Nur während des Aufschlags','Nur wenn er ein Vorderspieler ist'],0,'Pfosten, Seile oder das Netz außerhalb der Antennen dürfen berührt werden, solange es das Spiel nicht beeinflusst.','11.3.2'],
[63,'netz','Ein Angreifer schlägt den Ball ins Netz, das Netz berührt dadurch einen Blocker. Fehler des Blockers?',['Nein','Ja, Netzberührung','Ja, Behinderung','Doppelfehler'],0,'Wird der Ball ins Netz getrieben und berührt das Netz dadurch einen Gegner, ist das kein Fehler.','11.3.3'],
[64,'netz','Ein Spieler landet mit dem Fuß im gegnerischen Feld, die Ferse ist noch auf der Mittellinie. Entscheidung?',['Erlaubt, solange er nicht behindert','Fehler, Übertreten','Fehler nur, wenn es der Blocker ist','Erlaubt nur nach dem Ballwechsel'],0,'Ein Teil des Fußes bleibt auf der Mittellinie, damit ist es erlaubt, solange der Gegner nicht behindert wird.','11.2.2.1'],
[65,'netz','Ein Spieler berührt mit der Hand (Füße im eigenen Feld) das gegnerische Feld, ohne jemanden zu behindern. Entscheidung?',['Erlaubt','Fehler','Nur beim Block erlaubt','Verzögerung'],0,'Körperteile oberhalb der Füße dürfen das gegnerische Feld berühren, wenn sie nicht behindern.','11.2.2.2'],
[66,'netz','Der Blocker berührt den Ball jenseits des Netzes, bevor der Gegner einen Angriffsschlag ausgeführt hat. Entscheidung?',['Fehler: Übergreifen','Erlaubt','Erlaubt, wenn der Ball Richtung Netz fliegt','Doppelfehler'],0,'Beim Block ist es nicht erlaubt, den Ball jenseits des Netzes vor dem gegnerischen Angriffsschlag zu berühren.','14.3'],
[67,'netz','Nach dem eigenen Angriffsschlag gerät die Hand des Angreifers über das Netz. Fehler?',['Nein, wenn die Ballberührung im eigenen Raum war','Ja, immer','Nur wenn er das Netz nicht berührt','Ja, wenn der Ball danach aus ist'],0,'Nach einem Angriffsschlag darf die Hand über das Netz, sofern der Kontakt im eigenen Spielraum stattfand.','11.1.2'],
[68,'aufschlag','Wie viel Zeit hat der Aufschläger nach dem Pfiff?',['8 Sekunden','5 Sekunden','10 Sekunden','15 Sekunden'],0,'Der Aufschlag muss innerhalb von 8 Sekunden nach dem Pfiff des 1. SR erfolgen.','12.4.4'],
[69,'aufschlag','Ein Aufschlag wird vor dem Pfiff ausgeführt. Was passiert?',['Er wird annulliert und wiederholt','Aufschlagfehler','Punkt, wenn er gut war','Verzögerungsverwarnung'],0,'Ein Aufschlag vor dem Pfiff wird annulliert und wiederholt.','12.4.5'],
[70,'aufschlag','Wie oft darf der Aufschläger den Ball hochwerfen?',['Einmal, Prellen ist erlaubt','Zweimal','Beliebig oft innerhalb 8 s','Einmal, Prellen ist verboten'],0,'Nur ein Hochwurf oder Loslassen ist erlaubt. Prellen oder den Ball in den Händen bewegen ist erlaubt.','12.4.2'],
[71,'aufschlag','Der Aufschlag berührt die Netzkante und fällt ins gegnerische Feld. Entscheidung?',['Gültig, weiterspielen','Aufschlagfehler','Wiederholung','Punkt für die annehmende Mannschaft'],0,'Der Ball darf beim Überqueren das Netz berühren, auch beim Aufschlag.','10.2'],
[72,'aufschlag','Was ist den Spielern der aufschlagenden Mannschaft während des Aufschlags verboten?',['Die Hände über den Kopf zu heben, bis der Ball das Netz passiert hat','Sich zu bewegen','Neben dem Netz zu stehen','Miteinander zu sprechen'],0,'Laut 12.5.3 ist es verboten, während des Aufschlags die Hände über den Kopf zu heben.','12.5.3'],
[73,'aufschlag','Wann liegt KEIN Sichtblock vor?',['Wenn die Annahme den Aufschlagschlag oder die Flugbahn sehen kann','Wenn nur ein Spieler abschirmt','Wenn die Spieler stillstehen','Wenn der Aufschlag gut ist'],0,'Ein Sichtblock setzt voraus, dass Schlag UND Flugbahn verdeckt sind. Ist eines sichtbar, ist es kein Sichtblock.','12.5.2'],
[74,'aufschlag','Ein Vorderspieler blockt den gegnerischen Aufschlag. Entscheidung?',['Fehler','Erlaubt','Erlaubt, wenn der Ball über Netzhöhe ist','Wiederholung'],0,'Einen Aufschlag zu blocken ist verboten.','14.5'],
[75,'aufschlag','Ein Spieler greift den gegnerischen Aufschlag in der Vorderzone an, der Ball ist vollständig über Netzhöhe. Entscheidung?',['Fehler','Erlaubt, wenn es ein Vorderspieler ist','Erlaubt','Nur bei Sprungaufschlag ein Fehler'],0,'Kein Spieler darf einen Angriffsschlag auf den gegnerischen Aufschlag vollenden, wenn der Ball in der Vorderzone vollständig über der Netzoberkante ist.','13.2.4'],
[76,'aufschlag','Ein Hinterspieler springt hinter der Angriffslinie ab und landet in der Vorderzone. Der Ball war beim Schlag über Netzhöhe. Entscheidung?',['Erlaubt','Angriffsfehler','Fehler, weil er in der Vorderzone gelandet ist','Nur erlaubt, wenn er nicht über das Netz greift'],0,'Absprung hinter der Angriffslinie ist entscheidend, landen darf er in der Vorderzone.','13.2.2'],
[77,'aufschlag','Ein Hinterspieler steht in der Vorderzone und spielt den Ball ins gegnerische Feld; ein Teil des Balles ist unter der Netzoberkante. Entscheidung?',['Erlaubt','Angriffsfehler','Doppelfehler','Nur erlaubt, wenn der Ball langsam ist'],0,'Aus der Vorderzone darf ein Hinterspieler angreifen, wenn der Ball beim Kontakt teilweise unter der Netzoberkante ist.','13.2.3'],
[78,'aufschlag','Wann ist ein Angriffsschlag vollendet?',['Wenn der Ball die Netzebene vollständig überquert oder vom Gegner berührt wird','Bei der Ballberührung','Wenn der Ball den Boden berührt','Wenn der Ball die Netzkante erreicht'],0,'Vollendet ist der Angriffsschlag, sobald der Ball die senkrechte Netzebene ganz überquert oder ein Gegner ihn berührt.','13.1.3'],
[79,'aufschlag','Ein Hinterspieler springt neben dem Blocker hoch und berührt den Ball über Netzhöhe. Entscheidung?',['Blockfehler','Erlaubt','Erlaubt, wenn ein Vorderspieler auch blockt','Angriffsfehler'],0,'Ein Hinterspieler darf keinen Block vollenden und nicht an einem vollendeten Block beteiligt sein.','14.6.2'],
[80,'aufschlag','Was ist keine gültige Aufschlagausführung?',['Den Ball ohne Hochwerfen oder Loslassen direkt aus der Hand schlagen','Mit der Faust schlagen','Mit dem Unterarm schlagen','Aus dem Sprung schlagen'],0,'Geschlagen wird mit einer Hand oder dem Arm, nachdem der Ball hochgeworfen oder losgelassen wurde.','12.4.1'],
[81,'unterbr','Wie viele Auszeiten hat jede Mannschaft pro Satz, und wie lange dauern sie?',['2, je 30 Sekunden','2, je 60 Sekunden','3, je 30 Sekunden','1, 60 Sekunden'],0,'Maximal zwei Auszeiten pro Satz, jede dauert 30 Sekunden.','15.1, 15.4.1'],
[82,'unterbr','Wie viele Spielerwechsel hat eine Mannschaft pro Satz?',['6','5','8','Unbegrenzt'],0,'Maximal sechs Wechsel pro Satz. Libero-Austausche zählen nicht dazu.','15.1'],
[83,'unterbr','Wie oft darf ein Startspieler in einem Satz das Feld verlassen und zurückkommen?',['Je einmal, nur auf seine ursprüngliche Position','Beliebig oft','Zweimal','Einmal verlassen, dann nicht mehr zurück'],0,'Einmal verlassen, einmal zurückkehren, und nur an seine Position in der Aufstellung.','15.6.1'],
[84,'unterbr','Ersatzspieler 8 kam für Startspieler 4. Wer darf Spieler 8 im selben Satz ersetzen?',['Nur Spieler 4','Jeder Ersatzspieler','Jeder Startspieler','Nur der Libero'],0,'Ein Ersatzspieler kann nur vom selben Startspieler ersetzt werden.','15.6.2'],
[85,'unterbr','Was muss zwischen zwei Wechselanträgen derselben Mannschaft liegen?',['Ein abgeschlossener Ballwechsel','Eine Auszeit','Mindestens 2 Punkte','Nichts'],0,'Es muss ein abgeschlossener Ballwechsel dazwischen liegen (Ausnahme: Verletzung, Hinausstellung, Disqualifikation).','15.2.3'],
[86,'unterbr','Darf der Trainer in einem Antrag zwei Spieler gleichzeitig wechseln?',['Ja, sie wechseln nacheinander paarweise','Nein, nur ein Wechsel pro Antrag','Nur zu Satzbeginn','Nur mit Genehmigung des 1. SR'],0,'Zwei oder mehr Spieler dürfen im selben Antrag wechseln. Alle Ersatzspieler betreten gleichzeitig die Auswechselzone.','15.2.2, 15.10.4'],
[87,'unterbr','Ein Spieler ist verletzt, ein regulärer Wechsel ist nicht möglich. Wer darf beim Ausnahmewechsel hinein?',['Jeder Spieler, der nicht am Feld ist, außer den Libero und deren Ersatzspieler','Nur ein Spieler, der in diesem Satz noch nicht gespielt hat','Nur der Libero','Niemand, die Mannschaft ist unvollständig'],0,'Beim Ausnahmewechsel darf jeder Spieler hinein, der nicht am Feld ist, ausgenommen Libero, 2. Libero und ihr regulärer Ersatzspieler.','15.7'],
[88,'unterbr','Die erste unzulässige Anfrage einer Mannschaft im Spiel verzögert das Spiel nicht. Was passiert?',['Zurückweisen und im Spielbericht eintragen, ohne weitere Folgen','Verzögerungsverwarnung','Verzögerungsstrafe','Gelbe Karte für den Trainer'],0,'Die erste unzulässige Anfrage wird zurückgewiesen und eingetragen, ohne weitere Konsequenz. Jede weitere ist eine Verzögerung.','15.11.2'],
[89,'unterbr','Eine Mannschaft verzögert zum zweiten Mal im Spiel. Welche Sanktion folgt?',['Verzögerungsstrafe: Punkt und Aufschlag für den Gegner','Verzögerungsverwarnung','Hinausstellung des Trainers','Keine, wenn es ein neuer Satz ist'],0,'Die zweite und jede weitere Verzögerung im selben Spiel wird mit einer Verzögerungsstrafe geahndet, egal in welchem Satz.','16.2.3'],
[90,'unterbr','Ein verletzter Spieler kann weder regulär noch per Ausnahmewechsel ersetzt werden. Was ist möglich?',['3 Minuten Erholungszeit, einmal pro Spieler und Spiel','Eine zusätzliche Auszeit','Unbegrenzte Behandlungszeit','Spiel mit 5 Spielern'],0,'Der Spieler bekommt 3 Minuten Erholungszeit, höchstens einmal im Spiel. Erholt er sich nicht, ist die Mannschaft unvollständig.','17.1.2'],
[91,'unterbr','Während eines Ballwechsels rollt ein Ball vom Nachbarfeld ins Spielfeld. Was tust du?',['Unterbrechen, Ballwechsel wiederholen','Weiterspielen lassen','Punkt für die Mannschaft, die gestört wurde','Verzögerungsverwarnung'],0,'Bei einer äußeren Störung wird das Spiel gestoppt und der Ballwechsel wiederholt.','17.2'],
[92,'unterbr','Ab wann gilt ein Wechselantrag als gestellt?',['Wenn der Ersatzspieler spielbereit die Auswechselzone betritt','Wenn der Trainer das Handzeichen zeigt','Wenn der Schreiber einträgt','Wenn der 2. SR pfeift'],0,'Der Antrag beginnt mit dem Betreten der Auswechselzone durch den spielbereiten Ersatzspieler. Ein Handzeichen braucht es nur bei Verletzung oder vor Satzbeginn.','15.10.3.1'],
[93,'unterbr','Ein regelwidriger Wechsel wird erst nach Wiederaufnahme des Spiels entdeckt. Folge?',['Punkt und Aufschlag für den Gegner, Wechsel korrigieren, Punkte seit dem Fehler streichen','Nur korrigieren','Verzögerungsverwarnung','Wiederholung des letzten Ballwechsels'],0,'So sieht es 15.9.2 in dieser Reihenfolge vor. Die Punkte des Gegners bleiben gültig.','15.9.2'],
[94,'unterbr','Wo halten sich die Spieler am Feld während einer Auszeit auf?',['In der Freizone nahe ihrer Bank','Auf dem Spielfeld','In der Aufwärmzone','Auf der Bank'],0,'Während der Auszeiten gehen die Spieler in die Freizone nahe ihrer Bank.','15.4.2'],
[95,'unterbr','Ein Spiel wird unterbrochen und nach 5 Stunden fortgesetzt. Was gilt?',['Das ganze Spiel wird wiederholt','Weiter mit gleichem Spielstand','Nur der unterbrochene Satz wird wiederholt','Das Spiel wird für die führende Mannschaft gewertet'],0,'Überschreiten die Unterbrechungen insgesamt 4 Stunden, wird das ganze Spiel wiederholt.','17.3.3'],
[96,'libero','Wie viele Libero darf eine Mannschaft bestimmen?',['Bis zu zwei, am Feld aber nur einer','Genau einen','Bis zu zwei, beide gleichzeitig am Feld','Bis zu drei'],0,'Bis zu zwei Libero, am Feld ist immer nur einer.','19.1'],
[97,'libero','Was darf der Libero NICHT?',['Aufschlagen, blocken oder einen Blockversuch machen','Den Ball pritschen','Kapitän sein','In der Vorderzone baggern'],0,'Der Libero darf nicht aufschlagen, nicht blocken und keinen Blockversuch machen.','19.3.1.3'],
[98,'libero','Der Libero schlägt den Ball aus der Hinterzone ins gegnerische Feld, der Ball war vollständig über Netzhöhe. Entscheidung?',['Angriffsfehler','Erlaubt, weil er hinter der Angriffslinie war','Erlaubt, wenn er nicht gesprungen ist','Blockfehler'],0,'Der Libero darf von nirgendwo einen Angriffsschlag vollenden, wenn der Ball vollständig über der Netzoberkante ist.','19.3.1.2'],
[99,'libero','Der Libero pritscht in seiner Vorderzone, ein Mitspieler schmettert den Ball über Netzhöhe. Entscheidung?',['Angriffsfehler','Erlaubt','Erlaubt, wenn der Libero nicht gesprungen ist','Doppelfehler'],0,'Kommt der Ball aus einem oberen Zuspiel des Libero in dessen Vorderzone, darf er nicht vollständig über Netzhöhe angegriffen werden.','19.3.1.4'],
[100,'libero','Der Libero pritscht hinter der Angriffslinie, ein Mitspieler schmettert über Netzhöhe. Entscheidung?',['Erlaubt','Angriffsfehler','Nur erlaubt, wenn es ein Hinterspieler ist','Doppelfehler'],0,'Macht der Libero dieselbe Aktion außerhalb seiner Vorderzone, ist der Angriff frei.','19.3.1.4'],
[101,'libero','Zählt ein Libero-Austausch als Spielerwechsel?',['Nein, unbegrenzt möglich, aber mit abgeschlossenem Ballwechsel dazwischen','Ja, er zählt zu den 6 Wechseln','Nein, und es braucht keinen Ballwechsel dazwischen','Ja, aber nur jeder zweite'],0,'Libero-Austausche sind keine Wechsel und unbegrenzt, zwischen zwei Austauschen muss aber ein abgeschlossener Ballwechsel liegen.','19.3.2.1'],
[102,'libero','Welche Spieler darf der Libero ersetzen?',['Jeden Hinterspieler','Jeden Spieler','Nur den Spieler auf Position VI','Nur Mittelblocker'],0,'Der Libero darf jeden Spieler auf einer hinteren Position ersetzen.','19.3.1.1'],
[103,'libero','Ein Libero-Austausch erfolgt nach dem Aufschlagpfiff, aber vor dem Schlag. Was tust du beim ersten Mal?',['Nicht zurückweisen; nach dem Ballwechsel den Spielkapitän informieren','Sofort unterbrechen, Verzögerungsstrafe','Aufschlag wiederholen lassen','Punkt für den Gegner'],0,'Beim ersten Mal wird er nicht zurückgewiesen, der Spielkapitän wird nach dem Ballwechsel informiert. Bei Wiederholung: sofort unterbrechen und Verzögerungssanktion.','19.3.2.5'],
[104,'libero','Darf der Libero Mannschaftskapitän sein?',['Ja','Nein','Nur wenn kein anderer Spieler will','Nur Spielkapitän, nicht Mannschaftskapitän'],0,'Die Libero können Mannschafts- oder Spielkapitän sein.','5'],
[105,'libero','Eine Mannschaft hat nur einen Libero, der sich verletzt. Was ist möglich?',['Der Trainer bestimmt einen Spieler, der nicht am Feld ist, zum neuen Libero für den Rest des Spiels','Nichts, sie spielt ohne Libero weiter','Der Libero darf per Ausnahmewechsel durch jeden ersetzt werden','Der verletzte Libero wird nach dem Satz wieder eingesetzt'],0,'Neubestimmung: ein Spieler, der nicht am Feld ist (außer dem regulären Ersatzspieler), wird Libero für den Rest des Spiels.','19.4.2'],
[106,'libero','Wo erfolgt der Libero-Austausch?',['In der Libero-Austauschzone','In der Auswechselzone','Überall entlang der Seitenlinie','Hinter der Grundlinie'],0,'Libero und ersetzter Spieler betreten und verlassen das Feld nur über die Libero-Austauschzone.','19.3.2.7'],
[107,'verhalten','Wie geht der 1. SR bei geringfügigem Fehlverhalten vor?',['Stufe 1 mündlich über den Spielkapitän, Stufe 2 gelbe Karte','Sofort gelbe Karte','Sofort rote Karte','Er ignoriert es'],0,'Zwei Stufen: mündliche Verwarnung über den Spielkapitän, dann gelbe Karte an das Teammitglied.','21.1'],
[108,'verhalten','Welche Folge hat die erste Unhöflichkeit eines Teammitglieds?',['Bestrafung: rote Karte, Punkt und Aufschlag für den Gegner','Gelbe Karte ohne Folge','Hinausstellung','Disqualifikation'],0,'Die erste Unhöflichkeit wird mit einer Bestrafung geahndet.','21.3.1'],
[109,'verhalten','Ein Spieler beleidigt zum ersten Mal den Schiedsrichter. Sanktion?',['Hinausstellung (rot und gelb gemeinsam)','Bestrafung (rot)','Verwarnung (gelb)','Disqualifikation'],0,'Die erste Beleidigung wird mit Hinausstellung bestraft, ohne weitere Konsequenzen.','21.3.2.2'],
[110,'verhalten','Ein Spieler greift einen Gegner tätlich an. Sanktion?',['Disqualifikation (rot und gelb getrennt)','Hinausstellung','Bestrafung','Verzögerungsstrafe'],0,'Ein körperlicher Angriff oder eine Drohung führt sofort zur Disqualifikation.','21.3.3.2'],
[111,'verhalten','Wie lange muss ein hinausgestellter Spieler draußen bleiben?',['Bis zum Ende des laufenden Satzes, in der Umkleide','Bis zum Ende des Spiels','Zwei Ballwechsel lang','Er darf auf der Bank bleiben'],0,'Hinausstellung: Rest des Satzes in der Umkleide. Disqualifikation: Rest des Spiels.','21.3.2.1'],
[112,'verhalten','Derselbe Spieler ist zum zweiten Mal im Spiel unhöflich. Sanktion?',['Hinausstellung','Bestrafung','Disqualifikation','Gelbe Karte'],0,'2. Unhöflichkeit derselben Person: Hinausstellung. 3. Unhöflichkeit: Disqualifikation.','21.3.2.3'],
[113,'verhalten','Wie zeigt der 1. SR eine Disqualifikation an?',['Rote und gelbe Karte getrennt, in jeder Hand eine','Beide Karten gemeinsam in einer Hand','Nur die rote Karte','Rote Karte ans Handgelenk'],0,'Getrennt gezeigt = Disqualifikation. Gemeinsam in einer Hand = Hinausstellung.','21.6'],
[114,'verhalten','Ein Spieler wird zwischen dem 2. und 3. Satz unhöflich. Wann greift die Sanktion?',['Im folgenden Satz','Sofort, der 2. Satz wird neu gewertet','Gar nicht, zwischen den Sätzen gibt es keine Sanktionen','Im nächsten Spiel'],0,'Fehlverhalten vor oder zwischen den Sätzen wird nach 21.3 sanktioniert, die Sanktion gilt im folgenden Satz.','21.5'],
[115,'verhalten','Was unterscheidet Verzögerungs- von Fehlverhaltenssanktionen?',['Verzögerungssanktionen treffen die Mannschaft, Fehlverhaltenssanktionen die einzelne Person','Beide treffen die Mannschaft','Verzögerungssanktionen gelten nur für einen Satz','Es gibt keinen Unterschied'],0,'Verzögerungssanktionen sind Mannschaftssanktionen (16.2.1), Fehlverhaltenssanktionen individuell (21.4.1). Beide gelten für das ganze Spiel.','16.2.1, 21.4.1'],
[116,'sr','Wer darf während des Spiels pfeifen?',['Nur der 1. und der 2. Schiedsrichter','Alle Mitglieder des Schiedsgerichts','Auch die Linienrichter','Auch der Schreiber'],0,'Nur der 1. und der 2. SR dürfen pfeifen. Der Schreiber meldet mit dem Summer.','22.2.1'],
[117,'sr','In welcher Reihenfolge zeigt der 1. SR nach seinem Pfiff?',['Aufschlagende Mannschaft, Art des Fehlers, Spieler','Art des Fehlers, Spieler, aufschlagende Mannschaft','Spieler, Art des Fehlers, aufschlagende Mannschaft','Nur die aufschlagende Mannschaft'],0,'1. SR: a) aufschlagende Mannschaft, b) Art des Fehlers, c) Spieler, wenn nötig.','22.2.3.1'],
[118,'sr','Der 2. SR pfeift einen Fehler. Was zeigt er?',['Art des Fehlers, Spieler, dann folgt er dem Zeichen des 1. SR für die aufschlagende Mannschaft','Zuerst die aufschlagende Mannschaft','Nur den Spieler','Er zeigt nichts, das macht der 1. SR'],0,'2. SR: a) Art des Fehlers, b) Spieler, c) aufschlagende Mannschaft nach dem Zeichen des 1. SR.','22.2.3.2'],
[119,'sr','Wie hoch ist der Blick des 1. SR über dem Netz?',['Etwa 50 cm','Etwa 1 m','Auf Netzhöhe','Etwa 20 cm'],0,'Er steht auf dem Schiedsrichterstuhl, sein Blick liegt etwa 50 cm über dem Netz.','23.1'],
[120,'sr','Wer genehmigt Auszeiten und Spielerwechsel?',['Der 2. Schiedsrichter','Der 1. Schiedsrichter','Der Schreiber','Der Spielkapitän'],0,'Der 2. SR genehmigt die regulären Unterbrechungen, kontrolliert ihre Dauer und weist unzulässige Anträge ab.','24.2.6'],
[121,'sr','Was meldet der 2. SR dem 1. SR und dem Trainer?',['Die 2. Auszeit sowie den 5. und 6. Wechsel','Jeden Wechsel','Nur den 6. Wechsel','Die 1. Auszeit'],0,'Er meldet die zweite Auszeit und den fünften und sechsten Wechsel.','24.2.7'],
[122,'sr','Wer entscheidet vorrangig über die Netzberührung auf der Blockerseite?',['Der 2. SR','Der 1. SR','Der Linienrichter','Der Schreiber'],0,'Der 2. SR vor allem auf der Blockerseite, der 1. SR vor allem auf der Angreiferseite, jeweils nicht ausschließlich.','24.3.2.3'],
[123,'sr','Wie groß sind die Flaggen der Linienrichter?',['40 × 40 cm','30 × 30 cm','50 × 50 cm','40 × 30 cm'],0,'Die Linienrichter verwenden Flaggen von 40 × 40 cm.','29.2.1'],
[124,'sr','Wo stehen zwei Linienrichter?',['An den Ecken rechts vom jeweiligen Schiedsrichter, diagonal 1–2 m von der Ecke','Beide auf der Seite des Schreibers','Neben den Schiedsrichtern','Hinter den Grundlinien in der Mitte'],0,'Bei zwei Linienrichtern stehen sie an den Ecken, die der rechten Hand jedes Schiedsrichters am nächsten sind.','29.1'],
[125,'sr','Was sagt der Schreiber im Entscheidungssatz besonders an?',['Den 8. Punkt','Den 10. Punkt','Jeden Punkt über 10','Den 13. Punkt'],0,'Der Schreiber zeigt das Satzende und den 8. Punkt im Entscheidungssatz an (Seitenwechsel).','27.2.2.5'],
[126,'sr','In welcher Reihenfolge wird der Spielbericht am Ende unterschrieben?',['Schreiber, Kapitäne, Schiedsrichter','Schiedsrichter, Kapitäne, Schreiber','Kapitäne, Schreiber, Schiedsrichter','Trainer, Schreiber, Schiedsrichter'],0,'Der Schreiber unterschreibt selbst, dann die Mannschaftskapitäne, dann die Schiedsrichter.','27.2.3.3'],
[127,'sr','Der 2. SR sieht einen Fehler außerhalb seines Bereichs. Was darf er?',['Ohne Pfiff anzeigen, aber nicht darauf bestehen','Pfeifen und entscheiden','Nichts','Den 1. SR überstimmen'],0,'Er darf ohne Pfiff anzeigen, aber nicht beim 1. SR darauf bestehen.','24.2.2'],
[128,'sr','Wann kontrolliert der 2. SR die Positionen der Spieler mit dem Aufstellungsblatt?',['Zu Satzbeginn, beim Seitenwechsel im 5. Satz und wenn nötig','Nur vor dem 1. Satz','Nach jeder Auszeit','Nie, das macht der Schreiber'],0,'Zu Beginn jedes Satzes, beim Seitenwechsel im Entscheidungssatz und wann immer es nötig ist.','24.3.1'],
[129,'sr','Darf der 1. SR eine Entscheidung eines anderen Mitglieds des Schiedsgerichts aufheben?',['Ja, wenn er merkt, dass sie falsch ist','Nein, nie','Nur die des Schreibers','Nur mit Zustimmung des 2. SR'],0,'Der 1. SR hat Autorität über das ganze Schiedsgericht und kann Entscheidungen aufheben.','23.2.1'],
[130,'sr','Wer meldet einen Rotationsfehler (falscher Aufschläger)?',['Der Schreiber mit dem Summer, nach dem Aufschlagschlag','Der Linienrichter','Der Trainer des Gegners','Der 1. SR vor dem Aufschlag'],0,'Der Schreiber kontrolliert die Aufschlagfolge und meldet einen Fehler sofort nach dem Aufschlagschlag.','27.2.2.2']
];

/* Offizielle Handzeichen. who: F = 1. SR, FS = 1. und 2. SR, L = Linienrichter */
const SIG = [
{id:'1', n:'Aufschlaggenehmigung', d:'Mit der Hand die Richtung des Aufschlags anzeigen.', r:'12.3', who:'F', sit:'Beide Mannschaften sind bereit, der Aufschläger hat den Ball.'},
{id:'2', n:'Aufschlagende Mannschaft', d:'Den Arm zur Seite der Mannschaft ausstrecken, die als Nächstes aufschlägt.', r:'22.2.3', who:'FS', sit:'Nach jedem Pfiff: Wer schlägt als Nächstes auf?'},
{id:'3', n:'Seitenwechsel', d:'Unterarme vor und hinter dem Körper heben und um den Körper drehen.', r:'18.2', who:'F', sit:'Die führende Mannschaft erreicht im 5. Satz den 8. Punkt.'},
{id:'4', n:'Auszeit', d:'Die Handfläche einer Hand auf die Finger der anderen, senkrecht gehaltenen Hand legen (ein „T“), dann die Mannschaft anzeigen.', r:'15.4.1', who:'FS', sit:'Der Trainer beantragt eine Unterbrechung von 30 Sekunden.'},
{id:'5', n:'Spielerwechsel', d:'Kreisbewegung der Unterarme umeinander.', r:'15.5', who:'FS', sit:'Ein Ersatzspieler betritt spielbereit die Auswechselzone.'},
{id:'6a', n:'Verwarnung (Fehlverhalten)', d:'Gelbe Karte zeigen.', r:'21.1', who:'F', sit:'Stufe 2 bei geringfügigem Fehlverhalten.'},
{id:'6b', n:'Bestrafung (Fehlverhalten)', d:'Rote Karte zeigen.', r:'21.3.1', who:'F', sit:'Erste Unhöflichkeit eines Teammitglieds.'},
{id:'7', n:'Hinausstellung', d:'Rote und gelbe Karte gemeinsam (in einer Hand) zeigen.', r:'21.3.2', who:'F', sit:'Ein Spieler beleidigt zum ersten Mal den Schiedsrichter.'},
{id:'8', n:'Disqualifikation', d:'Rote und gelbe Karte getrennt (in jeder Hand eine) zeigen.', r:'21.3.3', who:'F', sit:'Ein Spieler stößt einen Gegner absichtlich.'},
{id:'9', n:'Satz- oder Spielende', d:'Unterarme vor der Brust kreuzen, Hände offen.', r:'6.2, 6.3', who:'FS', sit:'Eine Mannschaft erreicht 25:23.'},
{id:'10', n:'Ball beim Aufschlag nicht hochgeworfen/losgelassen', d:'Den gestreckten Arm heben, Handfläche nach oben.', r:'12.4.1', who:'F', sit:'Der Aufschläger schlägt den Ball direkt aus der Hand.'},
{id:'11', n:'Verzögerung beim Aufschlag', d:'Acht Finger gespreizt hochhalten.', r:'12.4.4', who:'F', sit:'Der Aufschläger braucht mehr als 8 Sekunden.'},
{id:'12', n:'Blockfehler oder Sichtblock', d:'Beide Arme senkrecht heben, Handflächen nach vorne.', r:'12.5, 14.6', who:'FS', sit:'Ein Hinterspieler beteiligt sich an einem vollendeten Block.'},
{id:'13', n:'Positions- oder Rotationsfehler', d:'Mit dem Zeigefinger eine Kreisbewegung machen.', r:'7.5, 7.7', who:'FS', sit:'Position VI steht beim Aufschlagschlag vor Position III.'},
{id:'14', n:'Ball „in“', d:'Mit Arm und Fingern auf den Boden zeigen.', r:'8.3', who:'F', sit:'Der Ball landet auf der Grundlinie.'},
{id:'15', n:'Ball „aus“', d:'Unterarme senkrecht heben, Hände offen, Handflächen zum Körper.', r:'8.4', who:'FS', sit:'Der Ball berührt die Antenne.'},
{id:'16', n:'Gehaltener Ball', d:'Den Unterarm langsam heben, Handfläche nach oben.', r:'9.3.3', who:'F', sit:'Der Ball wird gefangen und geworfen statt gespielt.'},
{id:'17', n:'Doppelberührung', d:'Zwei Finger gespreizt hochhalten.', r:'9.3.4', who:'F', sit:'Der Zuspieler berührt den Ball zweimal hintereinander.'},
{id:'18', n:'Vier Berührungen', d:'Vier Finger gespreizt hochhalten.', r:'9.3.1', who:'F', sit:'Eine Mannschaft spielt den Ball ohne Block viermal.'},
{id:'19', n:'Netzberührung / Aufschlag berührt das Netz und überquert es nicht', d:'Mit der entsprechenden Hand die betreffende Netzseite anzeigen.', r:'11.4.4, 12.6.2.1', who:'FS', sit:'Der Blocker streift bei der Landung die Netzkante.'},
{id:'20', n:'Übergreifen', d:'Eine Hand über das Netz halten, Handfläche nach unten.', r:'11.4.1, 14.6.1', who:'F', sit:'Der Blocker berührt den Ball jenseits des Netzes vor dem gegnerischen Angriffsschlag.'},
{id:'21', n:'Angriffsfehler', d:'Mit offener Hand eine Abwärtsbewegung des Unterarms machen.', r:'13.3', who:'FS', sit:'Ein Hinterspieler greift aus der Vorderzone über Netzhöhe an.'},
{id:'22', n:'Übertreten / Ball unter dem Netz / Fußfehler beim Aufschlag', d:'Auf die Mittellinie oder die betreffende Linie zeigen.', r:'11.2.2, 12.4.3', who:'FS', sit:'Ein Fuß landet vollständig im gegnerischen Feld.'},
{id:'23', n:'Doppelfehler und Wiederholung', d:'Beide Daumen senkrecht hochhalten.', r:'6.1.2.2, 17.2', who:'F', sit:'Beide Mannschaften begehen gleichzeitig einen Fehler.'},
{id:'24', n:'Ball berührt', d:'Mit der Handfläche einer Hand über die Finger der anderen, senkrecht gehaltenen Hand streichen.', r:'24.2.2', who:'F', sit:'Der Angriff streift die Blockhand und geht ins Aus.'},
{id:'25', n:'Verzögerungsverwarnung / Verzögerungsstrafe', d:'Gelbe (Verwarnung) bzw. rote Karte (Strafe) ans Handgelenk halten.', r:'16.2', who:'F', sit:'Eine Mannschaft verzögert das Spiel.'},
{id:'L1', n:'Linienrichter: Ball „in“', d:'Mit der Flagge nach unten zeigen.', r:'29.2.1.1', who:'L', sit:'Der Ball landet knapp auf der Linie.'},
{id:'L2', n:'Linienrichter: Ball „aus“', d:'Die Flagge senkrecht hochhalten.', r:'29.2.1.1', who:'L', sit:'Der Ball landet klar hinter der Grundlinie.'},
{id:'L3', n:'Linienrichter: Ball berührt', d:'Flagge heben und die Spitze mit der Handfläche der freien Hand berühren.', r:'29.2.1.2', who:'L', sit:'Die Annahme berührt den Ball, bevor er ins Aus fliegt.'},
{id:'L4', n:'Linienrichter: Überquerungsfehler, Fremdkörper, Fußfehler', d:'Die Flagge über dem Kopf schwenken und auf Antenne oder Linie zeigen.', r:'29.2.1.3–29.2.1.7', who:'L', sit:'Der Aufschläger tritt beim Absprung auf die Grundlinie.'},
{id:'L5', n:'Linienrichter: Beurteilung unmöglich', d:'Beide Arme und Hände vor der Brust kreuzen.', r:'29.2', who:'L', sit:'Die Sicht des Linienrichters war verdeckt.'}
];

/* Situationen: Entscheidung, danach Handzeichen. sig: null = kein Pfiff/Zeichen nötig */
const SIT = [
{t:'Heim nimmt an. Beim Aufschlagschlag steht Heim-Spieler VI näher an der Mittellinie als Spieler III.', o:['Positionsfehler Heim: Punkt und Aufschlag für Gast','Weiterspielen','Wiederholung','Punkt für Heim'], c:0, sig:'13', who:'2. SR', e:'VI muss weiter von der Mittellinie entfernt sein als III. Den Positionsfehler der annehmenden Mannschaft pfeift der 2. SR.', r:'7.4.2.1, 24.3.2.2'},
{t:'Gast schlägt auf. Beim Aufschlagschlag steht der Gast-Zuspieler, laut Aufstellung auf Position V, schon vorne rechts am Netz.', o:['Weiterspielen, die aufschlagende Mannschaft ist seit 2025 frei','Positionsfehler Gast','Wiederholung','Verzögerungsverwarnung'], c:0, sig:null, who:'niemand', e:'Seit 2025 dürfen die Spieler der aufschlagenden Mannschaft jede Position einnehmen, sie müssen nur im eigenen Feld stehen.', r:'7.4'},
{t:'Der Heim-Aufschläger braucht nach dem Pfiff 9 Sekunden, bevor er schlägt.', o:['Aufschlagfehler: Punkt und Aufschlag für Gast','Weiterspielen','Aufschlag wiederholen','Verzögerungsverwarnung für Heim'], c:0, sig:'11', who:'1. SR', e:'Der Aufschlag muss innerhalb von 8 Sekunden nach dem Pfiff erfolgen.', r:'12.4.4'},
{t:'Der Heim-Aufschlag streift die Netzkante und fällt ins Feld von Gast.', o:['Weiterspielen, der Aufschlag ist gültig','Aufschlagfehler','Wiederholung','Punkt für Gast'], c:0, sig:null, who:'niemand', e:'Der Ball darf beim Überqueren das Netz berühren, auch beim Aufschlag.', r:'10.2'},
{t:'Der Gast-Aufschlag berührt das Netz und fällt auf die eigene Seite zurück.', o:['Aufschlagfehler: Punkt und Aufschlag für Heim','Aufschlag wiederholen','Weiterspielen','Doppelfehler'], c:0, sig:'19', who:'1. SR', e:'Der Ball hat die Netzebene nicht vollständig durch den Überquerungsraum überquert. Zeichen: auf die Netzseite zeigen.', r:'12.6.2.1'},
{t:'Der Heim-Mittelblocker streift bei der Landung nach dem Block die Netzoberkante zwischen den Antennen.', o:['Netzfehler Heim: Punkt und Aufschlag für Gast','Weiterspielen, der Ball war schon weg','Doppelfehler','Wiederholung'], c:0, sig:'19', who:'2. SR (Blockerseite)', e:'Die Landung gehört zur Aktion des Ballspielens. Netzberührung zwischen den Antennen ist dann ein Fehler. Auf der Blockerseite pfeift vor allem der 2. SR.', r:'11.3.1, 24.3.2.3'},
{t:'Der Gast-Diagonalspieler (Position I) springt ab und tritt dabei auf die Angriffslinie. Er schlägt den Ball über Netzhöhe ins Heim-Feld.', o:['Angriffsfehler Gast: Punkt und Aufschlag für Heim','Weiterspielen','Blockfehler','Nur Verwarnung'], c:0, sig:'21', who:'1. SR (auch 2. SR)', e:'Beim Absprung darf ein Hinterspieler die Angriffslinie weder berühren noch überschreiten, wenn der Ball über Netzhöhe ist.', r:'13.2.2.1, 13.3.3'},
{t:'Der Heim-Libero spielt in seiner Vorderzone ein oberes Zuspiel mit den Fingern. Der Außenangreifer schmettert den Ball über Netzhöhe.', o:['Angriffsfehler Heim','Weiterspielen','Doppelfehler','Blockfehler Heim'], c:0, sig:'21', who:'1. SR (auch 2. SR)', e:'Nach einem oberen Zuspiel des Libero in seiner Vorderzone darf kein Angriff über Netzhöhe vollendet werden.', r:'19.3.1.4'},
{t:'Der Gast-Libero pritscht einen Meter hinter der Angriffslinie, der Mittelblocker schmettert über Netzhöhe.', o:['Weiterspielen','Angriffsfehler Gast','Doppelberührung','Wiederholung'], c:0, sig:null, who:'niemand', e:'Außerhalb seiner Vorderzone darf der Libero oben zuspielen, der Angriff ist frei.', r:'19.3.1.4'},
{t:'Heim blockt, danach spielt Heim den Ball noch dreimal und schlägt ihn ins Gast-Feld.', o:['Weiterspielen, der Block zählt nicht als Berührung','Vier Berührungen Heim','Doppelberührung','Wiederholung'], c:0, sig:null, who:'niemand', e:'Nach einem Block hat die Mannschaft drei Berührungen.', r:'14.4.1'},
{t:'Gast spielt den Ball ohne Block viermal, bevor er übers Netz geht.', o:['Vier Berührungen: Punkt und Aufschlag für Heim','Weiterspielen','Doppelberührung','Wiederholung'], c:0, sig:'18', who:'1. SR', e:'Maximal drei Berührungen pro Mannschaft, der Block ausgenommen.', r:'9.3.1'},
{t:'Der Heim-Zuspieler spielt die 2. Berührung. Der Ball berührt erst seine linke, dann deutlich getrennt seine rechte Hand.', o:['Doppelberührung Heim','Weiterspielen','Gehaltener Ball','Vier Berührungen'], c:0, sig:'17', who:'1. SR', e:'Nacheinander verschiedene Körperteile berühren ist nur beim Block und bei der ersten Mannschaftsberührung erlaubt.', r:'9.3.4'},
{t:'Bei der Gast-Annahme (1. Berührung) springt der Ball vom Unterarm gegen die Schulter, alles in einer Bewegung.', o:['Weiterspielen','Doppelberührung Gast','Gehaltener Ball','Wiederholung'], c:0, sig:null, who:'niemand', e:'Bei der ersten Mannschaftsberührung sind aufeinanderfolgende Kontakte innerhalb einer Aktion erlaubt.', r:'9.2.3.2'},
{t:'Ein Heim-Angriff landet so, dass der Ball die Seitenlinie gerade noch berührt.', o:['Ball in: Punkt für Heim','Ball aus: Punkt für Gast','Wiederholung','Linienrichter entscheidet allein'], c:0, sig:'14', who:'1. SR (Linienrichter zeigt an)', e:'Die Linien gehören zum Feld. Linienrichter: Flagge nach unten.', r:'8.3'},
{t:'Der Gast-Angriff streift die Fingerspitzen des Heim-Blocks und landet weit hinter der Grundlinie.', o:['Punkt für Gast, der Ball wurde berührt','Punkt für Heim, Ball aus','Wiederholung','Doppelfehler'], c:0, sig:'24', who:'1. SR (Linienrichter zeigt „berührt“)', e:'Der Block hat den Ball zuletzt berührt, damit ist der Ball für Heim aus. Das Zeichen „Ball berührt“ zeigt das an.', r:'14.6.4, 29.2.1.2'},
{t:'Die 3. Heim-Berührung fliegt außerhalb der Antenne Richtung Gast-Freizone. Ein Gast-Spieler will ihn zurückspielen.', o:['Ball aus beim Überqueren der Netzebene: Punkt für Gast','Weiterspielen','Wiederholung','Gast darf zurückspielen'], c:0, sig:'15', who:'1. oder 2. SR (je nach Seite)', e:'Neu seit 2025: Nach der 2. oder 3. Berührung ist ein solcher Ball aus, sobald er die Netzebene außerhalb des Überquerungsraums überquert.', r:'10.1.2.3'},
{t:'Gleichzeitig berührt ein Heim-Spieler das Netz, während ein Gast-Spieler mit dem ganzen Fuß ins Heim-Feld tritt.', o:['Doppelfehler: Wiederholung','Punkt für Gast','Punkt für Heim','Weiterspielen'], c:0, sig:'23', who:'1. und 2. SR', e:'Gleichzeitige Fehler beider Mannschaften sind ein Doppelfehler.', r:'6.1.2.2'},
{t:'Mitten im Ballwechsel rollt ein Ball vom Nachbarfeld ins Spielfeld.', o:['Unterbrechen und wiederholen','Weiterspielen','Punkt für die angreifende Mannschaft','Verzögerungsverwarnung'], c:0, sig:'23', who:'1. SR', e:'Äußere Störung: Spiel stoppen und den Ballwechsel wiederholen. Das Zeichen ist dasselbe wie beim Doppelfehler.', r:'17.2'},
{t:'Der Heim-Trainer beantragt im 2. Satz eine dritte Auszeit. Es ist die erste unzulässige Anfrage von Heim, das Spiel wird dadurch nicht verzögert.', o:['Zurückweisen und eintragen, keine Sanktion','Verzögerungsverwarnung','Verzögerungsstrafe','Auszeit gewähren'], c:0, sig:null, who:'2. SR', e:'Die erste unzulässige Anfrage ohne Verzögerung wird zurückgewiesen und im Spielbericht eingetragen, ohne weitere Folgen.', r:'15.11.2'},
{t:'Ein Gast-Spieler beschimpft den 1. SR mit einem beleidigenden Wort. Es ist sein erstes Vergehen.', o:['Hinausstellung für den Rest des Satzes','Bestrafung, Punkt für Heim','Verwarnung mit gelber Karte','Disqualifikation'], c:0, sig:'7', who:'1. SR', e:'Die erste Beleidigung führt zur Hinausstellung: rot und gelb gemeinsam in einer Hand.', r:'21.3.2.2'},
{t:'Der Gast-Zuspieler spielt den Ball parallel zum Netz für seinen Angreifer. Der Heim-Blocker greift über das Netz und berührt den Ball, bevor der Angreifer schlagen kann.', o:['Fehler Heim: Übergreifen','Weiterspielen','Doppelfehler','Wiederholung'], c:0, sig:'20', who:'1. SR', e:'Der Blocker darf den Ball jenseits des Netzes nicht vor dem gegnerischen Angriffsschlag berühren.', r:'14.3, 14.6.1'},
{t:'Ein Heim-Spieler landet nach dem Angriff mit dem ganzen Fuß im Gast-Feld, kein Teil des Fußes ist mehr über der Mittellinie.', o:['Fehler Heim: Übertreten','Weiterspielen, er hat niemanden behindert','Wiederholung','Doppelfehler'], c:0, sig:'22', who:'2. SR', e:'Ein Fuß vollständig im gegnerischen Feld ist ein Fehler, auch ohne Behinderung.', r:'11.4.3, 24.3.2.1'},
{t:'Gast schlägt auf. Zwei Gast-Spieler stehen eng nebeneinander vor dem Aufschläger und heben die Arme über den Kopf. Die Heim-Annahme sieht weder Schlag noch Flugbahn.', o:['Sichtblock: Punkt und Aufschlag für Heim','Weiterspielen','Wiederholung','Verwarnung für Gast'], c:0, sig:'12', who:'1. SR', e:'Schlag und Flugbahn sind verdeckt, außerdem dürfen die Spieler der aufschlagenden Mannschaft die Hände nicht über den Kopf heben.', r:'12.5'},
{t:'Der Heim-Aufschläger tritt beim Absprung zum Sprungaufschlag auf die Grundlinie.', o:['Aufschlagfehler: Punkt und Aufschlag für Gast','Weiterspielen, er war schon in der Luft','Wiederholung','Nur Verwarnung'], c:0, sig:'22', who:'1. SR (Linienrichter zeigt an)', e:'Beim Schlag bzw. Absprung darf der Aufschläger das Feld inklusive Grundlinie nicht berühren.', r:'12.4.3'},
{t:'Ein Gast-Spieler fängt den Ball bei der Abwehr kurz und wirft ihn dann zum Zuspieler.', o:['Gehaltener Ball: Punkt und Aufschlag für Heim','Weiterspielen','Doppelberührung','Wiederholung'], c:0, sig:'16', who:'1. SR', e:'Der Ball muss abprallen, er darf nicht gefangen oder geworfen werden.', r:'9.2.2, 9.3.3'},
{t:'Heim verzögert zum zweiten Mal in diesem Spiel (erste Verzögerung im 1. Satz, jetzt 3. Satz).', o:['Verzögerungsstrafe: Punkt und Aufschlag für Gast','Verzögerungsverwarnung, neuer Satz','Keine Sanktion','Hinausstellung des Trainers'], c:0, sig:'25', who:'1. SR', e:'Verzögerungssanktionen gelten für das ganze Spiel. Die zweite Verzögerung ist eine Verzögerungsstrafe: rote Karte ans Handgelenk.', r:'16.2'}
];

return { CH, Q, SIG, SIT };
})();

# Volleyball Referee Trainer

Interaktive Lern-Web-App für die österreichische Volleyball-Schiedsrichterprüfung
(Einstieg C-k-Lizenz). Grundlage ist das internationale Regelwerk: FIVB Official Volleyball
Rules 2025–2028.

## Was die App kann

- **Lernen:** zehn Kapitel mit Regelnummern, antippbarem Spielfeldplan, Wechsel-Simulator,
  Sanktionsskala und Zuständigkeits-Übung. Jedes Kapitel endet mit einem Schnell-Check.
- **Handzeichen:** alle 25 Zeichen der Schiedsrichter und 5 Flaggenzeichen der
  Linienrichter, gezeichnet im Stil der offiziellen Diagramme (Ausgangsstellung gestrichelt,
  Bewegung als Pfeil). Dazu gibt es Übersicht, Karteikarten und Quiz sowie eine Übung zur
  Reihenfolge der Zeichen nach Regel 22.2.3 (1. SR, 2. SR, Doppelfehler).
- **Aufstellung:** Spieler per Drag-and-Drop aufstellen, Positionsfehler finden und die
  Aufschlagfolge wie ein Schreiber verfolgen.
- **Situationen:** 26 Spielszenen. Erst entscheiden, dann das richtige Handzeichen wählen.
- **Praxis:**
  - *Pfiff-Timing:* animierte Ballwechsel in der Seitenansicht. Im richtigen Moment pfeifen
    (Knopf oder Leertaste), dann das Zeichen wählen. Dazu kommt ein Tipp, wohin der Blick
    gehört.
  - *Spielbericht:* ein Satzausschnitt wie im elektronischen Spielbericht. Punkte,
    Auszeiten, Wechsel, unzulässige Anfragen und Sanktionen werden über die passende
    Taste erfasst. Die Aufstellung und den Aufschläger kontrollierst du selbst.
- **Quiz und Probeprüfung:** 130 Fragen mit Erklärung und Fehlerkartei, dazu eine
  Probeprüfung mit 30 Fragen in 30 Minuten.
- **Wiederholung (Spaced Repetition):** Falsch beantwortete Fragen kommen nach 1, 3, 7,
  14 und 30 Tagen wieder, richtig beantwortete nach 7 Tagen. Die Startseite zeigt, wie
  viele Fragen heute fällig sind.
- **Coach:** Fragen an Claude. Das funktioniert nur, wenn die Seite als Claude-Artifact
  läuft, sonst wird der Bereich ausgeblendet.

Jede Regelnummer ist ein Link ins [FIVB-Regelwerk](https://www.fivb.com/wp-content/uploads/2025/01/FIVB-Volleyball_Rules2025_2028-EN-v05.pdf)
und öffnet das PDF direkt auf der richtigen Seite (`#page=N`). Die Seitenzahlen stehen in
`data.js` (`RP` für Regeln, `SIGP` für Handzeichen). Sie wurden aus dem PDF ausgelesen und
gelten nur für genau diese Fassung (v05).

Der Fortschritt wird im `localStorage` des Browsers gespeichert. Mit einem eigenen
Supabase-Projekt lässt er sich zwischen Geräten synchronisieren (siehe unten).

## Starten

Es gibt keinen Build-Schritt. Einfach `index.html` im Browser öffnen oder den Ordner
statisch ausliefern, zum Beispiel über GitHub Pages oder mit:

```bash
python -m http.server 8000
```

## Fortschritt auf mehreren Geräten (Supabase)

Die Synchronisation ist ausgeschaltet, solange `config.js` leer ist. Einrichtung:

1. Auf [supabase.com](https://supabase.com) ein kostenloses Projekt anlegen, Region zum
   Beispiel Frankfurt.
2. Im Dashboard unter **SQL Editor** den Inhalt von
   [`supabase/schema.sql`](supabase/schema.sql) ausführen. Das legt die Tabelle
   `progress` samt Row-Level-Security an.
3. Unter **Authentication → URL Configuration** als Site URL
   `https://daniel-hopium.github.io/volleyball-referee-trainer/` eintragen und dieselbe
   Adresse bei den Redirect URLs ergänzen. Zum lokalen Testen kommt noch
   `http://localhost:8000/` dazu.
4. Unter **Project Settings → API Keys** die Project URL und den Publishable-Key
   (früher „anon“) in `config.js` eintragen. Den Secret- bzw. `service_role`-Key niemals.
5. Optional: Nachdem du dich selbst einmal angemeldet hast, unter
   **Authentication → Sign In / Providers** „Allow new users to sign up“ ausschalten.
   Dann kann niemand sonst ein Konto anlegen.

Angemeldet wird per E-Mail-Link, ohne Passwort. Die Daten werden pro Eintrag
zusammengeführt: Bei jeder Frage gewinnt der neuere Stand, deshalb gehen Antworten nicht
verloren, wenn man abwechselnd auf Handy und PC übt. „Fortschritt zurücksetzen“ wirkt auf
allen Geräten.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Seitenaufbau und Styles, heller und dunkler Modus |
| `data.js` | Lerninhalte: Kapitel, Fragen, Handzeichen, Situationen |
| `figures.js` | Erklärgrafiken „Erlaubt vs. Fehler“ als SVG, per `data-widget="fig…"` in die Kapitel eingebunden |
| `app.js` | Logik: Navigation, Quiz mit Wiederholung, Prüfung, Handzeichen-Figuren, Trainer, Widgets, Coach |
| `scoresheet.js` | Spielbericht-Trainer (elektronischer Spielbericht) |
| `plays.js` | Pfiff-Timing: animierte Ballwechsel |
| `sync.js` | Anmeldung per E-Mail-Link und Abgleich des Fortschritts über Supabase |
| `config.js` | Supabase-URL und Publishable-Key (leer = nur lokal) |
| `supabase/schema.sql` | Tabelle und Zugriffsregeln für den Abgleich |

Neue Fragen kommen in `data.js` in das Array `Q`, im Format
`[id, kapitel, frage, [4 optionen], richtigerIndex, erklärung, regel]`.

## Hinweis

Nationale Durchführungsbestimmungen des ÖVV und der Landesverbände sind nicht enthalten.
Die Bestehensgrenze von 80 % in der Probeprüfung ist ein Übungswert und nicht die offizielle
Vorgabe.

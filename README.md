# Volleyball Referee Trainer

Interaktive Lern-Web-App für die österreichische Volleyball-Schiedsrichterprüfung
(Einstieg C-k-Lizenz). Grundlage ist das internationale Regelwerk: FIVB Official Volleyball
Rules 2025–2028.

## Was die App kann

- **Lernen:** zehn Kapitel mit Regelnummern, antippbarem Spielfeldplan, Wechsel-Simulator,
  Sanktionsskala und Zuständigkeits-Übung. Jedes Kapitel endet mit einem Schnell-Check.
- **Handzeichen:** alle 25 Zeichen der Schiedsrichter und 5 Flaggenzeichen der
  Linienrichter, als Übersicht, Karteikarten und Quiz.
- **Aufstellung:** Spieler per Drag-and-Drop aufstellen, Positionsfehler finden und die
  Aufschlagfolge wie ein Schreiber verfolgen.
- **Situationen:** 26 Spielszenen. Erst entscheiden, dann das richtige Handzeichen wählen.
- **Quiz und Probeprüfung:** 130 Fragen mit Erklärung und Fehlerkartei, dazu eine
  Probeprüfung mit 30 Fragen in 30 Minuten.
- **Coach:** Fragen an Claude. Das funktioniert nur, wenn die Seite als Claude-Artifact
  läuft, sonst wird der Bereich ausgeblendet.

Der Fortschritt wird im `localStorage` des Browsers gespeichert.

## Starten

Es gibt keinen Build-Schritt. Einfach `index.html` im Browser öffnen oder den Ordner
statisch ausliefern, zum Beispiel über GitHub Pages oder mit:

```bash
python -m http.server 8000
```

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Seitenaufbau und Styles, heller und dunkler Modus |
| `data.js` | Lerninhalte: Kapitel, Fragen, Handzeichen, Situationen |
| `app.js` | Logik: Navigation, Quiz, Prüfung, Trainer, Widgets, Coach |

Neue Fragen kommen in `data.js` in das Array `Q`, im Format
`[id, kapitel, frage, [4 optionen], richtigerIndex, erklärung, regel]`.

## Hinweis

Nationale Durchführungsbestimmungen des ÖVV und der Landesverbände sind nicht enthalten.
Die Bestehensgrenze von 80 % in der Probeprüfung ist ein Übungswert und nicht die offizielle
Vorgabe.

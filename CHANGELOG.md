# Changelog

Alle nennenswerten Änderungen an Volleyball Referee Trainer. Die Einträge beschreiben, was
das Projekt danach kann bzw. was sich für den Nutzer ändert – kein Commit-Protokoll.

**Regel:** Jeder Commit bekommt seinen Eintrag, im selben Commit. Neues kommt oben unter
„Unveröffentlicht“ dazu; beim Release wird daraus ein Abschnitt mit Versionsnummer und Datum.

Kategorien: **Neu** (neue Funktionen), **Verbessert** (bestehendes Verhalten), **Behoben**
(Fehler), **Intern** (Struktur, Tooling, nicht sichtbar).

## Unveröffentlicht

### Neu
- Praxis-Bereich mit **Pfiff-Timing**: acht animierte Ballwechsel. Man pfeift im richtigen
  Moment, bekommt die Reaktionszeit angezeigt und wählt dann das Handzeichen. Zu frühes
  Pfeifen wird erkannt.
- **Spielbericht-Trainer** für den elektronischen Spielbericht: Man erfasst einen
  Satzausschnitt über die Tasten der App (Punkt, Auszeit, Wechsel, Sanktion, unzulässige
  Anfrage) und kontrolliert Aufstellung und Aufschläger.
- **Reihenfolge der Handzeichen** als Übung: Man tippt die Zeichen des pfeifenden SR in der
  richtigen Reihenfolge an, getrennt nach 1. SR, 2. SR und Doppelfehler.
- **Wiederholung nach Fälligkeit (Spaced Repetition):** Falsche Antworten kommen nach 1, 3
  und 7 Tagen wieder. Die Startseite zeigt „Heute fällig“, im Quiz gibt es einen eigenen
  Knopf dafür.

- Neun Erklärgrafiken „Erlaubt vs. Fehler“ in den Kapiteln: Übertritt, Ball auf der Linie,
  Überquerungsraum, Übergreifen beim Block, Netzberührung, Fußfehler beim Aufschlag,
  Sichtblock, Angriff von Hinterspielern und oberes Zuspiel des Libero. Bei Übertritt und
  Ball auf der Linie verschiebt man Fuß bzw. Ball selbst und sieht sofort die Entscheidung.
- Jede Regelnummer ist ein Link ins offizielle FIVB-Regelwerk (PDF) und öffnet es direkt
  auf der passenden Seite. Handzeichen verlinken zusätzlich auf ihr Diagramm, Regelnummern
  in Antworten des Coaches werden ebenfalls verlinkt.
- Lern-Web-App für die Volleyball-Schiedsrichterprüfung nach den FIVB-Regeln 2025–2028:
  zehn Kapitel, 130 Quizfragen mit Fehlerkartei, Probeprüfung (30 Fragen, 30 Minuten),
  26 Spielsituationen und alle offiziellen Handzeichen als Übersicht, Karteikarten und Quiz.
- Aufstellungs-Trainer zum Ziehen der Spieler mit Live-Prüfung auf Positionsfehler, dazu
  ein Übungsmodus „Fehler finden“ und ein Trainer für die Aufschlagfolge.
- Regel-Coach, der Fragen über Claude beantwortet, wenn die Seite als Artifact läuft.

### Verbessert
- Die Handzeichen-Figuren sind unten kürzer, der lange Oberkörper lenkte vom Zeichen ab.
- Alle Handzeichen-Figuren sind neu gezeichnet, im Stil der FIVB-Diagramme: Oberkörper mit
  Trikot, Arme mit Ellbogen, Ausgangsstellung gestrichelt und Bewegung als Pfeil.

# Relationship Anarchy Smörgåsbord — interaktives Board

Eine kleine, rein clientseitige Web-App, um pro Beziehungsperson zu erfassen,
welche Elemente des [Relationship Anarchy Smörgåsbord](https://www.google.com/search?q=relationship+anarchy+smörgåsbord)
(v6, Lyrica Lawrence & Heather Orr, aktualisiert von Maxx Hill) ihr **erfüllt**,
**teilweise erfüllt**, **nicht erfüllt** oder **bisher unbeantwortet** (noch
nicht besprochen) seht — inklusive optionaler Notizen pro Punkt.

## Nutzung

Kein Build, kein Server, keine Installation nötig:

1. `index.html` im Browser öffnen (Doppelklick reicht).
2. Oben rechts über **＋** eine oder mehrere Personen anlegen.
3. Im **Board**-Tab auf eine Kategorie-Bubble klicken, um deren Elemente zu
   bewerten (Status + optionale Notiz).
4. Im **Übersicht**-Tab siehst du Fortschrittsbalken pro Kategorie sowie den
   Gesamtfortschritt.

## Daten & Privatsphäre

Alle Daten werden ausschließlich lokal im Browser gespeichert
(`localStorage`), es gibt keinerlei Server, Netzwerk-Requests oder Tracking.

- **Export**: lädt ein JSON-Backup aller Personen/Bewertungen herunter.
- **Import**: ersetzt den aktuellen Stand durch eine zuvor exportierte
  JSON-Datei — praktisch für Backups oder den Wechsel des Geräts/Browsers.

Da alles nur lokal liegt: unterschiedliche Browser oder das Löschen der
Browserdaten führen zu getrennten/verlorenen Ständen. Regelmäßig exportieren,
wenn dir die Daten wichtig sind.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Grundgerüst, Steuerelemente, Panel-Markup |
| `style.css` | Styling (Kreis-Board, Panel, Übersicht) |
| `data.js` | Statische Smörgåsbord-Kategorien & Items (Original-Englisch) |
| `app.js` | State-Management, Rendering, localStorage, Export/Import |

## Layout-Hinweis

Das Original-Board ordnet Themen frei im Kreis an, mit gesellschaftlich/
strukturellen Themen eher außen und persönlichen/intimen Themen eher innen.
Diese App bildet das mit zwei sauber berechneten, konzentrischen Ringen nach
(kein Pixel-Klon des Original-Artworks), damit es responsive bleibt und ohne
Grafik-Tool wartbar ist.

## Lizenz der Inhalte

Kategorien und Items stammen aus dem Relationship Anarchy Smörgåsbord (v6),
lizenziert unter [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

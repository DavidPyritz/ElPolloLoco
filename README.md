# El Pollo Loco – Projektinfos

## 1) Beschreibung
- **Pitch:**  
  "El Pollo Loco" ist ein unterhaltsames Jump & Run Spiel, das sich perfekt für eine kurze Auszeit eignet. Ideal für alle, die zwischendurch Spaß haben möchten, ohne sich lange einzuarbeiten.

- **Zielgruppe:**  
  Gamer, die auf der Suche nach einem unkomplizierten, aber fesselnden Spiel sind – perfekt für kurze Pausen.

- **Hauptfeatures:**  
  - Sammle Coins auf deinem Weg durch die Level.
  - Drei Gegnertypen mit eigenen Bewegungs- und Angriffsmustern.
  - Taktischer Bossfight: Der Endboss wird mit jedem Flaschentreffer schneller.
  - Klassischer Kopfsprung neutralisiert Gegner zuverlässig.
  - Soundeffekte und Musik für extra Spielgefühl.

- **Tech-Stack (FE/BE/DB/Auth/Cloud):**  
  - FE: HTML5, CSS/SCSS, JavaScript
  - BE: –
  - DB: –
  - Auth: –
  - Cloud/Hosting: GitHub Pages
  - Tooling: npm

- **Status & Lizenz:**  
  - **Status:** Stable (v1.0.0)
  - **Lizenz (Code):** MIT License
  
    ```
    Copyright (c) 2025 <David Pyritz>
  
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
  
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
  
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    ```
  
  - **Lizenz (Assets):** Alle grafischen und audiovisuellen Assets im Verzeichnis `/assets` unterliegen der Lizenz **Creative Commons BY-NC 4.0**.  
    - **BY:** Namensnennung erforderlich – © <David Pyritz>, 2025  
    - **NC:** Keine kommerzielle Nutzung
  
    Ausnahmen und Drittanbieter-Assets (mit Original-Lizenzen) sind in `/assets/README.md` aufgeführt.

## 2) Dev-Setup

- **Voraussetzungen (Node/Docker/…):**  
  - Moderner Browser (Chrome, Firefox, Edge, Safari)  
  - **Optional:** Node.js ≥ 18 (für lokalen Dev-Server)

- **Installation:**  
  - Ohne Installation: ZIP von GitHub laden **oder** Repo klonen  
  - Mit lokalem Server (empfohlen bei ES-Modules/CORS):  
    ```bash
    git clone https://github.com/DavidPyritz/ElPolloLoco.git
    cd ElPolloLoco
    ```

- **Start (Dev):**
  - **Variante A – direkt im Browser:** `index.html` doppelklicken und starten
  - **Variante B – lokaler Dev-Server (Node):**  
    ```bash
    # einfacher statischer Server
    npx serve .
    # oder alternativ
    npx http-server -c-1 .
    ```
    Anschließend die ausgegebene URL im Browser öffnen (z. B. `http://localhost:3000`).

- **Build:**  
  Nicht erforderlich (statische Dateien)

- **Tests:**  
  Keine automatisierten Tests vorhanden

- **Lint/Format:**  
  Nicht konfiguriert

- **DB/Migrations/Seed (falls relevant):**  
  Nicht benötigt

- **ENV-Variablen (Name = Erklärung):**  
  Keine

- **Beispiel `.env` (ohne Geheimnisse):**  
  Nicht erforderlich

- **API-URL(s):**  
  Keine (läuft komplett im Browser)

## 3) Zusammenarbeit

- **Issues & PRs:**  
  Issues willkommen; kleine PRs nach Absprache.
  
- **Branch-Namen:**  
  `main`

- **Commits:**  
  Kurz & beschreibend (z. B. „update copyright“, „files added“, „first commit“)

- **Code-Style/Tools:**  
  Plain JS/HTML/CSS;

- **Tests/CI:**  
  Keine

- **Reviews:**  
  Maintainer-Review

- **Roadmap/Kommunikation:**  
  GitHub Issues

- **Code of Conduct / Security:**  
  Respektvoll; Sicherheitslücken ohne Details per Issue oder Mail melden.

## 4) Links

- **Live-Demo:** Keine
- **Backend/API:** Keine
- **Doku/Swagger:** Keine (Coming soon)
- **Design/Figma:** „Coming soon“.
- **Roadmap/Board:**  
  *(Optional: Hier deinen GitHub-Projektboard-Link einfügen, falls vorhanden)*
- **Changelog:** „Coming soon“
- **License:** [MIT License](https://github.com/DavidPyritz/ElPolloLoco/blob/main/LICENSE)
- **Kontakt:** [david.pyritz@gmail.com](mailto:david.pyritz@gmail.com) | [LinkedIn](https://www.linkedin.com/in/david-pyritz-b967b6198)

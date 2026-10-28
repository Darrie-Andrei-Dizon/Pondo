# Pondo

A private money tracker for cash, e-wallets and bank accounts. It runs as a web app you install on your iPhone's home screen. No App Store, no Mac, no fees.

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app: screens, styles and logic |
| `sw.js` | Lets the app open and work offline |
| `manifest.webmanifest` | App name, colors and icons for installing |
| `icons/` | Home screen icons (`icon.svg` is the editable source) |
| `apps-script.gs` | The script for automatic Google Sheets backup |
| `SHEETS-SETUP.md` | Step-by-step setup for Google Sheets backup |

## Put it online for free (GitHub Pages)

1. Create a free account at github.com.
2. Click **New repository**, name it `pondo`, set it to **Public**, and create it.
3. Click **uploading an existing file**, drag in everything from this folder (including the `icons` folder), and click **Commit changes**.
4. Go to **Settings → Pages**. Under "Branch", choose `main` and `/ (root)`, then **Save**.
5. After a minute or two your app is live at `https://YOUR-USERNAME.github.io/pondo/`.

## Install it on your iPhone

1. Open that link in **Safari** (not Chrome).
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. Open Pondo from the home screen icon. Use it from there from now on: the home screen app keeps its own data, separate from Safari.

## Keep your data safe

Your data lives only on your phone, so set up a backup:

- **Google Sheets (recommended):** Pondo backs up to a Sheet in your Google account about once a day. See `SHEETS-SETUP.md`.
- **Backup file:** **Settings → Save a backup file**, then save it to Files or iCloud Drive.

Always open Pondo from the home screen icon. Safari keeps separate data, and removing the icon deletes the app's data.

## Changing the app later

1. Edit `index.html` (or ask Claude to).
2. In `sw.js`, change `VERSION` (for example `pondo-v1.0` to `pondo-v1.1`). This tells phones there's an update.
3. Upload the changed files to the same GitHub repository.
4. Close and reopen Pondo on your phone, twice if needed, to load the new version. Your data stays.

You can test changes on your computer by opening a terminal in this folder, running `python -m http.server 8000`, and visiting `http://localhost:8000`.

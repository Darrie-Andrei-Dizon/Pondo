# Pondo

**A private money tracker that tells you how much you can spend today until your next payday or allowance.**

*Pondo* is Filipino for "funds". It runs in your phone's browser, installs to your home screen like an app, works offline, and keeps your data on your phone. There are no accounts, no ads and no fees.

**Open the app:** https://Darrie-Andrei-Dizon.github.io/pondo/

---

## What it does

**Day to day**
- **Left to spend today.** Your spending money, minus bills due before your next payday or allowance, split over the days until then.
- **Fast logging.** Opens straight to a number pad. Your usual entries, like lunch or a jeep ride, are one tap away.
- **Wallets** for cash, e-wallets and bank accounts, with transfers between them.
- **Recurring bills** set aside before you spend.
- **Activity** with a spending calendar, search, entry times and #tags for trips and events.

**Planning**
- **Budgets** set by hand or by a rule like 50/30/20 or 70/20/10, adjusting automatically to your income and habits.
- **Savings goals and yearly costs**, with how much to put away each payday or allowance.
- **Emergency fund meter** showing how many months your savings would cover.
- **Extra money planner** for 13th month pay, bonuses, aguinaldo, birthday money or a stipend.
- **Weekly recap and no-spend streaks.**

**People and investments**
- **Utang tracker** for split bills, money lent and money borrowed, with payment tracking and reminder messages.
- **Investments** for stocks, UITFs and mutual funds, index funds, ETFs and crypto: average cost, gain or loss, dividends, and a net worth view.
- **Optional credit cards**, with automatic monthly installment charges. Hidden unless you add a card.

Works for both salaries and allowances, on monthly, weekly, every-2-weeks or daily schedules.

---

## Install it

### iPhone
1. Open the app link above in **Safari**.
2. Tap **Share** (the square with an arrow; you may need to tap **⋯** first), then **Add to Home Screen**, then **Add**.
3. Open Pondo **from the home screen icon** from now on.

### Android
1. Open the app link in **Chrome**.
2. Tap the **⋮** menu, then **Add to Home screen** or **Install app**.
3. Open Pondo from the new icon.

> The installed app keeps its data separately from the browser. Always use the icon, or your entries will seem to disappear.

---

## Quick start

1. **Set up.** Choose salary or allowance, how often you get it, and how much is in each wallet now. Or tap *Explore with sample data* to look around first.
2. **Log as you go.** Tap **+**, type the amount, pick a category, and tap **Save**.
3. **Check "Left to spend today"** on the Home screen. Tap it to see how it's worked out.
4. **Add your bills** under **Settings → Recurring bills**, so they're set aside automatically.
5. **Check your balances weekly.** On Home, tap **Check** next to Wallets and type what's really in each one, so the numbers stay accurate.
6. **Turn on backups.** See the next section.

---

## Your data

- Everything is stored **only on your device**. Nothing is sent anywhere unless you turn on Google Sheets backup, which sends it to **your own** Google account.
- **Removing the home screen icon deletes the app's data**, and so does losing or resetting your phone, unless you have a backup.

### Backups
- **Google Sheets (recommended):** automatic daily backup to a Sheet in your Google account, with readable tabs and one-tap restore. Setup takes about 10 minutes; see [SHEETS-SETUP.md](SHEETS-SETUP.md).
- **Backup file:** **Settings → Save a backup file**, then keep it in Files, iCloud Drive or Google Drive. Restore with **Settings → Restore from backup**.

---

## Good to know

- Investment prices are entered by hand from your broker, bank or crypto app. They don't update by themselves.
- There are no phone notifications. Reminders appear when you open the app.
- Changing the currency changes the symbol only. Amounts aren't converted.
- Pondo helps you track money. It doesn't give financial or investment advice.

---

## Run your own copy

Pondo is plain HTML, CSS and JavaScript with no build step and no server.

1. Fork this repository, or upload its files to a new public repository.
2. In **Settings → Pages**, set the branch to **main** and the folder to **/ (root)**, then save.
3. Your copy will be live at `https://Darrie-Andrei-Dizon.github.io/REPOSITORY-NAME/` within a few minutes.

**Updating:** after changing `index.html`, also change `VERSION` in `sw.js` (for example `pondo-v2.2` to `pondo-v2.3`) so installed copies pick up the update. Users get it after closing and reopening the app.

**Testing locally:** run `python -m http.server 8000` in this folder and open `http://localhost:8000`.

| File | Purpose |
|---|---|
| `index.html` | The whole app: screens, styles and logic |
| `sw.js` | Offline support and updates |
| `manifest.webmanifest` | App name, colors and icons for installing |
| `icons/` | App icons (`icon.svg` is the source) |
| `apps-script.gs` | Google Apps Script for Sheets backup |
| `SHEETS-SETUP.md` | Sheets backup setup guide |

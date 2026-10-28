# Google Sheets backup

Pondo keeps your data on your device. Google Sheets backup adds an automatic copy in a Google Sheet that you own, so a lost, broken or reset phone doesn't mean lost data.

- **Automatic:** about once a day when you open Pondo with an internet connection, plus a *Back up now* button.
- **Readable:** your transactions, wallets, utang, goals and investments appear as normal tabs you can browse, filter or chart.
- **Restorable:** move to a new phone, or roll back one backup, in a couple of taps.
- **Private:** the data goes to your own Google account only, protected by a secret code that only you know.

**Time needed:** about 10 minutes, once. A computer makes it easiest.
**You'll need:** a Google account and Pondo installed on your phone.

---

## How it works

You add a small script to a Google Sheet and publish it as a web app. Pondo sends your data to that script, and the script writes it into the Sheet. Every request carries your secret code, and the script rejects anything without it.

The script is in this repository as [`apps-script.gs`](apps-script.gs). It only reads and writes the Sheet it's attached to.

---

## Step 1: Get your secret code

1. Open Pondo **from the home screen icon**.
2. Tap the **gear icon**, then **Google Sheets backup**.
3. Note the **secret code**. It looks like `K7QM-P2XD-9RTF-H4WN`.

Already set up on another phone? Type that phone's secret code into the box instead, so both use the same one.

---

## Step 2: Create the Sheet and add the script

1. Go to [sheets.google.com](https://sheets.google.com) and create a **blank spreadsheet**. Give it a name, like "Pondo backup".
2. Choose **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete the code that's already there.
4. Copy all of [`apps-script.gs`](apps-script.gs) and paste it into the editor.
5. Near the top, find this line:
   ```js
   const SECRET = 'PASTE-YOUR-SECRET-HERE';
   ```
   Replace `PASTE-YOUR-SECRET-HERE` with your secret code, keeping the quotes:
   ```js
   const SECRET = 'K7QM-P2XD-9RTF-H4WN';
   ```
6. Click **Save**.

**On your phone instead?** In Pondo, tap **Copy script with this code**. It copies the whole script with your code already filled in, so you can skip step 5.

---

## Step 3: Publish it as a web app

1. Click **Deploy → New deployment**.
2. Next to **Select type**, click the gear icon and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access**, and choose your Google account.
5. Google shows **"Google hasn't verified this app."** That's expected for a script you added yourself. Click **Advanced**, then **Go to … (unsafe)**, then **Allow**.
6. Copy the **Web app URL**. It starts with `https://script.google.com/macros/s/` and ends with `/exec`.

**Why "Anyone"?** Pondo can't sign in to Google, so the web app has to accept requests without a Google login. Your secret code is what keeps it private: without the code, the script refuses to read or write anything.

---

## Step 4: Connect Pondo

1. In Pondo, go back to **Settings → Google Sheets backup**.
2. Make sure the **secret code** matches the one in your script.
3. Paste the **Web app URL** and tap **Connect**.

Pondo checks the connection and makes the first backup. Your Sheet will now have tabs for **Transactions, Wallets, Utang, Goals** and **Investments**.

If the Sheet already has a backup with more data than the phone, for example on a new phone, Pondo asks whether to **restore from the Sheet** instead of overwriting it.

---

## Restoring

**On a new phone:** install Pondo, open **Settings → Google Sheets backup**, enter the same secret code and Web app URL, and tap **Connect**. Choose **Restore from Sheet** when asked.

**Anytime:** **Settings → Google Sheets backup → Restore from Google Sheets.**

**Undo the latest backup:** **Restore the backup before that** brings back the previous one.

---

## What's in the Sheet

| Tab | Contents |
|---|---|
| Transactions | Every entry with date, time, type, amount, category, wallet and note |
| Wallets | Each wallet's balance and type |
| Utang | Who owes whom, amounts paid and left |
| Goals | Savings goals and yearly costs with progress |
| Investments | Holdings with quantity, average cost, value and gain or loss |
| Pondo backup *(hidden)* | The full backup Pondo restores from |
| Pondo backup (previous) *(hidden)* | The backup before that |

The readable tabs are rewritten on every backup, so changes you make there aren't kept and don't go back into Pondo. Don't edit the hidden tabs.

---

## Built-in safety

- **No accidental overwrites.** If a backup would replace one with much more data, for example from a new or reset phone, the script refuses and Pondo asks you what to do.
- **One step of undo.** The previous backup is always kept.
- **The secret code isn't stored in the backup itself.**
- **Offline is fine.** If a backup can't go through, Pondo tries again later and warns you on the Home screen after 3 days without one.

---

## Troubleshooting

| Message in Pondo | What to do |
|---|---|
| **The secret code in your script doesn't match** | Make the code in Pondo and the `SECRET` line in the script identical. If you edit the script, redeploy it (see below). |
| **Couldn't reach that link** | Check that **Who has access** is **Anyone** and that you're online. |
| **Paste the Web app URL…** | Copy the link shown under **Web app** after deploying. It ends in `/exec`, not the address of the editor. |
| **Your Google Sheet backup has more data than this phone** | Choose **Restore from Sheet** on a new phone, or **Replace the Sheet's backup with this phone** if you deleted data on purpose. |

### After editing the script
Changes only take effect after you redeploy:
**Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy.**
The Web app URL stays the same, so there's nothing to change in Pondo.

### Turning it off
**Settings → Google Sheets backup → Disconnect.** Your Sheet and its backups stay in your Google account. To remove access completely, delete the deployment under **Deploy → Manage deployments**, or delete the Sheet.

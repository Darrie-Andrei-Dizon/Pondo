/**
 * Pondo backup script
 * Paste this into Extensions > Apps Script of a Google Sheet, then deploy it as a web app.
 * Full steps are in SHEETS-SETUP.md.
 *
 * Replace the text between the quotes with the secret code shown in
 * Pondo > Settings > Google Sheets backup. Keep the quotes.
 */
const SECRET = 'PASTE-YOUR-SECRET-HERE';

const RAW = 'Pondo backup';
const PREV = 'Pondo backup (previous)';
const CHUNK = 40000; // a Google Sheets cell holds up to 50,000 characters

function doPost(e) {
  let req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'bad-request' }); }
  if (!req || SECRET === 'PASTE-YOUR-SECRET-HERE' || req.secret !== SECRET) return out({ ok: false, error: 'wrong-secret' });
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (req.action === 'ping') return out({ ok: true, info: info(ss) });

  if (req.action === 'restore') {
    const raw = readRaw(ss, req.previous ? PREV : RAW);
    return out(raw ? { ok: true, data: raw, info: info(ss) } : { ok: false, error: 'no-backup' });
  }

  if (req.action === 'backup') {
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const cur = info(ss);
      // Refuse to replace a backup with much less data unless Pondo asked the user first.
      if (!req.force && cur.txCount > 0 && Number(req.txCount) < cur.txCount * 0.5) return out({ ok: false, error: 'smaller', info: cur });
      copySheet(ss, RAW, PREV);
      writeRaw(ss, RAW, String(req.data || ''), req.meta || {});
      (req.tables || []).forEach(function (t) { writeTable(ss, t.name, t.rows || []); });
      return out({ ok: true, info: info(ss) });
    } finally {
      lock.releaseLock();
    }
  }
  return out({ ok: false, error: 'unknown-action' });
}

function doGet() { return out({ ok: true, app: 'pondo' }); }

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function getOrMake(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }

function writeRaw(ss, name, data, meta) {
  const sh = getOrMake(ss, name);
  sh.clear();
  sh.getRange(1, 1, 3, 2).setValues([
    ['Saved', new Date().toISOString()],
    ['Transactions', Number(meta.txCount) || 0],
    ['App version', String(meta.version || '')]
  ]);
  sh.getRange(4, 1).setValue('Backup data below. Do not edit this tab.');
  const chunks = [];
  // Each chunk starts with ~ so Sheets never treats it as a formula.
  for (let i = 0; i < data.length; i += CHUNK) chunks.push(['~' + data.slice(i, i + CHUNK)]);
  if (chunks.length) sh.getRange(5, 1, chunks.length, 1).setNumberFormat('@').setValues(chunks);
  sh.hideSheet();
}

function readRaw(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 5) return null;
  return sh.getRange(5, 1, sh.getLastRow() - 4, 1).getValues().map(function (r) { return String(r[0]).replace(/^~/, ''); }).join('');
}

function info(ss) {
  const sh = ss.getSheetByName(RAW);
  if (!sh || sh.getLastRow() < 5) return { hasBackup: false, txCount: 0 };
  const v = sh.getRange(1, 2, 3, 1).getValues();
  return { hasBackup: true, savedAt: String(v[0][0]), txCount: Number(v[1][0]) || 0, version: String(v[2][0]) };
}

function copySheet(ss, from, to) {
  const src = ss.getSheetByName(from);
  if (!src) return;
  const old = ss.getSheetByName(to);
  if (old) ss.deleteSheet(old);
  src.copyTo(ss).setName(to).hideSheet();
}

function writeTable(ss, name, rows) {
  const sh = getOrMake(ss, name);
  sh.clear();
  if (!rows.length) return;
  const w = Math.max.apply(null, rows.map(function (r) { return r.length; }));
  const norm = rows.map(function (r) { return r.concat(new Array(w - r.length).fill('')); });
  sh.getRange(1, 1, norm.length, w).setValues(norm);
  sh.getRange(1, 1, 1, w).setFontWeight('bold');
  sh.setFrozenRows(1);
}

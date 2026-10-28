// Pondo service worker: keeps the app working offline.
// When you change index.html, bump the version so phones pick up the update.
const VERSION = 'pondo-v2.2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Serve from cache first so it opens instantly offline, then refresh the cache in the background.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const key = req.mode === 'navigate' ? './index.html' : req;
    const cached = await cache.match(key);
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(key, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});

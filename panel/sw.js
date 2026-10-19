/* Pyrox Panel — Copyright (c) 2026 Pyrox Pirotecnia (autor: Felipe Manrique). Todos los derechos reservados. Ver LICENSE. */
const CACHE = 'pyrox-panel-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './manifest.webmanifest'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
// Red primero (siempre la última versión); la caché es solo respaldo sin conexión. Los pedidos a Google no se tocan.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req, {cache: 'no-cache'}).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); return res; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
});

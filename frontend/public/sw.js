// This is an empty service worker to satisfy browser PWA requirements and prevent 404 errors.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // Passive worker: does nothing but satisfy the browser
  return;
});

const CACHE_NAME = 'kustom-auto-wrx-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/services',
  '/wrap-brands',
  '/pricing',
  '/car-care',
  '/gallery',
  '/faq',
  '/about',
  '/contact'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
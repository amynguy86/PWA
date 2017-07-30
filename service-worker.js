var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/PWA/',
  '/PWA/index.html',
  '/PWA/scripts/app.js',
  '/PWA/styles/inline.css',
  '/PWA/images/clear.png',
  '/PWA/images/cloudy-scattered-showers.png',
  '/PWA/images/cloudy.png',
  '/PWA/images/fog.png',
  '/PWA/images/ic_add_white_24px.svg',
  '/PWA/images/ic_refresh_white_24px.svg',
  '/PWA/images/partly-cloudy.png',
  '/PWA/images/rain.png',
  '/PWA/images/scattered-showers.png',
  '/PWA/images/sleet.png',
  '/PWA/images/snow.png',
  '/PWA/images/thunderstorm.png',
  '/PWA/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

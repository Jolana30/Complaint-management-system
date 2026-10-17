/**
 * Ambo University CMS - Progressive Web App (PWA) Service Worker
 * Provides offline caching, lightning-fast re-loads, and app shell resilience.
 */

const CACHE_NAME = 'ambo-cms-shell-v1';

const APP_ASSETS = [
  './',
  './index.html',
  './login.html',
  './student_dashboard.html',
  './submit_complaint.html',
  './my_complaints.html',
  './complaint_details.html',
  './submission_guide.html',
  './teacher_dashboard.html',
  './teacher_respond.html',
  './admin_dashboard.html',
  './admin_all_complaints.html',
  './admin_assign.html',
  './admin_confirm.html',
  './assets/css/style.css',
  './assets/css/nav.css',
  './assets/js/app.js',
  './assets/images/logo.jpg',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  './assets/images/apple-touch-icon.png',
  './assets/images/favicon-32.png',
  './manifest.json'
];

// 1. Install Event: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline app shell');
      return cache.addAll(APP_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up legacy caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline)
        if (cachedResponse) return cachedResponse;
        
        // If navigating to an HTML page while offline and not cached, return index.html
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });

      // Return cached version immediately if available, while fetching update in background
      return cachedResponse || fetchPromise;
    })
  );
});

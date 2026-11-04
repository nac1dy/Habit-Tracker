const CACHE_NAME = 'Habit-Tracker-v2';

// const FILES_TO_CACHE = [
//   './',
//   './app/manifest.ts'
// ];

self.addEventListener('install', (event) => {
    // event.waitUntil(
    //     caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    // );
    console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         return response || fetch(event.request);
    //     })
    // );
    console.log('add later');
});
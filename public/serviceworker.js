const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

// let sendButton = document.querySelector('#send');

// const asyncFunc = async () => {
//   const notification = '12344';
//   sendButton = document.querySelector('#send');
//   const registration = (await navigator.serviceWorker.getRegistration()) || {};

//   const sendNotification = async () => {
//     if (Notification.permission === 'granted') {
//       showNotification(notification);
//     } else {
//       if (Notification.permission !== 'denied') {
//         const permission = await Notification.requestPermission();

//         if (permission === 'granted') {
//           conso;
//           showNotification(notification);
//         }
//       }
//     }
//   };

//   const showNotification = (body) => {
//     const title = 'What PWA Can Do Today';

//     console.log('show');

//     const payload = {
//       body,
//     };

//     if ('showNotification' in registration) {
//       registration.showNotification(title, payload);
//     } else {
//       new Notification(title, payload);
//     }
//   };
// };

// sendButton.addEventListener('click', () => {
//   console.log('click');
// });

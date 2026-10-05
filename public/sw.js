// public/sw.js
// Service Worker para soporte Offline en obras y subsuelos sin señal
// v2 - Estrategia Network-First: siempre intenta traer la versión más nueva

const CACHE_NAME = 'hys-totem-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  // Activa el nuevo SW de inmediato sin esperar que se cierre la pestaña
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // Elimina TODOS los cachés viejos automáticamente
          if (key !== CACHE_NAME) {
            console.log('[SW] Eliminando caché viejo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Toma control de todas las pestañas abiertas
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Estrategia: Network-First (intenta red primero, caché como respaldo)
  // Así siempre se sirve la versión más nueva cuando hay internet
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si la red responde bien, actualiza el caché con la versión fresca
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Sin internet: sirve desde caché (modo offline para obra sin señal)
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Fallback final: devuelve index.html para navegación SPA
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
      })
  );
});

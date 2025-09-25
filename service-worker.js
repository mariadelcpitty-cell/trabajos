const CACHE_NAME = 'saldo-magico-v1';
const urlsToCache = [
    '/',
    '/index.html',
    'https://cdn.tailwindcss.com',
    '/manifest.json', // Añadido para caché del manifiesto
    '/icon-192x192.png', // Las rutas de los íconos han sido actualizadas
    '/icon-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico'
];

self.addEventListener('install', (event) => {
    // Instala el service worker y guarda los archivos en caché
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caché abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Intercepta las peticiones de red y sirve los archivos desde la caché si están disponibles
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Caché hit - devuelve la respuesta de la caché
                if (response) {
                    return response;
                }
                // No hay respuesta en la caché, continúa con la petición de red
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    // Limpia los cachés antiguos
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

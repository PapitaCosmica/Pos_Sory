// CAMBIAMOS A V3 PARA FORZAR LA ACTUALIZACIÓN DE ESTILOS
const CACHE_NAME = 'pos-glass-cache-v3'; 

const urlsToCache = [
    './', 
    'index.html',
    'venta.html',
    'productos.html',
    'caja.html',
    'reportes.html',
    'styles.css',
    'firebase_init.js',
    'manifest.json',
    'https://unpkg.com/html5-qrcode' // Cacheamos la librería externa también si es posible
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Fuerza al SW a activarse de inmediato
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache v3 abierta');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

self.addEventListener('activate', event => {
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
        }).then(() => self.clients.claim()) // Toma control de la página inmediatamente
    );
});
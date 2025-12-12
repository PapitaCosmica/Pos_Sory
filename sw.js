const CACHE_NAME = 'pos-glass-cache-v2'; // Cambiado a v2 para forzar la actualización

// Lista de todos los archivos esenciales para el funcionamiento offline
const urlsToCache = [
    './', // Ruta raíz (index.html)
    'index.html',
    'venta.html',
    'productos.html',
    'caja.html',
    'reportes.html',
    'styles.css',
    'animations.js',
    'firebase_init.js', // Tu script de Firebase
    'manifest.json',
    // Íconos (Asegúrate de que estas rutas sean correctas para tu carpeta images/icons)
    'images/icons/icon-72x72.png',
    'images/icons/icon-96x96.png',
    'images/icons/icon-128x128.png',
    'images/icons/icon-144x144.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-512x512.png'
];

// 1. Instalar el Service Worker y cachear todos los archivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker instalado: Caché abierta');
                // Intentar cachear todos los archivos
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                 console.error('Fallo al cachear archivos:', err);
                 // Si falla un archivo crítico (ej: un ícono), la instalación puede fallar.
            })
    );
});

// 2. Intentar servir desde la caché, si falla ir a la red (estrategia Cache-First)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devolver la respuesta de la caché si está disponible
                if (response) {
                    return response;
                }
                
                // Si no está en caché, obtener de la red
                return fetch(event.request).catch(error => {
                    console.error('Fetch fallido: ', event.request.url, error);
                    // Aquí puedes poner lógica para devolver una página de error o un asset genérico offline
                });
            })
    );
});

// 3. Activar y limpiar cachés antiguas (para liberar espacio)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si el nombre de la caché NO está en la lista blanca, la elimina
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); 
                    }
                })
            );
        })
    );
});
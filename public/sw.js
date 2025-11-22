const CACHE_NAME = "luces-cache-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",

  // Icons
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/splash-1000.png",

  // Vite build (se cargarán dinámicamente)
];

// INSTALAR → Guardar todo en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVAR → Limpiar caches antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// FETCH → Responder desde cache si no hay internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("/"));
    })
  );
});

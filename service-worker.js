const cache_name = "firsrpwa-2";
// asset utk ditaruh di cache storage
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
];

// utk menyimpan/menambahkan cache di cache storage
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cache_name).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// utk menggunakan cache yg di cache storage
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: cache_name })
      .then(function (response) {
        if (response) {
          console.log("serviceworker:gunakan aset dari cache:", response.url);
          return response;
        }

        console.log(
          "serviceworker:memuat aset dari server:",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

// utk menghapus cache lama agar tdk membebani pengguna
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log(`serviceworker : cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

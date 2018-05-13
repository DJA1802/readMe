self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('readme').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/bundle.js',
        '/bundle.js.map'
      ]);
    })
  );
});

// self.addEventListener('activate', function (event) {
//   event.waitUntil(createDB());
// });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      // Cache hit - return response
      if (cachedResponse) {
        return cachedResponse;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (serverResponse) {
        // Check if we received a valid response
        if (
          !serverResponse ||
          serverResponse.status !== 200 ||
          serverResponse.type !== 'basic'
        ) {
          return serverResponse;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = serverResponse.clone();

        caches.open('readme').then(function (cache) {
          if (
            event.request.url.indexOf('socket.io') === -1 &&
            event.request.method === 'GET'
          ) {
            cache.put(event.request, responseToCache);
          }
        });

        return serverResponse;
      });
    })
  );
});

// function createDB () {
//   idb.open('readme', 1, function (db) {
//     var store = db.createObjectStore('interactions', {
//       keyPath: 'startTime'
//     });
//     store.put({
//       // Seed with one interaction
//       startTime: '2018-05-07T05:17:49.314Z',
//       endTime: '2018-05-07T05:47:19.114Z',
//       articleId: 1
//     });
//   });
// }

// function readDB () {
//   idb
//     .open('readme', 1)
//     .then(function (db) {
//       var tx = db.transaction(['interactions'], 'readonly');
//       var store = tx.objectStore('interactions');
//       return store.getAll();
//     })
//     .then(function (items) {
//       // Use the data
//     });
// }

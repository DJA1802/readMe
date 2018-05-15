self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('readme')
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/bundle.js',
          '/bundle.js.map'
        ]);
      })
      .catch(err => console.log(err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(cachedResponse => {
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(serverResponse => {
            // Check if we received a valid response
            console.log('server response', serverResponse);
            console.log('is there a cached response?', !!cachedResponse);
            if (
              (!serverResponse ||
                serverResponse.status !== 200 ||
                serverResponse.type !== 'basic' ||
                !navigator.onLine) &&
              cachedResponse
            ) {
              return cachedResponse;
            } else {
              const responseToCache = serverResponse.clone();

              caches.open('readme').then(cache => {
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

              return serverResponse;
            }
          })
          .catch(err => {
            console.log(err);
            return cachedResponse;
          });
      })
      .catch(err => {
        console.log(err);
      })
  );
});

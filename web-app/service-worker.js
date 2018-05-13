self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('readme').then(function (cache) {
      return cache.addAll([
        './',
        './style.css',
        './bundle.js',
        './bundle.js.map'
      ]);
    })
  );
});

// self.addEventListener('activate', function (event) {
//   event.waitUntil(createDB());
// });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) console.log(event.request.url, ' is cached');
      if (!response) console.log(event.request.url, ' is fetched');
      return response || fetch(event.request);
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

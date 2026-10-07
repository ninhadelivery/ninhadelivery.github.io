// Ninha Delivery: app shell offline + cache das fontes.
// Ao mudar qualquer arquivo do app, suba a versão para forçar atualização.
const VERSION = "v2";
const SHELL = `shell-${VERSION}`;
const RUNTIME = "runtime";
const ASSETS = [
  "./",
  "manifest.webmanifest",
  "img/ninha.jpg",
  "img/tapioca.jpg",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Página: rede primeiro (pega atualizações), cache se offline.
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put("./", copy));
          return res;
        })
        .catch(() => caches.match("./"))
    );
    return;
  }

  // Google Fonts: cache, atualiza em segundo plano.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(RUNTIME).then(async (c) => {
        const hit = await c.match(request);
        const net = fetch(request).then((res) => { c.put(request, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Arquivos do próprio app: cache primeiro.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(request).then((hit) => hit || fetch(request)));
  }
});

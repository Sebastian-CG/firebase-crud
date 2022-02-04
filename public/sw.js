if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[a]) return;
    let c = {};
    const r = (e) => s(e, a),
      o = { module: { uri: a }, exports: c, require: r };
    n[a] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-1846d813"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/1bfc9850-07311823a2d067f6.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/framework-91d7f78b5b4003c8.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/main-a1935d2e4fcfff50.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/pages/_app-e6584f91e8673a94.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/pages/_error-2280fa386d040b66.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/pages/index-add87b505084c556.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/pages/login-e23296a398c447ae.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/chunks/webpack-9b312e20a4e32339.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/css/e47a9bfe21a6b872.css",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/nXQoNedk1rz4DKDtEG9rQ/_buildManifest.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/nXQoNedk1rz4DKDtEG9rQ/_middlewareManifest.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        {
          url: "/_next/static/nXQoNedk1rz4DKDtEG9rQ/_ssgManifest.js",
          revision: "nXQoNedk1rz4DKDtEG9rQ",
        },
        { url: "/favicon.ico", revision: "4ff59fef4ad8bd2547e3db47bac48f20" },
        {
          url: "/icons/icon-128x128.png",
          revision: "d626cfe7c65e6e5403bcbb9d13aa5053",
        },
        {
          url: "/icons/icon-144x144.png",
          revision: "e53a506b62999dc7a4f8b7222f8c5add",
        },
        {
          url: "/icons/icon-152x152.png",
          revision: "18b3958440703a9ecd3c246a0f3f7c72",
        },
        {
          url: "/icons/icon-16x16.png",
          revision: "83703514f19796ee15151e450984416d",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "27dc12f66697a47b6a8b3ee25ba96257",
        },
        {
          url: "/icons/icon-32x32.png",
          revision: "25e2c6ee34840568012b32e4314278df",
        },
        {
          url: "/icons/icon-384x384.png",
          revision: "a40324a3fde2b0b26eeffd4f08bf8be8",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "93d6e8e15cfa78dfee55446f607d9a28",
        },
        {
          url: "/icons/icon-72x72.png",
          revision: "f2ffc41b3482888f3ae614e0dd2f6980",
        },
        {
          url: "/icons/icon-96x96.png",
          revision: "fba02a40f7ba6fc65be8a2f245480f6d",
        },
        { url: "/manifest.json", revision: "146b602025068b3ccdb01eb8237e4093" },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: n,
              event: s,
              state: i,
            }) =>
              n && "opaqueredirect" === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: "OK",
                    headers: n.headers,
                  })
                : n,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const n = e.pathname;
        return !n.startsWith("/api/auth/") && !!n.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});

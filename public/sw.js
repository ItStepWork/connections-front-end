if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>t(e,a),d={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"483aecc54a4e15446f736e7faded532d"},{url:"/_next/static/XMestPV4MQt4b4tEh5zUO/_buildManifest.js",revision:"9398e4c00894b940f12c9ee80d3484b4"},{url:"/_next/static/XMestPV4MQt4b4tEh5zUO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-ef241ea902242989.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/07115393-1f198846d118ffa7.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/12038df7-c63603e3065dbeb0.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/158-62f5a6b54971b14d.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/2ac5b572-f0426099c0d670b1.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/3146ec7c-a1df9b074b8e3281.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/358ff52d-630721315782ee47.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/3627521c-b3dcb3e636914821.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/374-84e46fb1e47d21b4.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/39209d7c-5dd9564e5f70d931.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/39aecf79-3b11756b362ff4e8.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/59101d47-96fc9929dda84522.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/596-24568caea93e8176.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/685-a6c8fdab339ee261.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/6d8aeda9-14b5625c0358da9f.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/742-503e0d956c9ed5a9.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/749-370e73ffde580507.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/793-0f673a10e6a6a6ca.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/7f5518ac-82fedb907c160ad9.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/865-763e9a2c6e90d6f7.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/8dc5345f-7e95ea1987da15a9.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/9081a741-0ba4da4e9c3ff6b0.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/93854f56-cdaa4ac0ec7397f4.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/98916abf-0ef12dd0abbb36a0.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/aboutMe/page-d2ba475ad56883d7.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/groupPage/page-e2b3da4bcedf2ea0.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/layout-70eb1c8767f87070.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/main/page-1035b2161027600d.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/messaging/page-2fe094d0ae616059.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/page-e05fe4d0dd7e4106.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/profile/page-1227f26c8a55dc81.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/settings/page-b64bd842d8555691.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/signIn/page-88b48bbaf40bdd12.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/app/signUp/page-a5ba3b9642eb859a.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/bc9c3264-e0d341309504d58c.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/d622d42c-0216686cfc8dc0db.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/f8d8885d-4d04e3c7219e1ac1.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/fd9d1056-274c859a50e81621.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/main-app-e5e5cc86001c1eec.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/main-b7d38f23cb53f4a9.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1c162015b8904ba8.js",revision:"XMestPV4MQt4b4tEh5zUO"},{url:"/_next/static/css/038730a5f088313a.css",revision:"038730a5f088313a"},{url:"/_next/static/css/0e1df5b12d6ebea6.css",revision:"0e1df5b12d6ebea6"},{url:"/_next/static/css/10fbb80eca90f57c.css",revision:"10fbb80eca90f57c"},{url:"/_next/static/css/1abd8bd271425b9e.css",revision:"1abd8bd271425b9e"},{url:"/_next/static/css/4bb3efa3e074f919.css",revision:"4bb3efa3e074f919"},{url:"/_next/static/css/9bd2b9c1a0c9f672.css",revision:"9bd2b9c1a0c9f672"},{url:"/_next/static/css/c2cbdbd3531ade6e.css",revision:"c2cbdbd3531ade6e"},{url:"/_next/static/css/cec09dc788f04dd8.css",revision:"cec09dc788f04dd8"},{url:"/_next/static/css/df5fc00e40e6b5b6.css",revision:"df5fc00e40e6b5b6"},{url:"/_next/static/css/ea3c52f846d2667d.css",revision:"ea3c52f846d2667d"},{url:"/_next/static/css/fbef9c1de12f1d41.css",revision:"fbef9c1de12f1d41"},{url:"/_next/static/media/1060bab20f18b5c2-s.p.woff2",revision:"d5de368ad6cb9721be72319431de3adb"},{url:"/_next/static/media/8ed0c04f7e5d7b36-s.woff2",revision:"d9e0d8b1dd2f16658a138c486b5c8c76"},{url:"/_next/static/media/b1464bad92c88a2d-s.woff2",revision:"86d7730928022ce4a8457e979238654b"},{url:"/_next/static/media/c528baaebca50056-s.woff2",revision:"b043858588196a795ae0613d36b0b7d4"},{url:"/_next/static/media/darkModeBgImage.896f49d5.png",revision:"896f49d5"},{url:"/_next/static/media/df4ba022c23c08de-s.woff2",revision:"60883f3586a85c7be1f5aa9e985aea48"},{url:"/_next/static/media/whiteModeBgImage.40184194.png",revision:"40184194"},{url:"/darkModeBgImage.png",revision:"f2008eb1aa0ade74f49ef2fe80757351"},{url:"/icon-192x192.png",revision:"36ddd9e3f1e19f9472cdebc1e807f3b3"},{url:"/icon-256x256.png",revision:"af9dc5a2d92bf518ba860980dc85275a"},{url:"/icon-384x384.png",revision:"14ca13ac1c7531b85879c08c0789ac50"},{url:"/icon-512x512.png",revision:"f2720e7dfe50d74f5a9bfe600faee2b5"},{url:"/manifest.json",revision:"9251e331111f7b55d43af8034efd417f"},{url:"/whiteModeBgImage.png",revision:"403475bfbd15268ecd1ec99281ba92db"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

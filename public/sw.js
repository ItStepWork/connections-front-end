if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"9398fca9890a3500b78afb32fb2014de"},{url:"/_next/static/XfLZSyopUqrZjLmxHL4OZ/_buildManifest.js",revision:"9398e4c00894b940f12c9ee80d3484b4"},{url:"/_next/static/XfLZSyopUqrZjLmxHL4OZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-9cedad2a084dc8df.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/222-43a800f73bcb91aa.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/2ac5b572-f0426099c0d670b1.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/3146ec7c-a1df9b074b8e3281.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/323-feed36ab1702c59b.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/3627521c-c4d5fc56228956f4.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/364-27e465800cd3d5ff.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/541-22cd4c9b2431b8da.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/59101d47-96fc9929dda84522.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/596-15646e4de5745a50.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/685-643043d12e743d06.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/6d8aeda9-14b5625c0358da9f.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/749-1ecbb8c94d016cef.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/7f5518ac-82fedb907c160ad9.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/8dc5345f-4f4457674aa014e7.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/groupsPage/page-731b7b094d436cd8.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/layout-dff92814429937ba.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/page-e05fe4d0dd7e4106.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/profilePage/page-43aca9dbaed31d3a.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/settingsPage/page-5e34bda887abb745.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/signinPage/page-6e974d9723d0e1d2.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/app/signupPage/page-e17e96131afdeb21.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/bc9c3264-bf91b49e69d7c0c4.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/f8d8885d-4d04e3c7219e1ac1.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/fd9d1056-3881893f43483c7e.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/main-app-e5e5cc86001c1eec.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/main-b62a2bfa1ea89ded.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-07d828f10a8b6b96.js",revision:"XfLZSyopUqrZjLmxHL4OZ"},{url:"/_next/static/css/21b68052948a320e.css",revision:"21b68052948a320e"},{url:"/_next/static/css/a237b0cbf7616166.css",revision:"a237b0cbf7616166"},{url:"/_next/static/css/b08795fd1629f5a4.css",revision:"b08795fd1629f5a4"},{url:"/_next/static/css/cf9f04f8d9b3ea76.css",revision:"cf9f04f8d9b3ea76"},{url:"/_next/static/css/cff24a68eb279e1d.css",revision:"cff24a68eb279e1d"},{url:"/_next/static/css/d01d4ff7f8753e1c.css",revision:"d01d4ff7f8753e1c"},{url:"/_next/static/media/1060bab20f18b5c2-s.p.woff2",revision:"d5de368ad6cb9721be72319431de3adb"},{url:"/_next/static/media/8ed0c04f7e5d7b36-s.woff2",revision:"d9e0d8b1dd2f16658a138c486b5c8c76"},{url:"/_next/static/media/b1464bad92c88a2d-s.woff2",revision:"86d7730928022ce4a8457e979238654b"},{url:"/_next/static/media/c528baaebca50056-s.woff2",revision:"b043858588196a795ae0613d36b0b7d4"},{url:"/_next/static/media/df4ba022c23c08de-s.woff2",revision:"60883f3586a85c7be1f5aa9e985aea48"},{url:"/icon-192x192.png",revision:"36ddd9e3f1e19f9472cdebc1e807f3b3"},{url:"/icon-256x256.png",revision:"af9dc5a2d92bf518ba860980dc85275a"},{url:"/icon-384x384.png",revision:"14ca13ac1c7531b85879c08c0789ac50"},{url:"/icon-512x512.png",revision:"f2720e7dfe50d74f5a9bfe600faee2b5"},{url:"/manifest.json",revision:"9251e331111f7b55d43af8034efd417f"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

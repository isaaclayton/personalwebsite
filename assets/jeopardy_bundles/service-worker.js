"use strict";var precacheConfig=[["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/css/main.6230a843.css","4aa22061f227570098ba3d69635abdd8"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/index.html","0f9938350db6596cc5aaa804401b65f3"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/NBAMAVER.0c1b4b36.TTF","0c1b4b363869803c58c7e61fa7d36740"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/NBAMAVER.310d0849.woff","310d084959e406bd306bbedf2514b11f"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/clue_word_list.4b6b8a55.csv","4b6b8a558df53200608008f06dc5445d"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/gyparody-webfont.e200ff5e.ttf","e200ff5eff87f8cad3bacdce0f5a1e3b"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/gyparody-webfont.f9e59f57.woff","f9e59f57c2ee5c9949a9b960972c93e3"],["https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/media/state_win_rates.75bfc74a.csv","75bfc74a8d163c9d68fe0b50421ebba2"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),a=createCacheKey(r,hashParamName,n,/\.\w{8}\./);return[r.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),r="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,r),t=urlsToCacheKeys.has(n));var a="https://d18grwbif3izzf.cloudfront.net/static/jeopardy_bundles/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL(a,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});
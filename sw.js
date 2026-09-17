const CACHE='sushi-shell-v3-cloudflare';
const BASE=new URL('./',self.location.href).pathname;
const SHELL=['offline.html','icon-192.png','icon-512.png','manifest.webmanifest'].map(p=>BASE+p);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sushi-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/api/'))return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(BASE+'offline.html')));return;}if(SHELL.includes(u.pathname))e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(list=>list.length?list[0].focus():self.clients.openWindow(BASE)));});

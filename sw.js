var C='fox-calisthenics-v7';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    Promise.race([fetch(e.request),new Promise(function(_,rej){setTimeout(rej,4000);})]).then(function(r){
      var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp);});return r;
    }).catch(function(){return caches.match(e.request);})
  );
});
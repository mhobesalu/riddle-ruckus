# Builds the installable web version of Decoded: True Stories into OUT (default /home/user/riddle-ruckus). Run: python3 build.py && python3 pwa.py
import os, hashlib, json
from PIL import Image, ImageDraw, ImageFont
D=os.path.dirname(os.path.abspath(__file__)); OUT=os.environ.get('OUT',os.path.dirname(os.path.abspath(__file__)))
h=open(os.path.join(D,'index.html'),encoding='utf-8').read(); ver=hashlib.sha1(h.encode()).hexdigest()[:10]
head='''<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" type="image/png" href="icon-192.png">
<script>if('serviceWorker' in navigator){addEventListener('load',function(){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(function(){})})}</script>
'''
h=h.replace('</title>','</title>\n'+head,1)
open(os.path.join(OUT,'index.html'),'w',encoding='utf-8').write(h)
json.dump({"name":"Decoded: True Stories","short_name":"Decoded","start_url":"./","scope":"./","display":"standalone","background_color":"#fbf5ee","theme_color":"#2a1e3f",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]},open(os.path.join(OUT,'manifest.webmanifest'),'w'),indent=1)
files=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png']
open(os.path.join(OUT,'sw.js'),'w').write(f'''const C='riddle-{ver}';const F={json.dumps(files)};
self.addEventListener('install',e=>{{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{{cache:'reload'}})))))}});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{{if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){{e.respondWith(fetch(e.request,{{cache:'no-store'}}).then(r=>{{const cp=r.clone();caches.open(C).then(c=>c.put('./',cp));return r}}).catch(()=>caches.match('./')))}}
 else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))}});
''')
open(os.path.join(OUT,'.nojekyll'),'w').close()
im=Image.open(os.path.join(D,'native','assets','icon-1024.png'))  # drawn by native/assets/make-icons.py
for s_ in (180,192,512): im.resize((s_,s_),Image.LANCZOS).save(os.path.join(OUT,f'icon-{s_}.png'))
print('pwa built',ver)

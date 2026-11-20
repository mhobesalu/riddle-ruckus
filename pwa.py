# Builds the installable web version of Riddle & Ruckus into OUT (default /home/user/riddle-ruckus). Run: python3 build.py && python3 pwa.py
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
json.dump({"name":"Riddle & Ruckus","short_name":"Riddle","start_url":"./","scope":"./","display":"standalone","background_color":"#fbf5ee","theme_color":"#2a1e3f",
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
S=1024; im=Image.new('RGB',(S,S),(42,30,63)); d=ImageDraw.Draw(im)
d.rounded_rectangle([150,230,874,794],radius=90,fill=(232,96,76))
for y in (420,604):
  for x0 in (260,620): d.line([(x0,y),(x0+150,y)],fill=(251,245,238),width=44)
try: f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',300)
except Exception: f=ImageFont.load_default()
d.text((512,512),'?',font=f,fill=(242,184,75),anchor='mm')
for s in (180,192,512): im.resize((s,s),Image.LANCZOS).save(os.path.join(OUT,f'icon-{s}.png'))
print('pwa built',ver)

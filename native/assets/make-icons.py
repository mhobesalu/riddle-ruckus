# Draws the Decoded icon and writes every iOS / Android icon and splash image.
# Run from native/:  python3 assets/make-icons.py
import os
from PIL import Image, ImageDraw, ImageFont
BG=(42,30,63); CORAL=(232,96,76); CREAM=(251,245,238); GOLD=(242,184,75)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def mark(size, bg=BG, scale=1.0, transparent=False):
    S=size*4; im=Image.new('RGBA',(S,S),(0,0,0,0) if transparent else bg+(255,)); d=ImageDraw.Draw(im)
    w=S*0.70*scale; h=S*0.55*scale; x0=(S-w)/2; y0=(S-h)/2
    d.rounded_rectangle([x0,y0,x0+w,y0+h],radius=w*0.12,fill=CORAL)
    lw=max(2,int(w*0.06)); dl=w*0.2
    for fy in (0.335,0.665):
        y=y0+h*fy
        for fx in (0.15,0.65): d.line([(x0+w*fx,y),(x0+w*fx+dl,y)],fill=CREAM,width=lw)
    f=ImageFont.truetype(FONT,int(h*0.62)); d.text((S/2,S/2),'?',font=f,fill=GOLD,anchor='mm')
    return im.resize((size,size),Image.LANCZOS)
D=os.path.dirname(os.path.abspath(__file__)); N=os.path.dirname(D)
mark(1024).convert('RGB').save(os.path.join(D,'icon-1024.png'))
mark(1024).convert('RGB').save(os.path.join(N,'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'))
res=os.path.join(N,'android/app/src/main/res')
for dpi,s in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
    mark(s).convert('RGB').save(f'{res}/mipmap-{dpi}/ic_launcher.png')
    r=mark(s); m=Image.new('L',(s*4,s*4),0); ImageDraw.Draw(m).ellipse([0,0,s*4,s*4],fill=255); r.putalpha(m.resize((s,s),Image.LANCZOS)); r.save(f'{res}/mipmap-{dpi}/ic_launcher_round.png')
    fs=int(s*2.25); mark(fs,scale=0.62,transparent=True).save(f'{res}/mipmap-{dpi}/ic_launcher_foreground.png')
def splash(path,w,h):
    im=Image.new('RGB',(w,h),BG); s=int(min(w,h)*0.32); m=mark(s,transparent=True); im.paste(m,((w-s)//2,(h-s)//2),m); im.save(path)
for f in os.listdir(os.path.join(N,'ios/App/App/Assets.xcassets/Splash.imageset')):
    if f.endswith('.png'): splash(os.path.join(N,'ios/App/App/Assets.xcassets/Splash.imageset',f),2732,2732)
for dname in os.listdir(res):
    p=os.path.join(res,dname,'splash.png')
    if os.path.exists(p): w,h=Image.open(p).size; splash(p,w,h)
print('icons done')

import os
D=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(D,'app.html')).read()
for tag,f in [('/*STORIES*/','stories.js'),('/*STORIES2*/','stories2.js'),('/*STORIES3*/','stories3.js')]:
    s=s.replace(tag,open(os.path.join(D,f)).read())
open(os.path.join(D,'index.html'),'w').write(s)

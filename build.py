import os
D=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(D,'app.html')).read().replace('/*STORIES*/',open(os.path.join(D,'stories.js')).read())
open(os.path.join(D,'index.html'),'w').write(s)

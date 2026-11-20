// Builds native/www from the web app in the repo root, for the App Store build.
// The App Store build has no service worker and no website analytics.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(__dirname, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const strip = (re, what) => {
  if (!re.test(html)) throw new Error('build-web: could not find ' + what);
  html = html.replace(re, '');
};
strip(/<script>if\('serviceWorker' in navigator\)[^\n]*<\/script>\n?/, 'service worker registration');
strip(/<link rel="manifest"[^>]*>\n?/, 'manifest link');
fs.writeFileSync(path.join(out, 'index.html'), html);
for (const f of ['icon-180.png', 'icon-192.png']) fs.copyFileSync(path.join(root, f), path.join(out, f));
console.log('build-web: wrote', out);

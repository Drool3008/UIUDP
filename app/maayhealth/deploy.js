const fs = require('fs');
const path = require('path');

// ── Patch index.html ──
const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const cacheBust = `?v=${Date.now()}`;

html = html.replace(/href="\/_expo\//g, 'href="./_expo/');
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon/g, 'href="./favicon');
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

html = html.replace(/(src="\.\/_expo\/static\/js\/web\/[^"]+)(")/g, `$1${cacheBust}$2`);

html = html.replace('<head>', `<head>\n    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n    <meta http-equiv="Pragma" content="no-cache">\n    <meta http-equiv="Expires" content="0">`);

fs.writeFileSync(indexPath, html);

// ── Patch JS bundle: fix relative asset paths ──
const jsDir = path.join(__dirname, 'dist', '_expo', 'static', 'js', 'web');
if (fs.existsSync(jsDir)) {
  const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  jsFiles.forEach(jsFile => {
    const jsPath = path.join(jsDir, jsFile);
    let js = fs.readFileSync(jsPath, 'utf8');
    
    // Assets referenced as relative paths from deep JS location are wrong
    // Fix: assets/New_assets/... → ./assets/assets/New_assets/...
    // But we need to be careful not to break already-correct paths
    js = js.replace(/"assets\/New_assets\//g, '"./assets/assets/New_assets/');
    
    fs.writeFileSync(jsPath, js);
    console.log(`✓ Patched ${jsFile}`);
  });
}

// ── Copy original assets to dist/assets (fallback) ──
const srcAssets = path.join(__dirname, 'assets', 'New_assets');
const distAssets = path.join(__dirname, 'dist', 'assets', 'New_assets');

if (fs.existsSync(srcAssets)) {
  if (!fs.existsSync(distAssets)) {
    fs.mkdirSync(distAssets, { recursive: true });
  }
  const files = fs.readdirSync(srcAssets);
  files.forEach(file => {
    const src = path.join(srcAssets, file);
    const dest = path.join(distAssets, file);
    fs.copyFileSync(src, dest);
  });
  console.log(`✓ Copied ${files.length} assets to dist/assets/New_assets/`);
}

// ── Add .nojekyll ──
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');

console.log('✓ Deploy patched for GitHub Pages');
console.log(`✓ Cache-bust: ${cacheBust}`);

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Add cache-busting version param to force browsers to load latest
const cacheBust = `?v=${Date.now()}`;

// Fix absolute paths → relative so GitHub Pages /UIUDP/ subpath works
html = html.replace(/href="\/_expo\//g, 'href="./_expo/');
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon/g, 'href="./favicon');

// Also fix asset paths if they use absolute paths
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

// Add cache-busting to JS bundle to force fresh load
html = html.replace(/(src="\.\/_expo\/static\/js\/web\/[^"]+)(")/g, `$1${cacheBust}$2`);

// Add no-cache meta tag
html = html.replace('<head>', `<head>\n    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n    <meta http-equiv="Pragma" content="no-cache">\n    <meta http-equiv="Expires" content="0">`);

fs.writeFileSync(indexPath, html);

// Copy assets/New_assets to dist/assets if not already there
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

// Add .nojekyll so GitHub Pages serves the _expo/ folder
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');

console.log('✓ Patched dist/index.html for GitHub Pages');
console.log(`✓ Cache-bust: ${cacheBust}`);

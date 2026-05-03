const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Fix absolute paths → relative so GitHub Pages /UIUDP/ subpath works
html = html.replace(/href="\/_expo\//g, 'href="./_expo/');
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon/g, 'href="./favicon');

// Also fix asset paths if they use absolute paths
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

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

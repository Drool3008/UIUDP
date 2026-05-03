const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Fix absolute paths → relative so GitHub Pages /UIUDP/ subpath works
html = html.replace(/href="\/_expo\//g, 'href="./_expo/');
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon/g, 'href="./favicon');

fs.writeFileSync(indexPath, html);

// Add .nojekyll so GitHub Pages serves the _expo/ folder
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');

console.log('✓ Patched dist/index.html for GitHub Pages');

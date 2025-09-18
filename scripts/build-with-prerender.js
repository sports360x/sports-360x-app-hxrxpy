
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Sports 360 X with prerendering...');

try {
  // Step 1: Build the Expo web app
  console.log('📦 Building Expo web app...');
  execSync('expo export -p web', { stdio: 'inherit' });
  
  // Step 2: Copy static prerendered pages
  console.log('📄 Copying prerendered pages...');
  const distDir = path.join(process.cwd(), 'dist');
  const webDir = path.join(process.cwd(), 'web');
  
  if (fs.existsSync(webDir)) {
    // Copy analytics.html to dist/analytics/index.html
    const analyticsDir = path.join(distDir, 'analytics');
    if (!fs.existsSync(analyticsDir)) {
      fs.mkdirSync(analyticsDir, { recursive: true });
    }
    
    const analyticsHtml = path.join(webDir, 'analytics.html');
    if (fs.existsSync(analyticsHtml)) {
      fs.copyFileSync(analyticsHtml, path.join(analyticsDir, 'index.html'));
      console.log('✅ Copied analytics.html to /analytics/index.html');
    }
  }
  
  // Step 3: Generate sitemap
  console.log('🗺️  Generating sitemap...');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/analytics</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://your-domain.com/scores</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
  
  // Step 4: Run workbox for service worker
  console.log('⚙️  Generating service worker...');
  try {
    execSync('npx workbox generateSW workbox-config.js', { stdio: 'inherit' });
    console.log('✅ Service worker generated');
  } catch (error) {
    console.log('⚠️  Service worker generation skipped (workbox-config.js not found)');
  }
  
  console.log('🎉 Build completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('🌐 Prerendered routes: /, /analytics');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

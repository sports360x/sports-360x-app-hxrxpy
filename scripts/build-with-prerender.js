
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Sports 360 X with prerendering...');

try {
  // Build the web version
  console.log('📦 Building web version...');
  execSync('expo export -p web', { stdio: 'inherit' });

  // Create prerendered pages
  console.log('🔄 Creating prerendered pages...');
  
  const distDir = path.join(process.cwd(), 'dist');
  const webDir = path.join(process.cwd(), 'web');
  
  // Copy web assets to dist
  if (fs.existsSync(webDir)) {
    const webFiles = fs.readdirSync(webDir);
    webFiles.forEach(file => {
      if (file.endsWith('.html')) {
        const srcPath = path.join(webDir, file);
        const destPath = path.join(distDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file} to dist`);
      }
    });
  }

  console.log('✨ Build with prerendering complete!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting GitHub Pages deployment for custom domain...');

try {
  // Step 1: Build the React app
  console.log('📦 Building React app...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  // Step 2: Checkout gh-pages branch
  console.log('🌿 Switching to gh-pages branch...');
  execSync('git checkout gh-pages', { stdio: 'inherit' });

  // Step 3: Remove old files (except .git, node_modules, and client/node_modules)
  console.log('🧹 Cleaning old files...');
  const filesToKeep = ['.git', 'node_modules', 'client'];
  const allFiles = fs.readdirSync('.');
  allFiles.forEach(file => {
    if (!filesToKeep.includes(file) && !file.startsWith('.')) {
      try {
        execSync(`rm -rf "${file}"`, { stdio: 'inherit' });
      } catch (e) {
        console.log(`Warning: Could not remove ${file}`);
      }
    }
  });

  // Step 4: Copy built files to root
  console.log('📁 Copying built files to root...');
  execSync('cp -r client/build/* .', { stdio: 'inherit' });

  // Step 5: Create CNAME file for custom domain
  console.log('🔗 Creating CNAME file...');
  fs.writeFileSync('CNAME', 'www.hemanishah.com\n');

  // Step 6: Add and commit changes
  console.log('📝 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages with custom domain"', { stdio: 'inherit' });

  // Step 7: Push to GitHub
  console.log('🚀 Pushing to GitHub...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  // Step 8: Switch back to main branch
  console.log('🔄 Switching back to main branch...');
  execSync('git checkout main', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your site should be live at: https://www.hemanishah.com');
  console.log('⏰ It may take a few minutes for changes to appear.');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} 
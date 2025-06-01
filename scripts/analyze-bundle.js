const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { gzipSizeSync } = require('gzip-size');
const filesize = require('filesize');

// Create a simple gzipSizeSync fallback if the module fails to load
const safeGzipSizeSync = (content) => {
  try {
    return gzipSizeSync(content);
  } catch (error) {
    console.warn('Failed to get gzip size:', error.message);
    return Math.floor(content.length * 0.6); // Rough estimate
  }
};

// Ensure .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('Building the application first...');
  execSync('npm run build', { stdio: 'inherit' });
}

console.log('\n📦 Analyzing bundle size...\n');

// Get all chunks
const chunksDir = path.join(nextDir, 'static/chunks');
const pagesDir = path.join(nextDir, 'server/pages');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.name.endsWith('.js') || file.name.endsWith('.css')) {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath);
      const gzip = safeGzipSizeSync(content);
      fileList.push({
        path: filePath.replace(process.cwd(), ''),
        size: stats.size,
        gzip,
      });
    }
  });

  return fileList;
}

// Get all relevant files
const allFiles = [
  ...getFiles(chunksDir),
  ...getFiles(pagesDir),
  ...getFiles(path.join(nextDir, 'static/css')),
];

// Sort by size (largest first)
allFiles.sort((a, b) => b.size - a.size);

// Print summary
console.log('📊 Bundle Size Summary\n');
console.log('File'.padEnd(80) + 'Size'.padStart(15) + 'Gzipped'.padStart(15));
console.log('-'.repeat(110));

let totalSize = 0;
let totalGzip = 0;

allFiles.slice(0, 20).forEach((file) => {
  const size = filesize(file.size, { round: 1 });
  const gzip = filesize(file.gzip, { round: 1 });
  console.log(file.path.padEnd(80) + size.padStart(15) + gzip.padStart(15));
  totalSize += file.size;
  totalGzip += file.gzip;
});

console.log('\n💡 Optimization Tips:');
console.log('1. Use dynamic imports for large components with `next/dynamic`');
console.log('2. Check for duplicate dependencies with `npm dedupe`');
console.log('3. Remove unused dependencies with `depcheck`');
console.log('4. Run `npm run analyze` for a detailed bundle analysis');
console.log('\n🔍 For more details, run:');
console.log('   npm run analyze');

// Save results to file
const results = {
  timestamp: new Date().toISOString(),
  totalFiles: allFiles.length,
  totalSize,
  totalGzip,
  largestFiles: allFiles.slice(0, 10).map((f) => ({
    path: f.path,
    size: f.size,
    gzip: f.gzip,
  })),
};

fs.writeFileSync(path.join(process.cwd(), 'bundle-stats.json'), JSON.stringify(results, null, 2));

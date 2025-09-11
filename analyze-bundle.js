const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size and dependencies...\n');

// Check if next-bundle-analyzer is installed
try {
  require.resolve('@next/bundle-analyzer');
} catch (e) {
  console.log('📦 Installing @next/bundle-analyzer...');
  execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
}

// Create bundle analyzer config
const bundleAnalyzerConfig = `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your existing next config here
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['img.clerk.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
});
`;

fs.writeFileSync('next.config.analyzer.js', bundleAnalyzerConfig);

// Add analyze script to package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!packageJson.scripts.analyze) {
  packageJson.scripts.analyze = 'ANALYZE=true next build';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Added analyze script to package.json');
}

console.log('\n📊 Bundle Analysis Setup Complete!');
console.log('\nTo analyze your bundle:');
console.log('1. Run: npm run analyze');
console.log('2. This will open a browser with detailed bundle analysis');
console.log('3. Look for large dependencies and optimize them');
console.log('\n💡 Optimization Tips:');
console.log('- Use dynamic imports for large components');
console.log('- Implement code splitting for routes');
console.log('- Optimize images and use next/image');
console.log('- Remove unused dependencies');
console.log('- Use tree shaking effectively');

// Check for common performance issues
console.log('\n🔍 Checking for common performance issues...\n');

const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

const allDeps = { ...dependencies, ...devDependencies };

// Check for large packages
const largePackages = [
  'framer-motion',
  'gsap',
  'primereact',
  'quill',
  'jspdf',
  'langchain'
];

largePackages.forEach(pkg => {
  if (allDeps[pkg]) {
    console.log(`⚠️  Large package detected: ${pkg}`);
    console.log(`   Consider lazy loading or alternatives`);
  }
});

// Check for duplicate packages
const duplicateCheck = {};
Object.keys(allDeps).forEach(dep => {
  if (dep.includes('@types/')) {
    const baseName = dep.replace('@types/', '');
    if (allDeps[baseName]) {
      duplicateCheck[baseName] = true;
    }
  }
});

if (Object.keys(duplicateCheck).length > 0) {
  console.log('\n⚠️  Potential duplicate packages detected:');
  Object.keys(duplicateCheck).forEach(pkg => {
    console.log(`   - ${pkg} and @types/${pkg}`);
  });
}

console.log('\n✅ Bundle analysis setup complete!');
console.log('Run "npm run analyze" to see detailed bundle information.');

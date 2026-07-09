const fs = require('fs');
const glob = require('glob'); // maybe not available, let's just use child_process
const { execSync } = require('child_process');

try {
  execSync("sed -i 's/apple-bg/brand-bg/g' src/*.tsx src/**/*.tsx");
  execSync("sed -i 's/apple-card/brand-surface/g' src/*.tsx src/**/*.tsx");
  execSync("sed -i 's/apple-text/brand-text/g' src/*.tsx src/**/*.tsx");
  execSync("sed -i 's/apple-muted/brand-muted/g' src/*.tsx src/**/*.tsx");
  execSync("sed -i 's/apple-border/brand-border/g' src/*.tsx src/**/*.tsx");
  
  // Update Home.tsx hardcoded colors
  execSync("sed -i 's/\\[#f5f5f7\\]/brand-surface/g' src/pages/Home.tsx");
  execSync("sed -i 's/\\[#1d1d1f\\]/brand-text/g' src/pages/Home.tsx");
  execSync("sed -i 's/\\[#86868b\\]/brand-muted/g' src/pages/Home.tsx");
  execSync("sed -i 's/\\[#e5e5ea\\]/brand-border/g' src/pages/Home.tsx");
  execSync("sed -i 's/\\[#ff3b30\\]/brand-accent/g' src/pages/Home.tsx");

  console.log("Replaced colors.");
} catch (e) {
  console.log(e.message);
}

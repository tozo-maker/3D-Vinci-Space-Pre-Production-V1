const fs = require('fs');
let code = fs.readFileSync('src/RootLayout.tsx', 'utf8');

const startStr = "{/* ----------------- SEARCH OVERLAY ----------------- */}";
const endStr = "{isSearchOpen && (";
const startIdx = code.indexOf(startStr);

if (startIdx !== -1) {
  // Let's just use string replacement manually
  // I will replace everything after SEARCH OVERLAY up to the end of the return statement
  // Wait, better to just write a simple regex or substring replacement
}

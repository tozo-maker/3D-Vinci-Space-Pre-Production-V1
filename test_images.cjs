const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');
code = code.replace(/<img/g, '<img referrerPolicy="no-referrer"');
fs.writeFileSync('src/pages/Home.tsx', code);

code = fs.readFileSync('src/pages/Tools.tsx', 'utf8');
code = code.replace(/<img/g, '<img referrerPolicy="no-referrer"');
fs.writeFileSync('src/pages/Tools.tsx', code);

code = fs.readFileSync('src/components/AISearchOverlay.tsx', 'utf8');
code = code.replace(/<img/g, '<img referrerPolicy="no-referrer"');
fs.writeFileSync('src/components/AISearchOverlay.tsx', code);

code = fs.readFileSync('src/RootLayout.tsx', 'utf8');
code = code.replace(/<img/g, '<img referrerPolicy="no-referrer"');
fs.writeFileSync('src/RootLayout.tsx', code);

console.log("Images updated with referrerPolicy");

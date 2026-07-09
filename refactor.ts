import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. We will extract the inner contents of `<main className="xl:px-16 w-full">` and everything above `export default function App()`
// to form `src/pages/MadeInGeorgia.tsx`.

// The main App component starts here:
const appStart = appContent.indexOf('export default function App() {');
const preApp = appContent.substring(0, appStart);
const appBody = appContent.substring(appStart);

// Extract the `<main...>` section from appBody
const mainStart = appBody.indexOf('<main className="xl:px-16 w-full">');
const mainEnd = appBody.indexOf('</main>', mainStart) + '</main>'.length;

const mainContent = appBody.substring(mainStart, mainEnd);

// Replace the mainContent in appBody with `<Outlet context={{ setSelectedObject }} />`
// Note: We'll put `mt-24` on the `<main>` to offset the fixed nav.
const newAppBody = appBody.replace(mainContent, `<main className="xl:px-16 w-full mt-24"><Outlet context={{ setSelectedObject }} /></main>`);

// Write RootLayout.tsx (which is the updated App.tsx)
const rootLayoutContent = `import { Outlet, Link, useLocation } from 'react-router-dom';\n` + preApp + newAppBody;

// Now, insert the navigation links into the <nav> in RootLayout
const navLinksHtml = `
            <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-apple-muted mr-4">
              <Link to="/" className="hover:text-apple-text transition-colors">Home</Link>
              <Link to="/services" className="hover:text-apple-text transition-colors">Services</Link>
              <Link to="/tools" className="hover:text-apple-text transition-colors">Tools</Link>
              <Link to="/made-in-georgia" className="hover:text-apple-text transition-colors">Made in Georgia</Link>
              <Link to="/journal" className="hover:text-apple-text transition-colors">Journal</Link>
              <Link to="/about" className="hover:text-apple-text transition-colors">About</Link>
              <Link to="/contact" className="hover:text-apple-text transition-colors">Contact</Link>
            </div>
`;
const searchIconPos = rootLayoutContent.indexOf('<button onClick={() => setIsSearchOpen(true)');
const updatedRootLayoutContent = rootLayoutContent.slice(0, searchIconPos) + navLinksHtml + rootLayoutContent.slice(searchIconPos);

fs.writeFileSync(path.join(process.cwd(), 'src/RootLayout.tsx'), updatedRootLayoutContent);

// Now create MadeInGeorgia.tsx
// It needs all the imports, local components (EthosSection, etc.), and the mainContent
const migContent = `import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PRODUCTS, REAL_SPACES, Product } from './data';
import { TolerancesGraphic, OriginGraphic } from './components/Graphics';

${preApp.replace(/import.*?;/g, '')} // Strip imports to avoid duplicates, we'll manually add what's needed or just leave preApp as is for safety.
`;

// Actually, it's safer to just duplicate the entire file into MadeInGeorgia.tsx, 
// remove the export default function App, and replace it with a smaller one that just renders the main content.
const safeMigContent = appContent.replace('export default function App() {', 'export default function MadeInGeorgia() {')
  .replace(/<nav[\s\S]*?<\/nav>/, '') // remove nav
  .replace(/<div className="fixed top-0 left-0 w-16 h-screen[\s\S]*?<\/div>\s*<\/div>/, '') // remove side architectural rails
  .replace(/<AnimatePresence>[\s\S]*?(?=<\/div>\s*\);\s*})/g, ''); // remove search/drawers at the bottom

// Remove the RootLayout-specific overlays from MadeInGeorgia
const finalMigContent = safeMigContent.substring(0, safeMigContent.lastIndexOf('</main>') + 7) + '\n    </div>\n  );\n}';

if (!fs.existsSync(path.join(process.cwd(), 'src/pages'))) {
  fs.mkdirSync(path.join(process.cwd(), 'src/pages'));
}
fs.writeFileSync(path.join(process.cwd(), 'src/pages/MadeInGeorgia.tsx'), finalMigContent);

console.log('Refactoring complete.');

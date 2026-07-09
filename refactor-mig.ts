import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// The main App component starts here:
const appStart = appContent.indexOf('export default function App() {');
const preApp = appContent.substring(0, appStart);
const appBody = appContent.substring(appStart);

// Extract the `<main...>` section from appBody
const mainStart = appBody.indexOf('<main className="xl:px-16 w-full">');
const mainEnd = appBody.indexOf('</main>', mainStart) + '</main>'.length;

const mainContent = appBody.substring(mainStart, mainEnd);

const migContent = `import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { PRODUCTS, REAL_SPACES, Product } from '../data';
import CADBlueprint from '../components/CADBlueprint';
import { TolerancesGraphic, OriginGraphic } from '../components/Graphics';
import { SectionNav } from '../components/SectionNav';
import { MasonryCatalog } from '../components/MasonryCatalog';

const MAKERS_MARK = "DESIGNED & FORMED IN TBILISI, GEORGIA // 41°43′N 44°47′E";

const getEngineeringData = (category: string) => {
  switch (category) {
    case 'Decor': return { mat: 'ENGINEERED POLYMER / MATTE', tol: '±0.15mm', time: '12h' };
    case 'Lighting': return { mat: 'HEAT-RESISTANT POLYMER (HRP)', tol: '±0.1mm', time: '18h' };
    case 'Educational': return { mat: 'FLEX-TPU / KINETIC JOINTS', tol: '±0.05mm', time: '8h' };
    case 'Desk': return { mat: 'BIO-RESIN / HEAVYWEIGHT', tol: '±0.1mm', time: '6h' };
    default: return { mat: 'PROPRIETARY LOCAL BLEND', tol: '±0.1mm', time: '10h' };
  }
};

${preApp.split('// ----------------------------------------------------------------------------').slice(1).join('// ----------------------------------------------------------------------------')}

export default function MadeInGeorgia() {
  const { setSelectedObject } = useOutletContext<{ setSelectedObject: (p: Product | null) => void }>();
  
  const [shopFilter, setShopFilter] = useState<'All' | 'Decor' | 'Lighting' | 'Educational' | 'Desk'>('All');
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('grid');
  
  const filteredProducts = useMemo(() => {
    let prods = PRODUCTS;
    if (shopFilter !== 'All') prods = prods.filter(p => p.category === shopFilter);
    return prods;
  }, [shopFilter]);

  // Hero Parallax Setup
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHeroFast = useTransform(heroProgress, [0, 1], [0, 200]);
  const yHeroSlow = useTransform(heroProgress, [0, 1], [0, 80]);
  const yHeroReverse = useTransform(heroProgress, [0, 1], [0, -50]);

  return (
    <>
      ${mainContent.replace('<main className="xl:px-16 w-full">', '<div className="w-full">').replace('</main>', '</div>')}
    </>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/pages/MadeInGeorgia.tsx'), migContent);
console.log('MadeInGeorgia.tsx created successfully.');

import { Outlet, Link, useLocation } from 'react-router-dom';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, X, Plus, Minus, ArrowRight, Workflow, MapPin, Layers, Box, CircleDashed, Hexagon, Calendar, Truck, Cpu, FileText, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { PRODUCTS, REAL_SPACES, Product } from './data';
import { useCart, useAddToCart, useUpdateLineItem, useRemoveLineItem, useUpdateCart, useCompleteCheckout } from './lib/medusa';
import CADBlueprint from './components/CADBlueprint';
import FabricationTelemetry from './components/FabricationTelemetry';
import { TolerancesGraphic, OriginGraphic } from './components/Graphics';
import { SectionNav } from './components/SectionNav';
import { MasonryCatalog } from './components/MasonryCatalog';
import { Logo } from './components/Logo';
import { AISearchOverlay } from './components/AISearchOverlay';
import FooterSection from './components/FooterSection';
import { getEngineeringData } from './components/StickyStackingCatalog';

const MAKERS_MARK = "DESIGNED & FORMED IN TBILISI, GEORGIA // 41°43′N 44°47′E";

// ----------------------------------------------------------------------------
// Main Application
// ----------------------------------------------------------------------------
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: cart } = useCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateLineItem } = useUpdateLineItem();
  const { mutate: removeLineItem } = useRemoveLineItem();
  const { mutate: updateCartData } = useUpdateCart();
  const { mutateAsync: completeCheckout } = useCompleteCheckout();
  const collectionItems = cart?.items || [];
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<Product | null>(null);
  
  // Custom Parametric Configurator States
  const [configMaterial, setConfigMaterial] = useState<'matte' | 'terracotta' | 'hrp' | 'obsidian'>('matte');
  const [configScale, setConfigScale] = useState<'miniature' | 'standard' | 'grand'>('standard');
  const [isCadMode, setIsCadMode] = useState<boolean>(false);

  // Secure Delivery & Print Queue Checkout Flow States
  const [checkoutStage, setCheckoutStage] = useState<'idle' | 'delivery' | 'queue' | 'processing' | 'receipt'>('idle');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [activeLab, setActiveLab] = useState<'lab-01' | 'lab-02'>('lab-02');
  const [selectedQueueSlot, setSelectedQueueSlot] = useState<'morning' | 'afternoon' | 'overnight'>('morning');
  const [compiledTicketId, setCompiledTicketId] = useState('');

  // Filtering
  const [shopFilter, setShopFilter] = useState<'All' | 'Decor' | 'Lighting' | 'Educational' | 'Desk'>('All');
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('grid');

  // Custom Form Builder
  const [customStep, setCustomStep] = useState(1);
  const [customData, setCustomData] = useState({ shape: '', material: '', scale: '', name: '', email: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Global Scroll Progress for Right Rail
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedObject || isCollectionOpen || isSearchOpen) ? 'hidden' : 'unset';
  }, [selectedObject, isCollectionOpen, isSearchOpen]);

  // Reset Configuration states when selected object changes
  useEffect(() => {
    if (selectedObject) {
      setConfigMaterial('matte');
      setConfigScale('standard');
      setIsCadMode(false);
    }
  }, [selectedObject]);

  // Reset checkout stage when collection drawer closes
  useEffect(() => {
    if (!isCollectionOpen) {
      setCheckoutStage('idle');
    }
  }, [isCollectionOpen]);

  // Dynamic live parameter calculator
  const configDetails = useMemo(() => {
    if (!selectedObject) return { price: 0, time: '0h', weight: '0g', resolution: '', matName: '' };
    
    // Base parameters
    const basePrice = selectedObject.price;
    const baseTime = parseInt(getEngineeringData(selectedObject.category).time) || 10;
    const baseWeight = 140; // Base compound density in grams

    // Scale modifiers
    let scaleMultiplier = 1.0;
    let timeMultiplier = 1.0;
    let weightMultiplier = 1.0;
    let resolution = "0.15mm (Fine FDM)";

    if (configScale === 'miniature') {
      scaleMultiplier = 0.75;
      timeMultiplier = 0.5;
      weightMultiplier = 0.4;
      resolution = "0.10mm (Ultra Fine SLA)";
    } else if (configScale === 'grand') {
      scaleMultiplier = 1.45;
      timeMultiplier = 1.8;
      weightMultiplier = 2.2;
      resolution = "0.20mm (Draft FDM)";
    }

    // Material compounding premiums
    let materialPremium = 0;
    let materialTimeAdded = 0;
    let matName = "Matte Polymer Composite";

    if (configMaterial === 'terracotta') {
      materialPremium = 8.00;
      materialTimeAdded = 2;
      matName = "Tbilisi Terracotta Sandstone";
    } else if (configMaterial === 'hrp') {
      materialPremium = 12.00;
      materialTimeAdded = 4;
      matName = "Translucent HRP (Heat-Resistant)";
    } else if (configMaterial === 'obsidian') {
      materialPremium = 18.00;
      materialTimeAdded = 1;
      matName = "Heavyweight Obsidian Bio-Resin";
    }

    const calculatedPrice = Math.round((basePrice * scaleMultiplier + materialPremium) * 100) / 100;
    const calculatedTime = Math.round(baseTime * timeMultiplier + materialTimeAdded);
    const calculatedWeight = Math.round(baseWeight * weightMultiplier);

    return {
      price: calculatedPrice,
      time: `${calculatedTime}h`,
      weight: `${calculatedWeight}g`,
      resolution,
      matName
    };
  }, [selectedObject, configMaterial, configScale]);

  const acquireObject = (
    product: Product, 
    material: 'matte' | 'terracotta' | 'hrp' | 'obsidian' = 'matte', 
    scale: 'miniature' | 'standard' | 'grand' = 'standard',
    priceOverride?: number,
    event?: React.MouseEvent
  ) => {
    if (event) event.stopPropagation();
    
    const finalPrice = priceOverride !== undefined ? priceOverride : product.price;
    const itemKey = `${product.id}-${material}-${scale}`;
    
    addToCart({ variantId: product.id, quantity: 1, metadata: { material, scale }, productOverride: product });
    setIsCollectionOpen(true);
  };

  const updateQuantity = (itemId: string, amount: number) => {
    const item = collectionItems.find((i: any) => i.id === itemId);
    if (item) {
      if (item.quantity + amount > 0) {
        updateLineItem({ lineId: itemId, quantity: item.quantity + amount });
      } else {
        removeLineItem(itemId);
      }
    }
  };

  const collectionSubtotal = useMemo(() => 
    collectionItems.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0), 
    [collectionItems]
  );
  
  const collectionTotal = collectionSubtotal > 0 ? collectionSubtotal + (collectionSubtotal > 100 ? 0 : 5) : 0;

  const filteredProducts = useMemo(() => {
    let prods = PRODUCTS;
    if (shopFilter !== 'All') prods = prods.filter(p => p.category === shopFilter);
    if (searchQuery.trim().length > 0) {
      prods = prods.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return prods;
  }, [shopFilter, searchQuery]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStep < 4) { setCustomStep(prev => prev + 1); return; }
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  };

  const triggerSecureCheckout = () => {
    // Generate a beautiful unique alphanumeric industrial ticket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    setCompiledTicketId(`VINCI-TX-${randomHex}`);
    setCheckoutStage('delivery');
  };

  const proceedToLaboratoryQueue = () => {
    if (!checkoutName || !checkoutEmail) {
      alert("Please provide credentials to register design parameters.");
      return;
    }
    setCheckoutStage('queue');
  };

  const initiateLabPrintProcess = () => {
    setCheckoutStage('processing');
    setTimeout(() => {
      setCheckoutStage('receipt');
    }, 3000);
  };

  const finalizeAndResetCheckout = async () => {
    await completeCheckout();
    
    setCheckoutStage('idle');
    setIsCollectionOpen(false);
  };

  const drawerTransition = { type: 'spring', damping: 28, stiffness: 250 };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text relative font-sans">
      <SectionNav />
      
      {/* ----------------- ARCHITECTURAL RAILS (AWWWARDS FEEL) ----------------- */}
      <div className="fixed top-0 left-0 w-16 h-screen z-40 hidden xl:flex flex-col justify-between items-center py-10 bg-brand-bg/80 backdrop-blur-md">
        {/* Upper side */}
        <div className="flex flex-col gap-3 items-center">
        </div>

        {/* Bottom side: only the writing (where the lower vertical line is) */}
        <div className="flex flex-col items-center gap-6 mt-auto pointer-events-auto">
          <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-brand-muted whitespace-nowrap">Tbilisi Studio — Local Production</span>
          </div>
        </div>
      </div>

      {/* ----------------- SOFT NAVIGATION ----------------- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 xl:pl-16 xl:pr-16 ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-2xl border-b border-brand-border/50 shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-6 md:h-8 text-brand-text" />
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            
            <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-brand-muted mr-4">
              <Link to="/services" className="hover:text-brand-text transition-colors">Services</Link>
              <Link to="/tools" className="hover:text-brand-text transition-colors">Tools</Link>
              <Link to="/made-in-georgia" className="hover:text-brand-text transition-colors">Made in Georgia</Link>
              <Link to="/journal" className="hover:text-brand-text transition-colors">Journal</Link>
              <Link to="/about" className="hover:text-brand-text transition-colors">About</Link>
              <Link to="/contact" className="hover:text-brand-text transition-colors">Contact</Link>
            </div>
<button onClick={() => setIsSearchOpen(true)} aria-label="Open search" className="flex items-center gap-2 text-brand-text hover:text-black transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded-full p-1 -m-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">Search</span>
              <Search className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button onClick={() => setIsCollectionOpen(true)} aria-label={`Open collection, ${collectionItems.length} items`} className="flex items-center gap-2 relative text-brand-text hover:text-black transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded-full p-1 -m-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">Collection</span>
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {collectionItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-brand-text text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {collectionItems.length}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="xl:px-16 w-full mt-24"><Outlet context={{ setSelectedObject }} /></main>

      <div className="xl:px-16 w-full">
        <FooterSection />
      </div>

      {/* ----------------- CINEMATIC QUICK LOOK (Full-Screen Overlay) ----------------- */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/95 backdrop-blur-3xl overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedObject(null)} 
              aria-label="Close product details"
              className="fixed top-8 right-8 xl:top-12 xl:right-12 w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-text shadow-xl hover:scale-105 transition-transform z-50 border border-brand-border/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-text/50"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <div className="w-full max-w-[1600px] mx-auto px-6 py-24 min-h-screen flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              
              {/* Massive Floating Image / CAD Blueprint container */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 50 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }}
                className="flex-1 w-full relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-brand-border/20 shadow-2xl relative bg-white flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {!isCadMode ? (
                      <motion.img 
                        key="product-image"
                        src={selectedObject.image} 
                        alt={selectedObject.name} 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="w-full h-full object-cover " 
                      />
                    ) : (
                      <motion.div 
                        key="product-cad"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <CADBlueprint 
                          productId={selectedObject.id} 
                          scale={configScale} 
                          material={configMaterial} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Floating Toggle Button */}
                  <div className="absolute bottom-6 right-6 z-10">
                    <button 
                      onClick={() => setIsCadMode(!isCadMode)}
                      className={`px-5 py-3 rounded-full font-mono text-[10px] tracking-wider uppercase flex items-center gap-2 border transition-all duration-300 shadow-md ${
                        isCadMode 
                          ? 'bg-emerald-500 text-white border-emerald-400' 
                          : 'bg-white/95 text-brand-text border-brand-border hover:bg-white backdrop-blur-md'
                      }`}
                    >
                      <Cpu className={`w-3.5 h-3.5 ${isCadMode ? 'animate-spin' : ''}`} />
                      {isCadMode ? 'Live Blueprint Active' : 'Toggle CAD Blueprint'}
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Extreme Contrast Typography Info & Parametric Controls */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
                className="flex-1 w-full space-y-10"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-brand-muted mb-4">
                    {selectedObject.category} // Parametric Edition
                  </div>
                  <h2 id="product-modal-title" className="text-4xl md:text-6xl font-semibold tracking-tighter text-brand-text leading-[0.95] mb-6">
                    {selectedObject.name}
                  </h2>
                  <p className="text-xl text-brand-muted font-medium leading-relaxed max-w-xl">
                    {selectedObject.description}
                  </p>
                </div>

                {/* PARAMETRIC CONFIGURATOR WORKSHOP */}
                <div className="space-y-8 border-t border-brand-border/50 pt-8">
                  {/* COMPOUND COMPOUNDING */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text mb-4">Select Compounding Compound</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'matte', label: 'Matte composite', desc: 'Light-absorbing matte ivory composite', color: 'bg-neutral-100 border-neutral-300' },
                        { id: 'terracotta', label: 'Tbilisi Terracotta', desc: 'Slightly gritty local sandstone texture', color: 'bg-orange-700/80 border-orange-800' },
                        { id: 'hrp', label: 'Translucent HRP', desc: 'Heat-resistant polymer, diffuses light', color: 'bg-sky-100 border-sky-300' },
                        { id: 'obsidian', label: 'Obsidian Resin', desc: 'Heavyweight obsidian-colored resin', color: 'bg-neutral-900 border-neutral-950' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setConfigMaterial(item.id as any)}
                          className={`p-4 rounded-2xl border text-left flex gap-3 transition-all duration-300 ${
                            configMaterial === item.id 
                              ? 'bg-white border-brand-text shadow-sm' 
                              : 'bg-transparent border-brand-border hover:bg-white/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${item.color} shrink-0 mt-0.5 border`} />
                          <div>
                            <p className="text-xs font-semibold text-brand-text">{item.label}</p>
                            <p className="text-[10px] text-brand-muted mt-1 leading-normal">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* OBJECT DIMENSIONAL SCALE */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text mb-4">Object Dimensional Scale</h4>
                    <div className="flex bg-brand-bg p-1 rounded-2xl border border-brand-border/50 w-full">
                      {[
                        { id: 'miniature', label: 'Miniature (0.50x)' },
                        { id: 'standard', label: 'Standard (1.00x)' },
                        { id: 'grand', label: 'Grand (1.50x)' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setConfigScale(item.id as any)}
                          className={`flex-1 py-3 text-center rounded-xl text-xs font-semibold transition-all duration-300 ${
                            configScale === item.id 
                              ? 'bg-white text-brand-text shadow-sm' 
                              : 'text-brand-muted hover:text-brand-text'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DYNAMIC SPECS BOARD */}
                <div className="bg-white border border-brand-border/40 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm">
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1.5">Precision</p>
                    <p className="font-mono text-[11px] font-semibold text-brand-text">{configDetails.resolution}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1.5">Weight Density</p>
                    <p className="font-mono text-[11px] font-semibold text-brand-text">{configDetails.weight}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1.5">Fabrication Time</p>
                    <p className="font-mono text-[11px] font-semibold text-brand-text">{configDetails.time}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1.5">Compound Base</p>
                    <p className="font-mono text-[11px] font-semibold text-brand-text truncate" title={configDetails.matName}>
                      {configMaterial === 'matte' ? 'Standard PLA' : configMaterial === 'terracotta' ? 'Red Sandstone' : configMaterial === 'hrp' ? 'Trans HRP' : 'Heavy Resin'}
                    </p>
                  </div>
                </div>

                {/* Live Fabrication Telemetry for CAD Mode */}
                {isCadMode && (
                  <motion.div
                    key="telemetry-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <FabricationTelemetry 
                      productId={selectedObject.id}
                      scale={configScale}
                      material={configMaterial}
                    />
                  </motion.div>
                )}
                
                {/* ACTIONS */}
                <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row sm:items-center gap-8">
                  <div className="shrink-0">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Configured Price</p>
                    <span className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-text">€{configDetails.price}</span>
                  </div>
                  <button 
                    onClick={() => { 
                      acquireObject(selectedObject, configMaterial, configScale, configDetails.price); 
                      setSelectedObject(null); 
                    }}
                    className="flex-1 bg-brand-text text-white py-6 rounded-2xl font-semibold text-xl hover:bg-black transition-all duration-300 flex justify-center items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1"
                  >
                    Acquire Configured Object <Plus className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                </div>
                
                <div className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em] pt-4">
                  {MAKERS_MARK}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- COLLECTION (CART) DRAWER WITH PARAMETRIC QUEUE ----------------- */}
      <AnimatePresence>
        {isCollectionOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCollectionOpen(false)}
              className="fixed inset-0 bg-brand-text/10 backdrop-blur-sm z-[100] cursor-pointer"
            />
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="collection-drawer-title"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={drawerTransition}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white rounded-l-[2.5rem] z-[100] shadow-2xl flex flex-col border-l border-brand-border overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 flex justify-between items-center border-b border-brand-border/50">
                <span id="collection-drawer-title" className="text-3xl font-semibold tracking-tight text-brand-text">
                  {checkoutStage === 'idle' && 'Collection'}
                  {checkoutStage === 'delivery' && 'Atelier Hand-Off'}
                  {checkoutStage === 'queue' && 'Laboratory Queue'}
                  {checkoutStage === 'processing' && 'Compiling Design'}
                  {checkoutStage === 'receipt' && 'Allocation Confirmed'}
                </span>
                <button 
                  aria-label="Close collection drawer" 
                  onClick={() => setIsCollectionOpen(false)} 
                  className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-brand-text hover:bg-black hover:text-white transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-text/50"
                >
                  <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              
              {/* STAGE 1: CART VIEW */}
              {checkoutStage === 'idle' && (
                <>
                  <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                    {collectionItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-brand-bg rounded-full flex items-center justify-center mb-6">
                          <ShoppingBag className="w-10 h-10 text-brand-muted" strokeWidth={1.5} />
                        </div>
                        <p className="text-2xl font-semibold text-brand-text mb-2">No objects acquired yet.</p>
                        <p className="text-lg text-brand-muted font-medium font-mono uppercase tracking-wider">Explore the exhibition.</p>
                      </div>
                    ) : (
                      collectionItems.map((item) => (
                        <div key={item.id} className="flex gap-5 border border-brand-border/30 p-4 rounded-3xl bg-brand-bg/50 relative group">
                          <div className="w-20 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-brand-border/20">
                            <img referrerPolicy="no-referrer" src={item.thumbnail} alt={item.title} className="w-full h-full object-cover " />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                              <h4 className="font-semibold text-lg text-brand-text leading-tight">{item.title}</h4>
                              <p className="font-mono text-[8px] font-bold text-brand-muted uppercase tracking-[0.2em] mt-1">
                                {(item.metadata?.scale || 'standard')} // {(item.metadata?.material || 'matte')}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center gap-3 bg-white rounded-full px-2.5 py-1 border border-brand-border/50 shadow-sm">
                                <button aria-label={`Decrease quantity of ${item.title}`} onClick={() => updateQuantity(item.id, -1)} className="text-brand-muted hover:text-brand-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded"><Minus className="w-3 h-3" strokeWidth={2} aria-hidden="true" /></button>
                                <span className="font-semibold text-xs w-4 text-center" aria-live="polite">{item.quantity}</span>
                                <button aria-label={`Increase quantity of ${item.title}`} onClick={() => updateQuantity(item.id, 1)} className="text-brand-muted hover:text-brand-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded"><Plus className="w-3 h-3" strokeWidth={2} aria-hidden="true" /></button>
                              </div>
                              <p className="font-semibold text-lg text-brand-text">€{(item.unit_price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {collectionItems.length > 0 && (
                    <div className="p-8 bg-brand-bg border-t border-brand-border/50 rounded-bl-[2.5rem] space-y-4">
                      <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                        <span>Subtotal</span>
                        <span>€{collectionSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                        <span>Courier Premium</span>
                        <span>{collectionSubtotal > 100 ? 'Complimentary' : '€5.00'}</span>
                      </div>
                      <div className="pt-4 border-t border-brand-border flex justify-between items-end">
                        <span className="text-xl font-semibold text-brand-text tracking-tight">Total Estimated</span>
                        <span className="text-3xl font-semibold text-brand-text tracking-tighter">€{collectionTotal.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={triggerSecureCheckout}
                        className="w-full bg-brand-text text-white py-5 rounded-2xl font-semibold text-lg hover:bg-black transition-colors flex justify-center items-center gap-3 mt-4 shadow-xl hover:-translate-y-1 duration-300"
                      >
                        Secure Parameter Registration <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* STAGE 2: CREDENTIALS & HANDOFF */}
              {checkoutStage === 'delivery' && (
                <div className="flex-1 flex flex-col justify-between p-8 overflow-y-auto">
                  <div className="space-y-8">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">Phase 01 // 03</p>
                      <h3 className="text-2xl font-semibold text-brand-text">Register Slicing Credentials</h3>
                      <p className="text-sm text-brand-muted mt-2">Associate your customized geometric objects with a physical recipient profile.</p>
                    </div>

                    {/* Delivery Methods */}
                    <div className="space-y-3">
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted">Logistics Channel</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setDeliveryType('pickup')}
                          className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                            deliveryType === 'pickup' 
                              ? 'bg-brand-text text-white border-brand-text shadow-sm' 
                              : 'bg-transparent border-brand-border hover:bg-brand-bg'
                          }`}
                        >
                          <MapPin className="w-5 h-5 mb-2" strokeWidth={1.5} />
                          <p className="text-xs font-bold">Atelier Pick-Up</p>
                          <p className={`text-[10px] mt-1 ${deliveryType === 'pickup' ? 'text-white/75' : 'text-brand-muted'}`}>8 Vertskhli St // Complimentary</p>
                        </button>
                        <button
                          onClick={() => setDeliveryType('courier')}
                          className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                            deliveryType === 'courier' 
                              ? 'bg-brand-text text-white border-brand-text shadow-sm' 
                              : 'bg-transparent border-brand-border hover:bg-brand-bg'
                          }`}
                        >
                          <Truck className="w-5 h-5 mb-2" strokeWidth={1.5} />
                          <p className="text-xs font-bold">Hybrid Courier</p>
                          <p className={`text-[10px] mt-1 ${deliveryType === 'courier' ? 'text-white/75' : 'text-brand-muted'}`}>Urban Tbilisi Zone // €5.00</p>
                        </button>
                      </div>
                    </div>

                    {/* Registration Fields */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <label htmlFor="checkout-fullname" className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted ml-1">Recipient Name</label>
                        <input 
                          id="checkout-fullname"
                          type="text" 
                          required
                          value={checkoutName} 
                          onChange={(e) => setCheckoutName(e.target.value)}
                          placeholder="E.g. George Amirejibi"
                          className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="checkout-email" className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted ml-1">Email Credentials</label>
                        <input 
                          id="checkout-email"
                          type="email" 
                          required
                          value={checkoutEmail} 
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="E.g. name@domain.ge"
                          className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="checkout-phone" className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted ml-1">Contact Phone</label>
                        <input 
                          id="checkout-phone"
                          type="tel" 
                          value={checkoutPhone} 
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          placeholder="+995 5__ ___ ___"
                          className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-8 border-t border-brand-border/50 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStage('idle')}
                      className="px-5 py-4 border border-brand-border rounded-xl font-semibold text-sm hover:bg-brand-bg transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={proceedToLaboratoryQueue}
                      disabled={!checkoutName || !checkoutEmail}
                      className="flex-1 bg-brand-text text-white py-4 rounded-xl font-semibold text-sm hover:bg-black transition-colors disabled:opacity-40 flex justify-center items-center gap-2"
                    >
                      Allocate Print Queue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: QUEUE SCHEDULING */}
              {checkoutStage === 'queue' && (
                <div className="flex-1 flex flex-col justify-between p-8 overflow-y-auto">
                  <div className="space-y-8">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">Phase 02 // 03</p>
                      <h3 className="text-2xl font-semibold text-brand-text">Allocate Laboratory Core</h3>
                      <p className="text-sm text-brand-muted mt-2">Select active manufacturing node and load balance printing hours.</p>
                    </div>

                    {/* Labs selection */}
                    <div className="space-y-3">
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted">Laboratory Location</p>
                      <div className="space-y-2">
                        {[
                          { id: 'lab-01', name: 'Atelier Lab-1 // Vake Zone', active: '3 prints active', delay: '1h 15m delay', label: 'Busy' },
                          { id: 'lab-02', name: 'Atelier Lab-2 // Chugureti Zone', active: '1 print active', delay: '10m delay', label: 'Efficient' }
                        ].map((lab) => (
                          <button
                            key={lab.id}
                            onClick={() => setActiveLab(lab.id as any)}
                            className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all duration-300 ${
                              activeLab === lab.id 
                                ? 'bg-brand-text text-white border-brand-text shadow-sm' 
                                : 'bg-transparent border-brand-border hover:bg-brand-bg'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold">{lab.name}</p>
                              <p className={`text-[10px] mt-1 ${activeLab === lab.id ? 'text-white/75' : 'text-brand-muted'}`}>{lab.active} • {lab.delay}</p>
                            </div>
                            <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full ${activeLab === lab.id ? 'bg-white/20 text-white' : 'bg-brand-bg text-brand-muted'}`}>
                              {lab.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slots selection */}
                    <div className="space-y-3">
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted">Schedule Priority</p>
                      <div className="space-y-2">
                        {[
                          { id: 'morning', label: 'Immediate Slot (Morning Batch)', desc: 'Prints immediately, standard peak grid surcharge.' },
                          { id: 'afternoon', label: 'Express Slot (Afternoon Batch)', desc: 'Allocated within 4 hours.' },
                          { id: 'overnight', label: 'Eco-Scheduled (Overnight Print)', desc: 'Prints during off-peak hours, 0% carbon footprint.' }
                        ].map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedQueueSlot(slot.id as any)}
                            className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                              selectedQueueSlot === slot.id 
                                ? 'bg-brand-bg border-brand-text ring-1 ring-brand-text' 
                                : 'bg-transparent border-brand-border hover:border-brand-text/50'
                            }`}
                          >
                            <p className="text-xs font-bold text-brand-text">{slot.label}</p>
                            <p className="text-[10px] text-brand-muted mt-1">{slot.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-8 border-t border-brand-border/50 flex gap-3">
                    <button 
                      onClick={() => setCheckoutStage('delivery')}
                      className="px-5 py-4 border border-brand-border rounded-xl font-semibold text-sm hover:bg-brand-bg transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={initiateLabPrintProcess}
                      className="flex-1 bg-brand-text text-white py-4 rounded-xl font-semibold text-sm hover:bg-black transition-colors flex justify-center items-center gap-2 shadow-lg"
                    >
                      Transmit Parameters & Print <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 4: PROCESSING/LOG COMPILER */}
              {checkoutStage === 'processing' && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0d] text-white">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <Cpu className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="text-center mb-10">
                    <h3 className="text-xl font-semibold tracking-tight">Parametric Processing</h3>
                    <p className="text-xs text-white/40 mt-1 font-mono uppercase">Allocating Chugureti Lab Node-2</p>
                  </div>

                  {/* Automated compilation steps */}
                  <div className="w-full max-w-sm bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-[10px] leading-relaxed text-white/70 space-y-2">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>&gt; CONNECTING TO TBILISI LAB 2... OK</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>&gt; RETRIEVING SLICING COEFFICIENTS... OK</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>&gt; COMPILING STACK LATTICE MESH... OK</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>&gt; RESERVING COMPOSITE POLYMERS... OK</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>&gt; CALIBRATING EXTRUDER NOZZLE / LASER... OK</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="text-emerald-400 font-bold">&gt; TRANSMISSION COMPLETE. SPEC LOCKED.</motion.p>
                  </div>
                </div>
              )}

              {/* STAGE 5: BLUEPRINT TECHNICAL RECEIPT */}
              {checkoutStage === 'receipt' && (
                <div className="flex-1 flex flex-col justify-between p-8 overflow-y-auto bg-brand-bg">
                  <div className="space-y-8">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-semibold text-brand-text">Slicing Locked.</h3>
                      <p className="text-xs font-mono uppercase text-brand-muted mt-1">Ticket: {compiledTicketId}</p>
                    </div>

                    {/* Receipt specs */}
                    <div className="bg-white border border-brand-border/50 rounded-2xl p-6 space-y-4 shadow-sm font-mono text-[11px] text-brand-text">
                      <div className="border-b border-brand-border/50 pb-3 flex justify-between uppercase">
                        <span className="text-brand-muted font-bold">RECIPIENT profile</span>
                        <span className="font-semibold text-right truncate max-w-[180px]">{checkoutName}</span>
                      </div>
                      <div className="border-b border-brand-border/50 pb-3 flex justify-between uppercase">
                        <span className="text-brand-muted font-bold">MANUFACTURING NODE</span>
                        <span className="font-semibold">{activeLab === 'lab-01' ? 'LAB 1 (VAKE)' : 'LAB 2 (CHUGURETI)'}</span>
                      </div>
                      <div className="border-b border-brand-border/50 pb-3 flex justify-between uppercase">
                        <span className="text-brand-muted font-bold">EST. COMMENCEMENT</span>
                        <span className="font-semibold">
                          {selectedQueueSlot === 'morning' ? 'MORNING BLOCK' : selectedQueueSlot === 'afternoon' ? 'AFTERNOON BATCH' : 'OVERNIGHT CYCLE'}
                        </span>
                      </div>
                      <div className="border-b border-brand-border/50 pb-3 flex justify-between uppercase">
                        <span className="text-brand-muted font-bold">TOTAL BILLED</span>
                        <span className="font-semibold">€{collectionTotal.toFixed(2)}</span>
                      </div>
                      <div className="pb-1 flex justify-between uppercase">
                        <span className="text-brand-muted font-bold">Courier Mode</span>
                        <span className="font-semibold">{deliveryType === 'pickup' ? 'ATELIER PICKUP' : 'HYBRID COURIER'}</span>
                      </div>
                    </div>

                    {/* Educational confirmation notice */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-xs text-emerald-800 leading-relaxed">
                      <p className="font-bold mb-1">What happens next?</p>
                      Your parameterized mesh blueprints are queued at the Tbilisi Atelier laboratory. A design specialist is warming the bio-resin beds now. You will receive real-time notifications at <strong>{checkoutEmail}</strong> when slicing and extrusion start.
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-brand-border/50 space-y-3">
                    <button 
                      onClick={() => {
                        // Create and download file content as proof of blueprint
                        const fileContent = `TBILISI PARAMETRIC MANUFACTURING SPECIFICATION\n==================================================\nTICKET: ${compiledTicketId}\nRECIPIENT: ${checkoutName}\nLAB: ${activeLab === 'lab-01' ? 'LAB 1 VAKE' : 'LAB 2 CHUGURETI'}\nCOURIER MODE: ${deliveryType.toUpperCase()}\nTOTAL: €${collectionTotal.toFixed(2)}\n==================================================\nFormulated on: ${new Date().toLocaleDateString()}\nDESIGNED & FORMED IN GEORGIA // 41°43′N 44°47′E`;
                        const blob = new Blob([fileContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `Vinci-Blueprint-${compiledTicketId}.txt`;
                        link.click();
                      }}
                      className="w-full bg-brand-bg border border-brand-border text-brand-text py-4 rounded-xl font-semibold text-sm hover:bg-brand-border/30 transition-all flex justify-center items-center gap-2"
                    >
                      <FileText className="w-4 h-4" /> Download Technical Blueprint
                    </button>
                    <button 
                      onClick={finalizeAndResetCheckout}
                      className="w-full bg-brand-text text-white py-4 rounded-xl font-semibold text-sm hover:bg-black transition-colors"
                    >
                      Lock & Close Atelier
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ----------------- AI SEARCH OVERLAY ----------------- */}
      <AISearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelect={(p) => setSelectedObject(p)} />

    </div>
  );
}

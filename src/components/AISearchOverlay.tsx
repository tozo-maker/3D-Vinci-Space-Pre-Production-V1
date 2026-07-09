import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Loader2, Beaker, ShieldAlert, Cpu } from 'lucide-react';
import { PRODUCTS, Product } from '../data';
import { useProducts } from '../lib/medusa';

export const AISearchOverlay = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (p: Product) => void }) => {
  const { data: medusaProducts = [] } = useProducts();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [materialAdvice, setMaterialAdvice] = useState<string | null>(null);
  const [feasibilityCheck, setFeasibilityCheck] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setAiMessage(null);
      setMaterialAdvice(null);
      setFeasibilityCheck(null);
      setResults([]);
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiMessage(null);
    setMaterialAdvice(null);
    setFeasibilityCheck(null);
    setResults([]);

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      
      setAiMessage(data.message);
      setMaterialAdvice(data.materialAdvice || null);
      setFeasibilityCheck(data.feasibilityCheck || null);
      
      if (data.recommendedProductIds && Array.isArray(data.recommendedProductIds)) {
        const matched = data.recommendedProductIds
          .map((id: string) => {
            const medusaP = medusaProducts.find((mp: any) => mp.id === id || mp.handle === id);
            if (medusaP) return { id: medusaP.id, name: medusaP.title, price: medusaP.price?.calculated_price || 0, category: medusaP.categories?.[0]?.name || 'Hardware', image: medusaP.thumbnail, description: medusaP.description };
            return PRODUCTS.find(p => p.id === id);
          })
          .filter(Boolean);
        setResults(matched as Product[]);
      }
    } catch (error) {
      setAiMessage("I'm currently unable to connect to the studio's AI network.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 bg-[#070709] text-white z-[100] flex flex-col overflow-y-auto"
        >
          {/* Header Close button */}
          <div className="p-6 md:p-10 flex justify-between items-center border-b border-white/5 bg-[#070709]/80 backdrop-blur-md sticky top-0 z-50">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              COGNITIVE INDUSTRIAL ENGINE v1.4
            </span>
            <button 
              aria-label="Close search" 
              onClick={onClose} 
              className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform border border-white/10"
            >
              <X className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center pt-8 md:pt-14 px-6 max-w-5xl mx-auto w-full pb-20">
            {/* Elegant Search Input */}
            <form onSubmit={handleSearch} className="w-full relative mb-10 flex items-center border-b border-white/10 pb-6 group">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-5 animate-pulse shrink-0" strokeWidth={1.5} />
              <input 
                autoFocus
                type="text" 
                placeholder="Query our studio catalog, materials, or custom spatial design ideas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-2xl md:text-4xl font-semibold focus:outline-none placeholder:text-white/20 text-white tracking-tight"
              />
              <button 
                type="submit" 
                disabled={isSearching} 
                className="ml-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute'}
              </button>
            </form>

            {/* AI Diagnostics Dashboard */}
            <AnimatePresence mode="wait">
              {aiMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full space-y-6 mb-12"
                >
                  {/* Primary Response Box */}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-emerald-500/40">
                      RESOLVED // TBILISI OFFICE
                    </div>
                    <p className="font-serif text-2xl md:text-3xl italic leading-normal max-w-4xl">"{aiMessage}"</p>
                  </div>

                  {/* Secondary Engineering Analytics Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                    {materialAdvice && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative">
                        {/* Decorative crosshair details to highlight blueprint honesty */}
                        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/15" />
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/15" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/15" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/15" />
                        
                        <div className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                          <Beaker className="w-3.5 h-3.5 text-orange-400" />
                          [Compounding Material Advice]
                        </div>
                        <p className="text-white/80 leading-relaxed text-[11px]">{materialAdvice}</p>
                      </div>
                    )}

                    {feasibilityCheck && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative">
                        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/15" />
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/15" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/15" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/15" />

                        <div className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                          [Spatial Feasibility Check]
                        </div>
                        <p className="text-white/80 leading-relaxed text-[11px]">{feasibilityCheck}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Recommended Products Gallery */}
            {results.length > 0 && (
              <div className="w-full text-left">
                <div className="font-mono text-[9px] font-bold text-white/30 uppercase tracking-[0.25em] mb-6 border-b border-white/5 pb-2">
                  Matching Spatial Geometry Catalog
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((product, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.1, ease: 'easeOut' }}
                      key={product.id} 
                      role="button"
                      tabIndex={0}
                      className="flex flex-col gap-4 cursor-pointer group bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 p-4 rounded-3xl transition-all duration-300"
                      onClick={() => { onClose(); onSelect(product); }}
                    >
                      <div className="w-full aspect-[4/5] rounded-[1.8rem] bg-white overflow-hidden border border-white/5 shadow-inner">
                        <img referrerPolicy="no-referrer" 
                          src={product.image} 
                          className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                          alt={product.name} 
                        />
                      </div>
                      <div className="px-2">
                        <h4 className="font-semibold text-xl group-hover:text-emerald-400 transition-colors tracking-tight text-white leading-tight">{product.name}</h4>
                        <div className="flex justify-between items-center mt-3 font-mono text-[9px] tracking-wider text-white/40">
                          <span className="uppercase">{product.category}</span>
                          <span className="font-semibold text-emerald-400">₾{product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Waiting/Empty Prompt State */}
            {!isSearching && results.length === 0 && !aiMessage && (
              <div className="py-20 text-center opacity-30 select-none">
                <p className="font-mono text-xs tracking-widest uppercase">Awaiting spatial formulation queries...</p>
                <p className="font-sans text-xs mt-2 max-w-sm mx-auto leading-relaxed">Try: "Recommend a high-resolution vase in Translucent HRP", "Brutalist desk accessories", or "Can I print a 50cm tall dinosaur planter?"</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

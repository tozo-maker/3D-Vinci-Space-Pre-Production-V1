import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../data';

export const getEngineeringData = (category: string) => {
  switch (category) {
    case 'Decor': return { mat: 'ENGINEERED POLYMER / MATTE', tol: '±0.15mm', time: '12h' };
    case 'Lighting': return { mat: 'HEAT-RESISTANT POLYMER (HRP)', tol: '±0.15mm', time: '18h' };
    case 'Educational': return { mat: 'FLEX-TPU / KINETIC JOINTS', tol: '±0.05mm', time: '8h' };
    case 'Desk': return { mat: 'BIO-RESIN / HEAVYWEIGHT', tol: '±0.1mm', time: '6h' };
    default: return { mat: 'PROPRIETARY LOCAL BLEND', tol: '±0.1mm', time: '10h' };
  }
};

interface StickyStackingCatalogProps {
  products: Product[];
  setSelectedObject: (p: Product) => void;
}

export default function StickyStackingCatalog({ products, setSelectedObject }: StickyStackingCatalogProps) {
  const scrollIntoView = (index: number) => {
    const el = document.getElementById(`stack-card-${index}`);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 180,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full pb-32 flex flex-col gap-24 lg:gap-32">
      {products.map((product, index) => {
        const eng = getEngineeringData(product.category);
        return (
          <div 
            id={`stack-card-${index}`}
            key={product.id} 
            className="sticky w-full h-[85vh] lg:h-[calc(100vh-10rem)] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-brand-surface border border-brand-border flex flex-col md:flex-row group shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-shadow duration-500 hover:shadow-[0_-20px_60px_rgba(0,0,0,0.08)]"
            style={{ 
              top: `calc(10rem + ${index * 1.5}rem)`,
              zIndex: index,
            }}
            onClick={() => scrollIntoView(index)}
          >
             {/* Text side */}
             <div className="w-full md:w-1/3 p-8 lg:p-16 flex flex-col justify-between bg-white z-10 shrink-0 relative">
               <div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6 lg:mb-8">Edition 0{index + 1}</div>
                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-brand-text leading-[0.9] mb-4 lg:mb-6">{product.name}</h3>
                 <p className="text-brand-muted leading-relaxed text-sm max-w-sm mb-8 lg:mb-12">{product.description}</p>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1">Material</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text">{eng.mat}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1">Tolerance</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text">{eng.tol}</p>
                    </div>
                 </div>
               </div>
               
               <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row sm:justify-between items-start sm:items-end border-t border-brand-border/50 pt-6 lg:pt-8 gap-6 sm:gap-0">
                 <p className="text-3xl md:text-4xl font-semibold text-brand-text">₾{product.price.toFixed(2)}</p>
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     setSelectedObject(product);
                   }}
                   className="px-6 py-3 bg-brand-text text-white rounded-full text-xs font-semibold tracking-wide hover:bg-black transition-colors"
                 >
                   View Details
                 </button>
               </div>
             </div>

             {/* Image Side */}
             <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-brand-border/20">
                <img referrerPolicy="no-referrer" 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                
                {/* Technical Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-8 lg:p-16 z-10 pointer-events-none">
                  <div className="w-full h-full border border-white/20 relative backdrop-blur-[2px]">
                    <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-white/50 -translate-y-full" />
                    <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-white/50 -translate-x-full" />
                    <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-white/50 translate-x-full" />
                    <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-white/50 translate-y-full" />
                    
                    {/* Dimensions text */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] text-white/90 tracking-widest bg-black/40 px-2 py-1 rounded">
                      DIM: 240×180×200mm
                    </div>
                    <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/90 tracking-widest bg-black/40 px-2 py-1 rounded">
                      TOL: {eng.tol}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      })}
      
      {products.length === 0 && (
         <div className="py-24 text-center w-full">
           <p className="text-brand-muted">No editions found matching the active filters.</p>
         </div>
      )}
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../data';
import { ArrowRight } from 'lucide-react';

export const MasonryCatalog = ({ products, setSelectedObject }: { products: Product[], setSelectedObject: (p: Product) => void }) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {products.map((product) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          className="break-inside-avoid bg-white border border-brand-border rounded-3xl overflow-hidden group flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 relative"
        >
          <div className="relative aspect-[4/5] bg-brand-surface overflow-hidden">
            <img referrerPolicy="no-referrer" 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Technical Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10 pointer-events-none">
              <div className="w-full h-full border border-white/20 relative backdrop-blur-[2px]">
                <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-white/50 -translate-y-full" />
                <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-white/50 -translate-x-full" />
                <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-white/50 translate-x-full" />
                <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-white/50 translate-y-full" />
                
                {/* Dimensions text */}
                <div className="absolute top-2 left-2 font-mono text-[9px] text-white/90 tracking-widest bg-black/40 px-1 py-0.5 rounded">
                  DIM: 240×180×{Math.floor(Math.random() * 200 + 100)}mm
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/90 tracking-widest bg-black/40 px-1 py-0.5 rounded">
                  TOL: ±0.05mm
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                <span className="text-lg font-mono tracking-tight">€{product.price}</span>
              </div>
              <p className="text-sm text-brand-muted line-clamp-2">{product.description}</p>
            </div>
            
            <button
              onClick={() => setSelectedObject(product)}
              className="mt-auto pt-4 flex items-center justify-between text-sm font-semibold border-t border-brand-border group/btn hover:text-brand-text"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

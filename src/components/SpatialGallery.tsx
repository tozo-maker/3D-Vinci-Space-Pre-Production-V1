import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RealSpaceItem } from '../data';

interface SpatialGalleryProps {
  spaces: RealSpaceItem[];
}

export default function SpatialGallery({ spaces }: SpatialGalleryProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-brand-bg">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-12 md:pt-20">
        <div className="px-4 md:px-6 mb-12 flex justify-between items-end border-b border-brand-border pb-8 max-w-[1800px] mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-brand-text">Objects in Context</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted hidden md:block">04 — Spatial Adaptability</p>
        </div>
        
        <div className="flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-4 md:px-6 w-max items-center">
            {spaces.map((space) => (
              <div key={space.id} className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex flex-col gap-6 shrink-0 group cursor-pointer">
                <div className="aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-brand-border/20 relative">
                  <img referrerPolicy="no-referrer" src={space.image} className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={space.title} />
                  <div className="absolute inset-0 border border-black/5 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
                </div>
                <div className="flex justify-between items-start px-2">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{space.title}</h3>
                  <div className="text-right">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1">Featured</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-brand-text max-w-[180px]">{space.productName}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

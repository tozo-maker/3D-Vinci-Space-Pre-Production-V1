import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-brand-border/20 ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.15 }} // Scale up slightly to cover the vertical translation gaps
        className="absolute inset-0 w-full h-full object-cover  origin-center" 
      />
    </div>
  );
}

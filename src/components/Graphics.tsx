import React from 'react';
import { motion } from 'motion/react';

export const TolerancesGraphic = () => {
  return (
    <div className="relative w-full h-32 md:h-40 mb-6 border border-brand-border/60 rounded-3xl overflow-hidden bg-brand-bg group-hover:border-brand-border transition-colors">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:12px_12px] opacity-50"></div>
      
      {/* Animated Reticle/Target */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="w-20 h-20 border-[1.5px] border-dashed border-brand-text/20 rounded-full flex items-center justify-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: -360 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="w-12 h-12 border-[1.5px] border-brand-text/30 rounded-full flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-brand-text/80 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Caliper Measurement Lines */}
      <div className="absolute top-[49.5%] left-0 w-full h-[1px] bg-brand-text/10"></div>
      <div className="absolute top-0 left-[49.5%] w-[1px] h-full bg-brand-text/10"></div>
      
      {/* Precision Markers */}
      <div className="absolute top-[49.5%] left-1/4 w-1 h-3 -translate-y-1 bg-brand-text/30"></div>
      <div className="absolute top-[49.5%] right-1/4 w-1 h-3 -translate-y-1 bg-brand-text/30"></div>
      <motion.div 
        animate={{ width: ['50%', '52%', '50%'] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-[49.5%] left-1/4 h-[1px] bg-brand-text/60"
      ></motion.div>
      
      {/* UI Elements */}
      <div className="absolute top-3 left-4 font-mono text-[8px] text-brand-text/50 font-bold tracking-widest">
        CAL: ±0.05
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[8px] text-brand-text/50 font-bold tracking-widest">
        RES: ULTRA
      </div>
    </div>
  );
};

export const OriginGraphic = () => {
  return (
    <div className="relative w-full h-32 md:h-40 mb-6 border border-white/10 rounded-3xl overflow-hidden bg-black/40 group-hover:border-white/20 transition-colors">
      {/* Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute border-[1px] border-emerald-500/20 rounded-full"
            style={{ width: i * 40, height: i * 40 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]"></div>
      
      {/* Pinging Location Dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-4 h-4 bg-emerald-500 rounded-full blur-[2px]"
        />
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full relative z-10 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      </div>

      {/* Map Grid / Crosshairs */}
      <div className="absolute top-[49.5%] left-0 w-full h-[1px] bg-emerald-500/10"></div>
      <div className="absolute top-0 left-[49.5%] w-[1px] h-full bg-emerald-500/10"></div>
      
      {/* Technical Readout */}
      <div className="absolute top-3 left-4 flex flex-col gap-1">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <div className="font-mono text-[7px] text-emerald-500/80 tracking-widest mt-1">TBS_NODE_ACTIVE</div>
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[8px] text-emerald-500/60 font-bold tracking-widest flex items-center gap-1">
        <span>41°43′N</span>
        <span>44°47′E</span>
      </div>
    </div>
  );
};

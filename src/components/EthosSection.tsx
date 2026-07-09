import React from 'react';

const MAKERS_MARK = "DESIGNED & FORMED IN TBILISI, GEORGIA // 41°43′N 44°47′E";

export default function EthosSection() {
  return (
    <section className="bg-brand-surface py-20 md:py-32 px-4 md:px-12 md:mx-6 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mb-24 border border-brand-border/50">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex flex-col gap-12 max-w-xl">
          <div className="border border-brand-border rounded-full px-4 py-2 w-max">
            <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">03 — Ethical Locality</p>
          </div>
          <div>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-brand-text mb-2 leading-[1.1]">Designed Here.<br/>Made Here.</h2>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-brand-text leading-[1.1]">Delivered Here.</h2>
          </div>
          <p className="text-brand-muted text-lg md:text-xl leading-relaxed font-medium">
            Every single product we sell is manufactured in Tbilisi. By relying on state-of-the-art additive biopolymer techniques and sourcing solid mountain timber locally, we generate beautiful modular interior objects with zero manufacturing waste.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-border/50">
            <div>
              <p className="text-3xl font-semibold text-brand-text mb-2 tracking-tighter">0%</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">Plastic Waste</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand-text mb-2 tracking-tighter">100%</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">Bio-Polymer</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand-text mb-2 tracking-tighter">Local</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">Dwell Sourced</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black/20">
          <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000" alt="Studio" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
             <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/70 mb-2">Currently Firing</p>
                <p className="text-white text-lg tracking-wide uppercase">No. 12 Wedding Pleats Series</p>
             </div>
             <div className="border border-white/30 rounded-full px-4 py-2 bg-white/10 backdrop-blur-md">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white">Tbilisi Lab 1</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

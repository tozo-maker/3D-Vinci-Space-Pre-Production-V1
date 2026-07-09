import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CollectionsGallery() {
  const collections = [
    { title: 'Premium Gifts', subtitle: 'Objects that show you care. Uniquely designed items that are impossible to find in mass-produced retail showrooms.', label: 'Campaign 4', detail: 'Thoughtful Gestures', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200' },
    { title: 'Desk Essentials', subtitle: 'Sleek pen holders, card racks, and stackable modular organization blocks that elevate your thinking space.', label: 'Campaign 5', detail: 'Productive Rituals', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200' },
  ];

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-bg overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between pb-12 gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-4 md:mb-6">05 — Design Streams</p>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-brand-text leading-[1.1]">Explore</h2>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-brand-text leading-[1.1]">Signature Collections.</h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted md:text-right">
            Swipe or scroll horizontal →
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
          {collections.map((col, i) => (
            <div key={i} tabIndex={0} role="button" className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] aspect-[3/4] md:aspect-[4/5] relative rounded-[2.5rem] overflow-hidden group snap-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-text/50">
              <img referrerPolicy="no-referrer" src={col.image} alt={col.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                <div className="bg-white/90 backdrop-blur text-brand-text px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest font-bold">
                  {col.label}
                </div>
                <div className="text-white/80 font-medium">
                  {col.detail}
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                 <h3 className="text-4xl font-semibold text-white mb-4 tracking-tight">{col.title}</h3>
                 <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">{col.subtitle}</p>
                 <div className="flex justify-between items-center border-t border-white/20 pt-6">
                    <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">Explore Lineage</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                 </div>
              </div>
            </div>
          ))}
          
          <div tabIndex={0} role="button" className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] aspect-[3/4] md:aspect-[4/5] relative rounded-[2.5rem] overflow-hidden bg-brand-surface flex flex-col justify-between p-8 md:p-12 snap-center cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-text/50 border border-brand-border/50">
             <div className="bg-white text-brand-text border border-brand-border/50 px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest font-bold w-max">
               Lab Services
             </div>
             
             <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-4 font-bold">Bespoke Design</p>
                <h3 className="text-4xl md:text-5xl font-semibold text-brand-text mb-6 tracking-tighter leading-[1.1] group-hover:text-brand-text/80 transition-colors">Your vision, printed locally.</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-12">
                  We translate industrial prototypes, custom sizes, personalized corporate gifts, and bespoke homeware. Done right in Tbilisi laboratories.
                </p>
                
                <div className="border-t border-brand-border/50 pt-8">
                  <span className="text-brand-text font-mono text-[11px] uppercase tracking-widest font-bold hover:text-brand-text/80 transition-colors">Start a commission for free</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const fs = require('fs');

const bentoGrid = `
        {/* ----------------- SECTION 02: BENTO GRID WITH PARALLAX ----------------- */}
        <section
          id="s-bento"
          ref={heroRef}
          className="pb-24 px-4 md:px-6 max-w-[1800px] mx-auto w-full overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 auto-rows-[340px]">
            {/* Main Hero Block */}
            <motion.div
              style={{ y: yHeroFast }}
              className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 bg-brand-surface rounded-[2.5rem] overflow-hidden relative shadow-[0_8px_40px_rgb(0,0,0,0.04)] group border border-brand-border/50"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2500"
                alt="Hero Piece"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-14 text-white w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
                  <p className="font-mono text-[11px] text-white/80 uppercase tracking-widest max-w-sm leading-relaxed">
                    Precision engineered objects for modern spaces. Manufactured
                    locally in Tbilisi.
                  </p>
                  <div className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] text-left md:text-right hidden md:block">
                    {MAKERS_MARK}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Block - Precision */}
            <motion.div
              style={{ y: yHeroSlow }}
              className="col-span-1 lg:col-span-1 row-span-1 bg-brand-surface rounded-[2.5rem] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_16px_50px_rgb(0,0,0,0.06)] transition-all duration-500 group border border-brand-border/50"
            >
              <TolerancesGraphic />
              <div className="mt-auto px-2">
                <h3 className="font-semibold text-2xl md:text-3xl tracking-tight text-brand-text mb-2">
                  Tolerances
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted leading-relaxed">
                  Engineered down to
                  <br />
                  ±0.05mm precision
                </p>
              </div>
            </motion.div>

            {/* Tall Block - Studio */}
            <motion.div
              style={{ y: yHeroReverse }}
              className="col-span-1 lg:col-span-1 row-span-2 bg-brand-surface rounded-[2.5rem] overflow-hidden relative shadow-[0_8px_40px_rgb(0,0,0,0.04)] group border border-brand-border/50"
            >
              <img
                src="https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=1200"
                alt="Studio"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-text shadow-sm">
                The Laboratory
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl">
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                  Process
                </p>
                <p className="font-semibold text-brand-text text-sm">
                  FDM & SLA Prototyping
                </p>
              </div>
            </motion.div>

            {/* Small Block - Origin */}
            <motion.div
              style={{ y: yHeroSlow }}
              className="col-span-1 lg:col-span-1 row-span-1 bg-[#0a0a0a] text-white rounded-[2.5rem] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.08)] flex flex-col justify-between transition-all duration-500 group border border-white/5"
            >
              <OriginGraphic />
              <div className="mt-auto px-2">
                <h3 className="font-semibold text-2xl md:text-3xl tracking-tight mb-2">
                  Origin
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 leading-relaxed">
                  100% Formed in
                  <br />
                  Tbilisi, Georgia
                </p>
              </div>
            </motion.div>
          </div>
        </section>
`;

let content = fs.readFileSync('src/pages/MadeInGeorgia.tsx', 'utf8');

// Insert it right before {/\\* ----------------- SECTION 02: MANIFESTO
content = content.replace(/{\/\* ----------------- SECTION 02: MANIFESTO/, bentoGrid + '\n        {/* ----------------- SECTION 02: MANIFESTO');

fs.writeFileSync('src/pages/MadeInGeorgia.tsx', content);
console.log("Bento grid restored.");

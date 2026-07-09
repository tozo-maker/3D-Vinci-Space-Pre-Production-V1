import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export default function FaqAccordion() {
  const faqs = [
    { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for standard items in original condition. Custom bespoke pieces cannot be returned." },
    { q: "How do you source your bio-polymers?", a: "We work directly with European suppliers to source PLA and other corn-starch based polymers that are industrially compostable and rely on 0% fossil fuels." },
    { q: "Are the vases water-tight?", a: "Yes, all our vases undergo a proprietary sealing process ensuring they can hold water safely without degrading the biopolymer." },
    { q: "Do you offer international shipping?", a: "Currently, we focus on local Tbilisi delivery and European shipping. We are expanding to North America later this year." },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-white px-4 md:px-12 md:mx-6 rounded-[2.5rem] lg:rounded-[3rem] mb-24">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-6 text-center">07 — Client Services</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-brand-text mb-16 text-center">Frequently Asked</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-brand-border pb-6">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex justify-between items-center py-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded-lg px-2 -mx-2"
              >
                <span className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors ${open === i ? 'text-brand-text' : 'text-brand-muted group-hover:text-brand-text'}`}>{faq.q}</span>
                {open === i ? <Minus className="text-brand-text w-6 h-6" aria-hidden="true" /> : <Plus className="text-brand-muted group-hover:text-brand-text w-6 h-6" aria-hidden="true" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-2"
                  >
                    <p className="text-brand-muted leading-relaxed pb-4 max-w-2xl text-lg">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

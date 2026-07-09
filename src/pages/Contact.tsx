import React from "react";

import { MapPin, Mail, Phone } from "lucide-react";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us | Access the Laboratory"
        description="Get in touch for professional 3D printing quotes, design consultations, and inquiries."
      />
      <div className="w-full pb-32 selection:bg-brand-accent selection:text-white">
        <section className="pt-32 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
<HeroGraphic type="contact" className="text-brand-accent" />

          <FadeIn className="max-w-4xl mb-24">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              Contact
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85]">
              <RevealText text="Access the" />
              <RevealText
                text="Laboratory."
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Form */}
            <FadeIn
              delay={0.1}
              className="bg-brand-surface rounded-[3rem] p-8 md:p-14 group hover:bg-[#E8E8E8] transition-colors duration-700"
            >
              <h2 className="text-3xl font-bold tracking-tighter text-brand-text mb-8">
                Request a Quote
              </h2>
              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label
                    htmlFor="company"
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-muted block mb-2"
                  >
                    Who are you and how can we reach you? (Company Name)
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-muted block mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-muted block mb-2"
                  >
                    What are you looking for?
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all appearance-none"
                    >
                      <option value="">Select a Service...</option>
                      <option value="print">3D Print on Demand</option>
                      <option value="integration">
                        3D Printing Integration
                      </option>
                      <option value="prototyping">Prototyping</option>
                      <option value="production">Production</option>
                      <option value="consulting">Consulting</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-brand-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-muted block mb-2"
                  >
                    Additional notes
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all resize-none"
                  ></textarea>
                  <div className="text-right text-[10px] text-brand-muted font-mono mt-2">
                    0 / 180
                  </div>
                </div>
                <button className="bg-brand-text text-white py-4 rounded-xl font-bold tracking-widest uppercase text-xs font-mono hover:bg-brand-accent transition-colors duration-500 mt-4">
                  Request Quote
                </button>
              </form>
            </FadeIn>

            {/* Details */}
            <FadeIn
              delay={0.2}
              className="flex flex-col justify-between gap-16"
            >
              <div className="space-y-12">
                <div className="group">
                  <div className="flex items-center gap-3 text-brand-text mb-4 group-hover:text-brand-accent transition-colors duration-500">
                    <MapPin className="w-6 h-6" />
                    <h3 className="text-2xl font-bold tracking-tighter">
                      Tbilisi Node 01 (Vake)
                    </h3>
                  </div>
                  <p className="text-brand-muted leading-relaxed max-w-sm font-medium">
                    12 Abashidze Street
                    <br />
                    Tbilisi 0179, Georgia
                    <br />
                    (Visits by appointment only)
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 text-brand-text mb-4 group-hover:text-brand-accent transition-colors duration-500">
                    <Mail className="w-6 h-6" />
                    <h3 className="text-2xl font-bold tracking-tighter">
                      Digital Routing
                    </h3>
                  </div>
                  <p className="text-brand-muted leading-relaxed font-medium">
                    Commissions: lab@3dvinci.space
                    <br />
                    Press: pr@3dvinci.space
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 text-brand-text mb-4 group-hover:text-brand-accent transition-colors duration-500">
                    <Phone className="w-6 h-6" />
                    <h3 className="text-2xl font-bold tracking-tighter">
                      Direct Line
                    </h3>
                  </div>
                  <p className="text-brand-muted leading-relaxed font-medium">
                    +995 555 123 456
                  </p>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-[2.5rem] bg-[#E8E8E8] relative overflow-hidden group">
                <img referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                  alt="Tbilisi Map"
                  className="w-full h-full object-cover  opacity-50 grayscale group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-text">
                      41°43′N 44°47′E
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}

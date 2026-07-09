import React, { useState, useRef, useMemo, useEffect } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";

import {
  ArrowRight,
  Plus,
  Minus,
  Layers,
  CircleDashed,
  Box,
  Cpu,
  Workflow,
  Hexagon,
} from "lucide-react";

import { useOutletContext } from "react-router-dom";

import { PRODUCTS, REAL_SPACES, Product } from "../data";
import { useProducts } from "../lib/medusa";

import CADBlueprint from "../components/CADBlueprint";

import { TolerancesGraphic, OriginGraphic } from "../components/Graphics";

import { SectionNav } from "../components/SectionNav";

import { MasonryCatalog } from "../components/MasonryCatalog";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

// Shared components refactored to src/components/
import ParallaxImage from "../components/ParallaxImage";

import StickyStackingCatalog from "../components/StickyStackingCatalog";

import SpatialGallery from "../components/SpatialGallery";

import EthosSection from "../components/EthosSection";

import CollectionsGallery from "../components/CollectionsGallery";

import FaqAccordion from "../components/FaqAccordion";

const MAKERS_MARK = "DESIGNED & FORMED IN TBILISI, GEORGIA // 41°43′N 44°47′E";

// ----------------------------------------------------------------------------
// Main Application
// ----------------------------------------------------------------------------

export default function MadeInGeorgia() {
  const { setSelectedObject } = useOutletContext<{
    setSelectedObject: (p: Product | null) => void;
  }>();

  const [shopFilter, setShopFilter] = useState<
    "All" | "Decor" | "Lighting" | "Educational" | "Desk"
  >("All");
  const [viewMode, setViewMode] = useState<"stack" | "grid">("grid");

  const [customStep, setCustomStep] = useState(1);
  const [customData, setCustomData] = useState({
    shape: "",
    material: "",
    scale: "",
    name: "",
    email: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStep < 4) {
      setCustomStep((prev) => prev + 1);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const { data: medusaProducts = [] } = useProducts();
  const mappedProducts = useMemo(() => {
    if (medusaProducts.length > 0) {
      return medusaProducts.map((mp: any) => ({
        id: mp.id,
        name: mp.title,
        price: mp.price?.calculated_price || 0,
        category: mp.categories?.[0]?.name || 'Hardware',
        image: mp.thumbnail,
        description: mp.description,
      }));
    }
    return PRODUCTS;
  }, [medusaProducts]);

  const filteredProducts = useMemo(() => {
    let prods = mappedProducts;
    if (shopFilter !== "All")
      prods = prods.filter((p) => p.category === shopFilter);
    return prods;
  }, [shopFilter, mappedProducts]);

  // Hero Parallax Setup
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHeroFast = useTransform(heroProgress, [0, 1], [0, 200]);
  const yHeroSlow = useTransform(heroProgress, [0, 1], [0, 80]);
  const yHeroReverse = useTransform(heroProgress, [0, 1], [0, -50]);

  return (
    <>
      <SEO
        title="Made In Georgia | Local Manufacturing"
        description="Precision engineered objects for modern spaces. Manufactured locally in Tbilisi with the highest industrial standards."
      />
      <div className="w-full flex flex-col font-sans bg-brand-bg selection:bg-brand-accent selection:text-white">
        {/* ----------------- SECTION 01: STANDARD HERO ----------------- */}
        <section className="pt-32 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
<HeroGraphic type="georgia" className="text-brand-accent" />

          <FadeIn className="max-w-4xl">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              Local Manufacturing
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85] mb-12">
              <RevealText text="Made in Georgia." />
              <RevealText
                text="Built to Last."
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
            <p className="text-xl md:text-3xl text-brand-muted leading-relaxed font-medium">
              Precision engineered objects for modern spaces. Manufactured
              locally in Tbilisi with the highest industrial standards.
            </p>
          </FadeIn>
        </section>

        
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
              <img referrerPolicy="no-referrer"
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
              <img referrerPolicy="no-referrer"
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

        {/* ----------------- SECTION 02: MANIFESTO (CINEMATIC) ----------------- */}
        <section
          id="s-manifesto"
          className="py-24 md:py-48 px-6 relative overflow-hidden"
        >
          <FadeIn className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="flex-1 w-full">
              <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter uppercase text-brand-text leading-[0.85]">
                <RevealText text="Form Meets" />
                <RevealText
                  text="Algorithm."
                  delay={0.1}
                  className="font-serif italic normal-case text-brand-accent mt-4"
                />
              </h2>
            </div>
            <div className="flex-1 w-full space-y-12 border-l border-brand-border/50 pl-8 lg:pl-16">
              <p className="text-2xl md:text-4xl text-brand-text font-bold leading-relaxed tracking-tighter uppercase">
                We do not import generic goods. Every line, curve, and
                structural lattice is mathematically formulated in our studio.
              </p>
              <div className="font-mono text-[11px] text-brand-muted uppercase tracking-[0.2em] leading-loose space-y-2">
                <p>02 — THE PHILOSOPHY</p>
                <p>— {MAKERS_MARK}</p>
                <p>— ADVANCED BIO-RESINS & FDM/SLA</p>
                <p>— PARAMETRIC ARCHITECTURE</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ----------------- SECTION 03: ETHICAL LOCALITY ----------------- */}
        <div id="s-ethos">
          <EthosSection />
        </div>

        {/* ----------------- SECTION 04: SPATIAL CONTEXT ----------------- */}
        <div id="s-spaces">
          <SpatialGallery spaces={REAL_SPACES} />
        </div>

        {/* ----------------- SECTION 05: DESIGN STREAMS ----------------- */}
        <div id="s-streams">
          <CollectionsGallery />
        </div>

        {/* ----------------- SECTION 06: THE EXHIBITION ----------------- */}
        <section
          id="s-catalog"
          className="py-20 md:py-32 bg-brand-bg px-4 md:px-6 relative"
        >
          <div className="max-w-[1800px] mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-brand-text">
                Selected Editions
              </h2>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted mt-6">
                06 — The Catalog
              </div>
            </div>

            {/* Sticky Filtering & View Toggle */}
            <div className="sticky top-[80px] z-30 bg-brand-bg/80 backdrop-blur-md border-y border-brand-border py-4 mb-16 flex flex-col md:flex-row items-center justify-between gap-4 -mx-4 px-4 md:mx-0 md:px-0 transition-all">
              <div
                className="flex flex-wrap gap-2 md:gap-3"
                role="group"
                aria-label="Filter products"
              >
                {["All", "Decor", "Lighting", "Educational", "Desk"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setShopFilter(filter as any);

                        if (filter === "All") setViewMode("grid");
                      }}
                      aria-pressed={shopFilter === filter}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 ${
                        shopFilter === filter
                          ? "bg-brand-text text-white shadow-md"
                          : "bg-white border border-brand-border text-brand-text hover:bg-brand-bg"
                      }`}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white border border-brand-border rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("stack")}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${viewMode === "stack" ? "bg-brand-text text-white shadow-sm" : "text-brand-muted hover:text-brand-text"}`}
                >
                  Stack
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${viewMode === "grid" ? "bg-brand-text text-white shadow-sm" : "text-brand-muted hover:text-brand-text"}`}
                >
                  Grid
                </button>
              </div>
            </div>

            <div className="mt-8">
              {viewMode === "stack" ? (
                <StickyStackingCatalog
                  products={filteredProducts}
                  setSelectedObject={setSelectedObject}
                />
              ) : (
                <MasonryCatalog
                  products={filteredProducts}
                  setSelectedObject={setSelectedObject}
                />
              )}
            </div>
          </div>
        </section>

        {/* ----------------- SECTION 07: FAQ ----------------- */}
        <div id="s-faq">
          <FaqAccordion />
        </div>

        {/* ----------------- SECTION 08: BESPOKE STUDIO (Interactive Configurator) ----------------- */}
        <section
          id="s-bespoke"
          className="py-24 md:py-40 bg-[#111111] text-white rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden bg-architectural-grid"
        >
          <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: Sticky Context with Real-time Parameter Terminal */}
              <div className="lg:sticky lg:top-32 h-fit space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                    <Layers
                      className="w-5 h-5 text-white animate-pulse"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                      COMMISSION WORKSHOP
                    </span>
                    <p className="font-mono text-[10px] text-emerald-400">
                      NODE_STATUS // ONLINE
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[0.95] mb-4">
                    Architect <br />
                    Your Vision.
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-6">
                    08 — Studio Commission
                  </p>
                  <p className="text-lg text-white/80 font-medium leading-relaxed max-w-lg">
                    Collaborate directly with our engineering team to construct
                    tailored functional objects. Step through the studio
                    configurator.
                  </p>
                </div>

                {/* Live Parametric Terminal Display */}
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 font-mono text-[11px] leading-relaxed text-white/80 space-y-4 shadow-xl backdrop-blur-md">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">
                      Parametric Target Matrix
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/40">TOPOLOGY:</span>
                      <span
                        className={
                          customData.shape
                            ? "text-emerald-400 font-bold"
                            : "text-white/30"
                        }
                      >
                        {customData.shape
                          ? customData.shape.toUpperCase()
                          : "AWAITING PHASE 1..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">COMPOUND MATRIX:</span>
                      <span
                        className={
                          customData.material
                            ? "text-emerald-400 font-bold"
                            : "text-white/30"
                        }
                      >
                        {customData.material
                          ? customData.material.toUpperCase()
                          : "AWAITING PHASE 2..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">BOUNDING BOX SCALE:</span>
                      <span
                        className={
                          customData.scale
                            ? "text-emerald-400 font-bold"
                            : "text-white/30"
                        }
                      >
                        {customData.scale
                          ? customData.scale.toUpperCase()
                          : "AWAITING PHASE 3..."}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 text-[10px]">
                      <span className="text-white/40">
                        TRANSMISSION TARGET:
                      </span>
                      <span
                        className={
                          customData.email
                            ? "text-emerald-400"
                            : "text-white/30 truncate max-w-[180px]"
                        }
                      >
                        {customData.email
                          ? customData.email
                          : "RECIPIENT UNREGISTERED"}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Wireframe Indicator Box */}
                  <div className="h-28 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />

                    <AnimatePresence mode="wait">
                      {customStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <CircleDashed
                            className="w-8 h-8 text-white/50 animate-spin"
                            strokeWidth={1}
                            style={{ animationDuration: "10s" }}
                          />
                          <span className="text-[8px] text-white/40 uppercase tracking-widest">
                            Awaiting Form Coefficient
                          </span>
                        </motion.div>
                      )}
                      {customStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Layers
                            className="w-8 h-8 text-white/50 animate-bounce"
                            strokeWidth={1}
                          />
                          <span className="text-[8px] text-white/40 uppercase tracking-widest">
                            compiling lattice structure
                          </span>
                        </motion.div>
                      )}
                      {customStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Box
                            className="w-8 h-8 text-white/50 animate-pulse"
                            strokeWidth={1}
                          />
                          <span className="text-[8px] text-white/40 uppercase tracking-widest">
                            simulating physical volume
                          </span>
                        </motion.div>
                      )}
                      {customStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Cpu
                            className="w-8 h-8 text-emerald-400 animate-spin"
                            strokeWidth={1}
                            style={{ animationDuration: "5s" }}
                          />
                          <span className="text-[8px] text-emerald-400 uppercase tracking-widest font-bold">
                            encryption core initialized
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right: The Configurator */}
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl min-h-[600px] relative overflow-hidden flex flex-col justify-center shadow-2xl">
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "25%" }}
                    animate={{ width: `${(customStep / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                <div className="w-full">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-10">
                    Phase 0{customStep} // 04
                  </div>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-20 space-y-8"
                      >
                        <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                          <Workflow className="w-10 h-10" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-4xl font-semibold tracking-tight mb-4">
                            Specifications Locked.
                          </h3>
                          <p className="text-white/60 font-medium text-lg">
                            Our studio lead will contact you within 24 hours.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key={`step-${customStep}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleCustomSubmit}
                        className="space-y-10"
                      >
                        {/* STEP 1: SHAPE */}
                        {customStep === 1 && (
                          <div className="space-y-8">
                            <h3 className="text-3xl font-semibold tracking-tight">
                              What topology are you imagining?
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                {
                                  id: "geometric",
                                  label: "Geometric",
                                  icon: Hexagon,
                                },
                                {
                                  id: "organic",
                                  label: "Organic Curve",
                                  icon: CircleDashed,
                                },
                                {
                                  id: "structural",
                                  label: "Structural",
                                  icon: Box,
                                },
                                {
                                  id: "custom",
                                  label: "Custom CAD",
                                  icon: Layers,
                                },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  aria-pressed={customData.shape === opt.label}
                                  onClick={() =>
                                    setCustomData({
                                      ...customData,
                                      shape: opt.label,
                                    })
                                  }
                                  className={`cursor-pointer p-8 rounded-[2rem] border transition-all duration-300 flex flex-col items-center text-center gap-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                                    customData.shape === opt.label
                                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                      : "bg-transparent border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                                  }`}
                                >
                                  <opt.icon
                                    className="w-10 h-10"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                  />
                                  <span className="font-semibold text-lg">
                                    {opt.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 2: MATERIAL */}
                        {customStep === 2 && (
                          <div className="space-y-8">
                            <h3 className="text-3xl font-semibold tracking-tight">
                              Select material finish.
                            </h3>
                            <div className="space-y-4">
                              {[
                                {
                                  label: "Matte Composite",
                                  desc: "Light-absorbing, stone-like texture. Ideal for decor.",
                                },
                                {
                                  label: "HRP (Heat-Resistant Polymer)",
                                  desc: "Translucent properties. Designed for lighting.",
                                },
                                {
                                  label: "Flex-TPU",
                                  desc: "Pliable, kinetic resilience. Best for interactive objects.",
                                },
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  type="button"
                                  aria-pressed={
                                    customData.material === opt.label
                                  }
                                  onClick={() =>
                                    setCustomData({
                                      ...customData,
                                      material: opt.label,
                                    })
                                  }
                                  className={`w-full text-left cursor-pointer p-6 rounded-[2rem] border transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                                    customData.material === opt.label
                                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                      : "bg-transparent border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                                  }`}
                                >
                                  <p className="font-semibold text-xl mb-2">
                                    {opt.label}
                                  </p>
                                  <p
                                    className={`text-sm ${customData.material === opt.label ? "text-black/70" : "text-white/70"}`}
                                  >
                                    {opt.desc}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STEP 3: DETAILS */}
                        {customStep === 3 && (
                          <div className="space-y-8">
                            <h3 className="text-3xl font-semibold tracking-tight">
                              Define the parameters.
                            </h3>
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <label
                                  htmlFor="scale-select"
                                  className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 ml-2"
                                >
                                  Approximate Scale
                                </label>
                                <select
                                  id="scale-select"
                                  value={customData.scale}
                                  onChange={(e) =>
                                    setCustomData({
                                      ...customData,
                                      scale: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 focus:outline-none focus:border-white transition-colors text-white font-medium text-lg appearance-none focus:ring-2 focus:ring-white/50"
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="text-black"
                                  >
                                    Select scale...
                                  </option>
                                  <option
                                    value="Desk (Under 20cm)"
                                    className="text-black"
                                  >
                                    Desk Object (Under 20cm)
                                  </option>
                                  <option
                                    value="Room (20cm - 50cm)"
                                    className="text-black"
                                  >
                                    Room Object (20cm - 50cm)
                                  </option>
                                  <option
                                    value="Floor (Over 50cm)"
                                    className="text-black"
                                  >
                                    Floor Object (Over 50cm)
                                  </option>
                                </select>
                              </div>
                              <div className="space-y-3">
                                <label
                                  htmlFor="context-textarea"
                                  className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 ml-2"
                                >
                                  Functional Context
                                </label>
                                <textarea
                                  id="context-textarea"
                                  rows={4}
                                  value={customData.details}
                                  onChange={(e) =>
                                    setCustomData({
                                      ...customData,
                                      details: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 focus:outline-none focus:border-white transition-colors text-white font-medium text-lg resize-none placeholder:text-white/30 focus:ring-2 focus:ring-white/50"
                                  placeholder="Describe the environment and purpose..."
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 4: CONTACT */}
                        {customStep === 4 && (
                          <div className="space-y-8">
                            <h3 className="text-3xl font-semibold tracking-tight">
                              Finalize communication.
                            </h3>
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="fullname" className="sr-only">
                                  Full Name
                                </label>
                                <input
                                  id="fullname"
                                  required
                                  type="text"
                                  placeholder="Full Name"
                                  value={customData.name}
                                  onChange={(e) =>
                                    setCustomData({
                                      ...customData,
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 focus:outline-none focus:border-white transition-colors text-white font-medium text-lg placeholder:text-white/50 focus:ring-2 focus:ring-white/50"
                                />
                              </div>
                              <div>
                                <label htmlFor="email" className="sr-only">
                                  Email Address
                                </label>
                                <input
                                  id="email"
                                  required
                                  type="email"
                                  placeholder="Email Address"
                                  value={customData.email}
                                  onChange={(e) =>
                                    setCustomData({
                                      ...customData,
                                      email: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 focus:outline-none focus:border-white transition-colors text-white font-medium text-lg placeholder:text-white/50 focus:ring-2 focus:ring-white/50"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Controls */}
                        <div className="pt-8 flex gap-4">
                          {customStep > 1 && (
                            <button
                              type="button"
                              onClick={() => setCustomStep((p) => p - 1)}
                              className="px-8 py-5 rounded-2xl border border-white/20 font-semibold text-white hover:bg-white/10 transition-colors"
                            >
                              Back
                            </button>
                          )}
                          <button
                            type="submit"
                            disabled={
                              isSubmitting ||
                              (customStep === 1 && !customData.shape) ||
                              (customStep === 2 && !customData.material)
                            }
                            className="flex-1 bg-white text-black py-5 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
                          >
                            {isSubmitting
                              ? "Processing..."
                              : customStep < 4
                                ? "Continue"
                                : "Transmit Specifications"}
                            {customStep < 4 && !isSubmitting && (
                              <ArrowRight className="w-5 h-5" strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

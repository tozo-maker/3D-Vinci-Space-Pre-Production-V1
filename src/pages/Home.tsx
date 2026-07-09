import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import {
  ArrowRight,
  Target,
  Zap,
  HeartHandshake,
  Award,
  Cpu,
} from "lucide-react";

import { Link } from "react-router-dom";

import { PRODUCTS } from "../data";
import { useProducts } from "../lib/medusa";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

const HorizontalGallery = ({ products }: { products: any[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-brand-surface w-full"
    >
      <div className="sticky top-0 h-screen flex flex-col pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="max-w-[1800px] mx-auto w-full px-6 md:px-16 mb-8 flex justify-between items-end shrink-0">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-brand-text leading-[0.9]">
              Selected <br />{" "}
              <span className="font-serif italic font-normal text-brand-accent">
                Editions.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden md:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
              Scroll horizontally →
            </p>
          </FadeIn>
        </div>

        <div className="flex-1 min-h-0 relative flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 md:gap-12 px-6 md:px-16 w-max h-full items-center"
          >
            {products.map((p, i) => (
              <Link
                to="/tools"
                key={p.id}
                className="group relative shrink-0 block h-full max-h-[70vh] flex flex-col justify-center"
              >
                <div className="relative h-[65%] md:h-[75%] aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-[#E8E8E8]">
                  <img referrerPolicy="no-referrer"
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover  transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                      0{i + 1} — {p.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-text tracking-tight group-hover:text-brand-accent transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-right pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                      Price
                    </p>
                    <p className="font-medium font-mono text-sm">₾{p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { data: medusaProducts = [] } = useProducts();
  const mappedProducts = React.useMemo(() => {
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

  const galleryProducts = mappedProducts.slice(0, 6);

  return (
    <>
      <SEO
        title="Industrial Grade 3D Printing & Custom Fabrication"
        description="Precision engineered objects for modern spaces. Discover our latest collection of architectural and industrial designs, crafted locally in Tbilisi, Georgia."
        canonical="https://3dvinci.space/"
        type="website"
        keywords={['3D Printing Georgia', 'Additive Manufacturing Tbilisi', '3D Vinci Studio', 'Parametric Design Objects', 'Industrial 3D Printing', 'Bespoke Fabrication Caucasus']}
      />
      <div className="w-full flex flex-col font-sans bg-brand-bg selection:bg-brand-accent selection:text-white">
        {/* 1. Hero Section - Asymmetrical Typography & Images */}
        <section className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-[1800px] mx-auto w-full flex flex-col justify-between">
<HeroGraphic type="home" className="text-brand-accent" />

<HeroGraphic type="home" className="text-brand-accent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12 md:mt-24">
            <div className="lg:col-span-8 z-10 relative">
              <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-[0.85] uppercase">
                <RevealText text="Print" />
                <RevealText
                  text="The Future"
                  delay={0.1}
                  className="text-brand-muted/20"
                />
                <div className="flex items-center gap-8 mt-4">
                  <RevealText text="Today." delay={0.2} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", damping: 15 }}
                    className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-brand-accent text-brand-accent"
                  >
                    <ArrowRight className="w-10 h-10 -rotate-45" />
                  </motion.div>
                </div>
              </h1>
            </div>

            <div className="lg:col-span-4 mt-8 lg:mt-0 flex flex-col gap-8 justify-end h-full">
              <FadeIn delay={0.6}>
                <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-sm">
                  From classrooms to startups, we transform imagination into
                  reality with{" "}
                  <span className="font-serif italic text-brand-accent">
                    uncompromising
                  </span>{" "}
                  3D printing.
                </p>
              </FadeIn>
              <FadeIn delay={0.8} className="flex gap-4">
                <Link
                  to="/services"
                  className="bg-brand-text text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-brand-accent transition-colors duration-300 uppercase text-xs font-mono"
                >
                  Bring Idea to Life
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 h-[50vh] md:h-[65vh]">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="md:col-span-2 relative rounded-[2rem] overflow-hidden bg-[#E8E8E8]"
            >
              <img referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1631427962232-803d4f30c64f?auto=format&fit=crop&w=2400&q=80"
                className="absolute inset-0 w-full h-full object-cover "
                alt="Workspace"
              />
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="hidden md:block relative rounded-[2rem] overflow-hidden bg-brand-surface"
            >
              <img referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                className="absolute inset-0 w-full h-full object-cover "
                alt="Printer"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest border border-brand-text/20 rounded-full px-4 py-2 w-max backdrop-blur-md">
                  Equipment
                </div>
                <div className="text-2xl font-bold tracking-tighter">
                  Next-gen Additive Manufacturing.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Asymmetric Bento Box Services */}
        <section className="py-32 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 uppercase">
              Capabilities. <br />
              <span className="font-serif italic font-normal text-brand-muted">
                Designed for scale.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
            <FadeIn
              delay={0.1}
              className="md:col-span-8 bg-brand-surface rounded-[2rem] p-12 flex flex-col justify-between group hover:bg-brand-text hover:text-white transition-colors duration-500 relative overflow-hidden"
            >
              <div className="z-10 relative">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  Services
                </span>
                <h3 className="text-4xl font-bold tracking-tighter mt-4 max-w-lg leading-tight">
                  Prototyping to Production Runs.
                </h3>
              </div>
              <div className="z-10 relative flex justify-between items-end">
                <p className="max-w-md font-medium opacity-80 text-lg">
                  We deliver precision, speed, and quality with several advanced
                  material options.
                </p>
                <ArrowRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </div>
              {/* Decorative graphic */}
              <Target className="absolute -right-12 -bottom-12 w-96 h-96 opacity-5 group-hover:opacity-10 transition-opacity" />
            </FadeIn>

            <FadeIn
              delay={0.2}
              className="md:col-span-4 bg-brand-border/40 rounded-[2rem] p-12 flex flex-col justify-between group hover:bg-brand-accent hover:text-white transition-colors duration-500"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  Hardware
                </span>
                <h3 className="text-3xl font-bold tracking-tighter mt-4">
                  Professional
                  <br />
                  3D Printers.
                </h3>
              </div>
              <p className="font-medium opacity-80">
                Access equipment trusted by specialists.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.3}
              className="md:col-span-4 bg-[#E8E8E8] rounded-[2rem] overflow-hidden relative group"
            >
              <img referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&w=800&q=80"
                className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-700"
                alt="Material"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-white px-3 py-1 rounded-full w-max">
                  Materials
                </span>
                <h3 className="text-2xl font-bold tracking-tighter">
                  50+ Engineering Polymers
                </h3>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.4}
              className="md:col-span-8 bg-brand-surface rounded-[2rem] p-12 flex flex-col justify-between group hover:bg-brand-border transition-colors duration-500"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  Library
                </span>
                <h3 className="text-4xl font-bold tracking-tighter mt-4 max-w-lg">
                  Curated 3D Models.
                </h3>
              </div>
              <p className="max-w-md font-medium opacity-80 text-lg">
                Save time with handpicked, ready-to-print models designed by
                experts.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. Horizontal Scroll Gallery */}
        <HorizontalGallery products={galleryProducts} />

        {/* 4. Large Text Immersive Section */}
        <section className="py-32 px-6 md:px-16 max-w-[1800px] mx-auto w-full text-center flex flex-col items-center">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-8">
              The Vinci Difference
            </p>
          </FadeIn>
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase max-w-6xl">
            <RevealText text="Small Team." />
            <RevealText
              text="Huge Impact."
              delay={0.1}
              className="font-serif italic text-brand-accent normal-case"
            />
          </h2>
          <FadeIn delay={0.4} className="mt-16">
            <Link
              to="/about"
              className="inline-flex items-center gap-4 border-b-2 border-brand-text pb-2 text-xl font-bold hover:text-brand-accent hover:border-brand-accent transition-colors"
            >
              Read Our Story <ArrowRight className="w-6 h-6" />
            </Link>
          </FadeIn>
        </section>

        {/* 5. Minimalist Footer Teaser */}
        <section className="border-t border-brand-border bg-brand-surface py-32 px-6 md:px-16">
          <div className="max-w-[1800px] mx-auto flex flex-col items-center text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">
                Ready to create?
              </h2>
              <p className="mt-8 text-xl text-brand-muted font-medium max-w-2xl mx-auto">
                Your vision deserves more than a sketch. Let's engineer it into
                reality.
              </p>
              <div className="mt-12">
                <Link
                  to="/contact"
                  className="bg-brand-text text-white px-10 py-5 rounded-full font-bold tracking-wide hover:bg-brand-accent transition-colors duration-300 shadow-lg text-lg uppercase font-mono text-xs"
                >
                  Initiate Project
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}

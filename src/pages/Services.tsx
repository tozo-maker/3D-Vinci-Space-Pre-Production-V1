import React from "react";

import { Box, Layers, Cpu, Wrench, GraduationCap } from "lucide-react";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

export default function Services() {
  const services = [
    {
      icon: (
        <Layers className="w-10 h-10 mb-8 text-brand-text group-hover:text-brand-accent transition-colors duration-500" />
      ),
      title: "3D Print on Demand",
      desc: "Professional-grade additive manufacturing tailored precisely to personalized needs. Perfect for individual creators, hobbyists, and unique projects requiring high-quality prints and fast turnaround.",
    },
    {
      icon: (
        <GraduationCap className="w-10 h-10 mb-8 text-brand-text group-hover:text-brand-accent transition-colors duration-500" />
      ),
      title: "Education & Integration",
      desc: "Creating interactive, project-based environments. We provide teacher training, curriculum integration, and hardware support to empower students to explore and learn with confidence.",
    },
    {
      icon: (
        <Cpu className="w-10 h-10 mb-8 text-brand-text group-hover:text-brand-accent transition-colors duration-500" />
      ),
      title: "Prototyping",
      desc: "Tailored for design studios and R&D teams. We bridge the gap between digital models and physical performance, enabling rapid iteration, design validation, and material testing.",
    },
    {
      icon: (
        <Box className="w-10 h-10 mb-8 text-brand-text group-hover:text-brand-accent transition-colors duration-500" />
      ),
      title: "Production Runs",
      desc: "Converting digital designs into commercially ready products. From bridge and low-volume production to custom tooling and jigs, we deliver quality parts at scale.",
    },
    {
      icon: (
        <Wrench className="w-10 h-10 mb-8 text-brand-text group-hover:text-brand-accent transition-colors duration-500" />
      ),
      title: "Consulting & Installation",
      desc: "Standalone consulting for clients who already own equipment. We refine models, optimize workflows, and deliver, install, and calibrate your 3D printing hardware.",
    },
  ];

  return (
    <>
      <SEO
        title="Professional 3D Printing & Industrial Design Services"
        description="Professional-grade additive manufacturing, rapid functional prototyping, custom CAD modeling, and industrial short-run production tailored to your engineering or aesthetic needs."
        canonical="https://3dvinci.space/services"
        type="service"
        serviceData={{
          name: "Industrial 3D Printing & Design Optimization",
          description: "High-precision additive manufacturing, structural testing, and custom material compounding for architectural, artistic, and functional projects.",
          providerName: "3D Vinci Studio",
          areaServed: "Tbilisi, Georgia & Caucasus Region"
        }}
        keywords={['3D Printing Services Georgia', 'Tbilisi FDM 3D printing', 'custom CAD prototyping', 'industrial design Tbilisi', 'rapid prototyping Georgia', 'material compounding']}
      />
      <div className="w-full flex flex-col pb-32 selection:bg-brand-accent selection:text-white">
        <section className="pt-32 pb-24 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
<HeroGraphic type="services" className="text-brand-accent" />

          <FadeIn className="max-w-4xl mb-24">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              Laboratory Capabilities
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85] mb-8">
              <RevealText text="Ready to Start" />
              <RevealText
                text="Your Project?"
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
            <p className="text-xl md:text-3xl text-brand-muted leading-relaxed mt-12 font-medium">
              Take a look at our services and find out exactly what we can do
              for you. We provide end-to-end 3D printing integration and
              on-demand fabrication.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <FadeIn
                delay={i * 0.1}
                key={i}
                className="bg-brand-surface rounded-[2.5rem] p-12 hover:bg-brand-text hover:text-white transition-colors duration-500 group flex flex-col justify-between"
              >
                <div>
                  {service.icon}
                  <h3 className="text-3xl font-bold tracking-tighter mb-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-brand-muted group-hover:text-white/70 transition-colors leading-relaxed font-medium mt-8">
                  {service.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-16 max-w-[1800px] mx-auto w-full">
          <FadeIn className="bg-brand-text text-white rounded-[3rem] p-12 md:p-32 flex flex-col md:flex-row justify-between items-center gap-16 overflow-hidden relative group">
            <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none"></div>
            <div className="max-w-2xl relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8 group-hover:text-brand-accent transition-colors duration-700">
                Initiate a <br />
                <span className="font-serif italic normal-case">
                  Commission
                </span>
              </h2>
              <p className="text-white/60 text-xl leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-700">
                Send us your DXF, STL, or STEP files for an immediate
                consultation. We guarantee precision tolerance and ethical
                material sourcing. Your vision deserves more than a sketch.
                Let’s make it real together.
              </p>
            </div>
            <div className="relative z-10">
              <a
                href="mailto:lab@3dvinci.space"
                className="inline-flex bg-white text-brand-text px-10 py-5 rounded-full font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-colors duration-500 uppercase text-xs font-mono"
              >
                Get a Free Quote
              </a>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

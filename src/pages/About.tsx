import React from "react";

import { Heart, FastForward, Headphones, Lightbulb } from "lucide-react";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

export default function About() {
  return (
    <>
      <SEO
        title="About Us | Making Ideas Real"
        description="3D Vinci is a creative 3D printing studio dedicated to making ideas real—accessible, functional, and built to last."
      />
      <div className="w-full pb-32 selection:bg-brand-accent selection:text-white">
        <section className="pt-32 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
<HeroGraphic type="about" className="text-brand-accent" />

          <FadeIn className="max-w-4xl">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              Discover Our Journey
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85] mb-12">
              <RevealText text="Making Ideas Real." />
              <RevealText
                text="Built to Last."
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
            <p className="text-xl md:text-3xl text-brand-muted leading-relaxed font-medium">
              3D Vinci is a creative 3D printing studio dedicated to making
              ideas real—accessible, functional, and built to last. We design
              and deliver innovative, design-focused solutions for homes,
              schools, and workplaces.
            </p>
          </FadeIn>
        </section>

        <section className="px-6 md:px-16 max-w-[1800px] mx-auto w-full py-16">
          <FadeIn
            delay={0.2}
            className="aspect-[21/9] rounded-[3rem] overflow-hidden bg-[#E8E8E8] relative"
          >
            <img referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2500"
              alt="Laboratory"
              className="absolute inset-0 w-full h-full object-cover  hover:scale-105 transition-transform duration-1000"
            />
          </FadeIn>
        </section>

        <section className="px-6 md:px-16 max-w-[1400px] mx-auto w-full py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <FadeIn>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-8">
                The Vinci <br />{" "}
                <span className="font-serif italic text-brand-accent normal-case">
                  Difference
                </span>
              </h3>
              <p className="text-xl text-brand-text leading-relaxed mb-6 font-medium">
                3D Vinci isn’t a faceless tech company — it’s a family project
                that grew into a shared mission. We’re a small, close-knit team
                built on curiosity, persistence, and a lot of trial and error.
              </p>
              <p className="text-xl text-brand-muted leading-relaxed font-medium">
                That journey shapes how we work today, and it’s why we care as
                much about the people behind the ideas as we do about the ideas
                themselves.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FadeIn
                delay={0.1}
                className="bg-brand-surface rounded-[2rem] p-8 hover:bg-brand-text hover:text-white transition-colors duration-500 group"
              >
                <Heart className="w-8 h-8 text-brand-text group-hover:text-brand-accent mb-6 transition-colors" />
                <h4 className="font-bold text-2xl tracking-tighter mb-4">
                  Precision That Inspires
                </h4>
                <p className="text-brand-muted group-hover:text-white/70 transition-colors">
                  Every print handled by experts, down to the finest detail.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.2}
                className="bg-brand-surface rounded-[2rem] p-8 hover:bg-brand-text hover:text-white transition-colors duration-500 group"
              >
                <FastForward className="w-8 h-8 text-brand-text group-hover:text-brand-accent mb-6 transition-colors" />
                <h4 className="font-bold text-2xl tracking-tighter mb-4">
                  Fast & Reliable
                </h4>
                <p className="text-brand-muted group-hover:text-white/70 transition-colors">
                  A team that delivers seamlessly—with quality, consistency, and
                  care.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.3}
                className="bg-brand-surface rounded-[2rem] p-8 hover:bg-brand-text hover:text-white transition-colors duration-500 group"
              >
                <Headphones className="w-8 h-8 text-brand-text group-hover:text-brand-accent mb-6 transition-colors" />
                <h4 className="font-bold text-2xl tracking-tighter mb-4">
                  Always Supported
                </h4>
                <p className="text-brand-muted group-hover:text-white/70 transition-colors">
                  We believe in responsive, human support—available when you
                  need it.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.4}
                className="bg-brand-surface rounded-[2rem] p-8 hover:bg-brand-text hover:text-white transition-colors duration-500 group"
              >
                <Lightbulb className="w-8 h-8 text-brand-text group-hover:text-brand-accent mb-6 transition-colors" />
                <h4 className="font-bold text-2xl tracking-tighter mb-4">
                  Focused on You
                </h4>
                <p className="text-brand-muted group-hover:text-white/70 transition-colors">
                  Every product begins and ends with the user in mind.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-16 max-w-[1400px] mx-auto w-full py-16">
          <FadeIn className="bg-[#E8E8E8] rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-text opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 group-hover:text-white transition-colors duration-700">
              <p className="font-serif italic text-3xl md:text-5xl tracking-tight leading-relaxed max-w-4xl mx-auto mb-12">
                "3D Vinci consistently delivers high-quality designs that are
                both creative and practical. Their professionalism and
                reliability make them a trusted partner."
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-muted group-hover:text-brand-accent transition-colors">
                — Mariam G., Customer
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

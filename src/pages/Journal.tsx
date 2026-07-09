import React from "react";

import { ArrowRight } from "lucide-react";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

export default function Journal() {
  const articles = [
    {
      id: 1,
      title:
        "Global Hype vs. Georgian Reality: Why the Anycubic Kobra S1 Combo is the Smartest Choice",
      category: "Product Recommendation",
      date: "NOVEMBER 21, 2025",
      author: "Alex",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200",
      excerpt:
        "An honest look at the hardware making waves globally, and why it perfectly aligns with the manufacturing needs of our local creators and businesses.",
    },
    {
      id: 2,
      title:
        "Creating Truly Inclusive Classrooms: The Potential of 3D Printing for Special Needs Students",
      category: "Integration Recommendation",
      date: "JANUARY 22, 2026",
      author: "Natia",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
      excerpt:
        "How custom-designed, 3D printed manipulatives and sensory tools are changing the way educators build accessible environments for all students.",
    },
    {
      id: 3,
      title:
        "Fast Fashion’s New Accomplice: When 3D Printing Learns to Move Fast",
      category: "3D Printing in Media",
      date: "MARCH 20, 2026",
      author: "Ana",
      image:
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
      excerpt:
        "Examining the intersection of rapid additive manufacturing and the fashion industry, and the environmental implications of high-speed printing.",
    },
    {
      id: 4,
      title:
        "A Practical Guide to TPU Filament: Pros, Cons, and How It Compares",
      category: "Product Review",
      date: "NOVEMBER 16, 2025",
      author: "Niku",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
      excerpt:
        "Everything you need to know about printing with flexible materials. From bed adhesion tricks to designing for flexibility.",
    },
    {
      id: 5,
      title: "Women in 3D Printing and STEM",
      category: "Personal Story",
      date: "MARCH 7, 2026",
      author: "Ana",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200",
      excerpt:
        "Highlighting the voices and innovations of women leading the charge in additive manufacturing and engineering.",
    },
  ];

  return (
    <>
      <SEO
        title="Journal, Material Science Insights & Chronicles"
        description="Technical articles, structural testing diaries, material compound breakdowns, and studio stories from the cutting edge of additive manufacturing in Tbilisi, Georgia."
        canonical="https://3dvinci.space/journal"
        type="article"
        keywords={['Material Science Blog', '3D Printing Chronicles', 'Additive Manufacturing Tbilisi Research', 'PLA Carbon Fiber Testing', 'Studio Diaries Georgia', '3D Vinci Journal']}
      />
      <div className="w-full pb-32 selection:bg-brand-accent selection:text-white">
        <section className="pt-32 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
<HeroGraphic type="journal" className="text-brand-accent" />

          <FadeIn className="mb-24">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              The Journal
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85]">
              <RevealText text="Thoughts on" />
              <RevealText
                text="Design & Tech."
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed mt-10 max-w-2xl font-medium">
              Here, we explore the fascinating world of 3D printing, design
              innovations, and other related stuff together. Whether you're a
              seasoned expert or just starting your journey, you and your
              opinions are very welcome.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-24 md:gap-32">
            {articles.map((article, i) => (
              <FadeIn delay={i * 0.1} key={article.id}>
                <article className="flex flex-col md:flex-row gap-12 lg:gap-24 group cursor-pointer items-center">
                  <div
                    className={`w-full md:w-1/2 ${i % 2 !== 0 ? "md:order-2" : ""}`}
                  >
                    <div className="aspect-[4/3] rounded-[3rem] bg-[#E8E8E8] overflow-hidden relative shadow-sm">
                      <img referrerPolicy="no-referrer"
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    </div>
                  </div>
                  <div
                    className={`w-full md:w-1/2 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-1" : ""}`}
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="bg-brand-text text-white px-4 py-2 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest">
                        {article.category}
                      </span>
                      <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                        {article.date} · BY {article.author}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-brand-text mb-8 group-hover:text-brand-accent transition-colors duration-500 leading-[1] uppercase">
                      {article.title}
                    </h2>
                    <p className="text-xl text-brand-muted leading-relaxed max-w-xl mb-10 font-medium">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-brand-text font-bold text-sm tracking-widest uppercase font-mono group-hover:text-brand-accent transition-colors duration-500">
                      Read Article{" "}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

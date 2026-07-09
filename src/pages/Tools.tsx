import React, { useState, useMemo } from "react";

import { useOutletContext } from "react-router-dom";

import { PRODUCTS, Product } from "../data";
import { useProducts } from "../lib/medusa";

import { FadeIn, RevealText } from "../components/Awwwards";

import { SEO } from "../components/SEO";

import { HeroGraphic } from "../components/HeroGraphic";

export default function Tools() {
  const { setSelectedObject } = useOutletContext<{
    setSelectedObject: (p: Product | null) => void;
  }>();
  const [shopFilter, setShopFilter] = useState<
    "All" | "Hardware" | "Filament" | "Decor" | "Accessories"
  >("All");

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
      prods = prods.filter((p: any) => p.category === shopFilter);
    return prods;
  }, [shopFilter, mappedProducts]);

  return (
    <>
      <SEO
        title="Engineered Tools & Objects"
        description="Browse our collection of precision-engineered tools, hardware, and decorative objects."
      />
      <div className="w-full min-h-screen bg-brand-bg pb-32 selection:bg-brand-accent selection:text-white">
        <div className="pt-32 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto w-full">
          <FadeIn className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-6">
              The Exhibition
            </div>
            <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter uppercase leading-[0.85]">
              <RevealText text="Engineered Tools" />
              <RevealText
                text="& Objects."
                delay={0.1}
                className="font-serif italic normal-case text-brand-accent mt-4"
              />
            </h1>
          </FadeIn>

          <div className="sticky top-[80px] z-30 bg-brand-bg/80 backdrop-blur-md border-y border-brand-border py-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-4 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex flex-wrap gap-2 md:gap-4">
              {["All", "Hardware", "Filament", "Decor", "Accessories"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setShopFilter(filter as any)}
                    className={`px-6 py-3 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 ${
                      shopFilter === filter
                        ? "bg-brand-text text-white shadow-md"
                        : "bg-white border border-brand-border text-brand-text hover:bg-brand-surface"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
            {filteredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.05}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedObject(product)}
                  className="group cursor-pointer flex flex-col gap-8 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-text/50 rounded-[3rem]"
                >
                  <div className="w-full aspect-[4/5] rounded-[3rem] bg-[#E8E8E8] overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img referrerPolicy="no-referrer"
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover  group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                  <div className="px-2 flex flex-col items-center text-center">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-4">
                      {product.category}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tighter text-brand-text group-hover:text-brand-accent transition-colors duration-500 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-mono text-brand-text font-bold">
                      ₾{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center text-brand-muted text-lg font-mono tracking-widest uppercase">
              No objects currently available in this specification.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

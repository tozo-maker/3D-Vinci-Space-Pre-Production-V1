const fs = require('fs');
let code = fs.readFileSync('src/components/AISearchOverlay.tsx', 'utf8');

code = code.replace(
  /\.map\(\(id: string\) => PRODUCTS\.find\(p => p\.id === id\)\)/,
  `.map((id: string) => {
            const medusaP = medusaProducts.find((mp: any) => mp.id === id || mp.handle === id);
            if (medusaP) return { id: medusaP.id, name: medusaP.title, price: medusaP.price?.calculated_price || 0, category: medusaP.categories?.[0]?.name || 'Hardware', image: medusaP.thumbnail, description: medusaP.description };
            return PRODUCTS.find(p => p.id === id);
          })`
);

fs.writeFileSync('src/components/AISearchOverlay.tsx', code);
console.log("Replaced product mapping");

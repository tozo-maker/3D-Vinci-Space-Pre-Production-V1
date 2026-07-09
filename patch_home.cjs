const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Imports
if (!code.includes('useProducts')) {
  code = code.replace(
    "import { PRODUCTS } from \"../data\";",
    "import { PRODUCTS } from \"../data\";\nimport { useProducts } from \"../lib/medusa\";"
  );
  code = code.replace(
    "export default function Home() {",
    "export default function Home() {\n  const { data: medusaProducts = [] } = useProducts();"
  );
  code = code.replace(
    "const galleryProducts = PRODUCTS.slice(0, 6);",
    "const mappedProducts = React.useMemo(() => {\n    if (medusaProducts.length > 0) {\n      return medusaProducts.map((mp: any) => ({\n        id: mp.id,\n        name: mp.title,\n        price: mp.price?.calculated_price || 0,\n        category: mp.categories?.[0]?.name || 'Hardware',\n        image: mp.thumbnail,\n        description: mp.description,\n      }));\n    }\n    return PRODUCTS;\n  }, [medusaProducts]);\n\n  const galleryProducts = mappedProducts.slice(0, 6);"
  );
  fs.writeFileSync('src/pages/Home.tsx', code);
  console.log("Patched Home.tsx");
} else {
  console.log("Home.tsx already patched");
}

const fs = require('fs');
let code = fs.readFileSync('src/pages/Tools.tsx', 'utf8');

// Imports
code = code.replace(
  "import { PRODUCTS, Product } from \"../data\";",
  "import { PRODUCTS, Product } from \"../data\";\nimport { useProducts } from \"../lib/medusa\";"
);

// State hooks
code = code.replace(
  "const filteredProducts = useMemo(() => {\n    let prods = PRODUCTS;\n    if (shopFilter !== \"All\")\n      prods = prods.filter((p) => p.category === shopFilter);\n    return prods;\n  }, [shopFilter]);",
  "const { data: medusaProducts = [] } = useProducts();\n  const mappedProducts = useMemo(() => {\n    if (medusaProducts.length > 0) {\n      return medusaProducts.map((mp: any) => ({\n        id: mp.id,\n        name: mp.title,\n        price: mp.price?.calculated_price || 0,\n        category: mp.categories?.[0]?.name || 'Hardware',\n        image: mp.thumbnail,\n        description: mp.description,\n      }));\n    }\n    return PRODUCTS;\n  }, [medusaProducts]);\n\n  const filteredProducts = useMemo(() => {\n    let prods = mappedProducts;\n    if (shopFilter !== \"All\")\n      prods = prods.filter((p: any) => p.category === shopFilter);\n    return prods;\n  }, [shopFilter, mappedProducts]);"
);

fs.writeFileSync('src/pages/Tools.tsx', code);

const fs = require('fs');
let code = fs.readFileSync('src/RootLayout.tsx', 'utf8');

// Imports
code = code.replace(
  "import { PRODUCTS, REAL_SPACES, Product } from './data';",
  "import { PRODUCTS, REAL_SPACES, Product } from './data';\nimport { useCart, useAddToCart, useUpdateLineItem, useRemoveLineItem, useUpdateCart, useCompleteCheckout } from './lib/medusa';"
);

// State hooks
code = code.replace(
  "const [collectionItems, setCollectionItems] = useState<{ id: string; product: Product; quantity: number; selectedMaterial: 'matte' | 'terracotta' | 'hrp' | 'obsidian'; selectedScale: 'miniature' | 'standard' | 'grand'; price: number }[]>([]);",
  "const { data: cart } = useCart();\n  const { mutate: addToCart } = useAddToCart();\n  const { mutate: updateLineItem } = useUpdateLineItem();\n  const { mutate: removeLineItem } = useRemoveLineItem();\n  const { mutate: updateCartData } = useUpdateCart();\n  const { mutateAsync: completeCheckout } = useCompleteCheckout();\n  const collectionItems = cart?.items || [];"
);

// acquireObject
code = code.replace(
  "setCollectionItems(prev => {\n      const existing = prev.find(item => item.id === itemKey);\n      if (existing) {\n        return prev.map(item => item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item);\n      }\n      return [...prev, { \n        id: itemKey, \n        product, \n        quantity: 1, \n        selectedMaterial: material, \n        selectedScale: scale, \n        price: finalPrice \n      }];\n    });",
  "addToCart({ variantId: product.id, quantity: 1, metadata: { material, scale }, productOverride: product });"
);

// updateQuantity
code = code.replace(
  "setCollectionItems(prev => prev.map(item => {\n      if (item.id === itemId) {\n        const newQty = item.quantity + amount;\n        return newQty > 0 ? { ...item, quantity: newQty } : null;\n      }\n      return item;\n    }).filter(Boolean) as any);",
  "const item = collectionItems.find((i: any) => i.id === itemId);\n    if (item) {\n      if (item.quantity + amount > 0) {\n        updateLineItem({ lineId: itemId, quantity: item.quantity + amount });\n      } else {\n        removeLineItem(itemId);\n      }\n    }"
);

// collectionTotal
code = code.replace(
  "const collectionTotal = useMemo(() => \n    collectionItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), \n    [collectionItems]\n  );",
  "const collectionTotal = cart?.total || 0;"
);

// reset
code = code.replace(
  "setCollectionItems([]);",
  ""
);

// finalize
code = code.replace(
  "const finalizeAndResetCheckout = () => {",
  "const finalizeAndResetCheckout = async () => {\n    await completeCheckout();"
);

// Render items
// old: item.product.image
code = code.replace(/item\.product\.image/g, "item.thumbnail");
code = code.replace(/item\.product\.name/g, "item.title");
code = code.replace(/item\.price/g, "item.unit_price");
code = code.replace(/item\.selectedScale/g, "(item.metadata?.scale || 'standard')");
code = code.replace(/item\.selectedMaterial/g, "(item.metadata?.material || 'matte')");

fs.writeFileSync('src/RootLayout.tsx', code);

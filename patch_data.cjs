const fs = require('fs');

const productsJson = fs.readFileSync('products.json', 'utf8');
const products = JSON.parse(productsJson);

const categories = ['Hardware', 'Filament', 'Decor', 'Accessories'];
products.forEach((p, i) => {
  if (p.name.includes('Lamp')) p.category = 'Decor';
  else if (p.name.includes('Keychain') || p.name.includes('Bookmark')) p.category = 'Accessories';
  else p.category = categories[i % categories.length];
});

let dataTs = fs.readFileSync('src/data.ts', 'utf8');

const productsMatch = dataTs.match(/export const PRODUCTS: Product\[\] = \[([\s\S]*?)\];/);
if (productsMatch) {
  const newProductsStr = `export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;
  dataTs = dataTs.replace(/export const PRODUCTS: Product\[\] = \[([\s\S]*?)\];/, newProductsStr);
  fs.writeFileSync('src/data.ts', dataTs);
  console.log("Updated data.ts");
} else {
  console.log("Could not find PRODUCTS in data.ts");
}

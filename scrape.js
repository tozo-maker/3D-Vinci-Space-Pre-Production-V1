const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetchUrl('https://3dvinci.space/shop/');
  // Just log all links
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  const productLinks = [...new Set(links.filter(l => l.includes('/product/')))];
  console.log("Product links:", productLinks);
  
  if (productLinks.length === 0) {
      const homeHtml = await fetchUrl('https://3dvinci.space/');
      const hLinks = [...homeHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
      const hProductLinks = [...new Set(hLinks.filter(l => l.includes('/product/')))];
      console.log("Home Product links:", hProductLinks);
  }
}
run();

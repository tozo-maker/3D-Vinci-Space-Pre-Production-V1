const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const products = await fetchUrl('https://3dvinci.space/wp-json/wp/v2/product?_embed&per_page=20');
    
    const mapped = products.map((p, i) => {
      let imageUrl = 'https://images.unsplash.com/photo-1620022378904-7a31405106ce?auto=format&fit=crop&w=800&q=80'; // fallback
      if (p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]) {
        imageUrl = p._embedded['wp:featuredmedia'][0].source_url;
      }
      
      let desc = p.excerpt.rendered.replace(/<[^>]+>/g, '').trim();
      if (!desc) {
          desc = p.content.rendered.replace(/<[^>]+>/g, '').trim().substring(0, 120) + '...';
      }
      if (!desc) desc = "A high-quality 3D printed object.";
      
      return {
        id: p.slug,
        name: p.title.rendered,
        price: 24.00 + (i * 5),
        category: 'Decor',
        image: imageUrl,
        description: desc.replace(/\n/g, ' ')
      };
    });
    
    console.log(JSON.stringify(mapped, null, 2));
  } catch(e) {
    console.error(e);
  }
}
run();

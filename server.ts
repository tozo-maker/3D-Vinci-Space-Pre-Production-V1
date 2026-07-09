import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from './src/data.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Image Proxy Route to handle hotlink protection/CORS
  app.get('/api/proxy-image', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).send('URL query parameter is required');
      }

      // Ensure we only proxy secure external images
      if (!url.startsWith('https://')) {
        return res.status(400).send('Only secure HTTPS URLs can be proxied');
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/*'
        }
      });

      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch image from source: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || 'image/png';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error('Image proxy error:', error);
      res.status(500).send('Internal server error proxying the image');
    }
  });

  // Dynamic AI Context Endpoint for future-proof LLM Discovery
  app.get('/api/ai-context', (req, res) => {
    try {
      const format = req.query.format;
      
      const contextData = {
        brand: {
          name: "3D Vinci Studio",
          description: "Industrial-grade 3D printing and custom fabrication studio creating parametric, functional, and sculptural objects.",
          location: "Tbilisi, Georgia",
          mission: "Pioneering additive manufacturing craftsmanship and spatial objects in the Caucasus region.",
          contact: {
            email: "lab@3dvinci.space",
            press: "pr@3dvinci.space"
          }
        },
        navigationIndex: [
          { path: "/", purpose: "Main landing screen displaying selected signature editions, dynamic horizontal gallery, and studio introduction." },
          { path: "/made-in-georgia", purpose: "The flagship portfolio, showcasing real spaces, architectural blueprint renders, and locally crafted bespoke installations." },
          { path: "/services", purpose: "Industrial design services, custom additive fabrication specs, engineering tolerances, and client booking pipeline." },
          { path: "/tools", purpose: "Our custom mathematical or functional parametric tools, organizers, and generative products." },
          { path: "/journal", purpose: "Studio chronicles, technical articles on materials engineering, design research, and local material testing." },
          { path: "/about", purpose: "Deep dive into the 3D Vinci ethos, Tbilisi laboratory history, and our fabrication manifesto." },
          { path: "/contact", purpose: "Interactive commission inquiries, consultation bookings, and laboratory coordinates." }
        ],
        materialsSpecification: [
          {
            name: "Carbon Fiber PLA Composite",
            type: "Composite Co-polymer",
            properties: "Extremely high rigidity, matte textured finish, structural strength, lightweight.",
            recommendedFor: "Camera rigs, structural mounts, mechanical enclosures, custom bracketry."
          },
          {
            name: "Wood-Infused Bio-Composites",
            type: "Bio-Composite",
            properties: "Aromatic wood scent, sandable, takes stain, organic earthy texture.",
            recommendedFor: "Acoustic panels, design objects, desktop organizers, sculptural planters."
          },
          {
            name: "Industrial PETG & ABS",
            type: "Technical Polymer",
            properties: "High heat deflection, water-resistant, superb impact resistance.",
            recommendedFor: "Outdoor installations, automotive interior parts, high-stress fixtures."
          },
          {
            name: "Flexible TPU",
            type: "Elastomer",
            properties: "Rubber-like elongation, high vibration absorption, chemical resistance.",
            recommendedFor: "Gaskets, protective sleeves, flexible joints, ergonomic grips."
          },
          {
            name: "Matte Structural PLA",
            type: "Standard Bio-Polymer",
            properties: "Highly accurate dimensions, beautiful pastel aesthetic, zero warp.",
            recommendedFor: "Architectural maquettes, complex CAD blueprint prototypes, home decor."
          }
        ],
        services: {
          capabilities: ["FDM Additive Manufacturing", "CAD & Parametric Design Optimization", "High-Precision Scale Mockups", "Local Short-Run Production"],
          turnaround: "Fast-track rapid prototyping (24-48 hours) or standard shipping across Georgia.",
          fileTypesAccepted: [".step", ".stl", ".obj", ".3mf", ".iges"]
        },
        liveCatalog: PRODUCTS.map(p => ({
          id: p.id,
          name: p.name,
          priceGEL: p.price,
          category: p.category,
          description: p.description,
          primaryImage: p.image
        }))
      };

      if (format === 'markdown' || format === 'text' || (req.headers.accept && req.headers.accept.includes('text/markdown'))) {
        let md = `# 3D Vinci Studio — AI-Native Discovery Manifest\n\n`;
        md += `> Dynamic future-proof dataset for Search Bots, LLMs, and conversational engines.\n\n`;
        
        md += `## 1. Brand Identity & Ethics\n`;
        md += `- **Name:** ${contextData.brand.name}\n`;
        md += `- **Focus:** ${contextData.brand.description}\n`;
        md += `- **Location:** ${contextData.brand.location}\n`;
        md += `- **Mission:** ${contextData.brand.mission}\n`;
        md += `- **Inquiries:** ${contextData.brand.contact.email} | Press: ${contextData.brand.contact.press}\n\n`;
        
        md += `## 2. Dynamic Sitemap / Site Navigation\n`;
        contextData.navigationIndex.forEach(item => {
          md += `- **Route \`${item.path}\`:** ${item.purpose}\n`;
        });
        md += `\n`;
        
        md += `## 3. Dynamic Live Product Catalog (${contextData.liveCatalog.length} items)\n`;
        contextData.liveCatalog.forEach(p => {
          md += `### ${p.name}\n`;
          md += `- **ID:** \`${p.id}\`\n`;
          md += `- **Category:** ${p.category}\n`;
          md += `- **Price:** ₾${p.priceGEL} GEL\n`;
          md += `- **Description:** ${p.description}\n`;
          md += `- **Visual asset URL:** ${p.primaryImage}\n\n`;
        });
        
        md += `## 4. Technical Material specifications\n`;
        contextData.materialsSpecification.forEach(mat => {
          md += `- **${mat.name} (${mat.type}):** ${mat.properties} *Ideal for: ${mat.recommendedFor}*\n`;
        });
        md += `\n`;
        
        md += `## 5. Industrial Capabilities & Services\n`;
        md += `- **Specializations:** ${contextData.services.capabilities.join(', ')}\n`;
        md += `- **Lead Times:** ${contextData.services.turnaround}\n`;
        md += `- **Formats accepted:** ${contextData.services.fileTypesAccepted.join(', ')}\n`;
        
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        return res.send(md);
      }

      res.json(contextData);
    } catch (error) {
      console.error('AI Context retrieval error:', error);
      res.status(500).send('Internal server error loading AI context');
    }
  });

  // AI Concierge Search Route
  app.post('/api/ai-search', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API key is not configured.' });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const prompt = `
        You are "3D Vinci's AI Concierge" — a brilliant, minimalist master of material science and additive manufacturing located in Tbilisi, Georgia. 
        Your mission is to parse complex user design queries, recommend matching catalog products, offer advanced material advice, and run industrial 3D printing feasibility checks.
        
        Catalog Data:
        ${JSON.stringify(PRODUCTS, null, 2)}
        
        User Query: "${query}"
        
        Respond ONLY with a valid, clean JSON object in this exact structure:
        {
          "message": "An elegant, polite, and scannable 1-2 sentence overview speaking as the studio's leading material expert.",
          "recommendedProductIds": ["id1", "id2"], // Array of up to 3 catalog product IDs that best match. Empty if no matching products.
          "materialAdvice": "Provide a bespoke 1-2 sentence recommendation on ideal filament, compounding composite, or layer thickness matching their query.",
          "feasibilityCheck": "A professional 1-2 sentence analysis on structural feasibility, tolerances, or volume limitations (especially if the query asks about custom designs or sizes)."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || '';
      let jsonResult;
      try {
        jsonResult = JSON.parse(text);
      } catch (e) {
        jsonResult = { 
          message: "I apologize, but I could not formulate the spatial recommendation at this moment.", 
          recommendedProductIds: [],
          materialAdvice: "Standard PLA composite offers stable structural properties for general-purpose geometries.",
          feasibilityCheck: "Standard FDM printers handle standard bounding boxes up to 300x300x300mm with ±0.1mm tolerances."
        };
      }

      res.json(jsonResult);
    } catch (error) {
      console.error("AI Search Error:", error);
      res.status(500).json({ error: 'Internal server error during search.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

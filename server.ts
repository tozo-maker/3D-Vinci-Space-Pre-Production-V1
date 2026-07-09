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

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, ZoomIn, ZoomOut, Compass, Eye, Cpu, Sliders } from 'lucide-react';

interface CADBlueprintProps {
  productId: string;
  scale: 'miniature' | 'standard' | 'grand';
  material: 'matte' | 'terracotta' | 'hrp' | 'obsidian';
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

type Edge = [number, number];

export default function CADBlueprint({ productId, scale, material }: CADBlueprintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive control states
  const [renderMode, setRenderMode] = useState<'wireframe' | 'vertices' | 'hybrid'>('wireframe');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showAxes, setShowAxes] = useState<boolean>(true);
  
  // Rotation & zoom parameters held in refs for high-frequency rendering loop
  const rotationX = useRef<number>(-0.5);
  const rotationY = useRef<number>(0.6);
  const zoom = useRef<number>(1.2);
  const panX = useRef<number>(0);
  const panY = useRef<number>(0);
  
  // Mouse tracking
  const isDragging = useRef<boolean>(false);
  const prevMouseX = useRef<number>(0);
  const prevMouseY = useRef<number>(0);

  // Specifications based on scale and product
  const specs = {
    miniature: { x: '92', y: '92', z: '105', layers: 720, scaleFactor: '0.50x' },
    standard: { x: '184', y: '184', z: '210', layers: 1440, scaleFactor: '1.00x' },
    grand: { x: '276', y: '276', z: '315', layers: 2160, scaleFactor: '1.50x' }
  }[scale];

  const materialLabel = {
    matte: 'MATTE POLYMER COMPOSITE',
    terracotta: 'TBILISI CLAY COMPOSITE',
    hrp: 'TRANS_HEAT RESISTANT POLYMER',
    obsidian: 'HEAVYWEIGHT RESIN V3'
  }[material];

  // Theme color for the CAD mesh
  const strokeColor = (() => {
    if (productId.includes('lamp') || productId.includes('origami')) return '#f59e0b'; // Amber/Orange
    if (productId.includes('vase') || productId.includes('planter')) return '#10b981'; // Emerald
    if (productId.includes('bowl')) return '#f472b6'; // Pink
    if (productId.includes('cube') || productId.includes('game')) return '#a78bfa'; // Violet
    return '#34d399'; // Default emerald-400
  })();

  // ----------------------------------------------------------------------------
  // 3D Geometry Generators
  // ----------------------------------------------------------------------------
  const generateGeometry = (): { vertices: Point3D[]; edges: Edge[] } => {
    const vertices: Point3D[] = [];
    const edges: Edge[] = [];

    switch (productId) {
      case 'wedding-dress-vase': {
        // Parametric pleated vase
        const layersCount = 20;
        const ptsPerLayer = 24;
        for (let i = 0; i < layersCount; i++) {
          const z = -60 + i * 6;
          const t = i / (layersCount - 1);
          // Vase curve profile
          const baseRadius = 25 + Math.sin(t * Math.PI) * 15 + (1 - t) * 8;
          for (let j = 0; j < ptsPerLayer; j++) {
            const angle = (j / ptsPerLayer) * 2 * Math.PI;
            // Add elegant dress pleats (ridges)
            const pleat = Math.cos(angle * 8) * (2.5 + t * 2.5);
            const r = baseRadius + pleat;
            vertices.push({
              x: r * Math.cos(angle),
              y: r * Math.sin(angle),
              z: z
            });
            
            // Connect horizontally (circle)
            const curr = i * ptsPerLayer + j;
            const next = i * ptsPerLayer + ((j + 1) % ptsPerLayer);
            edges.push([curr, next]);

            // Connect vertically (ribs)
            if (i > 0) {
              const prev = (i - 1) * ptsPerLayer + j;
              edges.push([prev, curr]);
            }
          }
        }
        break;
      }

      case 'twist-vase-sand': {
        // Parametric twist vase
        const layersCount = 18;
        const ptsPerLayer = 20;
        for (let i = 0; i < layersCount; i++) {
          const z = -55 + i * 6.5;
          const t = i / (layersCount - 1);
          const baseRadius = 22 + (1 - t) * 12 + Math.sin(t * Math.PI * 1.5) * 6;
          const twistAngle = t * 2.4; // 2.4 rad helical twist
          for (let j = 0; j < ptsPerLayer; j++) {
            const angle = (j / ptsPerLayer) * 2 * Math.PI + twistAngle;
            vertices.push({
              x: baseRadius * Math.cos(angle),
              y: baseRadius * Math.sin(angle),
              z: z
            });

            // Connect horizontal loop
            const curr = i * ptsPerLayer + j;
            const next = i * ptsPerLayer + ((j + 1) % ptsPerLayer);
            edges.push([curr, next]);

            // Connect vertical ribs
            if (i > 0) {
              const prev = (i - 1) * ptsPerLayer + j;
              edges.push([prev, curr]);
            }
          }
        }
        break;
      }

      case 'sensory-cube':
      case 'tetris-balance-game': {
        // Multi-layered concentric cubic lattice
        const drawCube = (size: number, center: Point3D) => {
          const startIdx = vertices.length;
          const half = size / 2;
          
          const localVerts = [
            { x: -half, y: -half, z: -half },
            { x: half, y: -half, z: -half },
            { x: half, y: half, z: -half },
            { x: -half, y: half, z: -half },
            { x: -half, y: -half, z: half },
            { x: half, y: -half, z: half },
            { x: half, y: half, z: half },
            { x: -half, y: half, z: half }
          ];

          localVerts.forEach(v => vertices.push({
            x: v.x + center.x,
            y: v.y + center.y,
            z: v.z + center.z
          }));

          const cubeEdges: Edge[] = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Bottom loop
            [4, 5], [5, 6], [6, 7], [7, 4], // Top loop
            [0, 4], [1, 5], [2, 6], [3, 7]  // Pillars
          ];

          cubeEdges.forEach(([e1, e2]) => edges.push([startIdx + e1, startIdx + e2]));
        };

        if (productId === 'sensory-cube') {
          // Inner, mid, and outer cubes representing molecular grid structure
          drawCube(24, { x: 0, y: 0, z: 0 });
          drawCube(48, { x: 0, y: 0, z: 0 });
          drawCube(72, { x: 0, y: 0, z: 0 });

          // Inter-cube corner struts (lattice)
          for (let i = 0; i < 8; i++) {
            edges.push([i, i + 8]);
            edges.push([i + 8, i + 16]);
          }
        } else {
          // Tetris Blocks - Balanced stacks of multi-block wireframes
          drawCube(25, { x: -15, y: -10, z: -35 }); // Base block L-shape
          drawCube(25, { x: 10, y: -10, z: -35 });
          drawCube(25, { x: 10, y: -10, z: -10 }); // Stacking T-shape
          drawCube(25, { x: -15, y: 15, z: 15 });  // Angled balanced blocks
          drawCube(25, { x: 10, y: 15, z: 40 });
        }
        break;
      }

      case 'cozy-origami-lamp': {
        // Faceted origami lamp
        const layersCount = 8;
        const ptsPerLayer = 10;
        for (let i = 0; i < layersCount; i++) {
          const z = -50 + i * 15;
          const t = i / (layersCount - 1);
          const r = 32 * Math.sin(t * Math.PI) + 6;
          const stagger = (i % 2) * (Math.PI / ptsPerLayer);
          
          for (let j = 0; j < ptsPerLayer; j++) {
            const angle = (j / ptsPerLayer) * 2 * Math.PI + stagger;
            vertices.push({
              x: r * Math.cos(angle),
              y: r * Math.sin(angle),
              z: z
            });

            // Connect layer loop
            const curr = i * ptsPerLayer + j;
            const next = i * ptsPerLayer + ((j + 1) % ptsPerLayer);
            edges.push([curr, next]);

            // Triangulated origami folding joints
            if (i > 0) {
              const prevLayerStart = (i - 1) * ptsPerLayer;
              const prev = prevLayerStart + j;
              const prevNext = prevLayerStart + ((j + 1) % ptsPerLayer);
              edges.push([prev, curr]);
              edges.push([prevNext, curr]); // Fold diagonal
            }
          }
        }
        break;
      }

      case 'plantosaurus-planter':
      case 'self-watering-philosophical': {
        // Low-poly planters
        if (productId === 'plantosaurus-planter') {
          // dinosaur planter silhouette
          // Body cylinder
          for (let i = 0; i < 6; i++) {
            const x = -30 + i * 14;
            const r = 22 - Math.abs(i - 2.5) * 3;
            for (let j = 0; j < 8; j++) {
              const angle = (j / 8) * 2 * Math.PI;
              vertices.push({ x: x, y: r * Math.cos(angle), z: r * Math.sin(angle) - 5 });
              
              // Connect cross-sections
              const curr = i * 8 + j;
              const next = i * 8 + ((j + 1) % 8);
              edges.push([curr, next]);
              if (i > 0) edges.push([curr - 8, curr]);
            }
          }
          // Neck, Head and Tail nodes
          const tailStart = vertices.length;
          vertices.push({ x: -45, y: 0, z: -10 }); // Tail tip
          for (let j = 0; j < 8; j++) edges.push([tailStart, j]); // Connect tail tip to back ring

          const neckStart = vertices.length;
          vertices.push({ x: 45, y: 0, z: 20 });  // Neck joint
          vertices.push({ x: 55, y: 0, z: 32 });  // Head snout
          edges.push([neckStart, neckStart + 1]);
          // Connect neck to front cylinder ring
          for (let j = 0; j < 8; j++) edges.push([40 + j, neckStart]);

          // Planter pot rim on back
          const potStart = vertices.length;
          for (let j = 0; j < 8; j++) {
            const angle = (j / 8) * 2 * Math.PI;
            vertices.push({ x: -10 + Math.cos(angle) * 12, y: Math.sin(angle) * 12, z: 15 });
            edges.push([potStart + j, potStart + ((j + 1) % 8)]);
            // Connect pot rim down to body vertices
            edges.push([potStart + j, 16 + j]);
          }
        } else {
          // brutalist multi-layered square columns
          const drawBrutalistStep = (width: number, height: number, zCenter: number) => {
            const start = vertices.length;
            const h = width / 2;
            const hz = height / 2;
            
            // Vertices
            vertices.push({ x: -h, y: -h, z: zCenter - hz });
            vertices.push({ x: h, y: -h, z: zCenter - hz });
            vertices.push({ x: h, y: h, z: zCenter - hz });
            vertices.push({ x: -h, y: h, z: zCenter - hz });
            
            vertices.push({ x: -h, y: -h, z: zCenter + hz });
            vertices.push({ x: h, y: -h, z: zCenter + hz });
            vertices.push({ x: h, y: h, z: zCenter + hz });
            vertices.push({ x: -h, y: h, z: zCenter + hz });

            // Edges
            const stepEdges = [
              [0, 1], [1, 2], [2, 3], [3, 0],
              [4, 5], [5, 6], [6, 7], [7, 4],
              [0, 4], [1, 5], [2, 6], [3, 7]
            ];
            stepEdges.forEach(([e1, e2]) => edges.push([start + e1, start + e2]));
          };

          drawBrutalistStep(56, 12, -45);
          drawBrutalistStep(46, 18, -30);
          drawBrutalistStep(36, 24, -9);
          drawBrutalistStep(26, 32, 19);

          // Connect nested layers for geometric aesthetic
          for (let i = 0; i < 8; i++) {
            edges.push([i, i + 8]);
            edges.push([i + 8, i + 16]);
            edges.push([i + 16, i + 24]);
          }
        }
        break;
      }

      case 'bunny-bowl': {
        // Semi-spherical bowl with cute geometric ears
        const layers = 8;
        const pts = 16;
        for (let i = 0; i <= layers; i++) {
          const t = i / layers;
          // Sphere formula
          const r = Math.sin(t * Math.PI * 0.5) * 36;
          const z = -25 + t * 35;
          for (let j = 0; j < pts; j++) {
            const angle = (j / pts) * 2 * Math.PI;
            vertices.push({
              x: r * Math.cos(angle),
              y: r * Math.sin(angle),
              z: z
            });

            const curr = i * pts + j;
            const next = i * pts + ((j + 1) % pts);
            edges.push([curr, next]);

            if (i > 0) {
              edges.push([curr - pts, curr]);
            }
          }
        }

        // Add 3D ears extending from top layer (around Z = 10)
        const ear1Start = vertices.length;
        // Ear 1
        const ear1Points = [
          { x: -16, y: -10, z: 10 },
          { x: -22, y: -14, z: 25 },
          { x: -24, y: -14, z: 42 },
          { x: -18, y: -10, z: 50 },
          { x: -10, y: -6, z: 40 },
          { x: -10, y: -6, z: 10 }
        ];
        ear1Points.forEach(p => vertices.push(p));
        for (let j = 0; j < ear1Points.length - 1; j++) {
          edges.push([ear1Start + j, ear1Start + j + 1]);
        }

        const ear2Start = vertices.length;
        // Ear 2
        const ear2Points = [
          { x: 10, y: -6, z: 10 },
          { x: 10, y: -6, z: 40 },
          { x: 18, y: -10, z: 50 },
          { x: 24, y: -14, z: 42 },
          { x: 22, y: -14, z: 25 },
          { x: 16, y: -10, z: 10 }
        ];
        ear2Points.forEach(p => vertices.push(p));
        for (let j = 0; j < ear2Points.length - 1; j++) {
          edges.push([ear2Start + j, ear2Start + j + 1]);
        }
        break;
      }

      case 'moodies-lamp-happy': {
        // Jointed designer lamp
        const addSegment = (p1: Point3D, p2: Point3D, thickness: number) => {
          const idx = vertices.length;
          // Simple 4-strut wireframe pillar between points
          vertices.push({ x: p1.x - thickness, y: p1.y - thickness, z: p1.z });
          vertices.push({ x: p1.x + thickness, y: p1.y + thickness, z: p1.z });
          vertices.push({ x: p2.x - thickness, y: p2.y - thickness, z: p2.z });
          vertices.push({ x: p2.x + thickness, y: p2.y + thickness, z: p2.z });
          edges.push([idx, idx + 1], [idx + 2, idx + 3], [idx, idx + 2], [idx + 1, idx + 3]);
        };

        const baseCenter = { x: 0, y: 0, z: -45 };
        const elbow = { x: -15, y: -5, z: -5 };
        const wrist = { x: 12, y: 5, z: 25 };
        
        // Base plate (circle)
        const baseStart = vertices.length;
        for (let j = 0; j < 12; j++) {
          const angle = (j / 12) * 2 * Math.PI;
          vertices.push({ x: Math.cos(angle) * 24, y: Math.sin(angle) * 24, z: -45 });
          edges.push([baseStart + j, baseStart + ((j + 1) % 12)]);
        }

        // Linked structural struts
        addSegment(baseCenter, elbow, 3);
        addSegment(elbow, wrist, 2.2);

        // Lamp Shade cone
        const shadeStart = vertices.length;
        vertices.push(wrist); // Cone apex
        for (let j = 0; j < 12; j++) {
          const angle = (j / 12) * 2 * Math.PI;
          // Cone base pointing downwards/forwards
          vertices.push({
            x: wrist.x + Math.cos(angle) * 16 - 8,
            y: wrist.y + Math.sin(angle) * 16,
            z: wrist.z - 16
          });
          edges.push([shadeStart + 1 + j, shadeStart + 1 + ((j + 1) % 12)]);
          edges.push([shadeStart, shadeStart + 1 + j]); // Apex to rim
        }
        break;
      }

      case 'arch-lamp-cream': {
        // Extruded arches lamp
        const steps = 12;
        const extrusions = [-14, -7, 0, 7, 14];
        
        // Draw double nested arches extruded in 3D
        extrusions.forEach((y, eIdx) => {
          const startIdx = vertices.length;
          
          // Outer Arch
          for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI; // Semi-circle
            const r = 38;
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle) - 15;
            vertices.push({ x, y, z });
            
            if (i > 0) edges.push([startIdx + i - 1, startIdx + i]);
          }

          // Inner Arch
          const innerStart = startIdx + steps + 1;
          for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI;
            const r = 24;
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle) - 15;
            vertices.push({ x, y, z });

            if (i > 0) edges.push([innerStart + i - 1, innerStart + i]);
          }

          // Cross-connect inner/outer at ends
          edges.push([startIdx, innerStart]);
          edges.push([startIdx + steps, innerStart + steps]);

          // Extrusion connect edges (bridge to previous layer)
          if (eIdx > 0) {
            const prevStart = startIdx - (steps + 1) * 2;
            for (let j = 0; j < (steps + 1) * 2; j++) {
              edges.push([prevStart + j, startIdx + j]);
            }
          }
        });

        // Add 3D hanging bulb sphere inside
        const bulbStart = vertices.length;
        vertices.push({ x: 0, y: 0, z: -5 });
        vertices.push({ x: -4, y: 0, z: -10 });
        vertices.push({ x: 4, y: 0, z: -10 });
        vertices.push({ x: 0, y: -4, z: -10 });
        vertices.push({ x: 0, y: 4, z: -10 });
        vertices.push({ x: 0, y: 0, z: -15 });
        edges.push([bulbStart, bulbStart + 1], [bulbStart, bulbStart + 2], [bulbStart, bulbStart + 3], [bulbStart, bulbStart + 4]);
        edges.push([bulbStart + 1, bulbStart + 5], [bulbStart + 2, bulbStart + 5], [bulbStart, bulbStart + 5]);
        break;
      }

      case 'georgian-chokha-cutter': {
        // Extruded traditional Georgian Chokha coat cookie cutter shape
        const chokha2D = [
          { x: 0, y: 35 },     // collar center top
          { x: 14, y: 32 },    // shoulder right
          { x: 18, y: 15 },    // armpit right
          { x: 26, y: -10 },   // flare skirt right
          { x: 16, y: -38 },   // bottom hem right
          { x: 0, y: -35 },    // bottom center
          { x: -16, y: -38 },  // bottom hem left
          { x: -26, y: -10 },  // flare skirt left
          { x: -18, y: 15 },   // armpit left
          { x: -14, y: 32 }    // shoulder left
        ];

        // Extrude along Z-axis (height of cookie cutter, e.g. from -15 to 15)
        const zDepths = [-15, 15];
        zDepths.forEach((z, zIdx) => {
          const start = vertices.length;
          chokha2D.forEach(p => vertices.push({ x: p.x, y: p.y, z: z }));

          // Draw loop
          for (let i = 0; i < chokha2D.length; i++) {
            edges.push([start + i, start + ((i + 1) % chokha2D.length)]);
          }

          // Extrusion edges
          if (zIdx > 0) {
            for (let i = 0; i < chokha2D.length; i++) {
              edges.push([i, start + i]);
            }
          }
        });

        // Add internal support crossbars (traditional bullet bandolier slots "Gazyry" details)
        const detailStart = vertices.length;
        // Left Gazyry
        vertices.push({ x: -12, y: 12, z: 0 });
        vertices.push({ x: -4, y: 14, z: 0 });
        edges.push([detailStart, detailStart + 1]);
        // Right Gazyry
        vertices.push({ x: 4, y: 14, z: 0 });
        vertices.push({ x: 12, y: 12, z: 0 });
        edges.push([detailStart + 2, detailStart + 3]);
        break;
      }

      default: {
        // fallback: Mathematically magnificent 3D Torus Knot (combines tech & organic aesthetic)
        const knotsCount = 120;
        const p = 3; // Windings
        const q = 7;
        for (let i = 0; i < knotsCount; i++) {
          const phi = (i / knotsCount) * 2 * Math.PI;
          const r = (16 + 8 * Math.cos(q * phi)) * 2;
          const x = r * Math.cos(p * phi);
          const y = r * Math.sin(p * phi);
          const z = 16 * Math.sin(q * phi);
          vertices.push({ x, y, z });

          if (i > 0) edges.push([i - 1, i]);
        }
        edges.push([knotsCount - 1, 0]); // Close knot loop
        break;
      }
    }

    return { vertices, edges };
  };

  const { vertices, edges } = generateGeometry();

  // ----------------------------------------------------------------------------
  // High-performance Canvas Rendering Loop
  // ----------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let localRotationY = rotationY.current;
    let localRotationX = rotationX.current;

    const render = () => {
      // Auto rotate if playing and not actively dragging
      if (isPlaying && !isDragging.current) {
        localRotationY += 0.006;
        rotationY.current = localRotationY;
      } else {
        localRotationY = rotationY.current;
        localRotationX = rotationX.current;
      }

      // Handle high-density device pixels sizing
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // 3D Matrix Projections setup
      const cosX = Math.cos(localRotationX);
      const sinX = Math.sin(localRotationX);
      const cosY = Math.cos(localRotationY);
      const sinY = Math.sin(localRotationY);

      const cx = width / 2 + panX.current;
      const cy = height / 2 + panY.current;
      const scaleMul = 2.2 * zoom.current * (width / 220); // Responsive dynamic scaling

      // Project 3D Point to 2D
      const project = (p: Point3D) => {
        // Rotate about Y axis (horizontal drag)
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate about X axis (vertical drag)
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection formula
        const fov = 160;
        const projScale = fov / (fov + z2);
        
        return {
          x: cx + x1 * scaleMul * projScale,
          y: cy + y2 * scaleMul * projScale,
          z: z2 // Keep depth for wireframe sorting if needed
        };
      };

      // 1. DRAW SUBTLE FLOOR ARCHITECTURAL GRID
      if (showGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 0.5;
        const gridSize = 80;
        const gridSpacing = 20;

        for (let g = -gridSize; g <= gridSize; g += gridSpacing) {
          // Lines along X
          const p1 = project({ x: -gridSize, y: g, z: -48 });
          const p2 = project({ x: gridSize, y: g, z: -48 });
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Lines along Y
          const p3 = project({ x: g, y: -gridSize, z: -48 });
          const p4 = project({ x: g, y: gridSize, z: -48 });
          ctx.beginPath();
          ctx.moveTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.stroke();
        }
      }

      // 2. DRAW 3D AXES INDICATORS IN CORNER
      if (showAxes) {
        const axisLength = 22;
        const o3d: Point3D = { x: -65, y: -65, z: -45 };
        const origin = project(o3d);

        const axes = [
          { p: { x: -65 + axisLength, y: -65, z: -45 }, label: 'X', color: '#ef4444' },
          { p: { x: -65, y: -65 + axisLength, z: -45 }, label: 'Y', color: '#10b981' },
          { p: { x: -65, y: -65, z: -45 + axisLength }, label: 'Z', color: '#3b82f6' }
        ];

        axes.forEach(axis => {
          const end = project(axis.p);
          ctx.strokeStyle = axis.color;
          ctx.fillStyle = axis.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(origin.x, origin.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();

          ctx.font = '7px monospace';
          ctx.fillText(axis.label, end.x + 3, end.y + 2);
        });
      }

      // 3. PROJECT MODEL VERTICES
      const projected = vertices.map(project);

      // 4. DRAW CONNECTIVE EDGES
      if (renderMode === 'wireframe' || renderMode === 'hybrid') {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = renderMode === 'hybrid' ? 0.8 : 1.2;
        
        edges.forEach(([idx1, idx2]) => {
          const p1 = projected[idx1];
          const p2 = projected[idx2];
          if (!p1 || !p2) return;

          // Depth-based opacity fading to look extremely sophisticated and holographic
          const depthAvg = (p1.z + p2.z) / 2;
          const depthAlpha = Math.max(0.12, Math.min(1.0, 1.0 - (depthAvg + 40) / 140));

          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = depthAlpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;
      }

      // 5. DRAW VERTICES (GLOWING NODES)
      if (renderMode === 'vertices' || renderMode === 'hybrid') {
        projected.forEach((p) => {
          const depthAlpha = Math.max(0.2, Math.min(1.0, 1.0 - (p.z + 40) / 140));
          ctx.globalAlpha = depthAlpha;
          ctx.fillStyle = strokeColor;
          ctx.beginPath();
          // Draw small holographic squares for industrial vector look
          ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
        });
        ctx.globalAlpha = 1.0;
      }

      // 6. FLOATING HUD ANCHORS FOR MEASUREMENTS
      if (projected.length > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '8px monospace';
        
        // Find bottom/top corners to draw high-fidelity leader arrows
        const pBottom = projected[0];
        const pTop = projected[Math.min(projected.length - 1, 10)];
        if (pBottom && pTop) {
          ctx.strokeStyle = 'rgba(255,255,255,0.12)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pBottom.x, pBottom.y);
          ctx.lineTo(pBottom.x - 20, pBottom.y);
          ctx.lineTo(pTop.x - 20, pTop.y);
          ctx.lineTo(pTop.x, pTop.y);
          ctx.stroke();
          
          ctx.fillText(`H: ${specs.z}mm`, pBottom.x - 18, (pBottom.y + pTop.y) / 2);
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [productId, renderMode, isPlaying, showGrid, showAxes, scale, material]);

  // ----------------------------------------------------------------------------
  // Mouse & Touch Interactivity Handlers
  // ----------------------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMouseX.current;
    const deltaY = e.clientY - prevMouseY.current;
    
    // Horizontal mouse moves rotate about Y axis
    rotationY.current += deltaX * 0.007;
    // Vertical mouse moves rotate about X axis
    rotationX.current += deltaY * 0.007;

    // Clamp vertical rotation to avoid infinite screen tumbling
    rotationX.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, rotationX.current));

    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch triggers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    isDragging.current = true;
    prevMouseX.current = e.touches[0].clientX;
    prevMouseY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX.current;
    const deltaY = e.touches[0].clientY - prevMouseY.current;

    rotationY.current += deltaX * 0.008;
    rotationX.current += deltaY * 0.008;
    rotationX.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, rotationX.current));

    prevMouseX.current = e.touches[0].clientX;
    prevMouseY.current = e.touches[0].clientY;
  };

  return (
    <div className="absolute inset-0 bg-[#070709] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col justify-between p-6 md:p-8 font-mono text-white select-none shadow-2xl">
      
      {/* CAD Header Info */}
      <div className="flex justify-between items-start border-b border-white/10 pb-4 z-10 bg-[#070709]/80 backdrop-blur-md">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-emerald-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 
            3D VINCI PARAMETRIC SECTOR v3.1
          </div>
          <div className="text-[9px] text-white/50 mt-1 uppercase flex items-center gap-2">
            <span>RES: {specs.layers} LAYERS</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>MODEL: {renderMode.toUpperCase()}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-white/80">{specs.scaleFactor} DIMENSIONS</div>
          <div className="text-[9px] text-white/40 mt-1 truncate max-w-[150px]">{materialLabel}</div>
        </div>
      </div>

      {/* Main Interactive CAD Stage */}
      <div className="flex-1 flex items-center justify-center relative my-2 overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing max-h-[380px]"
        />

        {/* Floating Perspective Widget */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <div className="bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl p-2.5 flex items-center gap-1">
            <button 
              onClick={() => setRenderMode('wireframe')} 
              title="Wireframe mode"
              className={`p-1.5 rounded-lg text-[9px] font-bold ${renderMode === 'wireframe' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white'}`}
            >
              WIRE
            </button>
            <button 
              onClick={() => setRenderMode('vertices')} 
              title="Vertex Cloud mode"
              className={`p-1.5 rounded-lg text-[9px] font-bold ${renderMode === 'vertices' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white'}`}
            >
              VERT
            </button>
            <button 
              onClick={() => setRenderMode('hybrid')} 
              title="Hybrid Mesh mode"
              className={`p-1.5 rounded-lg text-[9px] font-bold ${renderMode === 'hybrid' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white'}`}
            >
              HYBR
            </button>
          </div>
        </div>

        {/* Floating Stage Controls (Zoom, Reset, Play) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl p-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white/75 hover:text-white"
            title={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={() => { rotationX.current = -0.5; rotationY.current = 0.6; zoom.current = 1.2; panX.current = 0; panY.current = 0; }} 
            className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white/75 hover:text-white"
            title="Reset perspective orientation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => { zoom.current = Math.min(2.5, zoom.current + 0.15); }} 
            className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white/75 hover:text-white"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => { zoom.current = Math.max(0.5, zoom.current - 0.15); }} 
            className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white/75 hover:text-white"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Instruction overlay */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 bg-black/40 px-3 py-1 rounded-full text-[8px] tracking-widest text-center uppercase whitespace-nowrap">
          Drag/Swipe CAD object to pan and inspect
        </div>
      </div>

      {/* CAD Grid/Axis toggles */}
      <div className="flex justify-between items-center text-[9px] border-t border-white/10 pt-3 text-white/50">
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)} className="accent-emerald-500 rounded border-white/20 bg-transparent w-2.5 h-2.5" />
            <span>GRID SYSTEM</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" checked={showAxes} onChange={() => setShowAxes(!showAxes)} className="accent-emerald-500 rounded border-white/20 bg-transparent w-2.5 h-2.5" />
            <span>X/Y/Z AXES</span>
          </label>
        </div>
        <div>
          <span>TOLERANCE: {scale === 'miniature' ? '±0.05mm' : scale === 'standard' ? '±0.10mm' : '±0.18mm'}</span>
        </div>
      </div>
    </div>
  );
}

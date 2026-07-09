import React, { useState, useEffect, useRef } from 'react';
import { Layers, Activity, Gauge, Terminal } from 'lucide-react';

interface FabricationTelemetryProps {
  productId: string;
  scale: 'miniature' | 'standard' | 'grand';
  material: 'matte' | 'terracotta' | 'hrp' | 'obsidian';
}

export default function FabricationTelemetry({ productId, scale, material }: FabricationTelemetryProps) {
  const [gcodeLines, setGcodeLines] = useState<string[]>([]);
  const [nozzleTemp, setNozzleTemp] = useState(215.0);
  const [bedTemp, setBedTemp] = useState(60.0);
  const [fanSpeed, setFanSpeed] = useState(100);
  const [activeLayer, setActiveLayer] = useState(1);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Configuration metrics based on scale
  const metrics = {
    miniature: { volume: 38.4, layers: 720, speed: 150 },
    standard: { volume: 307.2, layers: 1440, speed: 120 },
    grand: { volume: 1036.8, layers: 2160, speed: 90 }
  }[scale];

  // Density multiplier of material (g/cm³)
  const density = {
    matte: 1.24,
    terracotta: 1.58,
    hrp: 1.05,
    obsidian: 1.82
  }[material];

  // Live calculated values
  const totalVolume = metrics.volume;
  const calculatedWeight = totalVolume * density;
  
  // Filament length (density = 1.24g/cm³, 1.75mm diameter filament weight approx 2.98g per meter)
  const filamentLength = (calculatedWeight / 2.98).toFixed(1);

  // Fluctuating values for immersive look
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setNozzleTemp(prev => {
        const target = material === 'hrp' ? 245.0 : material === 'obsidian' ? 195.0 : 215.0;
        const diff = target - prev;
        return Number((prev + (Math.random() - 0.5) * 0.8 + diff * 0.1).toFixed(1));
      });

      setBedTemp(prev => {
        const target = material === 'obsidian' ? 0.0 : 60.0; // SLA usually has no heated bed
        const diff = target - prev;
        return Number((prev + (Math.random() - 0.5) * 0.3 + diff * 0.1).toFixed(1));
      });

      setFanSpeed(prev => {
        if (material === 'obsidian') return 0;
        const target = 100;
        const offset = Math.random() > 0.85 ? Math.floor((Math.random() - 0.5) * 6) : 0;
        return Math.max(0, Math.min(100, target + offset));
      });
    }, 1200);

    return () => clearInterval(tempInterval);
  }, [material]);

  // Generate scrolling G-code toolpath lines
  useEffect(() => {
    // Initialize with G-code compilation logs
    setGcodeLines([
      `; CODE BASE INITIATED — 3D VINCI ATMOSPHERE v3.1`,
      `; COMPILING VECTOR PATHS FOR PRODUCT ID: ${productId.toUpperCase()}`,
      `; COMPOUND CHEMICAL BASE: ${material.toUpperCase()}`,
      `; DIMENSIONAL BOUNDS: LATTICE SCALED ${scale.toUpperCase()}`,
      `M104 S215 ; Set Extruder Temp`,
      `M140 S60  ; Set Heated Bed Temp`,
      `G28       ; Home all axes`,
      `G1 Z15.0 F6000 ; Lift nozzle`,
      `G92 E0    ; Reset Extruder distance`,
      `G1 F200 E3 ; Prime extruder segment`
    ]);

    setActiveLayer(1);

    const gcodeTimer = setInterval(() => {
      setGcodeLines(prev => {
        const nextLines = [...prev];
        if (nextLines.length > 40) {
          nextLines.shift(); // Keep logs lean
        }

        // Random toolpath parameters simulating real 3D printing
        const randomX = (110 + Math.random() * 80).toFixed(4);
        const randomY = (110 + Math.random() * 80).toFixed(4);
        const randomE = (Math.random() * 0.085).toFixed(5);
        const feedRate = Math.floor(1000 + Math.random() * 400);

        // Pick G-code instruction
        const r = Math.random();
        let newLine = '';
        if (r < 0.6) {
          newLine = `G1 X${randomX} Y${randomY} E${randomE} F${feedRate}`;
        } else if (r < 0.85) {
          newLine = `G1 F${feedRate} X${randomX} Y${randomY}`;
        } else {
          setActiveLayer(curr => {
            const nextL = curr + 1;
            return nextL > metrics.layers ? 1 : nextL;
          });
          newLine = `; --- SLICING SEGMENT: LAYER ${activeLayer} / ${metrics.layers} ---`;
        }

        return [...nextLines, newLine];
      });
    }, 320);

    return () => clearInterval(gcodeTimer);
  }, [productId, scale, material]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [gcodeLines]);

  return (
    <div className="bg-[#0b0c10] border border-emerald-500/15 rounded-3xl p-6 font-mono text-xs text-white shadow-inner flex flex-col gap-6 relative overflow-hidden">
      {/* HUD background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '15px 15px' 
           }} 
      />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-emerald-500/10 pb-3 z-10">
        <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          Fabrication Estimation Telemetry
        </span>
        <span className="text-[9px] text-emerald-500/50 uppercase tracking-widest font-semibold bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
          G-Code Compiling
        </span>
      </div>

      {/* Parameter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
          <div className="text-[8px] text-white/35 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-white/40" /> Print Volume
          </div>
          <div className="text-sm font-semibold text-white/90">
            {totalVolume.toFixed(1)} <span className="text-[10px] text-white/50 font-normal">cm³</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
          <div className="text-[8px] text-white/35 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Activity className="w-3 h-3 text-white/40" /> Filament Length
          </div>
          <div className="text-sm font-semibold text-white/90">
            {filamentLength} <span className="text-[10px] text-white/50 font-normal">m</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
          <div className="text-[8px] text-white/35 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-white/40" /> Est. Layer Count
          </div>
          <div className="text-sm font-semibold text-white/90">
            {metrics.layers} <span className="text-[10px] text-white/50 font-normal">layers</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
          <div className="text-[8px] text-white/35 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-white/40" /> Nozzle Speed
          </div>
          <div className="text-sm font-semibold text-white/90">
            {metrics.speed} <span className="text-[10px] text-white/50 font-normal">mm/s</span>
          </div>
        </div>
      </div>

      {/* Printer State Telemetry */}
      <div className="grid grid-cols-3 gap-3 bg-white/[0.01] border border-white/5 rounded-xl p-3 text-[9px] z-10 text-white/60">
        <div>
          <span>EXTRUDER: </span>
          <span className={`font-semibold ${nozzleTemp > 0 ? 'text-orange-400' : 'text-white/40'}`}>{nozzleTemp}°C</span>
        </div>
        <div>
          <span>BUILD BED: </span>
          <span className={`font-semibold ${bedTemp > 0 ? 'text-sky-400' : 'text-white/40'}`}>{bedTemp}°C</span>
        </div>
        <div>
          <span>COOLING FAN: </span>
          <span className="font-semibold text-emerald-400">{fanSpeed}%</span>
        </div>
      </div>

      {/* Scrolling G-code Terminal Console */}
      <div className="flex flex-col gap-2 z-10">
        <div className="text-[9px] text-white/45 font-bold uppercase tracking-wider flex items-center gap-1">
          <Terminal className="w-3 h-3 text-white/40" /> Live CNC toolpath instruction block
        </div>
        <div 
          ref={terminalRef}
          className="h-32 bg-black/60 border border-white/5 rounded-xl p-4 overflow-y-auto font-mono text-[9px] text-emerald-400/80 scrollbar-none flex flex-col gap-1 shadow-inner leading-normal"
        >
          {gcodeLines.map((line, i) => (
            <div 
              key={i} 
              className={line.startsWith(';') ? 'text-white/35 italic' : line.startsWith(';') ? 'text-white/20' : 'text-emerald-400/90'}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

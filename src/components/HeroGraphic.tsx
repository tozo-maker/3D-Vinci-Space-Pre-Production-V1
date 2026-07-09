import React from 'react';
import { motion } from 'motion/react';

type GraphicType = 'home' | 'about' | 'tools' | 'services' | 'journal' | 'contact' | 'georgia';

export const HeroGraphic = ({ type = 'home', className = '' }: { type?: GraphicType, className?: string }) => {
  return (
    <div className={`absolute top-0 right-0 w-full h-[80vh] md:w-[60vw] md:h-screen pointer-events-none overflow-hidden z-0 flex items-center justify-end ${className}`}>
      {type === 'home' && (
        <motion.svg 
          viewBox="0 0 800 800" 
          className="w-full h-full max-w-[800px] opacity-10"
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
          animate={{ opacity: 0.1, rotate: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.circle 
            cx="400" cy="400" r="300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="400" cy="400" r="200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: '400px', originY: '400px' }}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line 
              key={i}
              x1="400" y1="100" x2="400" y2="700" 
              stroke="currentColor" 
              strokeWidth="0.5"
              transform={`rotate(${i * 15} 400 400)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </motion.svg>
      )}

      {type === 'georgia' && (
        <motion.svg 
          viewBox="0 0 800 800" 
          className="w-full h-full max-w-[800px] opacity-[0.08]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
        >
          <g transform="translate(400 400)">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.rect 
                key={i}
                x="-150" y="-150" width="300" height="300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: i * 5, scale: 1 + i * 0.05 }}
                transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
              />
            ))}
          </g>
        </motion.svg>
      )}

      {type === 'about' && (
        <motion.svg 
          viewBox="0 0 800 800" 
          className="w-full h-full max-w-[800px] opacity-[0.08]"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <motion.rect 
            width="800" height="800" fill="url(#grid)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.circle 
            cx="600" cy="200" r="150" 
            fill="currentColor" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          />
        </motion.svg>
      )}

      {type === 'tools' && (
        <motion.svg 
          viewBox="0 0 800 800" 
          className="w-full h-full max-w-[800px] opacity-[0.08]"
        >
          <g stroke="currentColor" strokeWidth="2" fill="none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.path 
                key={i}
                d={`M 100 ${100 + i * 40} Q 400 ${300 + Math.sin(i) * 200} 700 ${100 + i * 40}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
              />
            ))}
          </g>
        </motion.svg>
      )}

      {type === 'services' && (
        <motion.svg viewBox="0 0 800 800" className="w-full h-full max-w-[800px] opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.polygon 
              key={i}
              points="400,100 700,300 700,600 400,800 100,600 100,300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1 - i * 0.1, rotate: 90 }}
              transition={{ duration: 3, delay: i * 0.2, ease: "easeOut" }}
              style={{ originX: '400px', originY: '400px' }}
            />
          ))}
        </motion.svg>
      )}

      {type === 'journal' && (
        <motion.svg viewBox="0 0 800 800" className="w-full h-full max-w-[800px] opacity-10">
          <g>
            {Array.from({ length: 200 }).map((_, i) => (
              <motion.circle 
                key={i}
                cx={Math.random() * 800}
                cy={Math.random() * 800}
                r={Math.random() * 3 + 1}
                fill="currentColor"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: Math.random() * 0.8 + 0.2, y: 0 }}
                transition={{ duration: Math.random() * 2 + 1, delay: Math.random() * 2 }}
              />
            ))}
          </g>
        </motion.svg>
      )}

      {type === 'contact' && (
        <motion.svg viewBox="0 0 800 800" className="w-full h-full max-w-[800px] opacity-10">
          <motion.path 
            d="M 200 400 C 200 200, 600 200, 600 400 C 600 600, 200 600, 200 400 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="400" cy="400" r="10" fill="currentColor"
            animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.svg>
      )}
    </div>
  );
};

"use client";

import React from 'react';
import { useRiverLetters } from '@/context/RiverLettersContext';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';

const River = () => {
  const { riverLetters, removeLetterFromRiver } = useRiverLetters();
  const { animationSpeed } = useSettings();

  // Make river flow duration longer than fall speed for a smoother transition
  const riverFlowDuration = animationSpeed * 2;

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 h-24 bg-blue-300 dark:bg-blue-700 rounded-b-lg overflow-hidden">
      {/* Optional: Water texture/animation for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-blue-500/50 dark:from-blue-800/50 dark:to-blue-900/50 animate-water-flow"></div>

      {riverLetters.map((letter) => (
        <span
          key={letter.id}
          className={cn(
            "absolute text-lg font-bold text-white dark:text-gray-200 whitespace-pre",
            "animate-river-flow"
          )}
          style={{
            left: `${letter.initialX}px`, // Start at the X position where it landed
            bottom: '10px', // Position slightly above the bottom of the river
            pointerEvents: 'none', // Ensure it doesn't interfere with other elements
            animationDuration: `${riverFlowDuration}s`,
            animationDelay: '0s', // Start immediately
            '--flow-start-x': `${letter.initialX}px`, // Custom property for animation
            '--flow-end-x': `-50px`, // Flow off-screen to the left
          } as React.CSSProperties}
          onAnimationEnd={() => removeLetterFromRiver(letter.id)}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

export default River;
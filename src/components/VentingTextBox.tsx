"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/SettingsContext';

interface FallingLetter {
  id: string;
  char: string;
  x: number; // X position relative to the textbox's content area
  y: number; // Y position relative to the textbox's content area
}

// Helper function to get caret coordinates within a textarea
const getCaretCoordinates = (element: HTMLTextAreaElement, position: number) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const style = getComputedStyle(element);
  const props = [
    'direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontFamily',
    'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing',
    'lineHeight'
  ];

  for (const prop of props) {
    (div.style as any)[prop] = (style as any)[prop];
  }

  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';
  div.style.wordWrap = 'break-word';

  const textBeforeCaret = element.value.substring(0, position);
  div.textContent = textBeforeCaret;

  // Create a span to measure the end of the textBeforeCaret
  const markerSpan = document.createElement('span');
  markerSpan.textContent = '|'; // A small marker to get the position right after the text
  div.appendChild(markerSpan);

  const { offsetLeft: x, offsetTop: y } = markerSpan;

  document.body.removeChild(div);

  // Adjust for textarea padding to get coordinates relative to the parent div
  const paddingTop = parseFloat(style.paddingTop);
  const paddingLeft = parseFloat(style.paddingLeft);

  return { x: x + paddingLeft, y: y + paddingTop };
};


const VentingTextBox = () => {
  const [text, setText] = useState('');
  const [fallingLetters, setFallingLetters] = useState<FallingLetter[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { animationSpeed, fallDistance, soundVolume } = useSettings();

  // Ref for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    // Create a single Audio object. We'll clone it for each play to allow overlapping sounds.
    audioRef.current = new Audio('/sounds/water-drop.mp3');
    audioRef.current.volume = soundVolume; // Set initial volume
  }, []);

  // Update volume if soundVolume changes in settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume;
    }
  }, [soundVolume]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const oldText = text;
    setText(newText);

    if (newText.length > oldText.length) {
      const addedChars = newText.slice(oldText.length);

      if (textareaRef.current) {
        const textareaElement = textareaRef.current;
        const cursorPosition = textareaElement.selectionStart;

        addedChars.split('').forEach((char, index) => {
          const { x, y } = getCaretCoordinates(textareaElement, cursorPosition - addedChars.length + index);

          const newFallingLetter: FallingLetter = {
            id: Math.random().toString(36).substring(2, 9) + Date.now() + index,
            char: char,
            x: x,
            y: y,
          };

          setFallingLetters((prev) => [...prev, newFallingLetter]);

          // After the fall animation, remove the letter
          setTimeout(() => {
            setFallingLetters((prev) => prev.filter((letter) => letter.id !== newFallingLetter.id));
          }, animationSpeed * 1000);
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Play sound on any key press, but avoid playing on modifier keys alone
    // Also, prevent playing on 'Enter' key if it causes an unwanted double sound with text input
    if (audioRef.current && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.key !== 'Enter') {
      // Clone the audio element to allow multiple rapid plays without cutting off previous sounds
      const clonedAudio = audioRef.current.cloneNode() as HTMLAudioElement;
      clonedAudio.volume = soundVolume; // Set volume for the cloned audio
      clonedAudio.play().catch(error => {
        // Catch and log errors, e.g., if autoplay is blocked by the browser
        console.error("Error playing sound:", error);
      });
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 overflow-hidden">
      <textarea
        ref={textareaRef}
        className={cn(
          "w-full h-64 p-4 text-lg border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500",
          "bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        )}
        placeholder="Vent your emotions here..."
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add the key down handler
      />
      {fallingLetters.map((letter) => (
        <span
          key={letter.id}
          className="absolute text-lg animate-fall-fade"
          style={{
            left: `${letter.x}px`,
            top: `${letter.y}px`,
            pointerEvents: 'none',
            whiteSpace: 'pre',
            animationDuration: `${animationSpeed}s`,
            '--fall-distance': `${fallDistance}px`,
          } as React.CSSProperties}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

export default VentingTextBox;
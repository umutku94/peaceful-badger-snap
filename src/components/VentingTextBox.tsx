"use client";

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FallingLetter {
  id: string;
  char: string;
  x: number; // X position relative to the textbox
}

const VentingTextBox = () => {
  const [text, setText] = useState('');
  const [fallingLetters, setFallingLetters] = useState<FallingLetter[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const oldText = text;
    setText(newText);

    // Detect newly typed characters
    if (newText.length > oldText.length) {
      const addedChars = newText.slice(oldText.length);

      if (textareaRef.current) {
        const textareaRect = textareaRef.current.getBoundingClientRect();

        // For each added character, create a falling letter
        addedChars.split('').forEach((char, index) => {
          // Random X position within the textarea's width
          const x = Math.random() * textareaRect.width; 

          const newFallingLetter: FallingLetter = {
            id: Math.random().toString(36).substring(2, 9) + Date.now() + index, // Unique ID
            char: char,
            x: x,
          };

          setFallingLetters((prev) => [...prev, newFallingLetter]);

          // Remove the falling letter after its animation duration
          setTimeout(() => {
            setFallingLetters((prev) => prev.filter((letter) => letter.id !== newFallingLetter.id));
          }, 2000); // Matches the CSS animation duration
        });
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">
      <textarea
        ref={textareaRef}
        className={cn(
          "w-full h-64 p-4 text-lg border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500",
          "bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        )}
        placeholder="Vent your emotions here..."
        value={text}
        onChange={handleInputChange}
      />
      {fallingLetters.map((letter) => (
        <span
          key={letter.id}
          className="absolute text-2xl font-bold opacity-0 animate-fall-fade"
          style={{
            left: `${letter.x}px`,
            top: `0px`, // Start at the top of the textarea
            pointerEvents: 'none', // Ensure it doesn't interfere with textarea interaction
            whiteSpace: 'pre', // Preserve spaces for characters like ' '
          }}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

export default VentingTextBox;
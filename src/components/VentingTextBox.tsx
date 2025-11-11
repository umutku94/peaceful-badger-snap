"use client";

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const oldText = text;
    setText(newText);

    // Detect newly typed characters
    if (newText.length > oldText.length) {
      const addedChars = newText.slice(oldText.length);

      if (textareaRef.current) {
        const textareaElement = textareaRef.current;
        const cursorPosition = textareaElement.selectionStart; // Position *after* the new char

        // For each added character, create a falling letter
        addedChars.split('').forEach((char, index) => {
          // Calculate coordinates for the character *before* the current cursor position
          const { x, y } = getCaretCoordinates(textareaElement, cursorPosition - addedChars.length + index);

          const newFallingLetter: FallingLetter = {
            id: Math.random().toString(36).substring(2, 9) + Date.now() + index, // Unique ID
            char: char,
            x: x,
            y: y,
          };

          setFallingLetters((prev) => [...prev, newFallingLetter]);

          // Remove the falling letter after its animation duration
          setTimeout(() => {
            setFallingLetters((prev) => prev.filter((letter) => letter.id !== newFallingLetter.id));
          }, 10000); // Matches the CSS animation duration (10 seconds)
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
            top: `${letter.y}px`, // Start at the calculated Y position
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
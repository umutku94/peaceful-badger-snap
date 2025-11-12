"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RiverLetter {
  id: string;
  char: string;
  initialX: number; // X position where the letter landed, relative to the river's container
  timestamp: number; // To help with unique keys and potential ordering
}

interface RiverLettersContextType {
  riverLetters: RiverLetter[];
  addLetterToRiver: (letter: Omit<RiverLetter, 'id' | 'timestamp'> & { id?: string }) => void;
  removeLetterFromRiver: (id: string) => void;
}

const RiverLettersContext = createContext<RiverLettersContextType | undefined>(undefined);

export const RiverLettersProvider = ({ children }: { children: ReactNode }) => {
  const [riverLetters, setRiverLetters] = useState<RiverLetter[]>([]);

  const addLetterToRiver = (letter: Omit<RiverLetter, 'id' | 'timestamp'> & { id?: string }) => {
    const newLetter: RiverLetter = {
      id: letter.id || Math.random().toString(36).substring(2, 9) + Date.now(),
      char: letter.char,
      initialX: letter.initialX,
      timestamp: Date.now(),
    };
    setRiverLetters((prev) => [...prev, newLetter]);
  };

  const removeLetterFromRiver = (id: string) => {
    setRiverLetters((prev) => prev.filter((letter) => letter.id !== id));
  };

  return (
    <RiverLettersContext.Provider value={{ riverLetters, addLetterToRiver, removeLetterFromRiver }}>
      {children}
    </RiverLettersContext.Provider>
  );
};

export const useRiverLetters = () => {
  const context = useContext(RiverLettersContext);
  if (context === undefined) {
    throw new Error('useRiverLetters must be used within a RiverLettersProvider');
  }
  return context;
};
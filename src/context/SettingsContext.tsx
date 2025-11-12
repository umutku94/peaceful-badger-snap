"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  animationSpeed: number; // Duration in seconds
  setAnimationSpeed: (speed: number) => void;
  fallDistance: number; // Distance in pixels
  setFallDistance: (distance: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [animationSpeed, setAnimationSpeed] = useState<number>(3); // Default to 3 seconds for faster fall
  const [fallDistance, setFallDistance] = useState<number>(500); // Default to 500 pixels for shorter fall

  return (
    <SettingsContext.Provider value={{ animationSpeed, setAnimationSpeed, fallDistance, setFallDistance }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
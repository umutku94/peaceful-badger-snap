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
  const [animationSpeed, setAnimationSpeed] = useState<number>(10); // Default to 10 seconds
  const [fallDistance, setFallDistance] = useState<number>(1200); // Default to 1200 pixels

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
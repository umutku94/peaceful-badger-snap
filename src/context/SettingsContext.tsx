"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  animationSpeed: number; // Duration in seconds
  setAnimationSpeed: (speed: number) => void;
  fallDistance: number; // Distance in pixels
  setFallDistance: (distance: number) => void;
  soundVolume: number; // Volume from 0 to 1
  setSoundVolume: (volume: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [animationSpeed, setAnimationSpeed] = useState<number>(16); // Default to 16 seconds as per image
  const [fallDistance, setFallDistance] = useState<number>(650); // Default to 650 pixels as per image
  const [soundVolume, setSoundVolume] = useState<number>(0.1); // Default to 10% volume

  return (
    <SettingsContext.Provider value={{ animationSpeed, setAnimationSpeed, fallDistance, setFallDistance, soundVolume, setSoundVolume }}>
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
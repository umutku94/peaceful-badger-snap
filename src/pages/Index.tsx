"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import VentingTextBox from "@/components/VentingTextBox";
import AnimationSettings from "@/components/AnimationSettings";
import River from "@/components/River"; // Import the new River component
import { SettingsProvider } from "@/context/SettingsContext";
import { RiverLettersProvider } from "@/context/RiverLettersContext"; // Import the new context provider

const Index = () => {
  return (
    <SettingsProvider>
      <RiverLettersProvider> {/* Wrap components that need river letters */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Vent Your Emotions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Type your feelings and watch them fall away.
            </p>
          </div>
          <VentingTextBox />
          <AnimationSettings />
          <River /> {/* Render the River component */}
          <MadeWithDyad />
        </div>
      </RiverLettersProvider>
    </SettingsProvider>
  );
};

export default Index;
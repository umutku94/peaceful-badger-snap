"use client";

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/SettingsContext';

const AnimationSettings = () => {
  const { animationSpeed, setAnimationSpeed, fallDistance, setFallDistance, soundVolume, setSoundVolume, fontSize, setFontSize } = useSettings();

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Animation Settings</h2>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4">
          <Label htmlFor="animation-speed" className="text-left sm:text-right text-gray-700 dark:text-gray-300">
            Fall Speed
          </Label>
          <Slider
            id="animation-speed"
            min={1}
            max={20}
            step={1}
            value={[animationSpeed]}
            onValueChange={(value) => setAnimationSpeed(value[0])}
            className="col-span-full sm:col-span-1 md:col-span-3"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Current speed: {animationSpeed} seconds (lower value = faster fall)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 mt-4">
          <Label htmlFor="fall-distance" className="text-left sm:text-right text-gray-700 dark:text-gray-300">
            Fall Distance
          </Label>
          <Slider
            id="fall-distance"
            min={100}
            max={2000}
            step={50}
            value={[fallDistance]}
            onValueChange={(value) => setFallDistance(value[0])}
            className="col-span-full sm:col-span-1 md:col-span-3"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Current distance: {fallDistance} pixels (higher value = further fall)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 mt-4">
          <Label htmlFor="sound-volume" className="text-left sm:text-right text-gray-700 dark:text-gray-300">
            Sound Volume
          </Label>
          <Slider
            id="sound-volume"
            min={0}
            max={100}
            step={1}
            value={[soundVolume * 100]} // Convert 0-1 to 0-100 for slider
            onValueChange={(value) => setSoundVolume(value[0] / 100)} // Convert back to 0-1
            className="col-span-full sm:col-span-1 md:col-span-3"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Current volume: {Math.round(soundVolume * 100)}%
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 mt-4">
          <Label htmlFor="font-size" className="text-left sm:text-right text-gray-700 dark:text-gray-300">
            Font Size
          </Label>
          <Slider
            id="font-size"
            min={12}
            max={32}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="col-span-full sm:col-span-1 md:col-span-3"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Current font size: {fontSize}px
        </p>
      </div>
    </div>
  );
};

export default AnimationSettings;
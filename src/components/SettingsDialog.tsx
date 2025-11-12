"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const SettingsDialog = () => {
  const { animationSpeed, setAnimationSpeed, fallDistance, setFallDistance } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mt-4"> {/* Removed fixed positioning and added margin-top */}
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Animation Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="animation-speed" className="text-right">
              Fall Speed
            </Label>
            <Slider
              id="animation-speed"
              min={1}
              max={20}
              step={1}
              value={[animationSpeed]}
              onValueChange={(value) => setAnimationSpeed(value[0])}
              className="col-span-3"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Current speed: {animationSpeed} seconds (lower value = faster fall)
          </p>
          <div className="grid grid-cols-4 items-center gap-4 mt-4">
            <Label htmlFor="fall-distance" className="text-right">
              Fall Distance
            </Label>
            <Slider
              id="fall-distance"
              min={100}
              max={2000}
              step={50}
              value={[fallDistance]}
              onValueChange={(value) => setFallDistance(value[0])}
              className="col-span-3"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Current distance: {fallDistance} pixels (higher value = further fall)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
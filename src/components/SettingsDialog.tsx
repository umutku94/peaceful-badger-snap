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
  const { animationSpeed, setAnimationSpeed } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
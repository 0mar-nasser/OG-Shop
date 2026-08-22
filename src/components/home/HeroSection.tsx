import React from 'react';
import HeroSlider from './Hero-Slider';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto">
        <HeroSlider />
      </div>
    </section>
  );
}

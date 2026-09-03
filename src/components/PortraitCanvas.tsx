import React from 'react';
import portraitImage from '../assets/images/cutout.png';

export function PortraitVisual() {
  return (
    <div className="portrait-image-wrapper w-full h-full relative overflow-hidden flex items-center justify-center bg-transparent">
      <img
        src={portraitImage}
        alt="Pranesh Kumar"
        className="portrait-image w-full h-full object-cover object-top"
      />
    </div>
  );
}

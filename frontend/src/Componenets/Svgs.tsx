// src/components/svgs/Sparkle.tsx
import React from 'react';

interface SparkleProps {
  className?: string;
  color?: string;
}

export const Sparkle: React.FC<SparkleProps> = ({ className = '', color = '#3B82F6' }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" 
      fill={color}
      className="transition-all duration-300"
    />
    <path 
      d="M5 3L6 5L8 6L6 7L5 9L4 7L2 6L4 5L5 3Z" 
      fill="currentColor"
      className="text-blue-300 animate-pulse"
    />
    <path 
      d="M19 17L20 19L22 20L20 21L19 23L18 21L16 20L18 19L19 17Z" 
      fill="currentColor"
      className="text-blue-400 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    />
  </svg>
);

// src/components/svgs/Rocket.tsx
export const Rocket: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M13.11 12.36L8.2 17.27C7.42 18.05 6.18 18.05 5.4 17.27C4.62 16.49 4.62 15.25 5.4 14.47L10.31 9.56M16.88 7.52C17.67 6.73 18.91 6.73 19.7 7.52C20.49 8.31 20.49 9.55 19.7 10.34L16.88 13.16M9.75 9.12L5.88 12.99L2 16.87L7.13 22L11 18.12L14.88 14.25M14.88 14.25L16.88 13.16M14.88 14.25L13.11 12.36M14.88 14.25L16.88 16.25"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="transition-all duration-300"
    />
    <path 
      d="M7 13L4 10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
      className="group-hover:translate-x-1 transition-transform duration-300"
    />
  </svg>
);

// src/components/svgs/ArrowRight.tsx
export const ArrowRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M14 5L21 12M21 12L14 19M21 12H3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="transition-all duration-300"
    />
  </svg>
);

// src/components/svgs/Wave.tsx
export const Wave: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    viewBox="0 0 1440 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0 32L48 37.3C96 43 192 53 288 58.7C384 64 480 64 576 53.3C672 43 768 21 864 21.3C960 21 1056 43 1152 53.3C1248 64 1344 64 1392 64L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" 
      fill="currentColor"
      className="transition-colors duration-500"
    />
  </svg>
);
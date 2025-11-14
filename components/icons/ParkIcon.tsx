import React from 'react';

const ParkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 14.5l-3.5-3.5m0 0l-3.5 3.5m3.5-3.5V21m0-11.25a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 21h18" />
  </svg>
);

export default ParkIcon;

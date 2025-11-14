import React from 'react';

const GpsFixedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v1.5m0 16.5v1.5m8.25-8.25h-1.5m-16.5 0h1.5" />
  </svg>
);

export default GpsFixedIcon;
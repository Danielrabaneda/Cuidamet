
import React from 'react';

const PetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path d="M15.5,10.5c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
  </svg>
);

export default PetIcon;

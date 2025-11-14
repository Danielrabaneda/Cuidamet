import React from 'react';

const PharmacyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M10 21V9h4v12M12 9V3M4 3h16" />
  </svg>
);

export default PharmacyIcon;

import React from 'react';

const DirectionsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.68,8.26,11.85,11.1,3.41,12.52a1,1,0,0,0-.43,1.8l3.43,1.9L8.33,20a1,1,0,0,0,1.79-.43l1.41-8.44L15.74,8.3A1.23,1.23,0,0,0,14.68,8.26Z"/>
    <path d="M20.59,2.2l-4.74,1.48L11.64,8,16,12.36l4.38-4.21,1.47-4.75A1,1,0,0,0,20.59,2.2Z"/>
  </svg>
);

export default DirectionsIcon;
import React from 'react';

const CuidametIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
        <linearGradient id="logoGradientExact" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
    </defs>
    <g stroke="url(#logoGradientExact)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Top hand */}
        <path d="M71.6,18.4C84,29.9,89,45.8,85.5,60.8c-2.3,10-9.2,18.5-18.4,24" />
        <path d="M22.8,70.1c-12-11.8-16.4-28.9-12.2-44.5" />
        <path d="M68.5,41.9c-2.8,0-5.4-1.1-7.4-3.1" />
        <path d="M57.4,46.5c-3.1,0-6-1.2-8.2-3.4" />
        <path d="M10.6,25.6L31.2,4.8l20.4,14.2" />
        {/* Bottom hand */}
        <path d="M18.4,71.6C29.9,84,45.8,89,60.8,85.5c10-2.3,18.5-9.2,24-18.4" />
        <path d="M70.1,22.8c-11.8-12-28.9-16.4-44.5-12.2" />
        <path d="M41.9,68.5c0-2.8-1.1-5.4-3.1-7.4" />
        <path d="M46.5,57.4c0-3.1-1.2-6-3.4-8.2" />
    </g>
</svg>
);

export default CuidametIcon;
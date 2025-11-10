import React from 'react';

const HeartHandshakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" {...props}>
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2DD4BF" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <path stroke="url(#iconGradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M47.4 35.1c-1.3-6.6-5.8-12-11.5-14.7-6.2-2.9-13.4-2.9-19.6 0-5.8 2.7-10.3 8.1-11.5 14.7-1.1 5.4.9 10.9 4.6 15 3.3 3.6 7.9 5.5 12.8 5.1 4.5-.4 8.7-2.6 11.8-6.1l.9-.9c.4-.4.9-.4 1.3 0l.9.9c3 3.5 7.3 5.7 11.8 6.1 4.9.4 9.5-1.5 12.8-5.1 3.7-4.1 5.7-9.6 4.6-15z" />
    <path fill="url(#iconGradient)" d="M32 29.8c-2.4-2.2-6.2-2.2-8.6 0-1.2 1.1-1.8 2.6-1.8 4.2 0 1.6.6 3.1 1.8 4.2 2.4 2.2 6.2 2.2 8.6 0l1.8-1.7c.3-.3.8-.3 1.1 0l1.8 1.7c2.4 2.2 6.2 2.2 8.6 0 1.2-1.1 1.8-2.6 1.8-4.2 0-1.6-.6-3.1-1.8-4.2-2.4-2.2-6.2-2.2-8.6 0l-1.8 1.7c-.3.3-.8.3-1.1 0l-1.8-1.7z" />
    <path fill="url(#iconGradient)" stroke="url(#iconGradient)" strokeWidth=".5" d="M21.5 15.3s-1.8-4.5 2.1-7.2c3.9-2.7 7.2 2.1 7.2 2.1m11.7-4.9s1.8-4.5-2.1-7.2c-3.9-2.7-7.2 2.1-7.2 2.1" />
 </svg>
);

export default HeartHandshakeIcon;
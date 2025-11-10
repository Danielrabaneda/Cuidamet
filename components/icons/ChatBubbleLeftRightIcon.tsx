import React from 'react';

const ChatBubbleLeftRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.26c-.34.024-.65.24-.8.558l-1.45 2.418a1.875 1.875 0 01-3.197 0l-1.45-2.418a1.125 1.125 0 00-.8-.558l-3.722-.26C3.347 17.1 2.5 16.136 2.5 15v-4.286c0-.97.616-1.813 1.5-2.097m16.25-1.883A2.25 2.25 0 0018.5 4.5h-13A2.25 2.25 0 003.25 6.628v10.742c0 .621.504 1.125 1.125 1.125h15.25a1.125 1.125 0 001.125-1.125V6.628c0-.34-.146-.658-.38-.885z" />
  </svg>
);

export default ChatBubbleLeftRightIcon;
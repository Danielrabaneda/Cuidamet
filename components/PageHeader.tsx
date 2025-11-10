import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
  <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
    <div className="container mx-auto px-4 h-16 flex items-center">
      <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:text-teal-500">
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <h1 className="text-lg font-semibold text-slate-800 ml-4">{title}</h1>
    </div>
  </header>
);

export default PageHeader;

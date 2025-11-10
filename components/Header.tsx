import React from 'react';
import SearchIcon from './icons/SearchIcon';
import CuidametLogo from './CuidametLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <div className="flex-shrink-0">
            <a href="/">
              <CuidametLogo />
            </a>
          </div>
          <div className="flex-1 min-w-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Busca por nombre, servicio, zona..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

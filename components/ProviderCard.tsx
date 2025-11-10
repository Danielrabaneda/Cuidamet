
import React from 'react';
import { Provider, CareCategory } from '../types';
import LocationPinIcon from './icons/LocationPinIcon';
import StarIcon from './icons/StarIcon';
import HeartIcon from './icons/HeartIcon';
import SolidHeartIcon from './icons/SolidHeartIcon';
import ShareIcon from './icons/ShareIcon';

interface ProviderCardProps {
  provider: Provider;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewProfile: (id: number) => void;
  currentCategory: CareCategory | 'all';
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, isFavorite, onToggleFavorite, onViewProfile, currentCategory }) => {
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(provider.id);
  }

  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    alert(`¡Perfil de ${provider.name} copiado al portapapeles!`);
  };

  const descriptionToShow =
    (currentCategory !== 'all' && provider.descriptions.find(d => d.category === currentCategory)?.text) ||
    provider.descriptions[0]?.text ||
    '';

  return (
    <button 
      onClick={() => onViewProfile(provider.id)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer group border border-slate-200 text-left w-full"
    >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={provider.photoUrl} alt={provider.name} />
        <div className="absolute top-2 w-full px-2 flex justify-between">
          <button
            onClick={handleFavoriteClick}
            className="bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition-all duration-200 z-10"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            {isFavorite ? <SolidHeartIcon className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={handleShareClick}
            className="bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-slate-700 hover:text-teal-500 hover:bg-white transition-all duration-200 z-10"
            aria-label="Compartir perfil"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-slate-800 truncate pr-2">{provider.name}</h3>
          <div className="flex items-center space-x-1 text-amber-500 shrink-0">
            <StarIcon className="w-4 h-4" />
            <span className="font-bold text-sm text-slate-600">{provider.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center text-slate-500 text-xs mt-1">
          <LocationPinIcon className="w-3 h-3 mr-1" />
          <span>
            {provider.distance != null ? `${provider.distance.toFixed(1)} km • ` : ''}
            {provider.location}
          </span>
        </div>
        <p className="text-slate-600 text-xs mt-2 h-12 overflow-hidden">
          {descriptionToShow}
        </p>
      </div>
    </button>
  );
};

export default ProviderCard;
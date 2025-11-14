

import React from 'react';
import { Provider, CareCategory } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import StarIcon from './icons/StarIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import CurrencyDollarIcon from './icons/CurrencyDollarIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import StarRating from './StarRating';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';


interface ProfileDetailProps {
  provider: Provider | null | undefined;
  isLoading: boolean;
  onBack: () => void;
  onBookNow: (providerId: number) => void;
  onContact: (providerId: number) => void;
}

const categoryDisplayNames: Record<CareCategory, string> = {
    [CareCategory.ELDERLY]: 'Cuidado de Mayores',
    [CareCategory.CHILDREN]: 'Cuidado de Niños',
    [CareCategory.PETS]: 'Cuidado de Mascotas',
};

const getBadgeStyle = (badge: string) => {
    if (badge.toLowerCase().includes('mejor valorado')) {
        return { icon: <StarIcon className="w-4 h-4 text-amber-600" />, style: 'bg-amber-100 text-amber-800 border-amber-200' };
    }
    if (badge.toLowerCase().includes('experto')) {
        return { icon: <ShieldCheckIcon className="w-4 h-4 text-blue-600" />, style: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
    if (badge.toLowerCase().includes('rápida')) {
        return { icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, style: 'bg-green-100 text-green-800 border-green-200' };
    }
    return { icon: null, style: 'bg-slate-100 text-slate-800 border-slate-200' };
}


const DetailHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
    <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:text-teal-500">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
        <div className="w-6"></div> {/* Spacer */}
      </div>
    </header>
);

const ProfileDetail: React.FC<ProfileDetailProps> = ({ provider, isLoading, onBack, onBookNow, onContact }) => {
    
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
        <DetailHeader title="Cargando Perfil..." onBack={onBack} />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </main>
      </div>
    );
  }

  if (!provider) {
    return (
       <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
        <DetailHeader title="Error" onBack={onBack} />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <InformationCircleIcon className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700">No se pudo encontrar el perfil</h2>
          <p className="text-slate-500 mt-2">Lo sentimos, no pudimos cargar los datos del cuidador.</p>
          <button onClick={onBack} className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
            Volver
          </button>
        </main>
      </div>
    );
  }

  const getServiceIcon = (serviceName: string) => {
    // This is a simple mapping. In a real app, you might have more sophisticated logic.
    if (serviceName.toLowerCase().includes('medic')) return <div className="bg-red-100 rounded-lg p-2"><span className="text-xl">💊</span></div>;
    if (serviceName.toLowerCase().includes('compañ')) return <div className="bg-blue-100 rounded-lg p-2"><span className="text-xl">❤️</span></div>;
    if (serviceName.toLowerCase().includes('comida')) return <div className="bg-yellow-100 rounded-lg p-2"><span className="text-xl">🍲</span></div>;
    if (serviceName.toLowerCase().includes('tutor')) return <div className="bg-indigo-100 rounded-lg p-2"><span className="text-xl">📚</span></div>;
    if (serviceName.toLowerCase().includes('paseo')) return <div className="bg-green-100 rounded-lg p-2"><span className="text-xl">🐾</span></div>;
    if (serviceName.toLowerCase().includes('canguro')) return <div className="bg-purple-100 rounded-lg p-2"><span className="text-xl">🧸</span></div>;
    return <div className="bg-slate-100 rounded-lg p-2"><span className="text-xl">⭐</span></div>;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
      <DetailHeader title="Perfil" onBack={onBack} />

      {/* Scrollable Content */}
      <main className="flex-grow overflow-y-auto pb-28">
        {/* User Info */}
        <section className="container mx-auto px-4 py-6 text-center">
          <img 
            src={provider.photoUrl} 
            alt={provider.name} 
            className="w-28 h-28 rounded-full mx-auto ring-4 ring-white shadow-lg"
          />
          <h2 className="text-2xl font-bold text-slate-800 mt-4">{provider.name}</h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="flex items-center text-amber-500">
              <StarIcon className="w-5 h-5"/>
              <span className="ml-1 font-bold text-slate-700">{provider.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-500">{provider.reviewsCount} valoraciones</span>
          </div>
          <div className="flex items-center justify-center text-slate-500 mt-1">
             <LocationPinIcon className="w-4 h-4 mr-1"/>
             <span>{provider.location}</span>
          </div>
          {provider.badges && provider.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {provider.badges.map(badge => {
                const { icon, style } = getBadgeStyle(badge);
                return (
                  <div key={badge} className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${style}`}>
                    {icon}
                    <span className="ml-1.5">{badge}</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Sections */}
        <div className="container mx-auto px-4 space-y-6">
          
          {/* Services Section */}
          <div className="bg-slate-50/70 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Servicios</h3>
            <ul className="space-y-2">
              {provider.services.map(service => (
                 <li key={service} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center">
                    {getServiceIcon(service)}
                    <span className="ml-3 text-slate-700">{service}</span>
                  </div>
                  <div className="text-right">
                     <p className="font-semibold text-teal-600">{provider.hourlyRate}€/hr</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Section */}
          <div className="bg-slate-50/70 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-4">Sobre Mí</h3>
            <div className="space-y-5">
              {provider.descriptions.map((desc) => (
                <div key={desc.category}>
                  <h4 className="font-semibold text-teal-600 mb-1">{categoryDisplayNames[desc.category]}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reviews Section */}
          {provider.reviews && provider.reviews.length > 0 && (
            <div className="bg-slate-50/70 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Valoraciones ({provider.reviews.length})</h3>
                    <p className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-md">Solo de servicios verificados</p>
                </div>
                <ul className="space-y-6">
                {provider.reviews.map(review => (
                    <li key={review.id} className="flex items-start space-x-4">
                    <img src={review.authorPhotoUrl} alt={review.authorName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm text-slate-800">{review.authorName}</p>
                            <p className="text-xs text-slate-500">{review.date}</p>
                        </div>
                        <StarRating rating={review.rating} />
                        </div>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{review.comment}</p>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
          )}

          {/* Verifications Section */}
          <div className="bg-slate-50/70 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Verificaciones de Confianza</h3>
            <p className="text-xs text-slate-500 mb-4">Este cuidador ha completado las siguientes verificaciones para aumentar la seguridad.</p>
            <ul className="space-y-3">
              {provider.verifications.map(verification => (
                <li key={verification} className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1.5">
                     <ShieldCheckIcon className="w-5 h-5 text-green-600"/>
                  </div>
                  <span className="ml-3 text-slate-700 text-sm font-medium">{verification}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

       {/* Fixed Footer/Action Button */}
       <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onContact(provider.id)}
            className="flex-1 bg-white border border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center justify-center text-lg"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
            Chatear
          </button>
          <button 
            onClick={() => onBookNow(provider.id)}
            className="flex-[2] bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center justify-center text-lg">
            <CreditCardIcon className="w-6 h-6 mr-2"/>
            Reservar Ahora
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProfileDetail;
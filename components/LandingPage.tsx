

import React, { useState } from 'react';
import { CareCategory } from '../types';
import SearchIcon from './icons/SearchIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import SparklesIcon from './icons/SparklesIcon';
import QueueListIcon from './icons/QueueListIcon';
import MapIcon from './icons/MapIcon';
import ShareIcon from './icons/ShareIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import StarIcon from './icons/StarIcon';
import ClockIcon from './icons/ClockIcon';

interface LandingPageProps {
  onCategorySelect: (category: CareCategory) => void;
  onShowAll: () => void;
  onNavigateMap: () => void;
  onSearch: (query: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCategorySelect, onShowAll, onNavigateMap, onSearch }) => {
  const [query, setQuery] = useState('');

  const categories = [
    {
      id: CareCategory.ELDERLY,
      name: 'Cuidado de Mayores',
      imageUrl: 'https://images.unsplash.com/photo-1605294625341-35b85a3cb365?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: CareCategory.CHILDREN,
      name: 'Cuidado de Niños',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: CareCategory.PETS,
      name: 'Cuidado de Mascotas',
      imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Confianza y Seguridad',
      description: 'Perfiles verificados y valoraciones de otros usuarios para que elijas con total tranquilidad.',
    },
    {
      icon: LocationPinIcon,
      title: 'Cerca de Ti',
      description: 'Usa tu ubicación para encontrar a los mejores cuidadores en tu propio barrio.',
    },
    {
      icon: SparklesIcon,
      title: 'Fácil y Rápido',
      description: 'Contacta y contrata en muy pocos pasos de forma segura e intuitiva desde nuestra aplicación.',
    },
  ];

  const securityFeatures = [
    { 
      icon: ShieldCheckIcon, 
      title: 'Verificación estricta', 
      description: 'DNI, certificados y antecedentes verificados' 
    },
    { 
      icon: StarIcon, 
      title: 'Valoraciones reales', 
      description: 'Opiniones honestas de otros usuarios para ayudarte a decidir.' 
    },
    { 
      icon: LocationPinIcon, 
      title: 'Geolocalización', 
      description: 'Encuentra profesionales en tu zona al instante' 
    },
    { 
      icon: ClockIcon, 
      title: 'Disponibilidad 24/7', 
      description: 'Modo urgente para necesidades inmediatas' 
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  const handleShare = async () => {
    const shareData = {
        title: 'Cuidamet',
        text: '¡Encuentra cuidadores de confianza cerca de ti con Cuidamet! Te la recomiendo.',
        url: window.location.origin,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop or unsupported browsers
            await navigator.clipboard.writeText(shareData.url);
            alert('¡Enlace de la app copiado al portapapeles! Compártelo con quien quieras.');
        }
    } catch (err) {
        console.error('Error al compartir:', err);
        alert('No se pudo compartir la aplicación.');
    }
  };


  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col p-4 pb-24">
      <header className="py-4">
        <div className="container mx-auto">
          <svg
              className="h-12 w-auto"
              viewBox="0 0 540 85"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Cuidamet Logo"
            >
              <title>Cuidamet: Cuidamos de lo que te importa</title>
              <defs>
                  <linearGradient id="logoGradientExact" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
              </defs>
              <g transform="translate(5, 5)">
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
              </g>
              <text x="105" y="48" fontFamily="Poppins, sans-serif" fontSize="48" fontWeight="300" letterSpacing="2" fill="#475569">
                  CUIDAMET
              </text>
              <text x="105" y="75" fontFamily="Poppins, sans-serif" fontSize="18" fontWeight="400" fill="#64748b">
                  Cuidamos de lo que te importa
              </text>
          </svg>
        </div>
      </header>

      <main className="container mx-auto flex-grow flex flex-col justify-center">
        <div className="py-10">
          <div className='text-center'>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Encuentra cuidadores de<br />confianza{' '}
              <span className="bg-gradient-to-r from-teal-400 to-green-500 text-transparent bg-clip-text">
                cerca de ti
              </span>
            </h2>

            <form onSubmit={handleFormSubmit} className="relative max-w-lg mx-auto w-full mb-10">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre, servicio, ubicación..."
                className="w-full bg-white border border-slate-300 rounded-full py-4 pl-12 pr-32 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition text-slate-800"
              />
               <button type="submit" className="absolute inset-y-0 right-0 flex items-center bg-teal-500 text-white font-semibold px-6 rounded-full m-1.5 hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Buscar
              </button>
            </form>
          </div>
          
          <h3 className="text-center text-xl font-semibold text-teal-600 mb-6">
            ¿Qué tipo de servicio estás buscando?
          </h3>

          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-colors duration-300 group-hover:from-black/70"></div>
                <div className="absolute inset-0 flex items-end p-2 md:p-3">
                  <h3 className="text-white text-sm sm:text-base font-bold leading-tight drop-shadow-md">{cat.name}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* How it works Section */}
          <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">¿Cómo funciona Cuidamet?</h2>
            <p className="max-w-xl mx-auto text-slate-600 mb-12">
              Tres pasos simples para encontrar tu cuidador ideal
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 rounded-full p-5 mb-4 inline-block">
                  <SearchIcon className="w-10 h-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">1. Busca</h3>
                <p className="text-slate-500 leading-relaxed">
                  Filtra por ubicación, disponibilidad, tipo de servicio y valoraciones. Encuentra cuidadores cerca de ti.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 rounded-full p-5 mb-4 inline-block">
                  <ChatBubbleLeftRightIcon className="w-10 h-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Conecta</h3>
                <p className="text-slate-500 leading-relaxed">
                  Chatea directamente y programa videollamadas. Conoce a los candidatos antes de decidir.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 rounded-full p-5 mb-4 inline-block">
                  <CheckCircleIcon className="w-10 h-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">3. Contrata</h3>
                <p className="text-slate-500 leading-relaxed">
                  Reserva con pago seguro incluido. Sistema de valoraciones para garantizar calidad.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-16 max-w-4xl mx-auto space-y-4">
            <button
              onClick={onShowAll}
              className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-0.5"
            >
              <QueueListIcon className="w-6 h-6 mr-3" />
              Ver todos los servicios
            </button>
            <button
                onClick={onNavigateMap}
                className="relative w-full flex items-center justify-center px-6 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-teal-500/50"
              >
                  <div 
                      className="absolute inset-0 bg-cover bg-center filter blur-md scale-110 transition-all duration-500 group-hover:blur-sm group-hover:scale-100"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1770&auto=format&fit=crop')" }}
                      aria-hidden="true"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-600/80 via-teal-500/50 to-transparent transition-colors duration-500" aria-hidden="true"></div>
                  <div className="relative z-10 flex items-center justify-center drop-shadow-md">
                      <MapIcon className="w-6 h-6 mr-3" />
                      <span className="text-lg">Buscar en el mapa</span>
                  </div>
              </button>
          </div>

          <section className="mt-16 md:mt-24 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Tu tranquilidad, nuestra prioridad</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mb-12">
              Te conectamos con los mejores profesionales para el cuidado de los que más quieres.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-teal-100/70 rounded-full p-3 mb-2">
                    <feature.icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-snug">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">¿Te gusta Cuidamet?</h3>
            <p className="max-w-md mx-auto text-slate-500 mb-6">
                Ayúdanos a crecer y a que más gente encuentre al cuidador perfecto. ¡Comparte la aplicación con tus amigos y familiares!
            </p>
            <button
                onClick={handleShare}
                className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/50 shadow-lg hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-1"
            >
                <ShareIcon className="w-6 h-6 mr-3" />
                Compartir la aplicación
            </button>
          </section>

          {/* Security Priority Section */}
          <section className="mt-20 py-16 bg-teal-50/70 rounded-3xl">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-12">Tu seguridad es nuestra prioridad</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 text-center flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-teal-500 mb-3">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{feature.title}</h3>
                    <p className="text-slate-500 text-xs leading-snug">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

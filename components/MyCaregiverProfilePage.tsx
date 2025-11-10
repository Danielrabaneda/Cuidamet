import React, { useState } from 'react';
import PageHeader from './PageHeader';
import { CareCategory } from '../types';
import MapPinIcon from './icons/MapPinIcon';
import CurrencyEuroIcon from './icons/CurrencyEuroIcon';
import StarIcon from './icons/StarIcon';
import PencilIcon from './icons/PencilIcon';
import HeartIcon from './icons/HeartIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface MyCaregiverProfilePageProps {
  onBack: () => void;
  onNavigateEditProfile: (category: CareCategory) => void;
}

// Data would typically be fetched for the logged-in user
const userProfile = {
  name: 'Sofia Lopez',
  photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
  location: 'Arganzuela, Madrid',
  categories: [CareCategory.CHILDREN],
  hourlyRate: 11,
  services: ['Canguro', 'Ayuda con los Deberes', 'Juego Creativo'],
  descriptions: {
    [CareCategory.CHILDREN]: 'Estudiante de pedagogía con amplia experiencia en el cuidado de niños de todas las edades. Certificada en RCP y primeros auxilios. Creativa y muy paciente.',
  },
  experience: 'intermediate',
  rating: 4.8,
  reviewsCount: 12,
  favoritesCount: 0, // Set to 0 to show the updated message
};

const serviceCategories = [
    { id: CareCategory.ELDERLY, label: 'Cuidado de Mayores' },
    { id: CareCategory.CHILDREN, label: 'Cuidado de Niños' },
    { id: CareCategory.PETS, label: 'Cuidado de Mascotas' }
];

const experienceLevels = [
  { id: 'beginner', name: 'Principiante (0-1 años)' },
  { id: 'intermediate', name: 'Intermedio (2-5 años)' },
  { id: 'expert', name: 'Experto (+5 años)' },
];

const MyCaregiverProfilePage: React.FC<MyCaregiverProfilePageProps> = ({ onBack, onNavigateEditProfile }) => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const profile = userProfile;
  const experienceLabel = experienceLevels.find(e => e.id === profile.experience)?.name || 'No especificado';

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Mi Perfil de Cuidador" onBack={onBack} />
      <main className="container mx-auto px-4 py-6 pb-28">
        
        <div className="flex flex-col items-center mb-6">
            <img src={profile.photoUrl} alt="User Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
            <h2 className="text-2xl font-bold text-slate-800 mt-4">{profile.name}</h2>
            <div className="flex items-center text-slate-500 mt-1">
                <MapPinIcon className="w-4 h-4 mr-1"/>
                <span>{profile.location}</span>
            </div>
        </div>
        
        <section className="mb-6">
            <button 
                onClick={() => setIsStatsVisible(!isStatsVisible)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isStatsVisible}
            >
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Tus Valoraciones</h3>
                    <p className="text-sm text-slate-500">Pulsa para ver tus estadísticas</p>
                </div>
                <ChevronRightIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isStatsVisible ? 'rotate-90' : ''}`} />
            </button>
            
            {isStatsVisible && (
                <div className="grid grid-cols-2 gap-4 mt-4 animate-fade-in">
                    {/* Ratings Card */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center h-40">
                    <div className={`p-3 rounded-full ${profile.reviewsCount > 0 ? 'bg-amber-100' : 'bg-slate-100'}`}>
                        <StarIcon className={`w-6 h-6 ${profile.reviewsCount > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
                    </div>
                    {profile.reviewsCount > 0 ? (
                        <>
                        <p className="text-2xl font-bold text-slate-800 mt-2">{profile.rating.toFixed(1)}</p>
                        <p className="text-sm text-slate-500">Valoración media</p>
                        <p className="text-xs text-slate-400">({profile.reviewsCount} reseñas)</p>
                        </>
                    ) : (
                        <p className="text-sm text-slate-500 mt-2 text-center">Sin valoraciones<br/>aún</p>
                    )}
                    </div>
                    
                    {/* Favorites Card */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center h-40">
                    <div className={`p-3 rounded-full ${profile.favoritesCount > 0 ? 'bg-red-100' : 'bg-slate-100'}`}>
                        <HeartIcon className={`w-6 h-6 ${profile.favoritesCount > 0 ? 'text-red-500' : 'text-slate-400'}`} />
                    </div>
                    {profile.favoritesCount > 0 ? (
                        <>
                        <p className="text-2xl font-bold text-slate-800 mt-2">{profile.favoritesCount}</p>
                        <p className="text-sm text-slate-500">Veces guardado<br/>en Favoritos</p>
                        </>
                    ) : (
                        <p className="text-sm text-slate-500 mt-2 text-center">Aún no te han añadido a favoritos</p>
                    )}
                    </div>
                </div>
            )}
        </section>


        <div className="space-y-6">
            <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-800">Mis Servicios</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Pulsa en un servicio para editar sus detalles, como la descripción y las tareas específicas que realizas.</p>
              
              <ul className="rounded-lg border border-slate-200 divide-y divide-slate-200">
                {profile.categories.length > 0 ? (
                    profile.categories.map(category => (
                        <li key={category}>
                            <button 
                                onClick={() => onNavigateEditProfile(category)} 
                                className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-medium text-slate-700">{serviceCategories.find(c => c.id === category)?.label}</span>
                                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="p-3 text-sm text-slate-500">
                        No ofreces ningún servicio. <button onClick={() => onNavigateEditProfile(CareCategory.ELDERLY)} className="font-semibold text-teal-600">Añade uno</button> para empezar.
                    </li>
                )}
              </ul>

              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                  <div className="flex items-center">
                      <CurrencyEuroIcon className="w-5 h-5 text-slate-400 mr-3" />
                      <span className="text-slate-700">Tarifa: <span className="font-semibold">{profile.hourlyRate}€/hora</span></span>
                  </div>
                  <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-slate-400 mr-3" />
                      <span className="text-slate-700">Experiencia: <span className="font-semibold">{experienceLabel}</span></span>
                  </div>
              </div>
              
              <div>
                  <h4 className="font-medium text-slate-700 mt-4 mb-2">Servicios específicos:</h4>
                  <div className="flex flex-wrap gap-2">
                      {profile.services.map(service => (
                          <span key={service} className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                              {service}
                          </span>
                      ))}
                      {profile.services.length === 0 && <p className="text-sm text-slate-500">No has añadido servicios específicos.</p>}
                  </div>
              </div>
            </section>
        </div>
        
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-10">
            <div className="container mx-auto px-4 py-3">
              <button 
                onClick={() => onNavigateEditProfile(profile.categories[0] || CareCategory.ELDERLY)}
                className="w-full bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center justify-center text-lg">
                <PencilIcon className="w-5 h-5 mr-2"/>
                Editar Perfil
              </button>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default MyCaregiverProfilePage;
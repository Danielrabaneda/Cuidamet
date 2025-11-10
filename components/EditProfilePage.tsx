import React, { useState, useRef, useEffect } from 'react';
import PageHeader from './PageHeader';
import CameraIcon from './icons/CameraIcon';
import { CareCategory } from '../types';
import PencilIcon from './icons/PencilIcon';
import StarIcon from './icons/StarIcon';
import CurrencyEuroIcon from './icons/CurrencyEuroIcon';
import MapPinIcon from './icons/MapPinIcon';
import XMarkIcon from './icons/XMarkIcon';
import PhotoUploadModal from './PhotoUploadModal';

interface EditProfilePageProps {
  onBack: () => void;
  editingCategory: CareCategory | null;
}

// Data usually fetched from an API
const initialUserProfile = {
  name: 'Sofia Lopez',
  photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
  location: 'Arganzuela, Madrid',
  categories: [CareCategory.CHILDREN],
  hourlyRate: 11,
  services: ['Canguro', 'Ayuda con los Deberes', 'Juego Creativo'],
  descriptions: {
    [CareCategory.CHILDREN]: 'Estudiante de pedagogía con amplia experiencia en el cuidado de niños de todas las edades. Certificada en RCP y primeros auxilios. Creativa y muy paciente.',
    [CareCategory.ELDERLY]: '',
    [CareCategory.PETS]: '',
  },
  experience: 'intermediate',
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


const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack, editingCategory }) => {
  const [profile, setProfile] = useState(initialUserProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const serviceSectionRef = useRef<HTMLDivElement>(null);

  const servicesRefs = {
    [CareCategory.ELDERLY]: useRef<HTMLDivElement>(null),
    [CareCategory.CHILDREN]: useRef<HTMLDivElement>(null),
    [CareCategory.PETS]: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (editingCategory && servicesRefs[editingCategory]?.current) {
        setTimeout(() => {
            servicesRefs[editingCategory].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 100);
    }
  }, [editingCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (category: CareCategory, value: string) => {
    setProfile(prev => ({
      ...prev,
      descriptions: {
        ...prev.descriptions,
        [category]: value,
      },
    }));
  };

  const handleCategoryToggle = (category: CareCategory) => {
    setProfile(prev => {
        const newCategories = prev.categories.includes(category)
            ? prev.categories.filter(c => c !== category)
            : [...prev.categories, category];
        return { ...prev, categories: newCategories };
    });
  };

  const handleAddService = () => {
    if (newService.trim() && !profile.services.includes(newService.trim())) {
      setProfile(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== serviceToRemove),
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile(prev => ({ ...prev, photoUrl: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsPhotoModalOpen(false);
  };

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
        fileInputRef.current.setAttribute('capture', 'user');
        fileInputRef.current.click();
    }
  };

  const handleChooseFromGallery = () => {
      if (fileInputRef.current) {
          fileInputRef.current.removeAttribute('capture');
          fileInputRef.current.click();
      }
  };

  const handleSave = () => {
    setIsSaving(true);
    console.log('Saving profile:', profile);
    setTimeout(() => {
        setIsSaving(false);
        alert('Perfil guardado con éxito');
        onBack();
    }, 1500);
  };
  
  const pageTitle = editingCategory
    ? `Editando: ${serviceCategories.find(c => c.id === editingCategory)?.label}`
    : 'Editar Perfil de Cuidador';

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title={pageTitle} onBack={onBack} />
      <main className="container mx-auto px-4 py-6 pb-24">
        
        <div className="flex flex-col items-center mb-8">
            <div className="relative group">
                <img
                    src={profile.photoUrl}
                    alt="User Avatar"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button 
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-full transition-all duration-300"
                >
                    <CameraIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*" />
            </div>
            <p className="text-sm text-slate-500 mt-2">Toca la imagen para cambiarla</p>
        </div>

        <div className="space-y-8">
            {/* Personal Info */}
            <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-slate-800">Información Personal</h3>
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Tu nombre público</label>
                  <div className="relative">
                      <input id="name" name="name" type="text" value={profile.name} onChange={handleInputChange} className="w-full bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
                      <PencilIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
              </div>
              <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Ubicación (barrio, ciudad)</label>
                  <div className="relative">
                      <input id="location" name="location" type="text" value={profile.location} onChange={handleInputChange} className="w-full bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
                      <MapPinIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
              </div>
            </section>

            {/* Services */}
            <section ref={serviceSectionRef} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-slate-800">Mis Servicios</h3>
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">¿Qué servicios ofreces?</label>
                  <div className="space-y-2">
                    {serviceCategories.map(cat => (
                      <label key={cat.id} className="flex items-center w-full bg-slate-50 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="checkbox" checked={profile.categories.includes(cat.id)} onChange={() => handleCategoryToggle(cat.id)} className="h-5 w-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
                        <span className="ml-3 text-slate-700">{cat.label}</span>
                      </label>
                    ))}
                  </div>
              </div>

              {profile.categories.length > 0 && profile.categories.sort().map(category => {
                  const isHighlighted = editingCategory === category;
                  return (
                    <div 
                        key={category} 
                        ref={servicesRefs[category]}
                        className={`animate-fade-in p-3 rounded-lg transition-all duration-300 ${isHighlighted ? 'bg-teal-50 border-2 border-teal-300' : ''}`}
                    >
                      <label htmlFor={`description-${category}`} className="block text-sm font-medium text-teal-600 mb-1">
                        Describe tu experiencia en "{serviceCategories.find(c => c.id === category)?.label}"
                      </label>
                      <div className="relative">
                        <textarea id={`description-${category}`} value={profile.descriptions[category] || ''} onChange={(e) => handleDescriptionChange(category, e.target.value)} maxLength={250} className="w-full h-24 p-3 pr-10 bg-white border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
                        <PencilIcon className="absolute top-3 right-3 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  );
              })}
              
              <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 mb-1">Tu tarifa por hora (€)</label>
                  <div className="relative">
                      <input id="hourlyRate" name="hourlyRate" type="number" value={profile.hourlyRate} onChange={handleInputChange} min="0" className="w-full bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
                      <CurrencyEuroIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
              </div>
               <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-1">Nivel de Experiencia</label>
                  <div className="relative">
                    <select id="experience" name="experience" value={profile.experience} onChange={handleInputChange} className="w-full appearance-none bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800">
                      {experienceLevels.map(level => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                    <StarIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
              </div>
              <div>
                  <label htmlFor="service-tags" className="block text-sm font-medium text-slate-700 mb-1">Servicios específicos (ej: Paseos, Canguro)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.services.map(service => (
                      <div key={service} className="flex items-center bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                        {service}
                        <button onClick={() => handleRemoveService(service)} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-teal-200">
                          <XMarkIcon className="w-3 h-3"/>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                      <input id="service-tags" type="text" value={newService} onChange={(e) => setNewService(e.target.value)} placeholder="Añadir un servicio..." className="w-full bg-slate-50 p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
                      <button onClick={handleAddService} type="button" className="bg-slate-700 text-white px-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors">Añadir</button>
                  </div>
              </div>
            </section>

        </div>

        <div className="mt-8">
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-teal-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400"
            >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
        </div>
      </main>

      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
      />
    </div>
  );
};

export default EditProfilePage;
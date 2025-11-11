import React, { useState, useRef } from 'react';
import { CareCategory } from '../types';
import PageHeader from './PageHeader';
import CameraIcon from './icons/CameraIcon';
import PencilIcon from './icons/PencilIcon';
import MapPinIcon from './icons/MapPinIcon';
import CurrencyEuroIcon from './icons/CurrencyEuroIcon';
import StarIcon from './icons/StarIcon';
import IdentificationIcon from './icons/IdentificationIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import PhotoUploadModal from './PhotoUploadModal';

interface OfferServiceProps {
  onClose: () => void;
}

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

const serviceDetails = {
  [CareCategory.ELDERLY]: {
    offers: [
      'Acompañamiento diario o por horas',
      'Asistencia en movilidad y actividades básicas',
      'Administración de medicamentos',
      'Control de citas médicas',
      'Compañía emocional y conversación',
      'Tareas ligeras del hogar',
    ],
    skills: [
      'Experiencia con Alzheimer o demencia',
      'Experiencia con movilidad reducida',
      'Cursos en geriatría o primeros auxilios',
      'Capacidad de convivencia (interno/a)',
    ],
  },
  [CareCategory.CHILDREN]: {
    offers: [
      'Canguro por horas (diurno/nocturno)',
      'Ayuda con los deberes y refuerzo escolar',
      'Recogida del colegio y extraescolares',
      'Preparación de comidas y meriendas',
      'Juegos creativos y actividades lúdicas',
      'Cuidado de bebés y recién nacidos',
    ],
    skills: [
      'Experiencia con necesidades especiales',
      'Formación en pedagogía o magisterio',
      'Certificado de primeros auxilios pediátricos',
      'Bilingüe o conocimientos de idiomas',
      'Carnet de conducir y vehículo propio',
    ],
  },
  [CareCategory.PETS]: {
    offers: [
      'Paseos de perros (individuales/grupales)',
      'Cuidado a domicilio (visitas)',
      'Alojamiento en casa del cuidador',
      'Administración de medicamentos',
      'Cuidado de cachorros o animales senior',
      'Adiestramiento básico',
    ],
    skills: [
      'Experiencia con razas específicas o PPP',
      'Formación veterinaria o auxiliar',
      'Hogar con jardín o espacios al aire libre',
      'Admite convivencia con otras mascotas',
      'Manejo de animales con ansiedad o miedos',
    ],
  },
};

const categoryStyles = {
    [CareCategory.ELDERLY]: {
        label: 'bg-teal-500 border-teal-600 text-white',
        labelHover: 'hover:bg-teal-600',
        checkbox: 'text-teal-700 focus:ring-teal-400 border-teal-400',
        span: 'font-semibold',
    },
    [CareCategory.CHILDREN]: {
        label: 'bg-amber-500 border-amber-600 text-white',
        labelHover: 'hover:bg-amber-600',
        checkbox: 'text-amber-700 focus:ring-amber-400 border-amber-400',
        span: 'font-semibold',
    },
    [CareCategory.PETS]: {
        label: 'bg-green-500 border-green-600 text-white',
        labelHover: 'hover:bg-green-600',
        checkbox: 'text-green-700 focus:ring-green-400 border-green-400',
        span: 'font-semibold',
    }
};

const defaultStyles = {
    label: 'bg-white border-slate-300',
    labelHover: 'hover:bg-slate-100',
    checkbox: 'text-teal-500 focus:ring-teal-500',
    span: 'font-medium text-slate-700',
};


const OfferService: React.FC<OfferServiceProps> = ({ onClose }) => {
    const [profile, setProfile] = useState({
        name: '',
        photoUrl: '',
        location: '',
        categories: [] as CareCategory[],
        hourlyRate: '',
        descriptions: {} as Record<CareCategory, string>,
        detailedServices: {} as Record<CareCategory, { offers: string[]; skills: string[] }>,
        experience: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (category: CareCategory, value: string) => {
        setProfile(prev => ({
        ...prev,
        descriptions: { ...prev.descriptions, [category]: value },
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
    
    const handleDetailedServiceToggle = (category: CareCategory, type: 'offers' | 'skills', service: string) => {
        setProfile(prev => {
            const currentCategoryServices = prev.detailedServices[category] || { offers: [], skills: [] };
            const servicesForType = currentCategoryServices[type];
            
            const newServicesForType = servicesForType.includes(service)
                ? servicesForType.filter(s => s !== service)
                : [...servicesForType, service];

            return {
                ...prev,
                detailedServices: {
                    ...prev.detailedServices,
                    [category]: {
                        ...currentCategoryServices,
                        [type]: newServicesForType,
                    }
                }
            };
        });
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

    const handleGetCurrentLocation = () => {
        setLocationStatus('loading');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationStatus('success');
            setProfile(prev => ({ ...prev, location: 'Ubicación actual detectada' }));
          },
          (error) => {
            setLocationStatus('error');
            alert('No se pudo obtener la ubicación. Por favor, habilita los permisos o introduce la dirección manualmente.');
          }
        );
    };

    const handleSave = () => {
        setIsSaving(true);
        console.log('Creating profile:', profile);
        setTimeout(() => {
            setIsSaving(false);
            alert('¡Perfil creado con éxito! Ya eres parte de Cuidamet.');
            onClose();
        }, 1500);
    };

    const isFormValid = profile.name && profile.photoUrl && profile.location && profile.categories.length > 0 && profile.hourlyRate && profile.experience;

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHeader title="Crea tu perfil de cuidador" onBack={onClose} />
            <main className="container mx-auto px-4 py-6 pb-28">

                <section className="flex flex-col items-center mb-8 text-center">
                    <div className="relative group">
                        {profile.photoUrl ? (
                            <img src={profile.photoUrl} alt="Tu foto" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center">
                                <UserCircleIcon className="w-20 h-20 text-slate-400" />
                            </div>
                        )}
                        <button onClick={() => setIsPhotoModalOpen(true)} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer">
                            <CameraIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mt-4">¡Bienvenido/a!</h2>
                    <p className="text-slate-500 mt-1 max-w-sm">Completa tu perfil para que las familias puedan encontrarte y conocerte mejor.</p>
                </section>

                <div className="space-y-6">
                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Información Personal</h3>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Tu nombre público</label>
                            <div className="relative">
                                <input id="name" name="name" type="text" value={profile.name} onChange={handleInputChange} placeholder="Ej: Sofía López" className="w-full bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <PencilIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Ubicación</h3>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Indica tu barrio o ciudad</label>
                            <button onClick={handleGetCurrentLocation} className="w-full text-sm text-teal-600 font-semibold p-2 mb-2 rounded-lg hover:bg-teal-50 transition-colors">
                                Usar mi ubicación actual
                            </button>
                            <div className="relative">
                                <input id="location" name="location" type="text" value={profile.location} onChange={handleInputChange} placeholder="Ej: Arganzuela, Madrid" className="w-full bg-slate-50 p-3 pl-4 pr-10 border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <MapPinIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                            {locationStatus === 'success' && <p className="text-sm text-green-600 mt-2">¡Ubicación detectada!</p>}
                        </div>
                    </section>
                    
                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Mis Servicios</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Marca las categorías en las que ofreces servicios</label>
                            <div className="space-y-3">
                                {serviceCategories.map(cat => {
                                    const isChecked = profile.categories.includes(cat.id);
                                    const styles = isChecked ? categoryStyles[cat.id] : defaultStyles;
                                    return (
                                    <div key={cat.id} className="transition-all duration-300">
                                        <label className={`flex items-center w-full p-3 border rounded-xl cursor-pointer transition-colors ${styles.label} ${styles.labelHover}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked} 
                                                onChange={() => handleCategoryToggle(cat.id)} 
                                                className={`h-5 w-5 rounded border-slate-300 ${styles.checkbox}`}
                                            />
                                            <span className={`ml-3 ${styles.span}`}>{cat.label}</span>
                                        </label>
                                        
                                        {isChecked && (
                                            <div className="p-4 mt-[-1px] bg-white rounded-b-xl border-x border-b border-slate-200 animate-fade-in space-y-4">
                                                <div>
                                                    <label htmlFor={`description-${cat.id}`} className="block text-sm font-medium text-teal-600 mb-1">
                                                        Describe tu experiencia en "{cat.label}"
                                                    </label>
                                                    <textarea 
                                                        id={`description-${cat.id}`} 
                                                        value={profile.descriptions[cat.id] || ''} 
                                                        onChange={(e) => handleDescriptionChange(cat.id, e.target.value)} 
                                                        maxLength={250} 
                                                        className="w-full h-24 p-3 bg-slate-50 border border-slate-300 rounded-xl resize-none text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        placeholder="Ej: Llevo 5 años cuidando niños, soy paciente y me encantan los juegos..."
                                                    />
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-700 mb-2">¿Qué ofreces?</h4>
                                                    <div className="space-y-2">
                                                        {serviceDetails[cat.id as CareCategory].offers.map(offer => (
                                                            <label key={offer} className="flex items-center text-sm text-slate-600">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={profile.detailedServices[cat.id as CareCategory]?.offers.includes(offer) || false}
                                                                    onChange={() => handleDetailedServiceToggle(cat.id as CareCategory, 'offers', offer)}
                                                                    className={`h-4 w-4 rounded border-slate-300 ${styles.checkbox}`}
                                                                />
                                                                <span className="ml-2">{offer}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-700 mb-2">¿Qué quieres destacar?</h4>
                                                    <div className="space-y-2">
                                                        {serviceDetails[cat.id as CareCategory].skills.map(skill => (
                                                            <label key={skill} className="flex items-center text-sm text-slate-600">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={profile.detailedServices[cat.id as CareCategory]?.skills.includes(skill) || false}
                                                                    onChange={() => handleDetailedServiceToggle(cat.id as CareCategory, 'skills', skill)}
                                                                    className={`h-4 w-4 rounded border-slate-300 ${styles.checkbox}`}
                                                                />
                                                                <span className="ml-2">{skill}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                
                        <div className="pt-4 border-t border-slate-200">
                            <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 mb-1">Tu tarifa por hora (€)</label>
                            <div className="relative">
                                <input id="hourlyRate" name="hourlyRate" type="number" value={profile.hourlyRate} onChange={handleInputChange} placeholder="Ej: 12" min="0" className="w-full bg-slate-50 p-3 pr-10 border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <CurrencyEuroIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-1">Nivel de Experiencia General</label>
                            <div className="relative">
                                <select id="experience" name="experience" value={profile.experience} onChange={handleInputChange} className="w-full appearance-none bg-slate-50 p-3 pr-10 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="" disabled>Selecciona una opción</option>
                                    {experienceLevels.map(level => (
                                        <option key={level.id} value={level.id}>{level.name}</option>
                                    ))}
                                </select>
                                <StarIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    </section>
                    
                    <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Verificación (Opcional)</h3>
                        <p className="text-sm text-slate-500">Sube tu DNI para obtener la insignia de "Verificado" y generar más confianza.</p>
                        <label htmlFor="id-upload" className="w-full flex items-center justify-center bg-slate-50 p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 hover:border-teal-400 transition-colors">
                            <IdentificationIcon className="w-6 h-6 text-slate-400 mr-2" />
                            <span className="text-slate-600 font-medium">Subir documento</span>
                        </label>
                        <input id="id-upload" type="file" className="hidden" accept="image/*,application/pdf" />
                    </section>
                </div>
            </main>
            
            <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-10">
                <div className="container mx-auto px-4 py-3">
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid || isSaving}
                        className="w-full flex items-center justify-center bg-teal-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Creando perfil...' : (
                            <>
                                <CheckCircleIcon className="w-6 h-6 mr-2" />
                                Crear Perfil
                            </>
                        )}
                    </button>
                </div>
            </footer>

            <PhotoUploadModal
                isOpen={isPhotoModalOpen}
                onClose={() => setIsPhotoModalOpen(false)}
                onTakePhoto={handleTakePhoto}
                onChooseFromGallery={handleChooseFromGallery}
            />
        </div>
    );
};

export default OfferService;

import React, { useState, useRef, useEffect } from 'react';
import { CareCategory } from '../types';
import HeartHandshakeIcon from './icons/HeartHandshakeIcon';
import ClipboardDocumentListIcon from './icons/ClipboardDocumentListIcon';
import StarIcon from './icons/StarIcon';
import CurrencyEuroIcon from './icons/CurrencyEuroIcon';
import CameraIcon from './icons/CameraIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UserIcon from './icons/UserIcon';
import PhoneIcon from './icons/PhoneIcon';
import IdentificationIcon from './icons/IdentificationIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';


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

const OfferService: React.FC<OfferServiceProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  
  // Step 1 State
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<CareCategory[]>([]);
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  
  // Step 2 State
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Step 3 State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idDocument, setIdDocument] = useState<File | null>(null);

  // Step 4 State
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const MAX_CHARS = 250;

  const isFormComplete = 
    categories.length > 0 &&
    categories.every(cat => descriptions[cat]?.trim().length > 0) &&
    experience &&
    hourlyRate &&
    parseFloat(hourlyRate) > 0;

  const isVerificationComplete = fullName.trim().length > 0 && phone.trim().length > 0;
  const isLocationComplete = locationStatus === 'success' || manualLocation.trim().length > 0;

  useEffect(() => {
    if (step === 2 && !photoDataUrl) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [step, photoDataUrl]);

  const handleCategoryChange = (category: CareCategory) => {
    setCategories(prev => {
      const newCategories = prev.includes(category) 
          ? prev.filter(c => c !== category) 
          : [...prev, category];

      if (!newCategories.includes(category)) {
        setDescriptions(currentDescs => {
          const newDescs = { ...currentDescs };
          delete newDescs[category];
          return newDescs;
        });
      }
      
      return newCategories;
    });
  };
  
  const handleDescriptionChange = (category: CareCategory, text: string) => {
    setDescriptions(prev => ({
      ...prev,
      [category]: text,
    }));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("No se pudo acceder a la cámara. Por favor, comprueba los permisos en tu navegador.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(video.videoWidth, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      }
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPhotoDataUrl(dataUrl);
      stopCamera();
    }
  };

  const handleRetakePhoto = () => {
    setPhotoDataUrl(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };
  
  const handleGetCurrentLocation = () => {
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location obtained:", position);
        setLocationStatus('success');
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus('error');
        alert('No se pudo obtener la ubicación. Por favor, habilita los permisos o introduce la dirección manualmente.');
      }
    );
  };

  const renderFormStep = () => (
    <>
      <div className="text-center mb-8">
        <HeartHandshakeIcon className="h-24 w-24 mx-auto text-teal-500" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">¡Crea tu perfil de cuidador!</h1>
      <p className="text-slate-600 mb-8">Completa estos primeros pasos y te ayudaremos a crear un perfil atractivo que inspire confianza.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tipos de Servicio (puedes elegir varios)</label>
          <div className="space-y-2">
            {serviceCategories.map(cat => (
              <label key={cat.id} className="flex items-center w-full bg-white p-3 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={categories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="h-5 w-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500"
                />
                <span className="ml-3 text-slate-700">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {categories.length > 0 && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <p className="text-sm font-medium text-slate-700">Ahora, describe cada servicio que ofreces:</p>
            {categories.sort().map(category => {
              const catInfo = serviceCategories.find(c => c.id === category);
              return (
                <div key={category}>
                  <label htmlFor={`description-${category}`} className="block text-sm font-medium text-teal-600 mb-1">
                    {catInfo?.label}
                  </label>
                  <div className="relative">
                    <textarea
                      id={`description-${category}`}
                      value={descriptions[category] || ''}
                      onChange={(e) => handleDescriptionChange(category, e.target.value)}
                      maxLength={MAX_CHARS}
                      placeholder={`Describe tu experiencia con ${catInfo?.label.toLowerCase()}...`}
                      className="w-full h-28 p-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      aria-label={`Descripción para ${catInfo?.label}`}
                    />
                    <div className="absolute bottom-3 right-4 text-sm text-slate-400">
                      {(descriptions[category] || '').length}/{MAX_CHARS}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-1">Nivel de Experiencia</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <StarIcon className="h-5 w-5 text-slate-400" />
            </div>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full appearance-none bg-white p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="" disabled>Selecciona tu experiencia</option>
              {experienceLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 mb-1">Tarifa por hora (€)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyEuroIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="Ej: 12"
              className="w-full bg-white p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              min="0"
            />
          </div>
        </div>
      </div>
        
      <div className="mt-8">
        <button 
          onClick={() => setStep(2)}
          disabled={!isFormComplete}
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed transform disabled:scale-100 hover:scale-105"
        >
          Continuar
        </button>
      </div>
    </>
  );

  const renderPhotoStep = () => (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">¡Genial! Ahora, una buena foto de perfil</h1>
      <p className="text-slate-600 mb-8">Asegúrate de que tu cara se vea bien. ¡Una sonrisa ayuda mucho!</p>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="w-64 h-64 rounded-full overflow-hidden bg-slate-200 shadow-lg flex items-center justify-center border-4 border-white">
          {photoDataUrl ? (
            <img src={photoDataUrl} alt="Vista previa del perfil" className="w-full h-full object-cover" />
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]"></video>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        {photoDataUrl ? (
          <div className="flex space-x-4">
            <button onClick={handleRetakePhoto} className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
              Repetir foto
            </button>
            <button onClick={() => setStep(3)} className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
              Confirmar
            </button>
          </div>
        ) : (
          <button onClick={handleTakePhoto} className="bg-teal-500 text-white rounded-full p-4 shadow-lg hover:bg-teal-600 transition-colors transform hover:scale-110">
            <CameraIcon className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );

  const renderVerificationStep = () => (
    <>
      <div className="text-center mb-8">
        <ShieldCheckIcon className="h-24 w-24 mx-auto text-teal-500" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Verificación de Identidad</h1>
      <p className="text-slate-600 mb-8">Un último paso para garantizar la seguridad en la comunidad. Tus datos son confidenciales.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-slate-400" /></div>
            <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ej: Ana García Pérez" className="w-full bg-white p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Número de Teléfono</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon className="h-5 w-5 text-slate-400" /></div>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ej: 600 123 456" className="w-full bg-white p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Correo Electrónico <span className="text-slate-500 font-normal">(Opcional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon className="h-5 w-5 text-slate-400" /></div>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: ana.garcia@email.com" className="w-full bg-white p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
          </div>
        </div>
        <div>
          <label htmlFor="id-upload" className="block text-sm font-medium text-slate-700 mb-1">
            Documento de Identidad <span className="text-slate-500 font-normal">(Opcional)</span>
          </label>
          <label htmlFor="id-upload" className="w-full flex items-center bg-white p-3 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><IdentificationIcon className="h-5 w-5 text-slate-400" /></div>
            <span className={`pl-7 truncate ${idDocument ? 'text-slate-800' : 'text-slate-400'}`}>{idDocument ? idDocument.name : 'Subir foto (DNI, Pasaporte...)'}</span>
          </label>
          <input id="id-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
        </div>
      </div>
      
      <div className="mt-8">
        <button 
          onClick={() => setStep(4)}
          disabled={!isVerificationComplete}
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed transform disabled:scale-100 hover:scale-105"
        >
          Indicar Ubicación
        </button>
      </div>
    </>
  );
  
  const renderLocationStep = () => (
    <>
      <div className="text-center mb-8">
        <MapPinIcon className="h-24 w-24 mx-auto text-teal-500" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Indica tu zona de trabajo</h1>
      <p className="text-slate-600 mb-8">Esto ayudará a que te encuentren personas cerca de ti. Puedes usar tu ubicación actual o introducir una dirección.</p>

      <div className="space-y-4">
        <button 
          onClick={handleGetCurrentLocation}
          disabled={locationStatus === 'loading'}
          className="w-full flex items-center justify-center bg-white border-2 border-teal-500 text-teal-500 px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-wait"
        >
          {locationStatus === 'loading' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500 mr-3"></div>}
          {locationStatus === 'loading' ? 'Buscando...' : 'Usar mi ubicación actual'}
        </button>

        {locationStatus === 'success' && <p className="text-center text-green-600 font-medium">¡Ubicación guardada con éxito!</p>}
        {locationStatus === 'error' && <p className="text-center text-red-600 font-medium">Hubo un error al obtener la ubicación.</p>}

        <div className="text-center">
          <button onClick={() => setShowManualInput(!showManualInput)} className="text-sm text-slate-500 hover:text-teal-600 font-medium">
            O, introduce una dirección manualmente
          </button>
        </div>

        {showManualInput && (
          <div className="animate-fade-in">
            <label htmlFor="manualLocation" className="block text-sm font-medium text-slate-700 mb-1">Dirección o Barrio</label>
            <div className="relative">
              <input 
                id="manualLocation" 
                type="text" 
                value={manualLocation} 
                onChange={(e) => setManualLocation(e.target.value)} 
                placeholder="Ej: Calle Mayor, 1, Madrid" 
                className="w-full bg-white p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition" 
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button 
          onClick={onClose}
          disabled={!isLocationComplete}
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed transform disabled:scale-100 hover:scale-105"
        >
          Finalizar y Guardar Perfil
        </button>
      </div>
    </>
  );


  const renderStepContent = () => {
    switch (step) {
      case 1: return renderFormStep();
      case 2: return renderPhotoStep();
      case 3: return renderVerificationStep();
      case 4: return renderLocationStep();
      default: return renderFormStep();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      <header className="flex-shrink-0 bg-slate-50/80 backdrop-blur-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-end">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : onClose()} 
            className="text-slate-600 font-semibold hover:text-teal-500"
          >
            {step > 1 ? 'Atrás' : 'Salir'}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 pb-28">
        {renderStepContent()}
      </main>
    </div>
  );
};

export default OfferService;


import React, { useEffect, useRef, useState } from 'react';
import { Provider, CareCategory } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MapPinIcon from './icons/MapPinIcon';
import ArrowsPointingOutIcon from './icons/ArrowsPointingOutIcon';
import ArrowsPointingInIcon from './icons/ArrowsPointingInIcon';
import ElderlyIcon from './icons/ElderlyIcon';
import ChildIcon from './icons/ChildIcon';
import PetIcon from './icons/PetIcon';
import UsersIcon from './icons/UsersIcon';


// This is a global from the script tag in index.html
declare var L: any;

interface MapViewProps {
  providers: Provider[];
  userLocation: { latitude: number; longitude: number } | null;
  locationError: string | null;
  onViewProfile: (providerId: number) => void;
  onBack: () => void;
  onLocationUpdate: (location: { latitude: number; longitude: number } | null) => void;
  onLocationLoading: (isLoading: boolean) => void;
  onLocationError: (error: string | null) => void;
}

// Color scheme for categories
const categoryColors = {
  [CareCategory.ELDERLY]: '#3b82f6', // blue-500
  [CareCategory.CHILDREN]: '#f59e0b', // amber-500
  [CareCategory.PETS]: '#22c55e', // green-500
  'multiple': '#14b8a6', // teal-500
};

// New function to get provider color
const getProviderColor = (provider: Provider): string => {
  if (provider.categories.length === 1) {
    return categoryColors[provider.categories[0]] || categoryColors['multiple'];
  }
  return categoryColors['multiple'];
};


// Custom DivIcon for Leaflet markers
const createProviderIcon = (provider: Provider, color: string) => {
    return L.divIcon({
        html: `
            <div class="custom-marker-pin" style="--marker-color: ${color};">
                <div class="pin-body">
                    <img src="${provider.photoUrl}" alt="${provider.name}" />
                </div>
                <div class="pin-pointer"></div>
            </div>
        `,
        className: '', 
        iconSize: [44, 56],
        iconAnchor: [22, 56],
        tooltipAnchor: [0, -60]
    });
};


const MapView: React.FC<MapViewProps> = ({ 
    providers, 
    userLocation, 
    locationError,
    onViewProfile, 
    onBack,
    onLocationUpdate,
    onLocationLoading,
    onLocationError
}) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapStatus, setMapStatus] = useState<'requesting' | 'loading' | 'ready' | 'error'>(() => {
    // If we already have location OR we've already tried and got an error, go straight to the map.
    if (userLocation || locationError) {
      return 'ready';
    }
    // Otherwise, it's the first time, so request permission.
    return 'requesting';
  });
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMapCategory, setSelectedMapCategory] = useState<CareCategory | 'all'>('all');

  // Function to request user's location
  const handleRequestLocation = () => {
    setMapStatus('loading');
    onLocationLoading(true);
    onLocationError(null);

    if (!navigator.geolocation) {
        onLocationError("La geolocalización no es compatible con tu navegador. Mostrando una ubicación por defecto.");
        onLocationUpdate(null);
        onLocationLoading(false);
        setMapStatus('ready'); // Proceed with default location
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            onLocationUpdate({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            onLocationLoading(false);
            setMapStatus('ready');
        },
        (error) => {
            let errorMsg = "No se pudo obtener tu ubicación. Por favor, revisa los permisos del navegador.";
            if (error.code === error.PERMISSION_DENIED) {
                errorMsg = "Permiso de ubicación denegado. Mostrando una ubicación por defecto.";
            }
            onLocationError(errorMsg);
            onLocationUpdate(null); // Clear location
            onLocationLoading(false);
            setMapStatus('ready'); // Still proceed to show map with default location
        },
        { timeout: 10000 }
    );
  };
  
  // Effect to initialize the map once we are in the 'ready' state
  useEffect(() => {
    if (mapStatus === 'ready' && mapContainerRef.current && !isMapInitialized) {
      // Default to Madrid if no user location
      const mapCenter: [number, number] = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : [40.4168, -3.7038];

      const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(mapCenter, 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add zoom controls to the top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      setIsMapInitialized(true);
    }
  }, [mapStatus, userLocation, isMapInitialized]);

  // Effect to add/update markers when providers or map initialization changes
  useEffect(() => {
    if (isMapInitialized && mapRef.current) {
        // Clear existing provider markers to avoid duplicates on re-render
        mapRef.current.eachLayer((layer: any) => {
            if (layer.options && (layer.options.pane === 'markerPane' || layer.options.pane === 'shadowPane') && !layer.options.isUserLocation) {
                 mapRef.current.removeLayer(layer);
            }
        });

      // Add user location marker
      if (userLocation) {
        L.circleMarker([userLocation.latitude, userLocation.longitude], {
            radius: 8,
            color: '#ffffff',
            weight: 2,
            fillColor: '#0ea5e9', // sky-500
            fillOpacity: 1,
            isUserLocation: true // Custom property to avoid removal
        }).addTo(mapRef.current).bindTooltip("Tu ubicación");
      }
      
      const filteredProviders = selectedMapCategory === 'all'
          ? providers
          : providers.filter(provider => provider.categories.includes(selectedMapCategory));

      // Add provider markers
      filteredProviders.forEach(provider => {
        const color = getProviderColor(provider);
        const icon = createProviderIcon(provider, color);
        const marker = L.marker([provider.coordinates.latitude, provider.coordinates.longitude], { icon })
          .addTo(mapRef.current)
          .bindTooltip(provider.name, { direction: 'top' })
          .on('click', () => {
            onViewProfile(provider.id);
          });
      });
      
      // Invalidate size to ensure map renders correctly after initial setup
      setTimeout(() => mapRef.current.invalidateSize(), 100);
    }
  }, [isMapInitialized, providers, userLocation, onViewProfile, selectedMapCategory]);

  // Effect to invalidate map size when expanding/collapsing
  useEffect(() => {
    if (isMapInitialized && mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 350); // Slightly longer than the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isMapInitialized]);


  if (mapStatus === 'requesting') {
    return (
        <div className="fixed inset-0 bg-slate-100/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center animate-fade-in">
                <MapPinIcon className="w-24 h-24 text-teal-500 mb-6 mx-auto" />
                <h1 className="text-2xl font-bold text-slate-800">Encuentra cuidadores cerca de ti</h1>
                <p className="text-slate-600 mt-2 max-w-sm mx-auto">Para mostrarte los cuidadores más cercanos, necesitamos acceder a tu ubicación. Tu ubicación solo se usará para esta búsqueda.</p>
                <button
                    onClick={handleRequestLocation}
                    className="mt-8 bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 w-full hover:shadow-lg hover:-translate-y-0.5"
                >
                    Permitir acceso a la ubicación
                </button>
                <button onClick={onBack} className="mt-4 text-slate-500 font-medium hover:text-slate-700 w-full py-2">
                    Volver
                </button>
            </div>
        </div>
    );
  }

  if (mapStatus === 'loading') {
    return (
      <div className="fixed inset-0 bg-slate-100/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-slate-500">Obteniendo tu ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-slate-100/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in transition-padding duration-300 ${isExpanded ? 'p-2 sm:p-4' : 'p-4'}`}>
      <div className={`bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${isExpanded ? 'w-full h-full' : 'w-full max-w-lg h-[90vh] max-h-[700px]'}`}>
        
        <header className="p-4 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:text-teal-500 rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2 bg-gradient-to-r from-teal-500 to-green-500 text-transparent bg-clip-text">Explora en el Mapa</h1>
                </div>
                 <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="p-2 text-slate-600 hover:text-teal-500 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label={isExpanded ? 'Contraer mapa' : 'Expandir mapa'}
                >
                    {isExpanded ? <ArrowsPointingInIcon className="w-6 h-6" /> : <ArrowsPointingOutIcon className="w-6 h-6" />}
                </button>
            </div>
            <p className={`text-sm text-slate-600 transition-all duration-300 ${isExpanded ? 'md:ml-2' : 'md:ml-10'}`}>
                Este mapa te permite encontrar cuidadores de confianza en tu zona. Pulsa sobre cualquier perfil para ver más detalles.
            </p>
        </header>

        <div ref={mapContainerRef} className="w-full flex-grow z-10" />

        <footer className={`flex-shrink-0 bg-gradient-to-t from-white to-slate-50/50 transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-32 overflow-y-auto p-4 pt-2 border-t border-slate-200' : 'max-h-[300px] overflow-hidden p-4 border-t border-slate-200'}`}>
            <h3 className="text-center font-bold text-lg text-slate-800 mb-1">Filtra por Servicio</h3>
            <p className="text-center text-sm text-slate-500 mb-4">Pulsa una categoría para ver solo esos cuidadores.</p>
            
            <div className="grid grid-cols-4 gap-3 text-center">
                
                <button onClick={() => setSelectedMapCategory(CareCategory.ELDERLY)} className={`focus:outline-none rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${selectedMapCategory !== 'all' && selectedMapCategory !== CareCategory.ELDERLY ? 'opacity-50 hover:opacity-100' : 'opacity-100 scale-105'}`}>
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: categoryColors[CareCategory.ELDERLY], boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.1)' }}>
                        <ElderlyIcon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }} />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-700">Mayores</p>
                </button>

                <button onClick={() => setSelectedMapCategory(CareCategory.CHILDREN)} className={`focus:outline-none rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 ${selectedMapCategory !== 'all' && selectedMapCategory !== CareCategory.CHILDREN ? 'opacity-50 hover:opacity-100' : 'opacity-100 scale-105'}`}>
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: categoryColors[CareCategory.CHILDREN], boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.1)' }}>
                        <ChildIcon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }} />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-700">Niños</p>
                </button>
                
                <button onClick={() => setSelectedMapCategory(CareCategory.PETS)} className={`focus:outline-none rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${selectedMapCategory !== 'all' && selectedMapCategory !== CareCategory.PETS ? 'opacity-50 hover:opacity-100' : 'opacity-100 scale-105'}`}>
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: categoryColors[CareCategory.PETS], boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.1)' }}>
                        <PetIcon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }} />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-700">Mascotas</p>
                </button>
                
                <button onClick={() => setSelectedMapCategory('all')} className={`focus:outline-none rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ${selectedMapCategory !== 'all' ? 'opacity-50 hover:opacity-100' : 'opacity-100 scale-105'}`}>
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: categoryColors['multiple'], boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.1)' }}>
                        <UsersIcon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }} />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-700">Todos</p>
                </button>

            </div>
        </footer>
      </div>
    </div>
  );
};

export default MapView;
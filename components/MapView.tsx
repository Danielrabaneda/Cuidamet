
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Provider, CareCategory } from '../types';
import ProfileDetail from './ProfileDetail'; // To show full details

// Icons
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import XMarkIcon from './icons/XMarkIcon';
import LayersIcon from './icons/LayersIcon';
import GpsFixedIcon from './icons/GpsFixedIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import ShareIcon from './icons/ShareIcon';
import DirectionsIcon from './icons/DirectionsIcon';
import PlayIcon from './icons/PlayIcon';
import StorefrontIcon from './icons/StorefrontIcon';
import QueueListIcon from './icons/QueueListIcon';
import ElderlyIcon from './icons/ElderlyIcon';
import ChildIcon from './icons/ChildIcon';
import PetIcon from './icons/PetIcon';
import UserCircleIcon from './icons/UserCircleIcon';


// This is a global from the script tag in index.html
declare var L: any;

interface MapViewProps {
  providers: Provider[];
  userLocation: { latitude: number; longitude: number } | null;
  onViewProfile: (providerId: number) => void;
  onBack: () => void;
  onRequestLocation: () => void;
  isLocationLoading: boolean;
}

const categoryStyles: Record<CareCategory, { color: string, name: string, icon: React.ReactElement }> = {
    [CareCategory.ELDERLY]: { color: 'teal', name: 'Mayores', icon: <ElderlyIcon className="w-5 h-5" /> },
    [CareCategory.CHILDREN]: { color: 'amber', name: 'Niños', icon: <ChildIcon className="w-5 h-5" /> },
    [CareCategory.PETS]: { color: 'green', name: 'Mascotas', icon: <PetIcon className="w-5 h-5" /> },
};

const createProviderIcon = (provider: Provider) => {
    const primaryCategory = provider.categories[0] || CareCategory.ELDERLY;
    const color = categoryStyles[primaryCategory]?.color || 'teal';
    const hexColor = { teal: '#14b8a6', amber: '#f59e0b', green: '#22c55e' }[color] || '#14b8a6';

    return L.divIcon({
        html: `
            <div class="custom-marker-pin" style="--marker-color: ${hexColor};">
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

const MapView: React.FC<MapViewProps> = ({ providers, userLocation, onViewProfile, onBack, onRequestLocation, isLocationLoading }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [providerId: string]: any }>({});
  const userLocationMarkerRef = useRef<any>(null);
  const firstLocationUpdate = useRef(true);
  
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [sheetState, setSheetState] = useState<'hidden' | 'partial' | 'full'>('hidden');
  const [mapCategoryFilter, setMapCategoryFilter] = useState<CareCategory | 'all'>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);

  // Unified Sheet Logic
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  
  const isProvider = !!selectedProvider;
  const partialSheetHeight = isProvider ? 280 : 210;
  const controlsBottomPosition = sheetState === 'hidden' ? 24 : (partialSheetHeight + 16);

  const filterButtons = [
    { id: 'all', name: 'Todos', icon: <QueueListIcon className="w-6 h-6"/>, style: 'bg-slate-800 text-white' },
    { id: CareCategory.ELDERLY, name: 'Mayores', icon: <ElderlyIcon className="w-6 h-6" />, style: 'bg-teal-500 text-white' },
    { id: CareCategory.CHILDREN, name: 'Niños', icon: <ChildIcon className="w-6 h-6" />, style: 'bg-amber-500 text-white' },
    { id: CareCategory.PETS, name: 'Mascotas', icon: <PetIcon className="w-6 h-6" />, style: 'bg-green-500 text-white' },
  ];

  useEffect(() => {
    if (mapContainerRef.current && !isMapInitialized) {
      const mapCenter: [number, number] = [37.9796, -1.1578];
      const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(mapCenter, 14);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      setIsMapInitialized(true);
      setSheetState('partial'); // Show location sheet on load
      onRequestLocation();
    }
  }, [isMapInitialized, onRequestLocation]);
  
  useEffect(() => {
    if (!isMapInitialized || !mapRef.current) return;

    if (userLocation) {
        const userIcon = L.divIcon({
            html: `<div class="user-location-marker"><div class="user-location-dot"></div></div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        if (userLocationMarkerRef.current) {
            userLocationMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);
        } else {
            userLocationMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon, zIndexOffset: -100 }).addTo(mapRef.current);
        }

        if (firstLocationUpdate.current) {
            mapRef.current.flyTo([userLocation.latitude, userLocation.longitude], 16, { duration: 1 });
            firstLocationUpdate.current = false;
        }
    }
  }, [isMapInitialized, userLocation]);

  const handleRecenter = () => {
      onRequestLocation();
      if (userLocation && mapRef.current) {
          mapRef.current.flyTo([userLocation.latitude, userLocation.longitude], 16, { duration: 1 });
      }
  };


  const handleMarkerClick = useCallback((provider: Provider) => {
    setSelectedProvider(provider);
    setSheetState('partial');
    if (mapRef.current) {
        mapRef.current.flyTo([provider.coordinates.latitude - 0.008, provider.coordinates.longitude], 15, { duration: 0.5 });
    }
    
    document.querySelectorAll('.custom-marker-pin.selected').forEach(el => el.classList.remove('selected'));
    const markerElement = (markersRef.current[provider.id] as any)?._icon;
    if (markerElement) {
        markerElement.querySelector('.custom-marker-pin')?.classList.add('selected');
    }

  }, []);

  useEffect(() => {
    if (!isMapInitialized || !mapRef.current) return;
    
    const providerIds = new Set(providers.map(p => p.id));
    Object.keys(markersRef.current).forEach(id => {
        if (!providerIds.has(Number(id))) {
            mapRef.current.removeLayer(markersRef.current[id]);
            delete markersRef.current[id];
        }
    });

    providers.forEach(provider => {
        if (!markersRef.current[provider.id]) {
            const icon = createProviderIcon(provider);
            const marker = L.marker([provider.coordinates.latitude, provider.coordinates.longitude], { icon, riseOnHover: true })
                .on('click', () => handleMarkerClick(provider));
            markersRef.current[provider.id] = marker;
        }
    });
  }, [isMapInitialized, providers, handleMarkerClick]);
  
  useEffect(() => {
    if (!isMapInitialized || !mapRef.current) return;
    
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const provider = providers.find(p => p.id === Number(id));
      if (!provider) return;
      
      const categoryMatch = mapCategoryFilter === 'all' || provider.categories.includes(mapCategoryFilter as CareCategory);
      const priceMatch = maxPriceFilter === null || provider.hourlyRate <= maxPriceFilter;
      
      const shouldBeVisible = categoryMatch && priceMatch;
      
      if (shouldBeVisible) {
        if (!mapRef.current.hasLayer(marker)) (marker as any).addTo(mapRef.current);
      } else {
        if (mapRef.current.hasLayer(marker)) mapRef.current.removeLayer(marker);
      }
    });
  }, [mapCategoryFilter, maxPriceFilter, providers, isMapInitialized]);


  const handleSheetClose = () => {
    setSheetState('partial');
    setSelectedProvider(null);
    document.querySelectorAll('.custom-marker-pin.selected').forEach(el => el.classList.remove('selected'));
  };
  
  const toggleSheetState = () => {
      if (!selectedProvider) return; // Only allow expanding for provider profiles
      if (sheetContentRef.current) sheetContentRef.current.scrollTop = 0;
      setSheetState(prev => (prev === 'full' ? 'partial' : 'full'));
  };

  const getSheetTransform = () => {
    const isProvider = !!selectedProvider;
    const partialHeight = isProvider ? 280 : 210;
    const fullHeight = isProvider ? (window.innerHeight - 80) : partialHeight; // Location sheet doesn't expand

    switch (sheetState) {
        case 'full': return `translateY(calc(100vh - ${fullHeight}px))`;
        case 'partial': return `translateY(calc(100vh - ${partialHeight}px))`;
        default: return 'translateY(100vh)';
    }
  };
  
  const handleCategoryFilterChange = (category: CareCategory | 'all') => {
      setMapCategoryFilter(category);
      if (selectedProvider && category !== 'all' && !selectedProvider.categories.includes(category)) {
          handleSheetClose();
      }
      if (selectedProvider && maxPriceFilter !== null && selectedProvider.hourlyRate > maxPriceFilter) {
          handleSheetClose();
      }
  };


  return (
    <div className="w-screen h-screen overflow-hidden relative bg-slate-200">
      <div className="hidden bg-teal-100 bg-amber-100 bg-green-100 bg-teal-500 bg-amber-500 bg-green-500"></div>

      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      <div className="absolute top-0 left-0 right-0 p-4 z-10 pointer-events-none">
          <div className="relative bg-white rounded-full shadow-lg flex items-center pointer-events-auto max-w-lg mx-auto">
              <button onClick={onBack} className="p-3 text-slate-500 hover:text-teal-500">
                  <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <input type="text" placeholder="Busqueda por precio..." className="w-full h-full bg-transparent py-3 focus:outline-none text-slate-800 placeholder:text-slate-400" />
              <button className="p-3 text-slate-500 hover:text-slate-800">
                  <XMarkIcon className="w-6 h-6" />
              </button>
          </div>
      </div>

      <div className="absolute top-20 right-4 z-10 pointer-events-auto">
          <button className="bg-white rounded-full shadow-lg p-3 block ml-auto"><LayersIcon className="w-6 h-6 text-slate-700"/></button>
      </div>
      
      <div 
        className="absolute right-4 z-10 flex flex-col items-end gap-3 pointer-events-none transition-all duration-300 ease-out"
        style={{ bottom: `${controlsBottomPosition}px` }}
      >
        <button 
            onClick={handleRecenter} 
            className="bg-white rounded-full shadow-lg p-3 block pointer-events-auto transition-transform hover:scale-105"
            aria-label="Centrar en mi ubicación"
        >
            <GpsFixedIcon className={`w-6 h-6 text-slate-700 ${isLocationLoading ? 'animate-spin' : ''}`} />
        </button>

        <div className="bg-white rounded-full shadow-lg p-2 flex items-center pointer-events-auto w-40">
            <label htmlFor="price-filter" className="text-slate-500 pl-2 text-sm whitespace-nowrap">Precio max:</label>
            <input
                id="price-filter"
                type="number"
                placeholder="€/hr"
                value={maxPriceFilter === null ? '' : String(maxPriceFilter)}
                onChange={(e) => {
                    const val = e.target.value;
                    setMaxPriceFilter(val === '' ? null : Number(val));
                }}
                className="w-full bg-transparent text-right pr-2 text-slate-800 font-semibold focus:outline-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />
        </div>

        <div className="flex flex-col gap-3 pointer-events-auto">
            {filterButtons.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => handleCategoryFilterChange(filter.id as CareCategory | 'all')}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 ${mapCategoryFilter === filter.id ? 'ring-2 ring-white ring-offset-2 ' + filter.style : filter.style + ' opacity-90 hover:opacity-100'}`}
                    aria-label={`Filtrar por ${filter.name}`}
                >
                    {filter.icon}
                </button>
            ))}
        </div>
      </div>


      {/* Unified Bottom Sheet */}
      <div
          ref={sheetRef}
          className="absolute left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-20"
          style={{
              transform: getSheetTransform(),
              transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
              height: 'calc(100vh - 80px)',
          }}
      >
          <button onClick={toggleSheetState} className="w-full p-2 cursor-grab" aria-label="Expandir o contraer viñeta">
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto" />
          </button>
          
          <div ref={sheetContentRef} className="h-full overflow-y-auto pb-48">
             {selectedProvider ? (
                // PROVIDER VIEW
                <>
                    <div className={`p-4 pt-0 transition-opacity ${sheetState === 'full' ? 'opacity-0 pointer-events-none h-0' : 'opacity-100'}`}>
                        <div className="flex justify-between items-start">
                             <div className="flex items-start space-x-4">
                                <img src={selectedProvider.photoUrl} alt={selectedProvider.name} className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedProvider.name}</h2>
                                    <p className="text-sm text-slate-500">{selectedProvider.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><BookmarkIcon className="w-6 h-6" /></button>
                                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><ShareIcon className="w-6 h-6" /></button>
                                <button onClick={handleSheetClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-3">
                            <button onClick={() => onViewProfile(selectedProvider.id)} className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-teal-600 transition-colors">
                                <UserCircleIcon className="w-5 h-5" />
                                <span>Ver Perfil</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className={`transition-opacity ${sheetState === 'full' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {/* The ProfileDetail component itself is not fixed, so it can scroll within this container */}
                        <ProfileDetail provider={selectedProvider} isLoading={false} onBack={toggleSheetState} onBookNow={() => onViewProfile(selectedProvider.id)} />
                    </div>
                </>
             ) : (
                // LOCATION VIEW
                <div className="p-4 pt-0">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Explora el mapa</h2>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setSheetState('hidden')} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
                        </div>
                    </div>
                    <p className="text-slate-600 mt-2">Usa los filtros de la derecha para encontrar cuidadores. Toca un marcador para ver los detalles.</p>
                    {!userLocation && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                            <p className="text-sm text-yellow-800">
                                {isLocationLoading ? 'Buscando tu ubicación...' : 'Activa tu ubicación para ver cuidadores cerca de ti.'}
                            </p>
                            {!isLocationLoading && 
                                <button onClick={handleRecenter} className="mt-2 text-sm font-semibold text-yellow-900 bg-yellow-200 px-3 py-1 rounded-md">
                                    Activar
                                </button>
                            }
                        </div>
                    )}
                </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default MapView;

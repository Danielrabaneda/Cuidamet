

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Provider, CareCategory } from '../types';

// Icons
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import GpsFixedIcon from './icons/GpsFixedIcon';
import QueueListIcon from './icons/QueueListIcon';
import ElderlyIcon from './icons/ElderlyIcon';
import ChildIcon from './icons/ChildIcon';
import PetIcon from './icons/PetIcon';


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

const categoryStyles: Record<CareCategory, { color: string, name: string }> = {
    [CareCategory.ELDERLY]: { color: 'teal', name: 'Mayores' },
    [CareCategory.CHILDREN]: { color: 'amber', name: 'Niños' },
    [CareCategory.PETS]: { color: 'green', name: 'Mascotas' },
};

const createProviderIcon = (provider: Provider) => {
    const primaryCategory = provider.categories[0] || CareCategory.ELDERLY;
    const color = categoryStyles[primaryCategory]?.color || 'teal';
    const hexColor = { teal: '#14b8a6', amber: '#f59e0b', green: '#22c55e' }[color] || '#14b8a6';
    const isDistinguished = provider.isPremium || provider.badges?.some(b => b === 'Mejor Valorado' || b === 'Respuesta Rápida');
    const distinguishedClass = isDistinguished ? 'distinguished-marker' : '';


    return L.divIcon({
        html: `
            <div class="custom-marker-pin ${distinguishedClass}" style="--marker-color: ${hexColor};">
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
  const [sheetState, setSheetState] = useState<'hidden' | 'partial'>('hidden');
  const [mapCategoryFilter, setMapCategoryFilter] = useState<CareCategory | 'all'>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);


  const sheetRef = useRef<HTMLDivElement>(null);
  
  const partialSheetHeight = 210;
  
  const filterButtonsConfig = [
    { id: 'all' as const, name: 'Todos', style: 'bg-slate-100 text-slate-700', activeStyle: 'bg-slate-800 text-white' },
    { id: CareCategory.ELDERLY, name: 'Mayores', style: 'bg-teal-50 text-teal-700', activeStyle: 'bg-teal-500 text-white' },
    { id: CareCategory.CHILDREN, name: 'Niños', style: 'bg-amber-50 text-amber-700', activeStyle: 'bg-amber-500 text-white' },
    { id: CareCategory.PETS, name: 'Mascotas', style: 'bg-green-50 text-green-700', activeStyle: 'bg-green-500 text-white' },
  ];


  useEffect(() => {
    if (mapContainerRef.current && !isMapInitialized) {
      const mapCenter: [number, number] = [40.4168, -3.7038];
      const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(mapCenter, 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      setIsMapInitialized(true);
      setSheetState('partial');
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
    onViewProfile(provider.id);
  }, [onViewProfile]);
  

  useEffect(() => {
    if (!isMapInitialized || !mapRef.current) return;

    Object.values(markersRef.current).forEach(marker => {
      if (mapRef.current.hasLayer(marker)) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = {};

    const filteredProviders = providers.filter(provider => {
      const categoryMatch = mapCategoryFilter === 'all' || provider.categories.includes(mapCategoryFilter as CareCategory);
      const priceMatch = maxPriceFilter === null || provider.hourlyRate <= maxPriceFilter;
      return categoryMatch && priceMatch;
    });

    filteredProviders.forEach(provider => {
      const icon = createProviderIcon(provider);
      const marker = L.marker([provider.coordinates.latitude, provider.coordinates.longitude], { icon, riseOnHover: true })
        .on('click', () => handleMarkerClick(provider))
        .addTo(mapRef.current);
      
      markersRef.current[provider.id] = marker;
    });

  }, [isMapInitialized, providers, mapCategoryFilter, maxPriceFilter, handleMarkerClick]);


  const getSheetTransform = () => {
    switch (sheetState) {
        case 'partial': return `translateY(calc(100vh - ${partialSheetHeight}px))`;
        default: return 'translateY(100vh)';
    }
  };
  
  const handleCategoryFilterChange = (category: CareCategory | 'all') => {
      setMapCategoryFilter(category);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-slate-200">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Header / Back Button */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center pointer-events-none">
          <button
              onClick={onBack}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto hover:bg-white transition-colors"
              aria-label="Volver"
          >
              <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
          </button>
      </div>

      {/* Map Controls */}
      <div className="absolute top-20 right-4 z-10 flex flex-col gap-3 pointer-events-auto">
          <button
              onClick={handleRecenter}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
              aria-label="Centrar en mi ubicación"
          >
              {isLocationLoading ? (
                  <div className="w-6 h-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
              ) : (
                  <GpsFixedIcon className="w-6 h-6 text-slate-700" />
              )}
          </button>
      </div>

      {/* Bottom Sheet */}
      <div
          ref={sheetRef}
          className="absolute top-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-500 ease-in-out z-20"
          style={{ transform: getSheetTransform() }}
      >
          <div className="p-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-center text-slate-800">Cuidadores Cercanos</h2>
          </div>
          <div className="p-4">
              <h3 className="font-semibold text-slate-700 mb-3">Filtrar por categoría</h3>
              <div className="flex gap-2 justify-center">
                  {filterButtonsConfig.map(({ id, name, style, activeStyle }) => {
                      let icon = null;
                      if (id === 'all') {
                          icon = <QueueListIcon className="w-6 h-6" />;
                      } else if (id === CareCategory.ELDERLY) {
                          icon = <ElderlyIcon className="w-6 h-6" />;
                      } else if (id === CareCategory.CHILDREN) {
                          icon = <ChildIcon className="w-6 h-6" />;
                      } else if (id === CareCategory.PETS) {
                          icon = <PetIcon className="w-6 h-6" />;
                      }

                      return (
                          <button
                              key={id}
                              onClick={() => handleCategoryFilterChange(id)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl w-20 h-20 transition-all ${mapCategoryFilter === id ? activeStyle : style + ' hover:bg-slate-200'}`}
                          >
                              <div className={`p-2 rounded-full mb-1 transition-colors ${mapCategoryFilter === id ? '' : 'bg-white'}`}>
                                  {icon}
                              </div>
                              <span className="text-xs font-medium">{name}</span>
                          </button>
                      );
                  })}
              </div>
          </div>
      </div>
      
      {/* Fallback for Tailwind JIT */}
      <div className="hidden bg-teal-100 bg-amber-100 bg-green-100 bg-teal-500 bg-amber-500 bg-green-500"></div>
    </div>
  );
};

export default MapView;

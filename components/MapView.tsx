

import React, { useEffect, useRef, useState } from 'react';
import { Provider, CareCategory } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MapPinIcon from './icons/MapPinIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';


// This is a global from the script tag in index.html
declare var L: any;

interface MapViewProps {
  providers: Provider[];
  userLocation: { latitude: number; longitude: number } | null;
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
    onViewProfile, 
    onBack,
    onLocationUpdate,
    onLocationLoading,
    onLocationError
}) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapStatus, setMapStatus] = useState<'requesting' | 'loading' | 'ready' | 'error'>('requesting');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);

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

      // Add provider markers
      providers.forEach(provider => {
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
  }, [isMapInitialized, providers, userLocation, onViewProfile]);


  if (mapStatus === 'requesting') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
        <MapPinIcon className="w-24 h-24 text-teal-400 mb-6" />
        <h1 className="text-2xl font-bold text-slate-800">Encuentra cuidadores cerca de ti</h1>
        <p className="text-slate-600 mt-2 max-w-sm">Para mostrarte los cuidadores más cercanos, necesitamos acceder a tu ubicación. Tu ubicación solo se usará para esta búsqueda.</p>
        <button
          onClick={handleRequestLocation}
          className="mt-8 bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Permitir acceso a la ubicación
        </button>
        <button onClick={onBack} className="mt-4 text-slate-500 font-medium hover:text-slate-700">
          Volver
        </button>
      </div>
    );
  }

  if (mapStatus === 'loading') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        <p className="mt-4 text-slate-500">Obteniendo tu ubicación...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <button 
          onClick={onBack} 
          className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full text-slate-700 hover:text-teal-500 hover:bg-white transition-all duration-200 shadow-md"
          aria-label="Volver"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </header>
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Legend Toggle Button */}
      <div className="absolute bottom-6 right-4 z-20">
        <button 
          onClick={() => setIsLegendVisible(!isLegendVisible)}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full text-slate-700 hover:text-teal-500 hover:bg-white transition-all duration-200 shadow-md"
          aria-label="Mostrar leyenda del mapa"
        >
          <InformationCircleIcon className="w-7 h-7" />
        </button>
      </div>
      
      {/* Legend Panel */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-lg p-4 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out ${isLegendVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg text-slate-800">Leyenda del Mapa</h3>
          <button onClick={() => setIsLegendVisible(false)} className="text-slate-500 hover:text-slate-800 text-2xl font-light">&times;</button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Cada cuidador está marcado en el mapa con un pin de color según su especialidad principal.
        </p>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-center"><span className="w-4 h-4 rounded-full mr-3 border border-slate-200" style={{ backgroundColor: categoryColors[CareCategory.ELDERLY] }}></span>Cuidado de Mayores</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full mr-3 border border-slate-200" style={{ backgroundColor: categoryColors[CareCategory.CHILDREN] }}></span>Cuidado de Niños</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full mr-3 border border-slate-200" style={{ backgroundColor: categoryColors[CareCategory.PETS] }}></span>Cuidado de Mascotas</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full mr-3 border border-slate-200" style={{ backgroundColor: categoryColors['multiple'] }}></span>Múltiples Servicios</li>
        </ul>
        <p className="text-sm text-slate-600 mt-4 pt-3 border-t border-slate-200">
          <strong>Consejo:</strong> Pulsa en cualquier pin para ver el perfil detallado del cuidador.
        </p>
      </div>
    </div>
  );
};

export default MapView;
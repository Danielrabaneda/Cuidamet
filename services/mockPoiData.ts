import { POI, PoiCategory, PoiType } from '../types';

export const MOCK_POIS: POI[] = [
  // PETS
  { id: 101, name: 'Clínica Veterinaria Retiro', category: PoiCategory.PETS, type: PoiType.VET, coordinates: { latitude: 40.4120, longitude: -3.6820 } },
  { id: 102, name: 'Tiendanimal Mundo Pet', category: PoiCategory.PETS, type: PoiType.PET_STORE, coordinates: { latitude: 40.4255, longitude: -3.6930 } },
  { id: 103, name: 'Parque Canino El Retiro', category: PoiCategory.PETS, type: PoiType.DOG_PARK, coordinates: { latitude: 40.4148, longitude: -3.6805 } },
  { id: 104, name: 'Kiwoko', category: PoiCategory.PETS, type: PoiType.PET_STORE, coordinates: { latitude: 40.4021, longitude: -3.7015 } },
  { id: 105, name: 'Hospital Veterinario Chamberí', category: PoiCategory.PETS, type: PoiType.VET, coordinates: { latitude: 40.4350, longitude: -3.7050 } },

  // CHILDREN
  { id: 201, name: 'Parque Infantil Madrid Río', category: PoiCategory.CHILDREN, type: PoiType.PLAYGROUND, coordinates: { latitude: 40.4038, longitude: -3.7120 } },
  { id: 202, name: 'Colegio Público San Isidoro', category: PoiCategory.CHILDREN, type: PoiType.SCHOOL, coordinates: { latitude: 40.4185, longitude: -3.7080 } },
  { id: 203, name: 'Biblioteca Pública Municipal Eugenio Trías', category: PoiCategory.CHILDREN, type: PoiType.LIBRARY, coordinates: { latitude: 40.4105, longitude: -3.6760 } },
  { id: 204, name: 'CEIP Cervantes', category: PoiCategory.CHILDREN, type: PoiType.SCHOOL, coordinates: { latitude: 40.4111, longitude: -3.7001 } },
  { id: 205, name: 'Parque del Oeste', category: PoiCategory.CHILDREN, type: PoiType.PLAYGROUND, coordinates: { latitude: 40.4290, longitude: -3.7200 } },
  
  // ELDERLY
  { id: 301, name: 'Centro de Salud Cortes', category: PoiCategory.ELDERLY, type: PoiType.HEALTH_CENTER, coordinates: { latitude: 40.4130, longitude: -3.6980 } },
  { id: 302, name: 'Farmacia del Paseo', category: PoiCategory.ELDERLY, type: PoiType.PHARMACY, coordinates: { latitude: 40.4210, longitude: -3.6890 } },
  { id: 303, name: 'Centro de Día Municipal Salamanca', category: PoiCategory.ELDERLY, type: PoiType.DAY_CENTER, coordinates: { latitude: 40.4295, longitude: -3.6750 } },
  { id: 304, name: 'Farmacia 24h Atocha', category: PoiCategory.ELDERLY, type: PoiType.PHARMACY, coordinates: { latitude: 40.4075, longitude: -3.6920 } },
  { id: 305, name: 'Centro de Salud Argüelles', category: PoiCategory.ELDERLY, type: PoiType.HEALTH_CENTER, coordinates: { latitude: 40.4300, longitude: -3.7140 } },
];




export enum CareCategory {
  ELDERLY = 'Elderly Care',
  CHILDREN = 'Child Care',
  PETS = 'Pet Care',
}

export interface ServiceDescription {
  category: CareCategory;
  text: string;
}

export interface Review {
  id: number;
  authorName: string;
  authorPhotoUrl: string;
  rating: number; // 1 to 5
  comment: string;
  date: string; // e.g., 'Hace 2 semanas'
}

export interface Provider {
  id: number;
  name: string;
  photoUrl: string;
  categories: CareCategory[];
  distance: number; // in kilometers, calculated dynamically
  rating: number; // out of 5
  reviewsCount: number;
  descriptions: ServiceDescription[];
  services: string[];
  hourlyRate: number; // in EUR
  location: string;
  verifications: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reviews: Review[];
  badges?: string[];
  isPremium?: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  read: boolean;
}

export interface ChatConversation {
  id: number;
  provider: Provider;
  messages: Message[];
}

// FIX: Added missing BookingDetails interface.
export interface BookingDetails {
  providerId: number;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalCost: number;
  discountAmount: number;
  insuranceCost: number;
}

// FIX: Added missing POI (Point of Interest) related types to resolve import errors.
export enum PoiCategory {
  PETS = 'Pets',
  CHILDREN = 'Children',
  ELDERLY = 'Elderly',
}

export enum PoiType {
  VET = 'Veterinarian',
  PET_STORE = 'Pet Store',
  DOG_PARK = 'Dog Park',
  PLAYGROUND = 'Playground',
  SCHOOL = 'School',
  LIBRARY = 'Library',
  HEALTH_CENTER = 'Health Center',
  PHARMACY = 'Pharmacy',
  DAY_CENTER = 'Day Center',
}

export interface POI {
  id: number;
  name: string;
  category: PoiCategory;
  type: PoiType;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface LegalDocument {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}
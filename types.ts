
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
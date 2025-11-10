
import React, { useState, useEffect } from 'react';
import { CareCategory, Provider, ChatConversation, Message } from './types';
import { MOCK_PROVIDERS } from './services/mockData';
import { MOCK_CHATS } from './services/mockChatData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CategorySelector from './components/CategorySelector';
import ProviderCard from './components/ProviderCard';
import LandingPage from './components/LandingPage';
import ProfileDetail from './components/ProfileDetail';
import OfferService from './components/OfferService';
import Inbox from './components/Inbox';
import Chat from './components/Chat';
import ProfilePage from './components/ProfilePage';
import MapView from './components/MapView';

const getDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};


const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'providers' | 'favorites' | 'profile' | 'offer' | 'inbox' | 'chat' | 'myProfile' | 'map'>('landing');
  const [previousView, setPreviousView] = useState<'providers' | 'favorites' | 'map'>('providers');
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CareCategory | 'all'>('all');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching data 
    setIsLoading(true);
    setTimeout(() => {
      setProviders(MOCK_PROVIDERS);
      setChats(MOCK_CHATS);
      setIsLoading(false);
    }, 1500);

    // Only check for geolocation support, don't request it on load
    if (!navigator.geolocation) {
      setLocationError("La geolocalización no es compatible con tu navegador.");
    }
  }, []);

  const unreadCount = chats.reduce((count, chat) => {
    return count + chat.messages.filter(m => m.sender === 'other' && !m.read).length;
  }, 0);

  const handleToggleFavorite = (providerId: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(providerId)) {
        newFavorites.delete(providerId);
      } else {
        newFavorites.add(providerId);
      }
      return newFavorites;
    });
  };

  const handleCategorySelect = (category: CareCategory) => {
    setSelectedCategory(category);
    setView('providers');
  };

  const handleShowAll = (category: CareCategory | 'all') => {
    setSelectedCategory(category);
  }
  
  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
    setSelectedCategory('all');
    setView('providers');
  };

  const handleNavigateHome = () => {
    setView('landing');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleShowAllProviders = () => {
    setSelectedCategory('all');
    setView('providers');
  };
  
  const handleNavigateMap = () => {
    setView('map');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };

  const handleNavigateFavorites = () => {
    setView('favorites');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleNavigateInbox = () => {
    setView('inbox');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  }

  const handleNavigateOffer = () => {
    setView('offer');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleNavigateMyProfile = () => {
    setView('myProfile');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };

  const handleViewProfile = (providerId: number) => {
    if (view === 'providers' || view === 'favorites' || view === 'map') {
      setPreviousView(view);
    }
    setSelectedProviderId(providerId);
    setView('profile');
    setIsProfileLoading(true);

    // Simulate fetching provider data
    setTimeout(() => {
        setIsProfileLoading(false);
    }, 1200);
  };

  const handleBackToList = () => {
    setView(previousView);
    setSelectedProviderId(null);
  }
  
  const handleBackToInbox = () => {
    setView('inbox');
    setCurrentChatId(null);
  }

  const handleViewChat = (chatId: number) => {
    // Mark messages as read
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.map(m => ({ ...m, read: true }))
        };
      }
      return chat;
    }));
    setCurrentChatId(chatId);
    setView('chat');
  };

  const handleContactProvider = (providerId: number) => {
    const existingChat = chats.find(chat => chat.provider.id === providerId);
    if (existingChat) {
      handleViewChat(existingChat.id);
    } else {
      const provider = providers.find(p => p.id === providerId);
      if (provider) {
        const newChat: ChatConversation = {
          id: chats.length + 1,
          provider,
          messages: [],
        };
        setChats(prevChats => [...prevChats, newChat]);
        setCurrentChatId(newChat.id);
        setView('chat');
      }
    }
  };
  
  const handleSendMessage = (chatId: number, text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
        };
      }
      return chat;
    }));
  };

  const renderContent = () => {
    const providersWithDistance = userLocation
      ? providers.map(p => ({
          ...p,
          distance: getDistanceInKm(
            userLocation.latitude,
            userLocation.longitude,
            p.coordinates.latitude,
            p.coordinates.longitude
          ),
      }))
      : providers;

    if (view === 'map') {
      return <MapView 
        providers={providersWithDistance} 
        userLocation={userLocation} 
        onViewProfile={handleViewProfile} 
        onBack={handleNavigateHome}
        onLocationUpdate={setUserLocation}
        onLocationLoading={setIsLocationLoading}
        onLocationError={setLocationError}
      />;
    }

    if (view === 'offer') {
      return <OfferService onClose={handleNavigateHome} />;
    }

    if (view === 'profile' && selectedProviderId) {
      const provider = providersWithDistance.find(p => p.id === selectedProviderId);
      return (
        <ProfileDetail
          provider={isProfileLoading ? null : provider}
          isLoading={isProfileLoading}
          onBack={handleBackToList}
          onContact={handleContactProvider}
        />
      );
    }
    
    if (view === 'inbox') {
      return <Inbox chats={chats} onViewChat={handleViewChat} />;
    }

    if (view === 'chat' && currentChatId) {
        const chat = chats.find(c => c.id === currentChatId);
        if (chat) {
            return <Chat chat={chat} onBack={handleBackToInbox} onSendMessage={handleSendMessage} />;
        }
    }

    if (view === 'landing') {
      return <LandingPage onCategorySelect={handleCategorySelect} onShowAll={handleShowAllProviders} onNavigateMap={handleNavigateMap} onSearch={handleSearch} />;
    }
    
    if (view === 'myProfile') {
      return <ProfilePage onNavigateFavorites={handleNavigateFavorites} />;
    }
    
    // Providers or Favorites view
    const baseProviders = view === 'favorites'
      ? providersWithDistance.filter(p => favorites.has(p.id))
      : providersWithDistance;

    const categoryFilteredProviders = (selectedCategory === 'all' 
      ? baseProviders
      : baseProviders.filter(p => p.categories.includes(selectedCategory))
    );

    const searchedProviders = searchQuery.trim() === ''
      ? categoryFilteredProviders
      : categoryFilteredProviders.filter(provider => {
          const query = searchQuery.toLowerCase().trim();
          
          const nameMatch = provider.name.toLowerCase().includes(query);
          const locationMatch = provider.location.toLowerCase().includes(query);
          const serviceMatch = provider.services.some(service => service.toLowerCase().includes(query));
          const descriptionMatch = provider.descriptions.some(desc => desc.text.toLowerCase().includes(query));
          
          return nameMatch || locationMatch || serviceMatch || descriptionMatch;
      });

    const filteredProviders = searchedProviders.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));


    return (
      <>
        <Header searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
        <CategorySelector selectedCategory={selectedCategory} onSelectCategory={handleShowAll} />
        
        <main className="container mx-auto px-4 py-6 pb-24">
          {locationError && !userLocation && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md shadow" role="alert">
              <p className="font-bold">Aviso de ubicación</p>
              <p>{locationError}</p>
            </div>
          )}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
              <p className="mt-4 text-slate-500">Buscando cuidadores...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProviders.length > 0 ? (
                filteredProviders.map(provider => (
                  <ProviderCard 
                    key={provider.id} 
                    provider={provider}
                    isFavorite={favorites.has(provider.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewProfile={handleViewProfile}
                    currentCategory={selectedCategory}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  {view === 'favorites' ? (
                    <>
                      <p className="text-slate-500">Aún no tienes cuidadores favoritos.</p>
                      <p className="text-slate-500 mt-1">Pulsa el corazón en un perfil para añadirlo.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-600 font-semibold text-lg">No se encontraron resultados</p>
                      <p className="text-slate-500 mt-1">Prueba a cambiar los filtros o el término de búsqueda.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </>
    );
  };

  const showBottomNav = view !== 'profile' && view !== 'chat' && view !== 'offer' && !isLocationLoading;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {renderContent()}
      {showBottomNav && (
         <BottomNav 
            currentView={view} 
            onNavigateHome={handleNavigateHome} 
            onNavigateFavorites={handleNavigateFavorites}
            onNavigateOffer={handleNavigateOffer}
            onNavigateInbox={handleNavigateInbox}
            onNavigateProfile={handleNavigateMyProfile}
            unreadCount={unreadCount}
          />
      )}
    </div>
  );
};

export default App;

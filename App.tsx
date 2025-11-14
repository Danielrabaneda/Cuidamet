

import React, { useState, useEffect } from 'react';
import { CareCategory, Provider, ChatConversation, Message, BookingDetails, LegalDocument } from './types';
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
import MyCaregiverProfilePage from './components/MyCaregiverProfilePage';
import MapView from './components/MapView';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUsPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import HelpCenterPage from './components/HelpCenterPage';
import PricesPage from './components/PricesPage';
import SecurityPage from './components/SecurityPage';
import VerificationPage from './components/VerificationPage';
import SettingsPage from './components/SettingsPage';
import EditProfilePage from './components/EditProfilePage';
import SecuritySettingsPage from './components/SecuritySettingsPage';
import NotificationsPage from './components/NotificationsPage';
import LegalInfoPage from './components/LegalInfoPage';
import LegalDocumentPage from './components/LegalDocumentPage';
import ConfirmationModal from './components/ConfirmationModal';
import { legalDocuments } from './services/legalContent';
import BookingPage from './components/BookingPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';
import PageHeader from './components/PageHeader';
import SupportPage from './components/SupportPage';
import SupportChatPage from './components/SupportChatPage';
import SupportEmailPage from './components/SupportEmailPage';


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

type View = 'landing' | 'providers' | 'favorites' | 'profile' | 'offer' | 'inbox' | 'chat' | 'myProfile' | 'map' | 'prices' | 'security' | 'verification' | 'help' | 'about' | 'blog' | 'contact' | 'settings' | 'editProfile' | 'securitySettings' | 'notifications' | 'legalInfo' | 'legalDocument' | 'myCaregiverProfile' | 'booking' | 'payment' | 'confirmation' | 'support' | 'supportChat' | 'supportEmail';


const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [previousView, setPreviousView] = useState<'providers' | 'favorites' | 'map' | 'settings' | 'myProfile' | 'legalInfo' | 'myCaregiverProfile' | 'profile' | 'support'>('providers');
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
  
  const [currentLegalDocument, setCurrentLegalDocument] = useState<LegalDocument | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationModalConfig, setConfirmationModalConfig] = useState({
      title: '',
      message: '',
      confirmText: '',
      onConfirm: () => {},
  });
  
  const [editingCategory, setEditingCategory] = useState<CareCategory | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [navigationContext, setNavigationContext] = useState<View | null>(null);


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

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("La geolocalización no es compatible con tu navegador.");
      return;
    }
    setIsLocationLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocationLoading(false);
      },
      (error) => {
        setLocationError("No se pudo obtener tu ubicación. Activa los permisos.");
        setIsLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

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
    window.scrollTo(0, 0);
    setSelectedCategory(category);
    setView('providers');
  };

  const handleShowAll = (category: CareCategory | 'all') => {
    window.scrollTo(0, 0);
    setSelectedCategory(category);
  }
  
  const handleSearch = (query: string) => {
    window.scrollTo(0, 0);
    setSearchQuery(query.trim());
    setSelectedCategory('all');
    setView('providers');
  };

  const handleNavigateHome = () => {
    window.scrollTo(0, 0);
    setView('landing');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleShowAllProviders = () => {
    window.scrollTo(0, 0);
    setSelectedCategory('all');
    setView('providers');
  };
  
  const handleNavigateMap = () => {
    window.scrollTo(0, 0);
    setView('map');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };

  const handleNavigateFavorites = () => {
    if (view === 'myProfile') {
        setNavigationContext('myProfile');
    } else {
        setNavigationContext(null);
    }
    window.scrollTo(0, 0);
    setView('favorites');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleNavigateInbox = () => {
    window.scrollTo(0, 0);
    setView('inbox');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  }

  const handleNavigateOffer = () => {
    window.scrollTo(0, 0);
    setView('offer');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleNavigateMyProfile = () => {
    window.scrollTo(0, 0);
    setView('myProfile');
    setSelectedProviderId(null);
    setCurrentChatId(null);
  };
  
  const handleNavigateSettings = () => {
      setPreviousView('myProfile');
      setView('settings');
  };
  
  const handleBackToProfile = () => {
      setView('myProfile');
      setNavigationContext(null);
  };

  const handleNavigateSupport = () => {
    setPreviousView('myProfile');
    setView('support');
  };

  const handleBackToSupport = () => {
    setView('support');
  };
  
  const handleBackToSettings = () => {
      setView('settings');
  }

  const handleNavigateMyCaregiverProfile = () => setView('myCaregiverProfile');
  
  const handleNavigateEditProfile = (category: CareCategory | null = null) => {
    setPreviousView(view as 'settings' | 'myCaregiverProfile');
    setEditingCategory(category);
    setView('editProfile');
  };

  const handleBackFromEdit = () => {
    setView(previousView as 'settings' | 'myCaregiverProfile');
  }

  const handleNavigateSecuritySettings = () => setView('securitySettings');
  const handleNavigateNotifications = () => setView('notifications');
  const handleNavigateLegalInfo = () => {
    setPreviousView('settings');
    setView('legalInfo');
  };

  const handleNavigateLegalDocument = (docId: string) => {
    const doc = legalDocuments.find(d => d.id === docId);
    if (doc) {
      setCurrentLegalDocument(doc);
      setPreviousView('legalInfo');
      setView('legalDocument');
    }
  };

  const handleBackToLegalInfo = () => {
    setView('legalInfo');
    setCurrentLegalDocument(null);
  }

  const handleShowConfirmation = (config: Omit<typeof confirmationModalConfig, 'onConfirm'> & { onConfirm: () => void }) => {
    setConfirmationModalConfig(config);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const handleLogout = () => {
    handleShowConfirmation({
        title: 'Cerrar Sesión',
        message: '¿Estás seguro de que quieres cerrar tu sesión?',
        confirmText: 'Cerrar Sesión',
        onConfirm: () => {
            console.log('Logging out...');
            handleCloseConfirmation();
            setView('landing');
        },
    });
  };

  const handleDeleteAccount = () => {
    handleShowConfirmation({
        title: 'Eliminar Cuenta',
        message: 'Esta acción es irreversible. Todos tus datos se borrarán permanentemente. ¿Estás seguro?',
        confirmText: 'Sí, eliminar mi cuenta',
        onConfirm: () => {
            console.log('Deleting account...');
            handleCloseConfirmation();
            setView('landing');
        },
    });
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
    if (view === 'booking' || view === 'payment') {
        setView('profile');
        return;
    }
    setView(previousView as 'providers' | 'favorites' | 'map');
    setSelectedProviderId(null);
    setBookingDetails(null);
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
    const provider = providers.find(p => p.id === providerId);
    if (!provider) return;

    const existingChat = chats.find(chat => chat.provider.id === providerId);
    if (existingChat) {
        handleViewChat(existingChat.id);
    } else {
        const newChat: ChatConversation = {
            id: chats.length + 1,
            provider,
            messages: [],
        };
        setChats(prevChats => [...prevChats, newChat]);
        handleViewChat(newChat.id);
    }
  };

  const handleStartBooking = (providerId: number) => {
      setSelectedProviderId(providerId);
      setView('booking');
  };

  const handleProceedToPayment = (details: BookingDetails) => {
      setBookingDetails(details);
      setView('payment');
  };

  const handleConfirmPayment = () => {
      // In a real app, payment would be processed here
      setView('confirmation');
  };

  const handleFinishBooking = () => {
      if (bookingDetails) {
          handleContactProvider(bookingDetails.providerId);
          setBookingDetails(null);
          setSelectedProviderId(null);
      } else {
          handleNavigateHome(); // Fallback
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
  
  const handleFooterNavigate = (targetView: string) => {
    window.scrollTo(0, 0);
    switch (targetView) {
        case 'providers':
            handleShowAllProviders();
            break;
        case 'offer':
            handleNavigateOffer();
            break;
        default:
            setView(targetView as View);
            break;
    }
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
        onBack={() => setView('landing')}
        onRequestLocation={handleRequestLocation}
        isLocationLoading={isLocationLoading}
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
          onBookNow={handleStartBooking}
          onContact={handleContactProvider}
        />
      );
    }
    
    if (view === 'booking' && selectedProviderId) {
        const provider = providers.find(p => p.id === selectedProviderId);
        if (provider) {
            return <BookingPage provider={provider} onProceed={handleProceedToPayment} onBack={() => setView('profile')} />;
        }
    }
    
    if (view === 'payment' && selectedProviderId && bookingDetails) {
        const provider = providers.find(p => p.id === selectedProviderId);
        if (provider) {
            return <PaymentPage provider={provider} bookingDetails={bookingDetails} onConfirm={handleConfirmPayment} onBack={() => setView('booking')} />;
        }
    }

    if (view === 'confirmation' && selectedProviderId && bookingDetails) {
        const provider = providers.find(p => p.id === selectedProviderId);
        if (provider) {
            return <ConfirmationPage provider={provider} bookingDetails={bookingDetails} onGoToChat={handleFinishBooking} />;
        }
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
    
    // Static Pages
    if (view === 'prices') return <PricesPage onBack={handleNavigateHome} />;
    if (view === 'security') return <SecurityPage onBack={handleNavigateHome} />;
    if (view === 'verification') return <VerificationPage onBack={handleNavigateHome} />;
    if (view === 'help') return <HelpCenterPage onBack={handleNavigateHome} />;
    if (view === 'about') return <AboutUsPage onBack={handleNavigateHome} />;
    if (view === 'blog') return <BlogPage onBack={handleNavigateHome} />;
    if (view === 'contact') return <ContactPage onBack={handleNavigateHome} />;


    if (view === 'landing') {
      return <LandingPage onCategorySelect={handleCategorySelect} onShowAll={handleShowAllProviders} onNavigateMap={handleNavigateMap} onSearch={handleSearch} />;
    }
    
    if (view === 'myProfile') {
      return <ProfilePage onNavigateFavorites={handleNavigateFavorites} onNavigateSettings={handleNavigateSettings} onNavigateMyCaregiverProfile={handleNavigateMyCaregiverProfile} onNavigateSupport={handleNavigateSupport} />;
    }
    
    // Settings Pages
    if (view === 'settings') {
        return <SettingsPage 
            onBack={handleBackToProfile} 
            onNavigateEditProfile={() => handleNavigateEditProfile(null)}
            onNavigateSecurity={handleNavigateSecuritySettings}
            onNavigateNotifications={handleNavigateNotifications}
            onNavigateLegal={handleNavigateLegalInfo}
            onLogout={handleLogout}
        />;
    }
    if (view === 'myCaregiverProfile') return <MyCaregiverProfilePage onBack={handleBackToProfile} onNavigateEditProfile={handleNavigateEditProfile} />;
    if (view === 'editProfile') return <EditProfilePage onBack={handleBackFromEdit} editingCategory={editingCategory} />;
    if (view === 'securitySettings') return <SecuritySettingsPage onBack={handleBackToSettings} onDeleteAccount={handleDeleteAccount} />;
    if (view === 'notifications') return <NotificationsPage onBack={handleBackToSettings} />;
    if (view === 'legalInfo') return <LegalInfoPage onBack={handleBackToSettings} onNavigateLegalDocument={handleNavigateLegalDocument} documents={legalDocuments} />;
    if (view === 'legalDocument' && currentLegalDocument) {
      return <LegalDocumentPage onBack={handleBackToLegalInfo} title={currentLegalDocument.title} content={currentLegalDocument.content} />;
    }
    
    // Support Pages
    if (view === 'support') return <SupportPage onBack={handleBackToProfile} onNavigateChat={() => { setPreviousView('support'); setView('supportChat'); }} onNavigateEmail={() => { setPreviousView('support'); setView('supportEmail'); }} />;
    if (view === 'supportChat') return <SupportChatPage onBack={handleBackToSupport} />;
    if (view === 'supportEmail') return <SupportEmailPage onBack={handleBackToSupport} />;

    const renderProviderGrid = (providersToList: Provider[], viewType: 'providers' | 'favorites') => {
        return isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-slate-500">Buscando cuidadores...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {providersToList.length > 0 ? (
              providersToList.map(provider => (
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
                {viewType === 'favorites' ? (
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
        );
    };

    if (view === 'providers' || view === 'favorites') {
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

        const filteredProviders = searchedProviders.sort((a, b) => {
            if (a.isPremium && !b.isPremium) return -1;
            if (!a.isPremium && b.isPremium) return 1;
            return (a.distance ?? Infinity) - (b.distance ?? Infinity);
        });

        if (view === 'favorites' && navigationContext === 'myProfile') {
            return (
                <>
                    <PageHeader title="Favoritos" onBack={handleBackToProfile} />
                    <main className="container mx-auto px-4 py-6 pb-24">
                        {renderProviderGrid(filteredProviders, 'favorites')}
                    </main>
                </>
            );
        }

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
                    {renderProviderGrid(filteredProviders, view)}
                </main>
            </>
        );
    }

    return null; // Should not be reached if all views are handled
  };

  const isFullScreenView = ['map', 'profile', 'chat', 'offer', 'booking', 'payment', 'confirmation', 'supportChat', 'supportEmail'].includes(view);
  const showBottomNav = !isFullScreenView;
  const showFooter = !['landing', 'providers', 'favorites', 'myProfile', 'inbox', ...isFullScreenView ? ['map', 'profile', 'chat', 'offer', 'booking', 'payment', 'confirmation', 'supportChat', 'supportEmail'] : []].includes(view) && !isFullScreenView;


  return (
    <div className="bg-slate-50 min-h-screen">
       <div className={showBottomNav ? 'pb-24' : ''}>
        {renderContent()}
        {showFooter && <Footer onNavigate={handleFooterNavigate} />}
      </div>

      {showBottomNav && (
          <BottomNav 
            currentView={view as any} 
            onNavigateHome={handleNavigateHome}
            onNavigateFavorites={handleNavigateFavorites}
            onNavigateOffer={handleNavigateOffer}
            onNavigateInbox={handleNavigateInbox}
            onNavigateProfile={handleNavigateMyProfile}
            unreadCount={unreadCount}
          />
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          {...confirmationModalConfig}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default App;
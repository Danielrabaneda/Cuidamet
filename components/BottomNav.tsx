import React from 'react';
import HomeIcon from './icons/HomeIcon';
import HeartIcon from './icons/HeartIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import InboxIcon from './icons/InboxIcon';
import UserIcon from './icons/UserIcon';

interface BottomNavProps {
    currentView: 'landing' | 'providers' | 'favorites' | 'offer' | 'inbox' | 'chat' | 'myProfile' | 'map';
    onNavigateHome: () => void;
    onNavigateFavorites: () => void;
    onNavigateOffer: () => void;
    onNavigateInbox: () => void;
    onNavigateProfile: () => void;
    unreadCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigateHome, onNavigateFavorites, onNavigateOffer, onNavigateInbox, onNavigateProfile, unreadCount }) => {
    const navItems = [
        { key: 'home', icon: HomeIcon, label: 'Inicio', active: currentView === 'landing' || currentView === 'providers' || currentView === 'map', action: onNavigateHome },
        { key: 'favorites', icon: HeartIcon, label: 'Favoritos', active: currentView === 'favorites', action: onNavigateFavorites },
        { key: 'offer', icon: PlusCircleIcon, label: 'Ofrecer', active: currentView === 'offer', action: onNavigateOffer },
        { key: 'inbox', icon: InboxIcon, label: 'Buzón', active: currentView === 'inbox', action: onNavigateInbox },
        { key: 'profile', icon: UserIcon, label: 'Tú', active: currentView === 'myProfile', action: onNavigateProfile },
    ];

    const regularItems = navItems.filter(item => item.key !== 'offer');
    const offerItem = navItems.find(item => item.key === 'offer');

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
            <div className="container mx-auto h-20">
                <div className="flex justify-around items-center h-full">
                    {/* First two items */}
                    {regularItems.slice(0, 2).map((item) => (
                        <button
                            key={item.key}
                            onClick={item.action}
                            className="flex flex-col items-center justify-center text-center py-2 w-1/5 group hover:bg-slate-50 transition-colors focus:outline-none"
                            aria-label={item.label}
                        >
                            <item.icon className={`h-6 w-6 mb-1 transition-colors ${item.active ? 'text-teal-500' : 'text-slate-500 group-hover:text-teal-500'}`} />
                            <span className={`text-xs font-medium transition-colors ${item.active ? 'text-teal-500' : 'text-slate-600 group-hover:text-teal-500'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}

                    {/* Central prominent button */}
                    {offerItem && (
                        <div className="w-1/5 flex justify-center">
                             <button
                                onClick={offerItem.action}
                                className="flex flex-col items-center justify-center text-center group focus:outline-none"
                                aria-label={offerItem.label}
                            >
                                <div className="bg-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform -translate-y-5 group-hover:bg-teal-600 transition-all duration-300 group-hover:scale-105 group-focus:ring-2 group-focus:ring-offset-2 group-focus:ring-teal-500">
                                    <offerItem.icon className="w-8 h-8"/>
                                </div>
                                <span className={`text-xs font-medium transition-colors transform -translate-y-3.5 ${offerItem.active ? 'text-teal-500' : 'text-slate-600 group-hover:text-teal-500'}`}>
                                    {offerItem.label}
                                </span>
                            </button>
                        </div>
                    )}
                    
                    {/* Last two items */}
                    {regularItems.slice(2).map((item) => (
                        <button
                            key={item.key}
                            onClick={item.action}
                            className="relative flex flex-col items-center justify-center text-center py-2 w-1/5 group hover:bg-slate-50 transition-colors focus:outline-none"
                            aria-label={item.label}
                        >
                            <item.icon className={`h-6 w-6 mb-1 transition-colors ${item.active ? 'text-teal-500' : 'text-slate-500 group-hover:text-teal-500'}`} />
                            <span className={`text-xs font-medium transition-colors ${item.active ? 'text-teal-500' : 'text-slate-600 group-hover:text-teal-500'}`}>
                                {item.label}
                            </span>
                             {item.key === 'inbox' && unreadCount > 0 && (
                                <div className="absolute top-1 right-4 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                                    {unreadCount}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;
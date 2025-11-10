import React from 'react';
import HeartIcon from './icons/HeartIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import ArrowRightOnRectangleIcon from './icons/ArrowRightOnRectangleIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ProfilePageProps {
  onNavigateFavorites: () => void;
  onNavigateSettings: () => void;
  onNavigateMyCaregiverProfile: () => void;
}

interface ListItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ icon, label, onClick }) => (
  <li className="border-b border-slate-200 last:border-b-0">
    <button
      onClick={onClick}
      className="w-full flex items-center py-4 text-left hover:bg-slate-100 px-4 rounded-lg transition-colors"
    >
      <div className="text-slate-500">{icon}</div>
      <span className="ml-4 flex-grow text-slate-700 font-medium">{label}</span>
      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
    </button>
  </li>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateFavorites, onNavigateSettings, onNavigateMyCaregiverProfile }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
        <main className="container mx-auto px-4 py-6 pb-28">
            {/* User Info Header */}
            <div className="flex items-center space-x-4 py-4">
                <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                <h2 className="text-xl font-bold text-slate-800">María L.</h2>
                <p className="text-sm text-slate-500">En Cuidamet desde 2024</p>
                </div>
            </div>

            {/* Account Section */}
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                Cuenta
                </h3>
                <ul className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <ListItem
                        icon={<HeartIcon className="w-6 h-6" />}
                        label="Favoritos"
                        onClick={onNavigateFavorites}
                    />
                    <ListItem
                        icon={<UserCircleIcon className="w-6 h-6" />}
                        label="Mi Perfil de Cuidador"
                        onClick={onNavigateMyCaregiverProfile}
                    />
                     <ListItem
                        icon={<Cog6ToothIcon className="w-6 h-6" />}
                        label="Configuración"
                        onClick={onNavigateSettings}
                    />
                </ul>
            </div>

            {/* Support Section */}
            <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                Soporte
                </h3>
                <ul className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <ListItem
                        icon={<QuestionMarkCircleIcon className="w-6 h-6" />}
                        label="Centro de Ayuda"
                        onClick={() => alert('Navegando al centro de ayuda...')}
                    />
                </ul>
            </div>
            
             {/* Logout Button */}
            <div className="mt-10">
                <button
                onClick={() => alert('Cerrando sesión...')}
                className="w-full flex items-center justify-center py-3 text-center text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors"
                >
                <ArrowRightOnRectangleIcon className="w-6 h-6 mr-2" />
                Cerrar Sesión
                </button>
            </div>

        </main>
    </div>
  );
};

export default ProfilePage;
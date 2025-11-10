import React from 'react';
import PageHeader from './PageHeader';
import UserCircleIcon from './icons/UserCircleIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import BellIcon from './icons/BellIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import ArrowRightOnRectangleIcon from './icons/ArrowRightOnRectangleIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SettingsPageProps {
  onBack: () => void;
  onNavigateEditProfile: () => void;
  onNavigateSecurity: () => void;
  onNavigateNotifications: () => void;
  onNavigateLegal: () => void;
  onLogout: () => void;
}

interface ListItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SettingsListItem: React.FC<ListItemProps> = ({ icon, label, onClick }) => (
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

const SettingsPage: React.FC<SettingsPageProps> = ({ 
    onBack, 
    onNavigateEditProfile,
    onNavigateSecurity,
    onNavigateNotifications,
    onNavigateLegal,
    onLogout
}) => {
  const settingsOptions = [
    { icon: <UserCircleIcon className="w-6 h-6" />, label: 'Editar el perfil', action: onNavigateEditProfile },
    { icon: <ShieldCheckIcon className="w-6 h-6" />, label: 'Verificaciones y seguridad', action: onNavigateSecurity },
    { icon: <BellIcon className="w-6 h-6" />, label: 'Notificaciones', action: onNavigateNotifications },
    { icon: <DocumentTextIcon className="w-6 h-6" />, label: 'Tu información legal', action: onNavigateLegal },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Configuración" onBack={onBack} />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <ul>
            {settingsOptions.map((option) => (
              <SettingsListItem
                key={option.label}
                icon={option.icon}
                label={option.label}
                onClick={option.action}
              />
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
            <button
            onClick={onLogout}
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

export default SettingsPage;
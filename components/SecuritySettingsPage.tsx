import React from 'react';
import PageHeader from './PageHeader';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ToggleSwitch from './ToggleSwitch';
import DesktopComputerIcon from './icons/DesktopComputerIcon';
import DevicePhoneMobileIcon from './icons/DevicePhoneMobileIcon';

interface SecuritySettingsPageProps {
  onBack: () => void;
  onDeleteAccount: () => void;
}

const loginActivity = [
    { device: 'Este dispositivo', type: 'desktop', location: 'Madrid, España', time: 'Ahora', icon: <DesktopComputerIcon className="w-8 h-8 text-slate-500" /> },
    { device: 'iPhone 14 Pro', type: 'mobile', location: 'Barcelona, España', time: 'Ayer a las 20:15', icon: <DevicePhoneMobileIcon className="w-8 h-8 text-slate-500" /> },
];

const SecuritySettingsPage: React.FC<SecuritySettingsPageProps> = ({ onBack, onDeleteAccount }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Verificaciones y Seguridad" onBack={onBack} />
      <main className="container mx-auto px-4 py-6 pb-36">
        
        <div className="text-center mb-8">
            <div className="inline-block bg-teal-100 p-4 rounded-full">
                <ShieldCheckIcon className="w-12 h-12 text-teal-600"/>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Gestiona tu seguridad</h2>
            <p className="text-slate-600 mt-1 max-w-md mx-auto">Mantén tu cuenta protegida con nuestras herramientas de seguridad.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                <div>
                    <p className="font-medium text-slate-800">Cambiar contraseña</p>
                    <p className="text-sm text-slate-500">Se recomienda una contraseña segura y única.</p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </button>
            <div className="flex items-center justify-between p-4">
                 <div>
                    <p className="font-medium text-slate-800">Autenticación de dos factores</p>
                    <p className="text-sm text-slate-500">Añade una capa extra de seguridad a tu cuenta.</p>
                 </div>
                 <ToggleSwitch />
            </div>
        </div>

        <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                Actividad de inicio de sesión
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
                {loginActivity.map((activity, index) => (
                    <div key={index} className="flex items-center p-4 space-x-4">
                        <div className="bg-slate-100 p-3 rounded-lg">
                            {activity.icon}
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold text-slate-800">{activity.device}</p>
                            <p className="text-sm text-slate-500">{activity.location}</p>
                        </div>
                        <p className="text-sm text-slate-500 text-right">{activity.time}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-10 p-4 bg-red-50 border border-red-200 rounded-xl">
            <h3 className="font-bold text-red-800">Zona Peligrosa</h3>
            <p className="text-sm text-red-700 mt-1 mb-4">Estas acciones son permanentes y no se pueden deshacer.</p>
            <button
                onClick={onDeleteAccount}
                className="w-full text-center text-red-600 font-medium py-2 hover:bg-red-100 rounded-lg transition-colors border border-red-300"
            >
                Eliminar mi cuenta permanentemente
            </button>
        </div>

      </main>
    </div>
  );
};

export default SecuritySettingsPage;
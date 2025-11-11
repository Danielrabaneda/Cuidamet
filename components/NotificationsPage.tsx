import React from 'react';
import PageHeader from './PageHeader';
import ToggleSwitch from './ToggleSwitch';
import BellIcon from './icons/BellIcon';

interface NotificationsPageProps {
  onBack: () => void;
}

const NotificationItem: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="flex items-center justify-between p-4">
        <div>
            <p className="font-medium text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <ToggleSwitch />
    </div>
);


const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Notificaciones" onBack={onBack} />
      <main className="container mx-auto px-4 py-6 pb-36">
        
        <div className="text-center mb-8">
            <div className="inline-block bg-teal-100 p-4 rounded-full">
                <BellIcon className="w-12 h-12 text-teal-600"/>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Controla tus avisos</h2>
            <p className="text-slate-600 mt-1 max-w-md mx-auto">Elige qué notificaciones quieres recibir para estar siempre al día.</p>
        </div>

        <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                Notificaciones Push
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
               <NotificationItem 
                    title="Nuevos Mensajes"
                    description="Recibe un aviso cuando un cuidador o familia te escriba."
               />
               <NotificationItem 
                    title="Confirmaciones de Reserva"
                    description="Avisos sobre el estado de tus reservas."
               />
                <NotificationItem 
                    title="Recordatorios"
                    description="Recordatorios de tus próximos servicios."
               />
            </div>
        </div>

        <div className="mt-8">
             <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                Notificaciones por Email
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
               <NotificationItem 
                    title="Resumen Semanal"
                    description="Un email con tu actividad y novedades."
               />
               <NotificationItem 
                    title="Promociones y Noticias"
                    description="Ofertas especiales y noticias de Cuidamet."
               />
            </div>
        </div>

      </main>
    </div>
  );
};

export default NotificationsPage;
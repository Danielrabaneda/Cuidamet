import React from 'react';
import PageHeader from './PageHeader';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import MailIcon from './icons/MailIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SupportPageProps {
  onBack: () => void;
  onNavigateChat: () => void;
  onNavigateEmail: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack, onNavigateChat, onNavigateEmail }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Centro de Ayuda" onBack={onBack} />
      <main className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">¿Cómo podemos ayudarte?</h2>
          <p className="text-slate-600 mt-1 max-w-md mx-auto">Elige el canal de contacto que prefieras. Estamos aquí para resolver tus dudas.</p>
        </div>
        
        <div className="space-y-4 max-w-lg mx-auto">
          <button
            onClick={onNavigateChat}
            className="w-full flex items-center p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-left hover:bg-slate-50 hover:border-teal-300 transition-colors"
          >
            <div className="bg-teal-100 p-3 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold text-slate-800">Iniciar un Chat</h3>
              <p className="text-sm text-slate-500">Habla con nuestro asistente virtual para respuestas rápidas.</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </button>
          
          <button
            onClick={onNavigateEmail}
            className="w-full flex items-center p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-left hover:bg-slate-50 hover:border-teal-300 transition-colors"
          >
            <div className="bg-teal-100 p-3 rounded-lg">
              <MailIcon className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold text-slate-800">Enviar un Email</h3>
              <p className="text-sm text-slate-500">Para consultas menos urgentes, te responderemos pronto.</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;

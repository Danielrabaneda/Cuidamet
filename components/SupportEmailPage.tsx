import React, { useState } from 'react';
import PageHeader from './PageHeader';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

interface SupportEmailPageProps {
  onBack: () => void;
}

const SupportEmailPage: React.FC<SupportEmailPageProps> = ({ onBack }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
        alert('Por favor, completa el asunto y el mensaje.');
        return;
    }
    setIsSending(true);
    setTimeout(() => {
        setIsSending(false);
        alert('¡Gracias! Hemos recibido tu correo y te responderemos lo antes posible.');
        onBack();
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Enviar un Email a Soporte" onBack={onBack} />
      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-slate-700 mb-1">Para</label>
            <input 
              id="to" 
              type="email" 
              value="soporte@cuidamet.com" 
              disabled 
              className="w-full bg-slate-100 p-3 border border-slate-300 rounded-lg text-slate-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
            <input 
              id="subject" 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ej: Problema con una reserva"
              required
              className="w-full bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
            <textarea 
              id="body" 
              rows={8} 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe tu consulta con el mayor detalle posible..."
              required 
              className="w-full bg-white p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800"
            ></textarea>
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSending}
              className="w-full flex items-center justify-center bg-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-slate-400"
            >
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              {isSending ? 'Enviando...' : 'Enviar Email'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SupportEmailPage;

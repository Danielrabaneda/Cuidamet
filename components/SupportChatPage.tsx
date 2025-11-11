import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import CuidametIcon from './icons/CuidametIcon';

interface SupportChatPageProps {
  onBack: () => void;
}

const SupportChatPage: React.FC<SupportChatPageProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy Cuidi, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      sender: 'other',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      // Here you would call the AI API
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-fade-in">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:text-teal-500">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-slate-800">Soporte Cuidamet</h1>
            <p className="text-xs text-green-500 font-medium">En línea</p>
          </div>
          <div className="w-10 h-10 p-1.5 bg-teal-500 rounded-full flex items-center justify-center">
             <CuidametIcon className="text-white" />
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'other' && (
              <div className="w-6 h-6 p-0.5 bg-teal-500 rounded-full flex items-center justify-center self-start">
                  <CuidametIcon className="text-white" />
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-teal-500 text-white rounded-br-lg'
                  : 'bg-white text-slate-700 rounded-bl-lg border border-slate-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-teal-100' : 'text-slate-400'} text-right`}>
                  {message.timestamp}
              </p>
            </div>
          </div>
        ))}
         <div ref={messagesEndRef} />
      </main>

      <footer className="flex-shrink-0 bg-white border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="container mx-auto p-2 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu consulta..."
            className="w-full bg-slate-100 border-transparent rounded-full py-2.5 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white rounded-full p-3 flex-shrink-0 hover:bg-teal-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={!newMessage.trim()}
            aria-label="Enviar mensaje"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default SupportChatPage;

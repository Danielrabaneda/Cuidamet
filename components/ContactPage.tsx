import React from 'react';
import PageHeader from './PageHeader';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Contacto" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto pb-36">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Ponte en contacto</h2>
          <p className="text-slate-600 mt-2 max-w-lg mx-auto">¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte.</p>
        </div>

        <div className="mt-8 max-w-lg mx-auto bg-slate-50 p-6 rounded-xl border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Tu Nombre</label>
              <input type="text" id="name" required className="w-full bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Tu Email</label>
              <input type="email" id="email" required className="w-full bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
              <textarea id="message" rows={5} required className="w-full bg-white p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800"></textarea>
            </div>
            <button type="submit" className="w-full flex items-center justify-center bg-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              Enviar Mensaje
            </button>
          </form>
        </div>

        <div className="text-center mt-10">
          <h3 className="font-semibold text-slate-700">O contáctanos directamente</h3>
          <div className="flex justify-center space-x-6 mt-4 text-slate-600">
            <a href="mailto:soporte@cuidamet.com" className="flex items-center hover:text-teal-500">
              <MailIcon className="w-5 h-5 mr-2" />
              soporte@cuidamet.com
            </a>
            <a href="tel:+34900123456" className="flex items-center hover:text-teal-500">
              <PhoneIcon className="w-5 h-5 mr-2" />
              900 123 456
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
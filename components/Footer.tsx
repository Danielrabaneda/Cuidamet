import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-6 py-10 pb-28 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4 text-base">Para familias</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('providers')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Buscar cuidadores</button></li>
              <li><button onClick={() => onNavigate('prices')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Precios</button></li>
              <li><button onClick={() => onNavigate('security')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Seguridad</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4 text-base">Para cuidadores</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('offer')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Ofrecer servicios</button></li>
              <li><button onClick={() => onNavigate('verification')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Verificación</button></li>
              <li><button onClick={() => onNavigate('help')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Centro de ayuda</button></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-slate-800 mb-4 text-base">Empresa</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('about')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Sobre nosotros</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Blog</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-slate-600 hover:text-teal-500 transition-colors text-sm">Contacto</button></li>
            </ul>
          </div>

        </div>
        <div className="text-center text-xs text-slate-500 border-t border-slate-200 mt-8 pt-6">
          <p>&copy; {new Date().getFullYear()} Cuidamet. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white/90 backdrop-blur-lg border-t border-slate-200">
      <div className="container mx-auto px-4 pt-4 pb-3">
        <div className="grid grid-cols-3 gap-4">
          
          <div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Para familias</h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('providers')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Buscar cuidadores</button></li>
              <li><button onClick={() => onNavigate('prices')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Precios</button></li>
              <li><button onClick={() => onNavigate('security')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Seguridad</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Para cuidadores</h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('offer')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Ofrecer servicios</button></li>
              <li><button onClick={() => onNavigate('verification')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Verificación</button></li>
              <li><button onClick={() => onNavigate('help')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Centro de ayuda</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Empresa</h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('about')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Sobre nosotros</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Blog</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-slate-600 hover:text-teal-500 transition-colors text-xs">Contacto</button></li>
            </ul>
          </div>

        </div>
        <div className="text-center text-xs text-slate-500 border-t border-slate-200 mt-3 pt-3">
          <p>&copy; {new Date().getFullYear()} Cuidamet. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
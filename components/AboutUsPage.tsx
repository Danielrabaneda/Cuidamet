import React from 'react';
import PageHeader from './PageHeader';
import CuidametIcon from './icons/CuidametIcon';

interface AboutUsPageProps {
  onBack: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Sobre Nosotros" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <div className="text-center">
          <CuidametIcon className="w-24 h-24 mx-auto text-teal-500 mb-4" />
          <h2 className="text-3xl font-bold text-slate-800">Nuestra Misión</h2>
          <p className="text-lg text-slate-600 mt-2">Cuidamos de lo que te importa.</p>
        </div>
        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-slate-700 leading-relaxed">
          <p>
            En Cuidamet, nuestra misión es simple: conectar a familias con cuidadores de confianza de una manera fácil, rápida y segura. Sabemos que encontrar a la persona adecuada para cuidar de tus seres queridos —ya sean mayores, niños o mascotas— es una de las decisiones más importantes que puedes tomar.
          </p>
          <p>
            Por eso, hemos creado una plataforma que pone la confianza y la seguridad en primer lugar. Verificamos los perfiles, facilitamos la comunicación y nos apoyamos en las valoraciones de la comunidad para que puedas tomar siempre la mejor decisión.
          </p>
          <p>
            Creemos en el poder de la comunidad y la tecnología para hacer la vida un poco más fácil. Gracias por confiar en nosotros.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
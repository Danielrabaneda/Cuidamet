import React from 'react';
import PageHeader from './PageHeader';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import StarIcon from './icons/StarIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';

interface SecurityPageProps {
  onBack: () => void;
}

const securityFeatures = [
    {
        icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
        title: "Verificación de Perfiles",
        description: "Animamos a todos los cuidadores a completar un proceso de verificación de identidad para aumentar la confianza. Busca la insignia de 'Verificado' en sus perfiles."
    },
    {
        icon: <StarIcon className="w-8 h-8 text-white" />,
        title: "Valoraciones Reales",
        description: "Después de cada servicio, las familias pueden dejar una valoración honesta. Este sistema ayuda a toda la comunidad a tomar decisiones informadas."
    },
    {
        icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />,
        title: "Comunicación Segura",
        description: "Utiliza nuestro sistema de mensajería interna para comunicarte con los cuidadores. Nunca compartas información personal o de contacto hasta que te sientas completamente seguro."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
        title: "Pagos Seguros",
        description: "Todos los pagos se procesan a través de nuestra pasarela de pago segura. El dinero se retiene hasta que el servicio se completa satisfactoriamente, protegiendo tanto a familias como a cuidadores."
    }
]

const SecurityPage: React.FC<SecurityPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Seguridad" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Tu tranquilidad, nuestra prioridad</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Hemos implementado múltiples medidas para que tu experiencia en Cuidamet sea lo más segura posible.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-teal-500 rounded-lg p-3">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                        <p className="text-slate-600 mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
         <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center border border-slate-200">
            <h3 className="font-semibold text-slate-800">¿Necesitas ayuda?</h3>
            <p className="text-slate-600 mt-2">Nuestro equipo de soporte está disponible para ayudarte con cualquier incidencia. No dudes en contactarnos.</p>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
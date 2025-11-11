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
        title: "Valoraciones Verificadas",
        description: "Después de cada servicio pagado a través de la app, tanto la familia como el cuidador pueden dejar una valoración. Este sistema bidireccional fomenta la transparencia y la confianza."
    },
    {
        icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />,
        title: "Comunicación Segura",
        description: "Utiliza nuestro sistema de mensajería interna para comunicarte. Nunca compartas información personal o de contacto hasta que te sientas completamente seguro."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
        title: "Pagos Protegidos",
        description: "Todos los pagos se procesan a través de nuestra pasarela segura. El dinero se retiene hasta 24h después de que el servicio se completa, protegiendo a ambas partes."
    },
     {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        title: "Seguro de Responsabilidad Civil",
        description: "Nuestra tasa de servicio incluye una cobertura de seguro básica que protege ante accidentes o daños materiales que puedan ocurrir durante un servicio. Ofrecemos la opción de un seguro adicional para mayor cobertura."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        title: "Soporte ante Incidencias",
        description: "Nuestro equipo de soporte está disponible a través del chat en vivo y por correo para mediar en caso de conflicto y ayudarte a resolver cualquier incidencia."
    }
]

const SecurityPage: React.FC<SecurityPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Seguridad y Confianza" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto pb-36">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Tu tranquilidad, nuestra prioridad</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Hemos implementado múltiples medidas para que tu experiencia en Cuidamet sea lo más segura posible.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-teal-500 rounded-lg p-3 mt-1">
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
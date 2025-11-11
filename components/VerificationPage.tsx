import React from 'react';
import PageHeader from './PageHeader';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import IdentificationIcon from './icons/IdentificationIcon';
import ClipboardDocumentListIcon from './icons/ClipboardDocumentListIcon';


interface VerificationPageProps {
  onBack: () => void;
}

const verificationSteps = [
    {
        icon: <IdentificationIcon className="w-10 h-10 text-teal-600" />,
        title: "1. Documento de Identidad",
        description: "Sube una foto clara de tu DNI, pasaporte o documento de identidad en vigor. Esto nos ayuda a confirmar que eres quien dices ser."
    },
    {
        icon: <ClipboardDocumentListIcon className="w-10 h-10 text-teal-600" />,
        title: "2. Certificados y Antecedentes",
        description: "Si tienes certificados relevantes (primeros auxilios, formación específica, etc.) o un certificado de antecedentes penales, puedes subirlos. Esto aumenta enormemente la confianza de las familias."
    },
    {
        icon: <ShieldCheckIcon className="w-10 h-10 text-teal-600" />,
        title: "3. Obtén tu Insignia",
        description: "Una vez que nuestro equipo revise y apruebe tus documentos, aparecerá una insignia de 'Verificado' en tu perfil, haciéndote destacar y dándote más oportunidades de trabajo."
    }
]

const VerificationPage: React.FC<VerificationPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Verificación para Cuidadores" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto pb-36">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Gana la confianza de las familias</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Un perfil verificado tiene hasta 5 veces más probabilidades de ser contratado. ¡Es gratis y rápido!</p>
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto space-y-8">
            {verificationSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center text-center md:text-left bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <div className="flex-shrink-0 bg-teal-100 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
                        {step.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800">{step.title}</h3>
                        <p className="text-slate-600 mt-2 leading-relaxed">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-12 text-center">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                Empezar mi Verificación
            </button>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
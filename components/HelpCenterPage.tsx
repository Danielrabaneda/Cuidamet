import React from 'react';
import PageHeader from './PageHeader';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';

interface HelpCenterPageProps {
  onBack: () => void;
}

const faqs = [
  {
    q: '¿Cómo funciona el proceso de pago?',
    a: 'Todos los pagos se realizan de forma segura a través de nuestra plataforma. Una vez que confirmas una reserva, el pago se retiene y solo se libera al cuidador 24 horas después de que el servicio haya finalizado con éxito, garantizando tu satisfacción.',
  },
  {
    q: '¿Qué hago si tengo un problema con un cuidador?',
    a: 'Si surge cualquier problema, contacta con nuestro equipo de soporte inmediatamente a través de la página de Contacto. Estamos aquí para mediar y encontrar la mejor solución posible.',
  },
  {
    q: '¿Puedo cancelar una reserva?',
    a: 'Sí, puedes cancelar las reservas. Consulta nuestra política de cancelación en los Términos de Servicio para entender los plazos y posibles cargos.',
  },
  {
    q: '¿Cómo se verifican los cuidadores?',
    a: 'Los cuidadores pasan por un proceso de verificación que puede incluir la revisión del DNI, certificados relevantes y antecedentes. Busca la insignia de "Verificado" en sus perfiles.',
  },
];

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Centro de Ayuda" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <div className="text-center">
            <QuestionMarkCircleIcon className="w-16 h-16 mx-auto text-teal-500 mb-4" />
            <h2 className="text-3xl font-bold text-slate-800">Preguntas Frecuentes</h2>
            <p className="text-slate-600 mt-2 max-w-lg mx-auto">Encuentra respuestas a las dudas más comunes sobre Cuidamet.</p>
        </div>

        <div className="mt-8 max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-slate-50 p-4 rounded-lg group" open={index === 0}>
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <div className="transition-transform transform group-open:rotate-180">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </summary>
              <p className="text-slate-600 mt-3 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HelpCenterPage;
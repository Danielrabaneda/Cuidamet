import React from 'react';
import PageHeader from './PageHeader';
import CheckCircleIcon from './icons/CheckCircleIcon';
import TicketIcon from './icons/TicketIcon';

interface PricesPageProps {
  onBack: () => void;
}

const PricesPage: React.FC<PricesPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Precios y Promociones" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto pb-36">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Precios Transparentes</h2>
          <p className="text-slate-600 mt-2 max-w-lg mx-auto">Sin sorpresas. Sabes lo que pagas desde el primer momento.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Para Familias */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-teal-600">Para Familias</h3>
            <p className="text-slate-500 mt-2">Encuentra al cuidador perfecto con total libertad.</p>
            <div className="mt-6">
              <p className="text-4xl font-bold text-slate-800">Gratis</p>
              <p className="text-slate-500">para buscar y contactar</p>
            </div>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Búsqueda ilimitada de perfiles.</li>
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Contacto directo por chat seguro.</li>
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Acceso a valoraciones y verificaciones.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-6">
              Solo pagas la tarifa del cuidador más una pequeña tasa de servicio al confirmar una reserva. Esta tasa nos ayuda a mantener la plataforma segura, incluir un seguro básico y ofrecer soporte.
            </p>
          </div>

          {/* Para Cuidadores */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-teal-600">Para Cuidadores</h3>
            <p className="text-slate-500 mt-2">Ofrece tus servicios y encuentra trabajo.</p>
             <div className="mt-6">
              <p className="text-4xl font-bold text-slate-800">Gratis</p>
              <p className="text-slate-500">publicar tu perfil</p>
            </div>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Crea tu perfil profesional completo.</li>
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Define tus propias tarifas y horarios.</li>
              <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />Recibe solicitudes de familias interesadas.</li>
            </ul>
             <p className="text-xs text-slate-500 mt-6">
              Aplicamos una comisión de servicio transparente sobre tus ganancias. Esto cubre la gestión de pagos seguros, soporte 24/7 y la promoción de tu perfil.
            </p>
          </div>
        </div>

        <section className="mt-16">
            <div className="text-center">
                <TicketIcon className="w-12 h-12 mx-auto text-teal-500" />
                <h2 className="text-3xl font-bold text-slate-800 mt-4">Bonos y Promociones</h2>
                <p className="text-slate-600 mt-2 max-w-lg mx-auto">Ahorra en tus reservas y gana más como cuidador.</p>
            </div>
            <div className="mt-8 max-w-3xl mx-auto space-y-4">
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800">🎁 Bono de Bienvenida</h3>
                    <p className="text-slate-600 mt-1"><strong>Para nuevos clientes:</strong> 10€ de descuento directo en tu primera reserva.</p>
                    <p className="text-slate-600 mt-1"><strong>Para nuevos cuidadores:</strong> Tu primera comisión de servicio reducida al 5%.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800">⭐ Programa de Fidelización</h3>
                    <p className="text-slate-600 mt-1">Por cada 5 servicios que completes como cliente, recibirás un bono de 5€ para tu próxima reserva.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800">🧑‍🤝‍🧑 Recomienda a un amigo</h3>
                    <p className="text-slate-600 mt-1">Invita a un amigo a unirse a Cuidamet. Cuando complete su primer servicio, ambos recibiréis 10€ de crédito.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800">🕒 Packs de Horas</h3>
                    <p className="text-slate-600 mt-1">Compra packs de horas por adelantado y obtén un descuento:</p>
                    <ul className="list-disc list-inside text-slate-600 mt-1">
                        <li><strong>Pack 10 horas:</strong> 5% de descuento.</li>
                        <li><strong>Pack 20 horas:</strong> 10% de descuento.</li>
                    </ul>
                </div>
                 <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800">⚡ Bonificación para Cuidadores de Urgencia</h3>
                    <p className="text-slate-600 mt-1">Si aceptas un servicio de emergencia (con menos de 4 horas de preaviso), recibirás una bonificación del 20% sobre tu tarifa habitual.</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default PricesPage;
import React from 'react';
import PageHeader from './PageHeader';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface PricesPageProps {
  onBack: () => void;
}

const PricesPage: React.FC<PricesPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Precios" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
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
              Solo pagas la tarifa del cuidador más una pequeña tasa de servicio al confirmar una reserva. Esta tasa nos ayuda a mantener la plataforma segura y operativa.
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
              Aplicamos una comisión de servicio transparente sobre tus ganancias por cada trabajo completado. Esto cubre la gestión de pagos, soporte y promoción de tu perfil.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricesPage;
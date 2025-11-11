

import React from 'react';
import { Provider, BookingDetails } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ClockIcon from './icons/ClockIcon';

interface ConfirmationPageProps {
  provider: Provider;
  bookingDetails: BookingDetails;
  onGoToChat: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ provider, bookingDetails, onGoToChat }) => {
  const formattedDate = new Date(`${bookingDetails.date}T00:00:00`).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const subtotal = bookingDetails.totalCost - (bookingDetails.insuranceCost || 0) + (bookingDetails.discountAmount || 0);

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col justify-between animate-fade-in p-4">
      <main className="flex-grow flex flex-col justify-center text-center">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl max-w-md mx-auto">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold text-slate-800 mt-4">¡Reserva Confirmada!</h1>
          <p className="text-slate-600 mt-2">
            Has reservado con éxito a <span className="font-semibold">{provider.name}</span>.
            Ya puedes contactar para organizar los últimos detalles.
          </p>
          
          <div className="text-left bg-slate-50 p-4 rounded-lg mt-6 space-y-3 border border-slate-200">
             <div className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 text-slate-500 mr-3" />
                <span className="text-slate-700 font-medium capitalize">{bookingDetails.date ? formattedDate : `Pack de ${bookingDetails.hours} horas`}</span>
             </div>
             {bookingDetails.startTime && (
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-slate-700 font-medium">De {bookingDetails.startTime} a {bookingDetails.endTime} ({bookingDetails.hours} horas)</span>
                </div>
             )}
          </div>
            <div className="mt-4 text-left text-sm space-y-1">
                <div className="flex justify-between text-slate-600"><span>Subtotal del servicio</span> <span>{subtotal.toFixed(2)}€</span></div>
                {bookingDetails.insuranceCost > 0 && <div className="flex justify-between text-slate-600"><span>Seguro adicional</span> <span>+ {bookingDetails.insuranceCost.toFixed(2)}€</span></div>}
                {bookingDetails.discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Descuento</span> <span>- {bookingDetails.discountAmount.toFixed(2)}€</span></div>}
            </div>

          <div className="mt-4 border-t border-slate-200 pt-4 flex justify-between items-center">
            <span className="font-semibold text-slate-700">Total Pagado:</span>
            <span className="font-bold text-2xl text-teal-600">{bookingDetails.totalCost.toFixed(2)}€</span>
          </div>

        </div>
      </main>

      <footer className="flex-shrink-0 py-2">
        <button
          onClick={onGoToChat}
          className="w-full max-w-md mx-auto bg-teal-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-lg"
        >
          Ir al Chat
        </button>
      </footer>
    </div>
  );
};

export default ConfirmationPage;


import React, { useState, useMemo } from 'react';
import { Provider, BookingDetails } from '../types';
import PageHeader from './PageHeader';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ClockIcon from './icons/ClockIcon';
import TicketIcon from './icons/TicketIcon';

interface BookingPageProps {
  provider: Provider;
  onProceed: (details: BookingDetails) => void;
  onBack: () => void;
}

const INSURANCE_COST = 4.00;
const WELCOME_DISCOUNT = 10.00;

const hourPacks = [
    { name: '10 horas', hours: 10, discount: 0.05 },
    { name: '20 horas', hours: 20, discount: 0.10 },
];

const BookingPage: React.FC<BookingPageProps> = ({ provider, onProceed, onBack }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [addInsurance, setAddInsurance] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [selectedPack, setSelectedPack] = useState<typeof hourPacks[0] | null>(null);

  const { hours, totalCost, serviceFee, subtotal, discountAmount, insuranceCost, isValid, finalHourlyRate } = useMemo(() => {
    let calculatedHours = 0;
    let packDiscount = 0;

    if (selectedPack) {
        calculatedHours = selectedPack.hours;
        packDiscount = selectedPack.discount;
    } else {
        if (!date || !startTime || !endTime) return { isValid: false };
        
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);

        if (end <= start) return { isValid: false };

        const diffMs = end.getTime() - start.getTime();
        calculatedHours = diffMs / (1000 * 60 * 60);
    }
    
    if (calculatedHours <= 0) return { isValid: false };

    const effectiveHourlyRate = provider.hourlyRate * (1 - packDiscount);
    const calculatedSubtotal = calculatedHours * effectiveHourlyRate;
    const calculatedServiceFee = calculatedSubtotal * 0.05; // 5% service fee
    
    let totalBeforeDiscount = calculatedSubtotal + calculatedServiceFee;
    let calculatedDiscount = 0;

    if (promoCode.toUpperCase() === 'BIENVENIDO10') {
      calculatedDiscount = Math.min(totalBeforeDiscount, WELCOME_DISCOUNT);
    }
    
    const calculatedInsuranceCost = addInsurance ? INSURANCE_COST : 0;
    
    const calculatedTotal = totalBeforeDiscount - calculatedDiscount + calculatedInsuranceCost;

    return {
      hours: parseFloat(calculatedHours.toFixed(2)),
      totalCost: parseFloat(calculatedTotal.toFixed(2)),
      serviceFee: parseFloat(calculatedServiceFee.toFixed(2)),
      subtotal: parseFloat(calculatedSubtotal.toFixed(2)),
      discountAmount: parseFloat(calculatedDiscount.toFixed(2)),
      insuranceCost: calculatedInsuranceCost,
      isValid: true,
      finalHourlyRate: parseFloat(effectiveHourlyRate.toFixed(2))
    };
  }, [date, startTime, endTime, provider.hourlyRate, addInsurance, promoCode, selectedPack]);
  
  const handleProceed = () => {
    if (isValid) {
      onProceed({
        providerId: provider.id,
        date,
        startTime,
        endTime,
        hours,
        totalCost,
        discountAmount,
        insuranceCost
      });
    }
  };
  
  const handleSelectPack = (pack: typeof hourPacks[0] | null) => {
    setSelectedPack(pack);
    // Reset date/time if a pack is selected/deselected
    setDate('');
    setStartTime('');
    setEndTime('');
  };


  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-fade-in">
      <PageHeader title="Reservar Servicio" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-4">
        {/* Caregiver Info */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 mb-6">
            <img src={provider.photoUrl} alt={provider.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
                <p className="text-sm text-slate-500">Estás reservando con</p>
                <h2 className="text-lg font-bold text-slate-800">{provider.name}</h2>
                <p className="font-semibold text-teal-600">{provider.hourlyRate}€ / hora</p>
            </div>
        </section>

        {/* Hour Packs */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800">Packs de horas con descuento</h3>
            <div className="flex gap-3 mt-3">
                {hourPacks.map(pack => (
                    <button 
                        key={pack.name} 
                        onClick={() => handleSelectPack(pack)}
                        className={`flex-1 p-3 border rounded-lg text-center transition-all ${selectedPack === pack ? 'bg-teal-500 text-white border-teal-600' : 'bg-slate-100 hover:bg-slate-200'}`}
                    >
                        <p className="font-bold">{pack.name}</p>
                        <p className="text-sm">-{pack.discount * 100}% dto.</p>
                    </button>
                ))}
            </div>
            {selectedPack && (
                <button onClick={() => handleSelectPack(null)} className="text-sm text-center w-full mt-3 text-slate-500 hover:text-slate-800">
                    O selecciona horas manualmente
                </button>
            )}
        </section>

        {/* Date & Time Selection */}
        <section className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 transition-opacity duration-300 ${selectedPack ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <h3 className="font-bold text-lg text-slate-800">Elige fecha y hora</h3>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Fecha del servicio</label>
                <div className="relative">
                    <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} min={today} disabled={!!selectedPack} className="w-full bg-slate-50 p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 disabled:bg-slate-200"/>
                    <CalendarDaysIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">Hora de inicio</label>
                    <div className="relative">
                        <input id="startTime" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} disabled={!!selectedPack} className="w-full bg-slate-50 p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 disabled:bg-slate-200"/>
                         <ClockIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">Hora de fin</label>
                     <div className="relative">
                        <input id="endTime" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} disabled={!!selectedPack} className="w-full bg-slate-50 p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 disabled:bg-slate-200"/>
                         <ClockIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>

        {/* Add-ons and Promo */}
        <section className="bg-white p-4 mt-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
                <div>
                    <p className="font-medium text-slate-800">Seguro Adicional</p>
                    <p className="text-sm text-slate-500">Cobertura extra para mayor tranquilidad.</p>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-teal-600 mr-4">+{INSURANCE_COST.toFixed(2)}€</span>
                    <input type="checkbox" checked={addInsurance} onChange={e => setAddInsurance(e.target.checked)} className="h-5 w-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500"/>
                </div>
            </label>
            <div className="border-t border-slate-200 pt-4">
                 <label htmlFor="promo" className="block text-sm font-medium text-slate-700 mb-1">Código de promoción</label>
                 <div className="relative">
                    <input id="promo" type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Ej: BIENVENIDO10" className="w-full bg-slate-50 p-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 uppercase placeholder:normal-case"/>
                    <TicketIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                 </div>
            </div>
        </section>


        {/* Cost Summary */}
        {isValid && (
            <section className="bg-white p-4 mt-6 rounded-xl border border-slate-200 shadow-sm animate-fade-in space-y-3">
                <h3 className="font-bold text-lg text-slate-800">Resumen del coste</h3>
                <div className="flex justify-between text-slate-600">
                    <span>{selectedPack ? `Pack ${selectedPack.name}` : `${finalHourlyRate}€ x ${hours} horas`}</span>
                    <span>{subtotal.toFixed(2)}€</span>
                </div>
                 <div className="flex justify-between text-slate-600">
                    <span>Tasa de servicio</span>
                    <span>{serviceFee.toFixed(2)}€</span>
                </div>
                {addInsurance && (
                    <div className="flex justify-between text-slate-600">
                        <span>Seguro adicional</span>
                        <span>{insuranceCost.toFixed(2)}€</span>
                    </div>
                )}
                {discountAmount > 0 && (
                     <div className="flex justify-between text-green-600 font-medium">
                        <span>Descuento aplicado</span>
                        <span>-{discountAmount.toFixed(2)}€</span>
                    </div>
                )}
                <div className="border-t border-slate-200 my-2"></div>
                <div className="flex justify-between font-bold text-slate-800 text-lg">
                    <span>Total</span>
                    <span>{totalCost.toFixed(2)}€</span>
                </div>
            </section>
        )}
      </main>
      <footer className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-3">
        <button
            onClick={handleProceed}
            disabled={!isValid}
            className="w-full bg-teal-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-lg"
        >
            {isValid ? `Pagar ${totalCost.toFixed(2)}€` : 'Completa los datos'}
        </button>
      </footer>
    </div>
  );
};

export default BookingPage;
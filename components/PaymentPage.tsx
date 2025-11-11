

import React, { useState } from 'react';
import { Provider, BookingDetails } from '../types';
import PageHeader from './PageHeader';
import CreditCardIcon from './icons/CreditCardIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

// Dummy logos, in a real app these would be actual logo components/images
const PayPalLogo = () => <span className="font-bold text-lg text-[#00457C]">PayPal</span>;
const GooglePayLogo = () => <span className="font-bold text-lg">Pay</span>;
const BizumLogo = () => <span className="font-bold text-lg text-blue-500">bizum</span>;


interface PaymentPageProps {
  provider: Provider;
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'gpay' | 'bizum' | null;

const PaymentPage: React.FC<PaymentPageProps> = ({ provider, bookingDetails, onConfirm, onBack }) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
    const [bizumPhone, setBizumPhone] = useState('');
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            onConfirm();
        }, 2000); // Simulate network delay
    };
    
    const PaymentMethodButton: React.FC<{method: PaymentMethod, title: string, icon: React.ReactNode}> = ({method, title, icon}) => (
        <button
            type="button"
            onClick={() => setSelectedMethod(method)}
            className={`w-full flex items-center p-4 border rounded-xl text-left transition-all duration-200 ${selectedMethod === method ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-300' : 'bg-white hover:bg-slate-50 border-slate-300'}`}
        >
            {icon}
            <span className="ml-3 font-semibold text-slate-700">{title}</span>
            <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method ? 'border-teal-500 bg-teal-500' : 'border-slate-300'}`}>
                {selectedMethod === method && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
        </button>
    );

    const renderPaymentForm = () => {
        switch (selectedMethod) {
            case 'card':
                return (
                    <div className="space-y-3 animate-fade-in">
                        <div>
                            <label htmlFor="number" className="block text-sm font-medium text-slate-600 mb-1">Número de tarjeta</label>
                            <input id="number" name="number" type="text" value={cardDetails.number} onChange={handleCardInputChange} placeholder="•••• •••• •••• ••••" className="w-full bg-slate-100 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"/>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-slate-600 mb-1">Caducidad</label>
                                <input id="expiry" name="expiry" type="text" value={cardDetails.expiry} onChange={handleCardInputChange} placeholder="MM / AA" className="w-full bg-slate-100 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"/>
                            </div>
                            <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-slate-600 mb-1">CVC</label>
                                <input id="cvc" name="cvc" type="text" value={cardDetails.cvc} onChange={handleCardInputChange} placeholder="•••" className="w-full bg-slate-100 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"/>
                            </div>
                        </div>
                    </div>
                );
            case 'bizum':
                 return (
                    <div className="animate-fade-in">
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-1">Número de teléfono</label>
                        <input id="phone" type="tel" value={bizumPhone} onChange={e => setBizumPhone(e.target.value)} placeholder="600 000 000" className="w-full bg-slate-100 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"/>
                    </div>
                 );
            case 'paypal':
            case 'gpay':
                return <p className="text-center text-slate-500 animate-fade-in">Serás redirigido para completar el pago de forma segura.</p>;
            default:
                return null;
        }
    };
    
    const subtotal = bookingDetails.totalCost - (bookingDetails.insuranceCost || 0) + (bookingDetails.discountAmount || 0);

    return (
        <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-fade-in">
            <PageHeader title="Realizar Pago" onBack={onBack} />
            <main className="flex-grow overflow-y-auto p-4">
                
                <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Total a pagar</h3>
                            <p className="text-sm text-slate-500">Reserva con {provider.name}</p>
                        </div>
                        <p className="text-2xl font-bold text-teal-600">{bookingDetails.totalCost.toFixed(2)}€</p>
                    </div>
                    <button onClick={() => setIsDetailsVisible(!isDetailsVisible)} className="mt-2 text-sm text-teal-600 font-semibold flex items-center">
                        Ver desglose
                        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isDetailsVisible ? 'rotate-180' : ''}`} />
                    </button>
                    {isDetailsVisible && (
                        <div className="mt-3 pt-3 border-t border-slate-200 space-y-1 text-sm animate-fade-in">
                            <div className="flex justify-between text-slate-600"><span>Subtotal del servicio</span> <span>{subtotal.toFixed(2)}€</span></div>
                            {bookingDetails.insuranceCost > 0 && <div className="flex justify-between text-slate-600"><span>Seguro adicional</span> <span>+ {bookingDetails.insuranceCost.toFixed(2)}€</span></div>}
                            {bookingDetails.discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Descuento</span> <span>- {bookingDetails.discountAmount.toFixed(2)}€</span></div>}
                        </div>
                    )}
                </section>

                <form onSubmit={handlePayment}>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Método de pago</h3>
                        <div className="space-y-3">
                           <PaymentMethodButton method="card" title="Tarjeta de crédito/débito" icon={<CreditCardIcon className="w-6 h-6 text-slate-500" />} />
                           <PaymentMethodButton method="paypal" title="PayPal" icon={<PayPalLogo />} />
                           <PaymentMethodButton method="gpay" title="Google / Apple Pay" icon={<GooglePayLogo />} />
                           <PaymentMethodButton method="bizum" title="Bizum" icon={<BizumLogo />} />
                        </div>
                        {selectedMethod && <div className="border-t border-slate-200 pt-4 mt-4">{renderPaymentForm()}</div>}
                    </div>
                     <footer className="mt-6">
                        <button
                            type="submit"
                            disabled={isProcessing || !selectedMethod}
                            className="w-full bg-teal-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-lg flex items-center justify-center"
                        >
                            <LockClosedIcon className="w-5 h-5 mr-2" />
                            {isProcessing ? 'Procesando pago...' : `Pagar ${bookingDetails.totalCost.toFixed(2)}€ de forma segura`}
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
};

export default PaymentPage;
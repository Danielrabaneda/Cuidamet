import React from 'react';
import PageHeader from './PageHeader';
import DocumentTextIcon from './icons/DocumentTextIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
// FIX: Corrected the import path for the LegalDocument type.
import { LegalDocument } from '../types';

interface LegalInfoPageProps {
  onBack: () => void;
  onNavigateLegalDocument: (docId: string) => void;
  documents: LegalDocument[];
}

interface LegalItemProps {
  title: string;
  description: string;
  onClick: () => void;
}

const LegalItem: React.FC<LegalItemProps> = ({ title, description, onClick }) => (
    <li className="border-b border-slate-200 last:border-b-0">
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
        >
            <div className="flex-1 pr-4">
                <p className="font-medium text-slate-800">{title}</p>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </button>
    </li>
);

const LegalInfoPage: React.FC<LegalInfoPageProps> = ({ onBack, onNavigateLegalDocument, documents }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Tu Información Legal" onBack={onBack} />
      <main className="container mx-auto px-4 py-6 pb-36">
        
        <div className="text-center mb-8">
            <div className="inline-block bg-teal-100 p-4 rounded-full">
                <DocumentTextIcon className="w-12 h-12 text-teal-600"/>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Documentación Legal</h2>
            <p className="text-slate-600 mt-1 max-w-md mx-auto">Aquí puedes consultar todos los documentos legales relacionados con el uso de Cuidamet.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <ul>
                {documents.map(doc => (
                    <LegalItem 
                        key={doc.id}
                        title={doc.title}
                        description={doc.description}
                        onClick={() => onNavigateLegalDocument(doc.id)}
                    />
                ))}
            </ul>
        </div>

      </main>
    </div>
  );
};

export default LegalInfoPage;
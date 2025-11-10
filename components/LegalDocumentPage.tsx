import React from 'react';
import PageHeader from './PageHeader';

interface LegalDocumentPageProps {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}

const LegalDocumentPage: React.FC<LegalDocumentPageProps> = ({ title, content, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title={title} onBack={onBack} />
      <main className="container mx-auto px-4 py-6">
        <div className="prose prose-slate max-w-none">
          {content}
        </div>
      </main>
    </div>
  );
};

export default LegalDocumentPage;

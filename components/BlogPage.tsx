import React from 'react';
import PageHeader from './PageHeader';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface BlogPageProps {
  onBack: () => void;
}

const blogPosts = [
  { id: 1, title: '5 consejos para elegir al cuidador de mayores ideal', category: 'Cuidado de Mayores', date: '15 Julio, 2024' },
  { id: 2, title: 'Actividades creativas para niños en días de lluvia', category: 'Cuidado de Niños', date: '10 Julio, 2024' },
  { id: 3, title: '¿Tu mascota sufre ansiedad por separación? Cómo ayudarla', category: 'Cuidado de Mascotas', date: '5 Julio, 2024' },
  { id: 4, title: 'La importancia de la verificación de antecedentes en Cuidamet', category: 'Seguridad', date: '1 Julio, 2024' },
];

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Blog" onBack={onBack} />
      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Últimos Artículos</h2>
        <ul className="space-y-4">
          {blogPosts.map(post => (
            <li key={post.id}>
              <a href="#" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-teal-600">{post.category}</p>
                    <h3 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-teal-700">{post.title}</h3>
                    <p className="text-xs text-slate-500 mt-2">{post.date}</p>
                  </div>
                  <ChevronRightIcon className="w-6 h-6 text-slate-400 group-hover:text-teal-500 transition-transform transform group-hover:translate-x-1" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BlogPage;
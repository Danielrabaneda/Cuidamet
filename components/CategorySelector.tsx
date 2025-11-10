import React from 'react';
import { CareCategory } from '../types';

interface CategorySelectorProps {
  selectedCategory: CareCategory | 'all';
  onSelectCategory: (category: CareCategory | 'all') => void;
}

const categories: { id: CareCategory, name: string }[] = [
  { id: CareCategory.ELDERLY, name: 'Mayores' },
  { id: CareCategory.CHILDREN, name: 'Niños' },
  { id: CareCategory.PETS, name: 'Mascotas' },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg pt-2 pb-3 border-b border-slate-200 sticky top-[64px] z-30">
        <div className="container mx-auto px-4 flex items-center space-x-3 overflow-x-auto">
            <button
                onClick={() => onSelectCategory('all')}
                className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors flex-shrink-0
                ${selectedCategory === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
                Todo
            </button>
            {categories.map((cat) => (
                <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors flex-shrink-0
                    ${selectedCategory === cat.id
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                {cat.name}
                </button>
            ))}
        </div>
    </div>
  );
};

export default CategorySelector;
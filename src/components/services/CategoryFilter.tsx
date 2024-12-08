import React from 'react';
import { ServiceCategory } from '../../data/services';

interface CategoryFilterProps {
  categories: ServiceCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
          selectedCategory === null
            ? 'bg-amber-500 text-black'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            selectedCategory === category.id
              ? 'bg-amber-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  imageUrl: string;
}

// FIX: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const InfoBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-full text-sm">
    {icon}
    <span>{label}</span>
  </div>
);

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in w-full">
      <img
        src={imageUrl}
        alt={recipe.recipeName}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{recipe.recipeName}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{recipe.description}</p>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <InfoBadge icon={<ClockIcon />} label={`Prep: ${recipe.prepTime}`} />
          <InfoBadge icon={<FireIcon />} label={`Cook: ${recipe.cookTime}`} />
          <InfoBadge icon={<UsersIcon />} label={recipe.servings} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-amber-500 pb-2 mb-4">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2 mt-1">&#10003;</span>
                  <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-amber-500 pb-2 mb-4">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 bg-amber-500 text-white font-bold rounded-full h-6 w-6 text-sm flex items-center justify-center mr-3 mt-0.5">{index + 1}</span>
                  <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
);
const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0110 13a5 5 0 01-1.5-4.33A6.97 6.97 0 007 16c0 .34.024.673.07 1h5.86zM12 21a1 1 0 01-1-1 7 7 0 01-5-5.908c0-.346.024-.69.07-1.033a1 1 0 01.998-1.06h10.864a1 1 0 01.998 1.06c.046.343.07.687.07 1.033A7 7 0 0113 20a1 1 0 01-1 1z" /></svg>
);
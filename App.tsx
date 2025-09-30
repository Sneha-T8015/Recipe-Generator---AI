
import React, { useState, useCallback } from 'react';
import { generateRecipe, generateRecipeImage } from './services/geminiService';
import type { Recipe } from './types';
import { CUISINE_OPTIONS, DIET_OPTIONS } from './constants';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RecipeDisplay } from './components/RecipeDisplay';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [cuisine, setCuisine] = useState('Any');
  const [diet, setDiet] = useState('None');
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }
    setError(null);
    setRecipe(null);
    setLoading(true);
    
    try {
      setLoadingMessage('Creating your unique recipe...');
      const generatedRecipe = await generateRecipe(ingredients, cuisine, diet);
      setRecipe(generatedRecipe);
      
      setLoadingMessage('Generating a delicious-looking image...');
      const generatedImageUrl = await generateRecipeImage(generatedRecipe.recipeName);
      setImageUrl(generatedImageUrl);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [ingredients, cuisine, diet]);

  const handleStartOver = () => {
    setIngredients([]);
    setCurrentIngredient('');
    setCuisine('Any');
    setDiet('None');
    setRecipe(null);
    setImageUrl('');
    setError(null);
    setLoading(false);
  }

  const renderInputForm = () => (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <label htmlFor="ingredient-input" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          1. Add your ingredients
        </label>
        <form onSubmit={handleAddIngredient} className="flex gap-2">
          <input
            id="ingredient-input"
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder="e.g., chicken breast, tomatoes"
            className="flex-grow bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-amber-500 focus:border-amber-500 p-2.5 transition"
          />
          <button type="submit" className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition">
            Add
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {ingredients.map(ing => (
            <span key={ing} className="flex items-center bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-sm font-medium px-2.5 py-1 rounded-full">
              {ing}
              <button onClick={() => handleRemoveIngredient(ing)} className="ml-2 text-amber-500 hover:text-amber-700 dark:hover:text-amber-300">
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">2. Customize your dish (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cuisine-select" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Cuisine</label>
            <select id="cuisine-select" value={cuisine} onChange={e => setCuisine(e.target.value)} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 transition">
              {CUISINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="diet-select" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Diet</label>
            <select id="diet-select" value={diet} onChange={e => setDiet(e.target.value)} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 transition">
              {DIET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleGenerateRecipe}
          disabled={loading || ingredients.length === 0}
          className="text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 font-bold rounded-lg text-lg px-8 py-3.5 text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          Generate Recipe
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          {!recipe && !loading && renderInputForm()}

          {error && (
            <div className="mt-6 max-w-2xl mx-auto bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md" role="alert">
              <p className="font-bold">Oops!</p>
              <p>{error}</p>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            {loading && <LoadingSpinner message={loadingMessage} />}
            {recipe && imageUrl && (
              <div className="w-full max-w-4xl">
                <RecipeDisplay recipe={recipe} imageUrl={imageUrl} />
                <div className="text-center mt-8">
                  <button onClick={handleStartOver} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5">
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

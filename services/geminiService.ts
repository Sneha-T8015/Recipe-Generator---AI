
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe." },
    description: { type: Type.STRING, description: "A short, appetizing description of the dish." },
    prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
    cookTime: { type: Type.STRING, description: "Cooking time, e.g., '30 minutes'." },
    servings: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of ingredients with quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step cooking instructions."
    },
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
};

export const generateRecipe = async (ingredients: string[], cuisine: string, diet: string): Promise<Recipe> => {
  const prompt = `
    You are a world-class chef. Create a delicious recipe based on the following details.
    
    Ingredients: ${ingredients.join(', ')}
    Cuisine preference: ${cuisine === 'Any' ? 'None' : cuisine}
    Dietary restriction: ${diet === 'None' ? 'None' : diet}
    
    Please provide the recipe in the specified JSON format. The instructions should be clear and easy to follow.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    // It's already an object thanks to the API, but let's parse to be safe
    const recipeData = JSON.parse(jsonText);
    return recipeData as Recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe. The model may be unable to create a recipe with the provided constraints.");
  }
};

export const generateRecipeImage = async (recipeName: string): Promise<string> => {
  const prompt = `
    Professional, high-resolution food photography of "${recipeName}".
    The dish should look incredibly appetizing, with vibrant colors and beautiful lighting.
    Styled on a clean, modern plate, with a soft-focus background.
  `;
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    // Return a placeholder or throw an error
    return "https://picsum.photos/1280/720?random=1";
  }
};

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context instance
const RecipeContext = createContext();

// Create a custom hook to access the context
export const useRecipeContext = () => {
  return useContext(RecipeContext);
};

// Create a provider component
export const RecipeContextProvider = ({ children }) => {
  const [ingredientLineArr, setIngredientLineArr] = useState([]);  
  const [instructionLineArr, setInstructionLineArr] = useState([]);  
  const [fullRecipe, setFullRecipe] = useState()

  const value = {
    ingredientLineArr,
    setIngredientLineArr,
    instructionLineArr,
    setInstructionLineArr,
    fullRecipe,
    setFullRecipe
  }

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

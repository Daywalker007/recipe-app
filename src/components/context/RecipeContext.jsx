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
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentRecipeName, setCurrentRecipeName] = useState('')
  const [fullRecipe, setFullRecipe] = useState()

  const resetRecipe = () => {
    // Make sure that all fields are blank
    setCurrentRecipeName('')
    setCurrentDescription('')
    setIngredientLineArr([])
    setInstructionLineArr([])

    console.info('Recipe has been reset')
  }

  const value = {
    ingredientLineArr,
    setIngredientLineArr,
    instructionLineArr,
    setInstructionLineArr,
    currentDescription,
    setCurrentDescription,
    currentRecipeName,
    setCurrentRecipeName,
    fullRecipe,
    setFullRecipe,
    resetRecipe,
  }

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

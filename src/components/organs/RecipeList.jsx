import React from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import InstructionLine from '../molecules/InstructionLine'
import FullRecipe from '../molecules/FullRecipe'

export default function RecipeList() {
    const {ingredientLineArr, setIngredientLineArr, instructionLineArr, setInstructionLineArr, setFullRecipe} = useRecipeContext()    

    const addIngredientLine = () => {
        setIngredientLineArr(prevArr => [...prevArr, {Calories:'0'}])
    }
    
    const addInstructionLine = () => {
        const currentIndex = instructionLineArr.length
        setInstructionLineArr(prevArr => [...prevArr, {index: currentIndex, desc:''}])
    }
    
    const saveRecipe = () => {
        console.log({ingredientLineArr, instructionLineArr})
        setFullRecipe(prevArr => [...prevArr, {ingredientLineArr, instructionLineArr}])
    }

  return (
    <div className='p-5 space-y-5'>
        {/* Ingredients */}
        {ingredientLineArr.map((el, index) =>  <IngredientLine key={index} lineIndex={index} /> )}
        <CustomButton text={'Add Ingredient'} handleClick={addIngredientLine} className={'block ml-auto'}/>
        
        {/* Instructions */}
        {instructionLineArr.map((el, index) =>  <InstructionLine key={index} stepNumber={index}/> )}        
        <CustomButton text={'Add Instruction'} handleClick={addInstructionLine} className={'block ml-auto'}/>
        
        <CustomButton text={'Save'} handleClick={saveRecipe} className={'block ml-auto'}/>

        <FullRecipe />
    </div>
  )
}

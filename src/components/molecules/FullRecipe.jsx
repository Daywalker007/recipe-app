import React, { useEffect, useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'

export default function FullRecipe() {
    const {fullRecipe} = useRecipeContext()

    const [ingredients, setIngredients] = useState()
    const [instructions, setInstructions] = useState()
    const [calories, setCalories] = useState()

    useEffect(() => {
        fillRecipeItem()
    }, [fullRecipe])

    const fillRecipeItem = () => {
        fullRecipe.length && fullRecipe.map((el) => {
                
            {/* List of ingredients */}
            setIngredients(el.ingredientLineArr.map((ingLine, i) => renderIngredients(ingLine, i)))

            {/* List of instructions */}
            setInstructions(el.instructionLineArr.map((instLine, i) => renderInstructions(instLine, i)))

            {/* Calorie Count */}
            setCalories(renderCalories(el.ingredientLineArr))                
        })
    }

    const renderIngredients = (ingLine, idx) => {
        return (
            <div className='space-x-5' key={idx}>
                <span>{ingLine.Count ? ingLine.Count : 'Empty'}</span>
                <span>{ingLine.Measure ? ingLine.Measure : 'Empty'}</span>
                <span>{ingLine.Ingredient ? ingLine.Ingredient : 'Empty'}</span>
                <span>{ingLine.Calories ? ingLine.Calories : 'Empty'}</span>
            </div>
        )
    }
    
    const renderInstructions = (isntLine, idx) => {
        return (
            <div className='space-x-5' key={idx}>
                <span>{isntLine.index !== null ? isntLine.index : 'Empty'}</span>
                <span>{isntLine.desc ? isntLine.desc : 'Empty'}</span>
            </div>
        )
    }

    const renderCalories = (el) => {
        return (
            <p>
                Calories: {el.some(ing => ing?.Calories) ? el.reduce((sum, curr) => sum+=(parseInt(curr?.Calories)), 0) : 'None'}
            </p>
        )
    }

  return (
    <>
        {ingredients}
        {instructions}
        {calories}      
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { getRecipe } from '../util/db-endpoints'

export default function FullRecipe() {
    const {fullRecipe, setFullRecipe} = useRecipeContext()

    const [ingredients, setIngredients] = useState()
    const [instructions, setInstructions] = useState()
    const [calories, setCalories] = useState()

    useEffect(() => {
        getRecipeByID('651286f811b81269cbdb0547')
    }, [])

    useEffect(() => {
        // console.log('Current recipe', fullRecipe)
        fullRecipe?.name && fillRecipeItem()
    }, [fullRecipe])

    const getRecipeByID = async (id) => {
        const recipe = await getRecipe(id)

        const {name, description, ingredients, instructions} = recipe
        const ing = eval(ingredients)
        const inst = eval(instructions)

        setFullRecipe({name, description, ingredients:ing, instructions:inst })
    }

    const fillRecipeItem = () => {            
        {/* List of ingredients */}
        setIngredients(fullRecipe.ingredients.map((ingLine, i) => renderIngredients(ingLine, i)))
        
        {/* List of instructions */}
        setInstructions(fullRecipe.instructions.map((instLine, i) => renderInstructions(instLine, i)))
        
        {/* Calorie Count */}
        setCalories(renderCalories(fullRecipe.ingredients))
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
    
    const renderInstructions = (instLine, idx) => {
        return (
            <div className='space-x-5' key={idx}>
                <span>{instLine.index !== null ? instLine.index : 'Empty'}</span>
                <span>{instLine.desc ? instLine.desc : 'Empty'}</span>
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
        <p>{fullRecipe?.description}</p>
        {ingredients}
        {instructions}
        {calories}      
    </>
  )
}

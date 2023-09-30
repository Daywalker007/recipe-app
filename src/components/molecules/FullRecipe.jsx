import React, { useEffect, useRef, useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { getRecipe } from '../util/db-endpoints'
import { mesurementOptions } from './IngredientLine'
import { useSearchParams } from 'react-router-dom'

export default function FullRecipe() {
    const {fullRecipe, setFullRecipe} = useRecipeContext()

    const [ingredients, setIngredients] = useState()
    const [instructions, setInstructions] = useState()
    const [calories, setCalories] = useState()

    const [queryParams, setQueryParams] = useSearchParams()

    useEffect(() => {
        const searchParams = Object.fromEntries([...queryParams])
        '_id' in searchParams && getRecipeByID(searchParams._id)
    }, [])

    useEffect(() => {
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
        setIngredients(renderIngredients(fullRecipe.ingredients))
        
        {/* List of instructions */}
        setInstructions(renderInstructions(fullRecipe.instructions))
        
        {/* Calorie Count */}
        setCalories(renderCalories(fullRecipe.ingredients))
    }

    const renderIngredients = (ingredients) => {
        return (
            <div className='space-y-3 mb-5'>
                {ingredients.map((ingLine, idx) => (
                    <p className='text-black bg-white p-2 rounded-lg' key={idx}>
                        {ingLine?.Count ?? 'Empty'}
                        &nbsp;
                        {mesurementOptions.find(el => el.val === ingLine.Measure)?.label ?? 'Empty'}
                        &nbsp;
                        {ingLine?.Ingredient ?? 'Empty'}
                        &nbsp;
                        ({ingLine?.Calories ?? 'Empty'} calories)
                    </p>
                ))}
            </div>
        )
    }
    
    const renderInstructions = (instructions) => {
        // TODO: handle label click
        
        return (
            <div className='text-black space-y-3 mb-5'>
                {instructions.map((instLine, idx) => (
                    <div className='relative' key={idx}>
                        <input type="checkbox" className='absolute peer/check checked:accent-emerald-500/25 z-10 left-3 top-3' name={`step-${idx}`} />
                        <label htmlFor={`step-${idx}`} className='peer-checked/check:bg-slate-900 p-2 rounded-lg pl-10 bg-white w-full block'>
                            Step {parseInt(instLine?.index) + 1 ?? 'Empty'}:
                            &nbsp;
                            {instLine?.desc ?? 'Empty'}
                        </label>
                    </div>
                ))}
            </div>
        )
    }

    const renderCalories = (el) => {
        return (
            <p className='mb-5'>
                Calories: {el.some(ing => ing?.Calories) ? el.reduce((sum, curr) => sum+=(parseInt(curr?.Calories)), 0) : 'None'}
            </p>
        )
    }

  return (
    <div className='body-height flex flex-col lg:flex-row gap-10'>
        <div className='mx-auto lg:mx-0 flex flex-col justify-center lg:justify-start lg:h-fit relative lg:basis-1/3'>
            <img src='https://picsum.photos/1140/570' className='block object-fit w-full h-full mx-auto lg:h-fit rounded-lg'/>
            <p className='bg-white text-black p-[2%] text-xl text-center absolute bottom-0 w-full rounded-b backdrop-blur-2xl bg-opacity-25'>{fullRecipe?.name}</p>
        </div>

        <div className='lg:flex-1 bg-slate-600 p-3 rounded-lg'>
            <p className='text-2xl mb-5'>{fullRecipe?.description}</p>

            {calories}

            <h2 className='text-4xl mb-2'>Ingredients</h2>
            {ingredients}

            <h2 className='text-4xl mb-2'>Instructions</h2>
            {instructions}
        </div>
    </div>
  )
}

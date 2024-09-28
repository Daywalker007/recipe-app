import { ReactElement, useEffect, useState } from 'react'
import { getRecipe } from '../util/db-endpoints'
import { mesurementOptions } from './IngredientLine'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { fullRecipeState } from '../../recoil-state/recipeState'
import { IngredientLine, RecipeInstructionLine } from '../types/recipe-types'

export default function FullRecipe() {
    const [fullRecipe, setFullRecipe] = useRecoilState(fullRecipeState)

    const [ingredients, setIngredients] = useState<ReactElement>(<></>)
    const [instructions, setInstructions] = useState<ReactElement>(<></>)
    const [calories, setCalories] = useState<ReactElement>()

    const [queryParams] = useSearchParams()

    useEffect(() => {
        const searchParams = Object.fromEntries([...queryParams])
        '_id' in searchParams && getRecipeByID(searchParams._id)
    }, [])

    useEffect(() => {
        fullRecipe?.name && fillRecipeItem()
    }, [fullRecipe])

    const getRecipeByID = async (id:string) => {
        console.log('Searching for id: ', id)
        const {name, description, ingredients, instructions, owner} = await getRecipe(id)

        const ing = eval(ingredients)
        const inst = eval(instructions)

        setFullRecipe({name, description, ingredients:ing, instructions:inst, owner })
    }

    const fillRecipeItem = () => {   
        console.log('Recipe owner', fullRecipe)    
        const ingredients : IngredientLine[] = eval(fullRecipe.ingredients)     
        const instructions : RecipeInstructionLine[] = eval(fullRecipe.instructions)     

        {/* List of ingredients */}
        setIngredients(renderIngredients(ingredients))
        
        {/* List of instructions */}
        setInstructions(renderInstructions(instructions))
        
        {/* Calorie Count */}
        setCalories(renderCalories(ingredients))
    }

    const renderIngredients = (ingredients:IngredientLine[]) : ReactElement => {
        return (
            <div className='space-y-3 mb-5'>
                {ingredients.map((ingLine, idx) => (
                    <p className='text-black bg-white p-2 rounded-lg' key={idx}>
                        {ingLine?.count ?? 'Empty'}
                        &nbsp;
                        {mesurementOptions.find(el => el.val === ingLine.measure)?.label ?? 'Empty'}
                        &nbsp;
                        {ingLine?.ingredient ?? 'Empty'}
                        &nbsp;
                        ({ingLine?.calories ?? 'Empty'} calories)
                    </p>
                ))}
            </div>
        )
    }
    
    const renderInstructions = (instructions:RecipeInstructionLine[]) => {
        // TODO: handle label click
        
        return (
            <div className='text-black space-y-3 mb-5'>
                {instructions.map((instLine, idx) => (
                    <div className='relative' key={idx}>
                        <input type="checkbox" className='absolute peer/check checked:accent-emerald-500/25 z-10 left-3 top-3' name={`step-${idx}`} />
                        <label htmlFor={`step-${idx}`} className='peer-checked/check:bg-slate-900 p-2 rounded-lg pl-10 bg-white w-full block'>
                            Step {(instLine.index + 1) ?? 'Empty'}:
                            &nbsp;
                            {instLine?.desc ?? 'Empty'}
                        </label>
                    </div>
                ))}
            </div>
        )
    }

    const renderCalories = (el:IngredientLine[]) => {
        const calorieCount = el.some(ing => ing?.calories) ? el.reduce((sum, curr) => sum+=(curr?.calories), 0) : '100'

        if(!calorieCount)
            return

        return (
            <>
                <p className='text-3xl'>
                    {calorieCount}
                    <span className='text-sm'>cals</span>
                </p>
            </>
        )
    }

  return (
    <div className='body-height flex flex-col lg:flex-row gap-10'>
        <div className='mx-auto lg:mx-0 flex flex-col justify-center lg:justify-start lg:h-fit relative lg:basis-1/3'>
            <img src='https://picsum.photos/1140/570' className='block object-fit w-full h-full mx-auto lg:h-fit rounded-lg'/>
            
            <div className='flex justify-between bg-white text-black p-[2%] absolute bottom-0 w-full rounded-b-lg backdrop-blur-2xl bg-opacity-25'>
                <div>
                    <p className='text-xl'>{fullRecipe?.name}</p>
                    <p className='text-sm'>{fullRecipe?.owner}</p>
                </div>

                {calories}
            </div>
        </div>

        <div className='lg:flex-1 bg-theme-100 p-3 rounded-lg'>
            <p className='text-2xl mb-5'>{fullRecipe?.description}</p>            

            <h2 className='text-4xl mb-2'>Ingredients</h2>
            {ingredients}

            <h2 className='text-4xl mb-2'>Instructions</h2>
            {instructions}
        </div>
    </div>
  )
}

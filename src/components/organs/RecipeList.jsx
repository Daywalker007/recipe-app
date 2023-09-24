import React, { useEffect, useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import InstructionLine from '../molecules/InstructionLine'
import FullRecipe from '../molecules/FullRecipe'
import { sendRecipe, getRecipe, getRecipeByName} from '../util/db-endpoints'
import { InputField, InputTextArea } from '../atoms/Form'
import validateRecipe from '../util/validateRecipeInput'
import { useSearchParams } from 'react-router-dom'

export default function RecipeList() {
    const {
        ingredientLineArr, 
        setIngredientLineArr, 
        instructionLineArr, 
        currentDescription,
        setCurrentDescription,
        setInstructionLineArr, 
        currentRecipeName,
        setCurrentRecipeName,
        setFullRecipe} = useRecipeContext()   
        
    const [existingRecipe, setExistingRecipe] = useState()
    const [errs, setErrs] = useState()

    const [queryParams, setQueryParams] = useSearchParams()
    const [currentParams, setCurrentParams] = useState()

    useEffect(() => {
        const searchParams = Object.fromEntries([...queryParams])
        setCurrentParams(searchParams)

        '_id' in searchParams && loadRecipe(searchParams._id)

    },[queryParams])

    const loadRecipe = (id) => {
        console.log('Loading recipe: ', id)
        getRecipeByID(id)
    }

    const addIngredientLine = () => {
        setIngredientLineArr(prevArr => [...prevArr, {Calories:'0'}])
    }
    
    const addInstructionLine = () => {
        const currentIndex = instructionLineArr.length
        setInstructionLineArr(prevArr => [...prevArr, {index: currentIndex, desc:''}])
    }

    const handleDescription = (e) => {
        const {innerText} = e.target
        setCurrentDescription(innerText)
    }
    
    const handleRecipeName = (e) => {
        const {value} = e.target
        setCurrentRecipeName(value)
    }
    
    const saveRecipe = () => {
        // console.log({name:'temp name', ingredientLineArr, instructionLineArr})

        const recipeSendItem = {
            name:currentRecipeName, 
            ingredients:ingredientLineArr, 
            instructions:instructionLineArr,
            description:currentDescription,
            owner:'Reggie',
            categories:[
                'sample',
                'category'
            ],
        }

        const errors = validateRecipe(recipeSendItem)
        setErrs(errors)

        console.log('Errors: ', errors)

        // sendRecipe(recipeSendItem)
    }    
    
    const getRecipeFromDB = async () => {
        const {name, description, ingredients, instructions} = await getRecipeByName('temp name')
        // console.log(await getRecipe('temp name'))
        const ing = eval(ingredients)
        const inst = eval(instructions)
        setFullRecipe({name, description, ingredients:ing, instructions:inst })
    } 
    
    const getRecipeByID = async (id) => {
        const recipe = await getRecipe(id)
        setExistingRecipe(recipe)

        const {name, description, ingredients, instructions} = recipe
        const ing = eval(ingredients)
        const inst = eval(instructions)
        console.log({name, description, ing, inst})

        setCurrentRecipeName(name)
        setCurrentDescription(description)
        setIngredientLineArr([...ing])
        setInstructionLineArr([...inst])
    }

  return (
    <div className='body-height space-y-5'>
        {/* Recipe Name */}
        <InputField defaultValue={existingRecipe?.name} name={'Recipe Name'} placeholder={'Please enter a name'} onChange={handleRecipeName}/>

        {/* Description */}
        <InputTextArea defaultValue={existingRecipe?.description} name={'Description'} onChange={handleDescription}/>

        {/* Ingredients */}
        {ingredientLineArr.map((el, index) =>  <IngredientLine key={index} lineIndex={index} defaultInfo={el} /> )}
        <CustomButton text={'Add Ingredient'} handleClick={addIngredientLine} className={'block ml-auto'}/>
        
        {/* Instructions */}
        {instructionLineArr.map((el, index) =>  <InstructionLine key={index} stepNumber={index} defaultInfo={el} /> )}        
        <CustomButton text={'Add Instruction'} handleClick={addInstructionLine} className={'block ml-auto'}/>
        
        <CustomButton text={'Save'} handleClick={saveRecipe} className={'block ml-auto'}/>
        <CustomButton text={'Get Recipe'} handleClick={getRecipeFromDB} className={'block ml-auto'}/>

        {/* Read only */}
        <FullRecipe />
    </div>
  )
}

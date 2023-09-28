import React, { useEffect, useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import InstructionLine from '../molecules/InstructionLine'
import FullRecipe from '../molecules/FullRecipe'
import { sendRecipe, updateRecipe, getRecipe, getRecipeByName} from '../util/db-endpoints'
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
        resetRecipe,
        setFullRecipe,
        user} = useRecipeContext()   
        
    const [existingRecipe, setExistingRecipe] = useState()
    const [errs, setErrs] = useState()

    const [queryParams, setQueryParams] = useSearchParams()

    useEffect(() => {
        const searchParams = Object.fromEntries([...queryParams])
        console.log('Search params:', searchParams)
        '_id' in searchParams ? getRecipeByID(searchParams._id) : initRecipe()

        return () => resetRecipe()
    },[queryParams])

    /** Inits one ingredient and one instruction */
    const initRecipe = () => {
        addIngredientLine()
        addInstructionLine()
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
        const recipeSendItem = {
            name:currentRecipeName, 
            ingredients:ingredientLineArr, 
            instructions:instructionLineArr,
            description:currentDescription,
            owner:user._id, //MongoDB id of user, so that we can find their username later
            categories:[
                'sample',
                'category'
            ],
        }

        console.log(recipeSendItem)

        const errors = validateRecipe(recipeSendItem)
        setErrs(errors)

        console.log('Errors: ', errors)

        if(Object.keys(errors).length !== 0){
            alert('Handle the Errors')
            return
        }

        // If there is an id, update on that id. Else, save as new
        if(Object.fromEntries([...queryParams])._id)
            updateRecipe(Object.fromEntries([...queryParams])._id, recipeSendItem)
        else
            sendRecipe(recipeSendItem)
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
        // console.log('Recipe pulled from db',{name, description, ing, inst})

        console.log('New ingredients', ing)

        setCurrentRecipeName(name)
        setCurrentDescription(description)
        setIngredientLineArr(ing)
        setInstructionLineArr(inst)
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
        
        {/* Save Button */}
        <CustomButton text={'Save'} handleClick={saveRecipe} className={'block ml-auto'}/>
        <CustomButton text={'Get Recipe'} handleClick={getRecipeFromDB} className={'block ml-auto'}/>
    </div>
  )
}

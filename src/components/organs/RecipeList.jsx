import React, { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import InstructionLine from '../molecules/InstructionLine'
import FullRecipe from '../molecules/FullRecipe'
import { sendRecipe, getRecipe} from '../util/db-endpoints'
import { InputField, InputTextArea } from '../atoms/Form'
import validateRecipe from '../util/validateRecipeInput'

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
        
    const [errs, setErrs] = useState()

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
        const {name, description, ingredients, instructions} = await getRecipe('temp name')
        // console.log(await getRecipe('temp name'))
        const ing = eval(ingredients)
        const inst = eval(instructions)
        setFullRecipe({name, description, ingredients:ing, instructions:inst })
    }    

  return (
    <div className='body-height space-y-5'>
        {/* Recipe Name */}
        <InputField name={'Recipe Name'} placeholder={'Please enter a name'} onChange={handleRecipeName}/>

        {/* Description */}
        <InputTextArea name={'Description'} onChange={handleDescription}/>

        {/* Ingredients */}
        {ingredientLineArr.map((el, index) =>  <IngredientLine key={index} lineIndex={index} /> )}
        <CustomButton text={'Add Ingredient'} handleClick={addIngredientLine} className={'block ml-auto'}/>
        
        {/* Instructions */}
        {instructionLineArr.map((el, index) =>  <InstructionLine key={index} stepNumber={index}/> )}        
        <CustomButton text={'Add Instruction'} handleClick={addInstructionLine} className={'block ml-auto'}/>
        
        <CustomButton text={'Save'} handleClick={saveRecipe} className={'block ml-auto'}/>
        <CustomButton text={'Get Recipe'} handleClick={getRecipeFromDB} className={'block ml-auto'}/>

        <FullRecipe />
    </div>
  )
}

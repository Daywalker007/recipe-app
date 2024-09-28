import { useEffect, useState } from 'react'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import InstructionLine from '../molecules/InstructionLine'
import { sendRecipe, updateRecipe, getRecipe, getRecipeByName} from '../util/db-endpoints'
import { InputField, InputTextArea } from '../atoms/Form'
import validateRecipe, { IRecipeError } from '../util/validateRecipeInput'
import { useSearchParams } from 'react-router-dom'
import { CreateRecipeRequest, IngredientLine as IngLine, RecipeResponse } from '../types/recipe-types'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { fullRecipeState, ingredientListState, instructionListState } from '../../recoil-state/recipeState'
import useResetRecipe from '../../hooks/useResetRecipe'
import { userState } from '../../recoil-state/userState'

export default function RecipeList() { 
    
    const [ingredientLineArr, setIngredientLineArr] = useRecoilState(ingredientListState)
    const [instructionLineArr, setInstructionLineArr] = useRecoilState(instructionListState)
    const setFullRecipe = useSetRecoilState(fullRecipeState)
    const resetRecipe = useResetRecipe()
        
    const [existingRecipe, setExistingRecipe] = useState<RecipeResponse>()
    const [, setErrs] = useState<IRecipeError>({errorMessage:[]})
    const [description, setDescription] = useState<string>('')
    const [recipeName, setRecipeName] = useState<string>('')
    const [queryParams] = useSearchParams()

    const user = useRecoilValue(userState)

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
        const emptyIngredientLine : IngLine = {
            count: 0,
            measure: '',
            ingredient: '',
            calories: 0
        }
        setIngredientLineArr(prevArr => [...prevArr, emptyIngredientLine])
    }
    
    const addInstructionLine = () => {
        const currentIndex = instructionLineArr.length
        setInstructionLineArr(prevArr => [...prevArr, {index: currentIndex, desc:''}])
    }

    const handleDescription = (e:any) => {
        const {innerText} = e.target
        setDescription(innerText)
    }
    
    const handleRecipeName = (e:any) => {
        const {value} = e.target
        setRecipeName(value)
    }
    
    const saveRecipe = () => {
        const recipeSendItem : CreateRecipeRequest = {
            name:recipeName, 
            ingredients:ingredientLineArr, 
            instructions:instructionLineArr,
            description:description,
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
        setFullRecipe({name, description, ingredients:ing, instructions:inst } as RecipeResponse)
    } 
    
    const getRecipeByID = async (id:string) => {
        const recipe = await getRecipe(id)
        setExistingRecipe(recipe)

        const {name, description, ingredients, instructions} = recipe
        const ing = eval(ingredients)
        const inst = eval(instructions)
        // console.log('Recipe pulled from db',{name, description, ing, inst})

        console.log('New ingredients', ing)

        setRecipeName(name)
        setDescription(description)
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

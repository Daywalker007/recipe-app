import React, {createRef, useEffect} from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import CustomButton from '../atoms/Button'
import IngredientLine from '../molecules/IngredientLine'
import { InputTextArea } from '../atoms/Form'

export default function RecipeList() {
    const {ingredientLineArr, setIngredientLineArr} = useRecipeContext()    

    const addIngredientLine = () => {
        const newRef = createRef()
        setIngredientLineArr(prevArr => [...prevArr, {Calories:'0'}])
    }

    useEffect(() => {
        console.log('Ing list: ', ingredientLineArr)
    }, [ingredientLineArr])

  return (
    <div className='p-5 space-y-5'>
        {ingredientLineArr.map((el, index) => {
            // {console.log('Element', el)}
            return <IngredientLine key={index} lineIndex={index} />
        })}
        <CustomButton text={'Add Ingredient'} handleClick={addIngredientLine} className={'block ml-auto'}/>
        {ingredientLineArr.map((el, idx) => {
            return (
                <div className='space-x-5' key={idx}>
                    <span>{el.Count ? el.Count : 'Empty'}</span>
                    <span>{el.Measure ? el.Measure : 'Empty'}</span>
                    <span>{el.Ingredient ? el.Ingredient : 'Empty'}</span>
                    <span>{el.Calories ? el.Calories : 'Empty'}</span>
                </div>
            )
        })}
        <p>
            Calories: {ingredientLineArr.some(el => el?.Calories) ? ingredientLineArr.reduce((sum, curr) => sum+=(parseInt(curr?.Calories)), 0) : 'None'}
        </p>
    </div>
  )
}

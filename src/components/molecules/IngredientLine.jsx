import React, { useState } from "react";
import { InputField, InputTextArea, InputDropdownField } from "../atoms/Form";
import { useRecipeContext } from "../context/RecipeContext";
import CustomButton from "../atoms/Button";

function IngredientLine({lineIndex}) {
    //Context state
    const {ingredientLineArr, setIngredientLineArr} = useRecipeContext()  

    //Local state
    const [currentRecipeLine, setCurrentRecipeLine] = useState()

    const mesurementOptions = [
        {label: 'Ounce', val:'1'},
        {label: 'Tablespoon', val:'2'},
        {label: 'Teaspoon', val:'3'},
        {label: 'Gram', val:'4'},
    ]

    const updateRecipe = (e) => {
        //Set value on local ingredient line
        const {name, value} = e.target
        const newObj = {...currentRecipeLine, [name]:value}
        setCurrentRecipeLine(newObj)

        //Set value in context for whole recipe
        let newContextRecipe = [...ingredientLineArr]
        newContextRecipe[lineIndex] = newObj
        setIngredientLineArr(newContextRecipe)
    }

    const deleteIngredientLine = () => {
        // let newContextRecipeArr = [...ingredientLineArr]
        // newContextRecipeArr = newContextRecipeArr.filter((el, index) => index !== lineIndex)
        // console.log('Copy of context arr', newContextRecipeArr)
        // setIngredientLineArr(prevArr => prevArr.filter((el, index) => index !== lineIndex))
    }

  return (
    <div className="border border-gray-700 p-10 flex gap-3">
        <InputField className={'basis-1/3'} name={'Count'} onChange={updateRecipe} type="number" />
        <InputDropdownField className={'basis-1/10'} name={'Measure'} onChange={updateRecipe}  options={mesurementOptions}/>
        <InputField className={'basis-1/3'} name={'Ingredient'} onChange={updateRecipe} />
        <InputField className={'basis-1/10'} name={'Calories'} onChange={updateRecipe} type="number" defaultValue='0' />
        {/* <CustomButton text={'Delete'} handleClick={deleteIngredientLine} /> */}
    </div>
  );
}

export default IngredientLine

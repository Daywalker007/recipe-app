import { useState } from "react";
import { InputField, InputTextArea, InputDropdownField } from "../atoms/Form";
import { useRecipeContext } from "../context/RecipeContext";
import { IngredientLine as IngLine } from "../types/recipe-types";

export const mesurementOptions = [
    {label: 'Ounce', val:'1'},
    {label: 'Tablespoon', val:'2'},
    {label: 'Teaspoon', val:'3'},
    {label: 'Gram', val:'4'},
]

interface IIngredientLineProps {
    lineIndex: number,
    defaultInfo: IngLine
}
function IngredientLine({lineIndex, defaultInfo}:IIngredientLineProps) {
    //Context state
    const {ingredientLineArr, setIngredientLineArr} = useRecipeContext()  

    //Local state
    const [currentRecipeLine, setCurrentRecipeLine] = useState(defaultInfo)

    const updateRecipe = (e:any) => {
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
        <InputField defaultValue={defaultInfo?.count} className={'basis-1/3'} name={'Count'} onChange={updateRecipe} type="number" />
        <InputDropdownField defaultValue={defaultInfo?.measure} className={'basis-1/10'} name={'Measure'} onChange={updateRecipe}  options={mesurementOptions}/>
        <InputField defaultValue={defaultInfo?.ingredient} className={'basis-1/3'} name={'Ingredient'} onChange={updateRecipe} />
        <InputField defaultValue={defaultInfo?.calories ?? 0} className={'basis-1/10'} name={'Calories'} onChange={updateRecipe} type="number" />
        {/* <CustomButton text={'Delete'} handleClick={deleteIngredientLine} /> */}
    </div>
  );
}

export default IngredientLine

import {atom} from 'recoil'
import { IngredientLine, RecipeInstructionLine, RecipeResponse } from '../components/types/recipe-types'

const defaultRecipe : RecipeResponse = {
    name: '',
    ingredients: '',
    instructions: '',
    description: '',
    owner: ''
}
const defaultIngredientList : IngredientLine[] = []
const defaultInstructionList : RecipeInstructionLine[] = []

export const ingredientListState = atom<IngredientLine[]>({
    key: 'ingredientListState',
    default: defaultIngredientList
})

export const instructionListState = atom<RecipeInstructionLine[]>({
    key: 'instructionListState',
    default: defaultInstructionList
})

export const fullRecipeState = atom<RecipeResponse>({
    key: 'fullRecipeState',
    default: defaultRecipe
})
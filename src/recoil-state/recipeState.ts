import {atom} from 'recoil'
import { RecipeResponse } from '../components/types/recipe-types'

const defaultRecipeList : RecipeResponse[] = []

export const ingredientListState = atom<RecipeResponse[]>({
    key: 'ingredientListState',
    default: defaultRecipeList
})
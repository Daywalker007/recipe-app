export type IngredientLine = {
    count: number,
    measure: string,
    ingredient: string,
    calories: number
}

export type RecipeInstructionLine = {
    index: number,
    desc: string
}


export type CreateRecipeRequest = {
    name: string, 
    ingredients:    IngredientLine[], 
    instructions:RecipeInstructionLine[],
    description: string,
    owner: string
    categories: string[],
}

export type RecipeResponse = {
  _id: {
    $oid: string
  },
  name: string,
  ingredients: string,
  instructions: string,
  description: string,
  owner: string,
  categories: string[]
  entryDate: {
    $date: string
  },
  __v: number
};
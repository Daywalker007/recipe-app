export interface IRecipeError {
    errorMessage: string[]
}

export default function validateRecipe(recipeInput) {
    const {name, ingredients, instructions, description} = recipeInput
    const errors : IRecipeError = {
        errorMessage: []
    }

    if(!name){
        errors.errorMessage.push('Please provide a name for the recipe')
        return errors
    }

    if(!ingredients){
        errors.errorMessage.push('Please povide ingredients for the recipe')
        return errors
    }

    if(!instructions){
        errors.errorMessage.push('Please povide insrructions for the recipe')
        return errors
    }
    
    if(!description){
        errors.errorMessage.push('Please povide a brief description for the recipe')
        return errors
    }

    ingredients && ingredients.map((el, index) => {
        console.log('Current ingredient: ', el)
    
        if(!el.Count)
            errors.errorMessage.push(`Please provide a count for ingredient ${index+1}`)

        if(!el.Measure)
            errors.errorMessage.push(`Please provide a measure for ingredient ${index+1}`)
        
        if(!el.Ingredient)
            errors.errorMessage.push(`Please provide an ingredient for ingredient ${index+1}`)
    })

    if(errors.errorMessage.length)
        return errors
    
    instructions && instructions.map((el, i) => {
        console.log(`Instruction ${i}`, el)
    
        if(!el.desc)
            errors.errorMessage.push(`Please provide a description for step ${i+1}`)
    })    

    return errors
}


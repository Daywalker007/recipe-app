export default function validateRecipe(recipeInput) {
    const {name, ingredients, instructions, description} = recipeInput
    const errors = {}

    if(!name)
        errors.name = 'Please provide a name for the recipe'

    if(!ingredients)
        errors.ingredients = 'Please povide ingredients for the recipe'

    // Create array for holding each items errors
    errors.ingredients = []
    errors.instructions = []

    ingredients && ingredients.map((el, index) => {
        const errObj = {}

        console.log('Current ing line: ', el.Count)
    
        if(!el.Count)
            errObj.Count = 'Please provide a count'

        if(!el.Measure)
            errObj.Measure = 'Please provide a measure'
        
        if(!el.Ingredient)
            errObj.Ingredient = 'Please provide an ingredient'

        if(Object.keys(errObj).length !== 0)
            errors.ingredients[index] = errObj
    })
    
    instructions && instructions.map((el, i) => {
        const errObj = {}
    
        if(!el.dsec)
            errObj.dsec = 'Please provide an instruction description'

        if(Object.keys(errObj).length !== 0)
            errors.ingredients[i] = errObj
    })

    // Remove array if there are no errors
    if(errors.ingredients.length === 0)
        delete errors.ingredients

    if(errors.instructions.length === 0)
        delete errors.instructions
    
    if(!instructions)
        errors.instructions = 'Please povide insrructions for the recipe'
    
    if(!description)
        errors.description = 'Please povide a brief description for the recipe'

    return errors
}


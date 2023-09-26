import React, { useEffect, useState } from 'react'
import RecipeCard from '../atoms/RecipeCard'
import { getAllRecipes } from '../util/db-endpoints'


function RecipeListView() {

    const [recipeList, setRecipeList] = useState([])

    const getRecipies = async () => {
        const recipeArr = await getAllRecipes()
        setRecipeList(recipeArr)
    }
    
    useEffect(() => {        
        getRecipies()
    }, [])

    return (
        <div className='flex flex-wrap gap-3 py-2'>
            {
                recipeList?.map(el => {
                    return <RecipeCard key={el._id} recipeId={el._id} recipeName={el.name} recipeDesc={el.description} img={'https://picsum.photos/160'} />
                })
            }
        </div>
    )
}

export default RecipeListView

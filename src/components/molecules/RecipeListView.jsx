import React, { useEffect, useState } from 'react'
import RecipeCard from '../atoms/RecipeCard'
import { getAllRecipes } from '../util/db-endpoints'


function RecipeListView() {

    const [recipeList, setRecipeList] = useState([])

    const getRecipies = async () => {
        const recipeArr = await getAllRecipes()
        console.log('Incoming Arr', recipeArr)
        setRecipeList(recipeArr)
    }
    
    useEffect(() => {        
        getRecipies()
    }, [])

    return (
        <div className='flex flex-wrap gap-3 py-2'>
            {
                recipeList?.map(el => {
                    return <RecipeCard recipeName={el.name} recipeDesc={el.description} img={'https://picsum.photos/160'} />
                })
            }
            {/* 
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a different short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} /> 
            */}
        </div>
    )
}

export default RecipeListView

import React, { useEffect, useState } from 'react'
import RecipeCard from '../atoms/RecipeCard'
import { getAllRecipes, getRecipeByUser,  } from '../util/db-endpoints'
import { useRecipeContext } from '../context/RecipeContext'
import { getUser } from '../util/user-endpoints'


function RecipeListView() {
    const {user, setUser} = useRecipeContext()
    const [recipeList, setRecipeList] = useState([])

    const getRecipes = async () => {
        console.log('Current user:', user)
        const recipeArr = await getRecipeByUser()
        // const recipeArr = await getAllRecipes()
        setRecipeList(recipeArr)
    }
    
    useEffect(() => {
        getRecipes()
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

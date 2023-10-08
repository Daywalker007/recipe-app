import React, { useEffect, useState } from 'react'
import RecipeListView from '../molecules/RecipeListView'
import CustomButton from '../atoms/Button'
import { useNavigate } from 'react-router-dom'
import 'boxicons'
import { useRecipeContext } from '../context/RecipeContext'
import { getAllRecipes, getRecipeByUser } from '../util/db-endpoints'

function Home() {
    const navigate = useNavigate()
    const {user} = useRecipeContext()

    const [usersRecipes, setUsersRecipes] = useState()
    const [allRecipes, setAllRecipes] = useState()

    useEffect(() => {
        // Call an inmmediately called function that gets the recipe data        
        (async () => {
            const users = await getRecipeByUser()
            const all = await getAllRecipes()

            setUsersRecipes(users)
            setAllRecipes(all)
        })()
    }, [])
    
    const handleNewRecipe = (e) => {
        e.preventDefault()

        // Go to new recipe page
        navigate(`/recipe`)
    }

    return (
        <>
            <div className="body-height relative">
                <div className='space-y-5'>
                    <RecipeListView title={'My Recipes'} recipeList={usersRecipes}/>
                    <RecipeListView title={'All Recipes'} recipeList={allRecipes}/>
                </div>
                <CustomButton 
                    onClick={handleNewRecipe}
                    text={<box-icon name='plus' style={{fill: 'white'}}></box-icon>} 
                    className={'fixed bottom-0 right-4 rounded-full !p-1'} 
                />
            </div>
        </>
    )
}

export default Home

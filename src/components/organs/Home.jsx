import React from 'react'
import RecipeListView from '../molecules/RecipeListView'
import CustomButton from '../atoms/Button'
import { useNavigate } from 'react-router-dom'
import 'boxicons'

function Home() {
    const navigate = useNavigate()
    
    const handleNewRecipe = (e) => {
        e.preventDefault()

        // Go to new recipe page
        navigate(`/recipe`)
    }

    return (
        <>
            <div className="body-height relative">
                <RecipeListView />
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

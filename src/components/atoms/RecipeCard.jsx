import React from 'react'
import { useNavigate } from 'react-router-dom'

function RecipeCard({recipeName, recipeDesc, img, recipeId}) {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()

        navigate(`/recipe-view?_id=${recipeId}`)
    }
    
    return (
        <div className='w-max md:w-1/5 h-48 shadow-md rounded-lg bg-slate-400 relative' onClick={handleClick}>
            <img src={img} className='block object-fill rounded-lg h-full w-full'/>
            
            <div className='absolute bottom-0 bg-white w-full text-black bg-opacity-50 backdrop-blur-sm p-2 rounded-b-lg'>
                <h3 className='text-xl truncate'>{recipeName}</h3>
                <p className='truncate text-xs'>{recipeDesc}</p>
            </div>
        </div>
    )
}

export default RecipeCard

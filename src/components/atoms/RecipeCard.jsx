import React from 'react'

function RecipeCard({recipeName, recipeDesc, img}) {
    return (
        <div className='w-[48%] h-48 shadow-md rounded-lg bg-slate-400 relative'>
            <img src={img} className='block object-fill rounded-lg h-full w-full'/>
            
            <div className='absolute bottom-0 bg-white w-full text-black bg-opacity-50 backdrop-blur-sm p-2 rounded-b-lg'>
                <h3 className='text-xl'>{recipeName}</h3>
                <p className='truncate text-xs'>{recipeDesc}</p>
            </div>
        </div>
    )
}

export default RecipeCard

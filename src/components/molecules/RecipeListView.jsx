import React, { useEffect, useState } from 'react'
import RecipeCard from '../atoms/RecipeCard'

function RecipeListView({title, recipeList}) {

    return (
        <>
            <h2 className='text-3xl'>{title}</h2>
            <div className='no-scrollbar w-full overflow-x-scroll'>
                <div className='flex md:flex-wrap gap-3 md:gap-6 py-2 w-max md:w-auto'>
                    {
                        recipeList?.map(el => {
                            return <RecipeCard 
                                key={el._id} 
                                recipeId={el._id} 
                                recipeName={el.name} 
                                recipeDesc={el.description} 
                                img={'https://picsum.photos/160'} 
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RecipeListView

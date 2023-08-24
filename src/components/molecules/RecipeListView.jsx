import React from 'react'
import RecipeCard from '../atoms/RecipeCard'


function RecipeListView() {
    return (
        <div className='flex flex-wrap gap-3 py-2'>
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a different short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
            <RecipeCard recipeName={'This is a recipe'} recipeDesc={'This is a short desc'} img={'https://picsum.photos/160'} />
        </div>
    )
}

export default RecipeListView

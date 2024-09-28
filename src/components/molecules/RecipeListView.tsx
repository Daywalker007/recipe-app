import RecipeCard from '../atoms/RecipeCard'
import { RecipeResponse } from '../types/recipe-types'

interface IRecipeListViewProps {
    title: string,
    recipeList: RecipeResponse[]
}
function RecipeListView({title, recipeList}:IRecipeListViewProps) {

    return (
        <>
            <h2 className='text-3xl'>{title}</h2>
            <div className='no-scrollbar w-full overflow-x-scroll'>
                {/* NOTE: Changing to grid for now. Thinking about having a toggle for classes for both grid and flex-scroll */}
                <div className='grid grid-rows-1 max-md:grid-flow-col md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 py-2 w-max md:w-auto'>
                    {
                        recipeList?.map(el => {
                            return <RecipeCard 
                                key={el._id.$oid} 
                                recipeId={el._id.$oid} 
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

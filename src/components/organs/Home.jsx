import React from 'react'
import RecipeListView from '../molecules/RecipeListView'
import CustomButton from '../atoms/Button'
import 'boxicons'

function Home() {
    return (
        <>
            <div className="body-height relative">
                <RecipeListView />
                <CustomButton 
                    text={<box-icon name='plus' style={{fill: 'white'}}></box-icon>} 
                    className={'fixed bottom-0 right-4 rounded-full !p-1'} 
                />
            </div>
        </>
    )
}

export default Home

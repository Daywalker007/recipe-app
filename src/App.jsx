import './index.css'
import { RecipeContextProvider } from './components/context/RecipeContext'
import RecipeList from './components/organs/RecipeList'

function App() {
  

  return (
    <RecipeContextProvider>
      <RecipeList />
    </RecipeContextProvider>
  )
}

export default App

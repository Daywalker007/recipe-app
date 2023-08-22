import { RecipeContextProvider } from './components/context/RecipeContext'
import RecipeList from './components/organs/RecipeList'
import LoginPage from './components/organs/LoginPage'

function App() {
  

  return (
    <RecipeContextProvider>
      <LoginPage />
    </RecipeContextProvider>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecipeContextProvider } from './components/context/RecipeContext'
import LoginPage from './components/organs/LoginPage'
import RecipeList from './components/organs/RecipeList'
import Nav from './components/molecules/Nav'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipeContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/recipe' element={<RecipeList />} />
        </Routes>
      </BrowserRouter>
    </RecipeContextProvider>
  </React.StrictMode>
)

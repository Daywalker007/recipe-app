import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/organs/LoginPage'
import RecipeList from './components/organs/RecipeList'
import Nav from './components/molecules/Nav'
import Home from './components/organs/Home'
import FullRecipe from './components/molecules/FullRecipe'
import LoggedIn from './components/atoms/LoggedIn'
import { RecoilRoot } from 'recoil'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login/success/' element={<LoggedIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/recipe' element={<RecipeList />} />
          <Route path='/recipe-view' element={<FullRecipe />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)

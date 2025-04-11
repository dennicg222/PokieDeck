import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PokemonPage from './pages/PokemonPage/PokemonPage'
import AboutPage from './pages/AboutPage'
import './App.css'
import PokemonDetail from './assets/components/PokemonDetail'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link>&nbsp; | &nbsp;
          <Link to='/about'>About</Link>
        </nav>
        <Routes>
          <Route
            path='/'
            element={<PokemonPage />} />
          <Route
            path='/about'
            element={<AboutPage />} />
          <Route
            path='/detail/:pokemonName'
            element={<PokemonDetail />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

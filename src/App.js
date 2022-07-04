import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from './Component/NavBar';
import Pokedex from './Container/Pokedex'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes >
        <Route path='/' element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  )
}

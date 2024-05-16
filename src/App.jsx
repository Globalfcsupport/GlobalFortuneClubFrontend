import React from 'react'
import { Router } from 'react-router-dom'
import Routers from './routers'
import { DataProvider } from './context/HomeContext'
import './App.css'
import LoginPage from './main/LoginPage'

const App = () => {
  return (
    <DataProvider>
      <div>
        <Routers />
      </div>
    </DataProvider>
  )
}

export default App

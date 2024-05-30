import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import NavigationBar from './components/NavigationBar';
import Read from './components/Read';
import Create from './components/Create';
import Update from './components/Update';

function App() {

  return (
    <>
      {/* <h1>Jai Bajrangbali</h1> */}
      <BrowserRouter>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

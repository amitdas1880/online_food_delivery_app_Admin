import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SideBar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { Toaster } from 'react-hot-toast';


import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
const App = () => {
  //const url='http://localhost:5000';
  const url='https://online-food-delivery-app-backend.onrender.com';
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
          <Sidebar/>
          <Routes>
            <Route path='/add' element={<Add url={url}/>} />
            <Route path='/list' element={<List url={url}/>} />
            <Route path='/orders' element={<Orders url={url}/>} />
          </Routes>
      </div>
    </div>
  )
}

export default App
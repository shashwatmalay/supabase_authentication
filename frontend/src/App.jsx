import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './login';
import { ToastContainer } from 'react-toastify';
import Register from './register';
import Home from './home';
import Forget from './forget';
import UpdatePassword from './updatepassword';

// import { Component } from 'react';
function App() {
  return (
   <BrowserRouter>
   <ToastContainer/>

   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>} />
    <Route path='/forget' element={<Forget/>}/>
    <Route path='/updatepassword' element={<UpdatePassword/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;

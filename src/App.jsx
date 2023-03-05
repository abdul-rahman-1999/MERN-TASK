import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Edit from './components/Edit';



function App() {
  
  axios.defaults.baseURL = 'https://merntask.onrender.com/api';
  axios.defaults.withCredentials = true

  return <>
  
  <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile/' element={<Profile/>}/>
    <Route path='/profile/edit/:id' element={<Edit/>}/>
    </Routes>

  </>
}

export default App

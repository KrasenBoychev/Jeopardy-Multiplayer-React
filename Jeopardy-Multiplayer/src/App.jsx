import { Routes, Route } from 'react-router-dom';

import './App.css'

import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App

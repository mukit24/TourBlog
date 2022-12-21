import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import BlogDetails from './pages/BlogDetails';
import Blogs from './pages/Blogs';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

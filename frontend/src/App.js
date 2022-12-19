import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BlogDetails from './pages/BlogDetails';
import Blogs from './pages/Blogs';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;

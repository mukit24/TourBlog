import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Blogs from './pages/Blogs';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
        <Route path='/blogs' element={<Blogs />} />
      </Routes>
    </>
  );
}

export default App;

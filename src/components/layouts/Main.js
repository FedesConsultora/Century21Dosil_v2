import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home.js';
import Contact from '../../pages/Contact.js';

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  </main>
);

export default Main;

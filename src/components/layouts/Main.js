// src/components/layouts/Main.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Contact from '../../pages/Contact.js';
// Importa Home si lo necesitas en otra ruta
// import Home from '../../pages/Home.js';

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Contact />} />
      {/* Puedes añadir otras rutas aquí si lo deseas */}
    </Routes>
  </main>
);

export default Main;

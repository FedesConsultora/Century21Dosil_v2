import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home.js';
import ThankYou from '../../pages/ThankYou.js';
import Propiedades from '../../pages/Propiedades.js';
import PropiedadDetalle from '../../pages/PropiedadDetalle.js';

const Main = () => {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/propiedades/:id" element={<PropiedadDetalle />} />
      </Routes>
    </main>
  );
};

export default Main;

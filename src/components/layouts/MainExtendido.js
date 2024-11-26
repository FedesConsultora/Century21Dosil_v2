// src/components/MainExtendido.js

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EquipoSection from '../../components/EquipoSection.js';
import DatosSection from '../DatosSection.js';
import BlogSection from '../BlogSection.js';

const MainExtendido = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contacto';

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className={`main-extendido ${isContactPage ? 'hidden' : ''}`}>
      <DatosSection />
      <EquipoSection />
      <BlogSection />
    </div>
  );
};

export default MainExtendido;

// src/pages/Home.js

import React, { useEffect } from 'react';
import BlogSection from '../components/BlogSection.js';
import EquipoSection from '../components/EquipoSection.js';

const Home = () => {
  useEffect(() => {
    // Si hay un hash en la URL, hacemos scroll a esa sección
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="home-page">
      {/* Div para los bordes personalizados */}
      <div className="borders">
        {/* Borde superior dividido en dos segmentos */}
        <div className="border-top border-top-left"></div>
        <div className="border-top border-top-right"></div>

        {/* Borde derecho dividido en dos segmentos */}
        <div className="border-right border-right-top"></div>
        <div className="border-right border-right-bottom"></div>

        {/* Borde inferior dividido en dos segmentos */}
        <div className="border-bottom border-bottom-left"></div>
        <div className="border-bottom border-bottom-right"></div>

        {/* Borde izquierdo dividido en dos segmentos */}
        <div className="border-left border-left-top"></div>
        <div className="border-left border-left-bottom"></div>
      </div>

      <section id="inicio">
        <h1>
          Bienvenido a <span>Century21Dosil</span>
        </h1>
        <div className="image-container">
          <img src="/assets/images/homeImage.webp" alt="Imagen de Inicio" />
        </div>
      </section>
      <BlogSection />
      <EquipoSection />
    </div>
  );
};

export default Home;

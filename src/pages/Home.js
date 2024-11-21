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
    <div>
      <section id="inicio">
        <h1>Bienvenido a Century21Dosil</h1>
      </section>
      <BlogSection />
      <EquipoSection />
    </div>
  );
};

export default Home;

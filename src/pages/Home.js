import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm.js';
import IntentSelector from '../components/IntentSelector.js';

const Home = () => {
  const [userIntent, setUserIntent] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleIntentSelect = (intent) => {
    setUserIntent(intent);
    // Puedes guardar esta info en localStorage o enviar un evento de analítica si lo requieres
  };

  return (
    <>
      <div id="contacto" className="home-page">
        <div className="borders">
          <div className="border-top border-top-left"></div>
          <div className="border-top border-top-right"></div>
          <div className="border-right border-right-top"></div>
          <div className="border-right border-right-bottom"></div>
          <div className="border-bottom border-bottom-left"></div>
          <div className="border-bottom border-bottom-right"></div>
          <div className="border-left border-left-top"></div>
          <div className="border-left border-left-bottom"></div>
        </div>

        <section id="inicio">
          <article className="textoYfoto">
            <div className="texto_contacto_container">
              <h1 className="titulo">
                Hacemos realidad el <span>sueño de tu hogar</span>
              </h1>
              <h2 className="subTitulo">
                Con profesionalismo e integ<span className="dotted">ridad</span>
              </h2>
              <article className="propiedad_container">
                <p className="titulo">Propiedades desde</p>
                <p className="precio">u$d 79.500</p>
              </article>
              <p className="footerText">
                Muchas opciones para que elijas lo que mejor se adapta a vos: deptos, casas, PHs, lotes. Todo en las zonas más hermosas y al mejor precio.
              </p>
            </div>
            {userIntent === null ? (
              <IntentSelector onSelect={handleIntentSelect} />
            ) : (
              <ContactForm userIntent={userIntent} />
            )}
          </article>
        </section>
      </div>
      <div className="spacerHome"></div>
    </>
  );
};

export default Home;
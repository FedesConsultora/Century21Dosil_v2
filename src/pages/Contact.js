// src/pages/Contact.js

import React from 'react';
import ContactForm from '../components/ContactForm.js';

const Contact = () => (
  <>
    <div className="contact-page">
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

      <article className="textoYfoto">
        <div className="texto_contacto_container">
          <h1 className="titulo">
            Estás a un paso de encontrar el <span>hogar de tus sueños</span>
          </h1>
          <article className="propiedad_container">
            <p className="titulo">Propiedades desde</p>
            <p className="precio">u$d 79.500</p>
          </article>
          <p className="footerText">
            Si llegaste hasta acá, completá con tus datos para que podamos contactarnos:
          </p>
        </div>
        <div className="foto_contacto_container">
        <img
              src="/assets/images/edificioContactoMobile.webp"
              alt="Foto de la propiedad"
            />
        </div>
      </article>

      <ContactForm />
    </div>
    <div className="spacer"></div>
  </>
);

export default Contact;

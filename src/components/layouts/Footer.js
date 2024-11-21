import React, { useState } from 'react';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/assets/images/logo1.2.webp" alt="Century 21 Dosil Logo" />
          </div>
          <div className="footer-content">
            <ul className="footer-info">
              <li onClick={handleModalToggle}>
                <img src="/assets/icons/ubicacion.webp" alt="Ubicación" />
                Av. Monroe 401 | Villa Urquiza
              </li>
              <a
                href="https://wa.me/5491130482121?text=Hola%20estoy%20interesado%20en%20conocer%20sus%20propiedades"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  <img src="/assets/icons/wsp.webp" alt="Teléfono" />
                  011 30482121
                </li>
              </a>
              <a
                href="https://www.instagram.com/century21dosil/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  <img src="/assets/icons/ig.webp" alt="Instagram" />
                  century21dosil
                </li>
              </a>
            </ul>
            <p className="footer-rights">
              © 2024 | C21 Dosil - Todos los derechos reservados
              <br />
              Desarrollado por{' '}
              <a
                href="https://www.fedesconsultora.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fedes Consultora
              </a>
            </p>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalToggle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13141.761507562864!2d-58.4754363!3d-34.5677221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb715dff0e7ed%3A0x4749fffa3708e8d7!2sCentury%2021%20Dosil!5e0!3m2!1ses-419!2sar!4v1732129711106!5m2!1ses-419!2sar"
              width="600"
              height="450"
              title='Mapa'
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <button className="close-modal" onClick={handleModalToggle}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

// src/components/layouts/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.js';
import MenuHamburguesa from '../MenuHamburgesa.js';
import CloseIcon from '../CloseIcon.js';
import Swal from 'sweetalert2';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const showUnderDevelopmentAlert = () => {
    Swal.fire({
      title: 'Funcionalidad en Desarrollo',
      text: 'Esta funcionalidad está en desarrollo.',
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <Logo />
        </Link>
        <div className="menu-icon" onClick={handleMenuToggle}>
          <MenuHamburguesa />
        </div>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <div className="close-icon" onClick={handleMenuToggle}>
            <CloseIcon />
          </div>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  showUnderDevelopmentAlert();
                }}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  showUnderDevelopmentAlert();
                }}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  showUnderDevelopmentAlert();
                }}
              >
                Equipo
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  showUnderDevelopmentAlert();
                }}
              >
                Propiedades
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

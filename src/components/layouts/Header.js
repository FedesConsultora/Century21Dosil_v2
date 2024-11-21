// src/components/layouts/Header.js

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo.js';
import MenuHamburguesa from '../MenuHamburgesa.js';
import CloseIcon from '../CloseIcon.js';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    if (menuOpen) {
      setMenuOpen(false);
    }

    if (targetId) {
      e.preventDefault();

      if (location.pathname !== '/') {
        // Usamos navigate para cambiar de ruta sin recargar
        window.location.href = '/#' + targetId;
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
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
              <Link to="/contacto" onClick={(e) => handleLinkClick(e)}>
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick(e)}>
                Inicio
              </Link>
            </li>
            <li>
              <a href="#blog" onClick={(e) => handleLinkClick(e, 'blog')}>
                Blog
              </a>
            </li>
            <li>
              <a href="#equipo" onClick={(e) => handleLinkClick(e, 'equipo')}>
                Equipo
              </a>
            </li>
            <li>
              <a href="https://century21.com.ar/busqueda/tipo_departamento/operacion_venta">
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

// src/components/layouts/Header.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo.js';
import MenuHamburguesa from '../MenuHamburgesa.js';
import CloseIcon from '../CloseIcon.js';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/" onClick={() => setMenuOpen(false)}>
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
              <Link to="/propiedades" onClick={() => setMenuOpen(false)}>
                Propiedades
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

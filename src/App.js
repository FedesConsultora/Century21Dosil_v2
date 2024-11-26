import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layouts/Header.js';
import Main from './components/layouts/Main.js';
import Footer from './components/layouts/Footer.js';
import './styles/css/main.css';
import MainExtendido from './components/layouts/MainExtendido.js';


const App = () => (
  <Router>
    <div className="header-main">
      <Header />
      <Main />
    </div>
    <MainExtendido />
    <Footer />
  </Router>
);

export default App;
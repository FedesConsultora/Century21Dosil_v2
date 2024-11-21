import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header.js';
import Main from './components/layouts/Main.js';
import Footer from './components/layouts/Footer.js';
import './styles/css/main.css';

const App = () => (
  <Router>
    <Header />
    <Main />
    <Footer />
  </Router>
);

export default App;
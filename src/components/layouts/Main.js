import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home.js';
import ThankYou from '../../pages/ThankYou.js';

const Main = () => {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </main>
  );
};

export default Main;

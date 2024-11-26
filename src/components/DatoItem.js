// src/components/DatoItem.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInView from '../hooks/useInView.js';

const DatoItem = ({ propiedades, entregadas, numero }) => {
  const [ref, isInView] = useInView(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let reqId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressRatio = Math.min(progress / 4000, 1); 
      setCount(Math.ceil(progressRatio * numero));

      if (progress < 2000) {
        reqId = requestAnimationFrame(step);
      }
    };

    if (isInView) {
      reqId = requestAnimationFrame(step);
    }

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, [isInView, numero]);

  return (
    <div className="dato-item" ref={ref}>
      <p className="numero">+ {count}</p>
      <p className="label">{propiedades}</p>
      <p className="label">{entregadas}</p>
    </div>
  );
};

DatoItem.propTypes = {
  propiedades: PropTypes.string.isRequired,
  entregadas: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
};

export default DatoItem;

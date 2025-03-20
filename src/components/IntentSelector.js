import React from 'react';

const IntentSelector = ({ onSelect }) => {
  return (
    <div className="intent-selector">
      <h3>¿Qué deseas hacer?</h3>
      <button onClick={() => onSelect('comprar')}>Comprar</button>
      <button onClick={() => onSelect('vender')}>Vender</button>
    </div>
  );
};

export default IntentSelector;

// src/components/ContactForm.js

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarás el envío del formulario
    // Puedes usar fetch o axios para enviar los datos a un servidor
    // O integrar con un servicio de email usando las variables de entorno
    console.log('Formulario enviado:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <textarea
          name="mensaje"
          placeholder="Consulta"
          value={formData.mensaje}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;

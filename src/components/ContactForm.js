// src/components/ContactForm.js

import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para validar el correo electrónico
  const isValidEmail = (email) => {
    // Expresión regular para validar email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    // Sanitizar la entrada en tiempo real
    const value = e.target.value;
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData({ ...formData, [e.target.name]: sanitizedValue });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío estándar del formulario

    // Validar los campos antes de enviar
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      setStatusMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatusMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Si todo está bien, permitir el envío
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      // Crear un objeto URLSearchParams para enviar los datos como formulario
      const params = new URLSearchParams();
      for (const key in formData) {
        params.append(key, formData[key]);
      }
      params.append('secretKey', '684ec2a8d2241300bfbb228adfbb2883b52bedc29c2d7613d3d04e598035fe499e9695a045d22f8327d64d5760f3f8c6521c6e71f3dca67755dcf12fa1ff0840');

      await fetch('https://script.google.com/macros/s/AKfycbzAckegIvl-Wu3Lq3mh5UjJ5bzgKE5izU89LIeDBi5_RZB0UoPxMZUajirtRsm4wY_BKg/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Tu mensaje ha sido enviado correctamente.',
      });

      // Resetear el formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: '',
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form  onSubmit={handleSubmit} className="contact-form">
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </form>
  );
};

export default ContactForm;

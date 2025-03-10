import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      setStatusMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (formData.telefono && !/^\d+$/.test(formData.telefono)) {
      setStatusMessage('Por favor, ingresa un número de teléfono válido.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatusMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setStatusMessage('');
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      for (const key in formData) {
        params.append(key, formData[key]);
      }
      params.append('secretKey', '684ec2a8d2241300bfbb228adfbb2883b52bedc29c2d7613d3d04e598035fe499e9695a045d22f8327d64d5760f3f8c6521c6e71f3dca67755dcf12fa1ff0840');

      await fetch('https://script.google.com/macros/s/AKfycbxx1QQROZeSunCBWWq-wrZn_Rfm-AUtvDysm3ywshsK13AozRq-Wz2cyV2n-BcGshPDpQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });

      // Redirigir al usuario a la página de agradecimiento
      navigate('/thank-you');

      // Resetear formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: '',
      });

    } catch (error) {
      setStatusMessage('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </form>
  );
};

export default ContactForm;

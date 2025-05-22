import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { guardarFormulario } from '../services/leadsService.js';
import { useLeads } from '../context/LeadsContext.js';

const ContactForm = ({ userIntent, defaultMessage = '', mostrarWhatsapp }) => {
  const navigate = useNavigate();
  const { leadId } = useLeads();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
    intencion: userIntent || '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultMessage) {
      setFormData((prev) => ({
        ...prev,
        mensaje: defaultMessage,
      }));
    }
  }, [defaultMessage]);

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
      const dataConClave = {
        ...formData,
        secretKey: process.env.REACT_APP_CONTACT_SECRET_KEY,
        id_utm: leadId,
      };

      console.log('✅ Formulario listo para enviar:', dataConClave);

      await guardarFormulario(dataConClave);
      navigate('/thank-you');

      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: '',
        intent: userIntent || '',
      });
    } catch (error) {
      setStatusMessage('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
      console.error('❌ Error al guardar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleWhatsappClick = async () => {
    const mensaje = formData.mensaje || 'Consulta desde propiedad';
    const telefonoDestino = '+541130482121'; 
    const urlWhatsapp = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(mensaje)}`;

    const datos = {
      nombre: formData.nombre || 'Consulta por WhatsApp',
      apellido: formData.apellido || '',
      email: formData.email || 'whatsapp@auto.com',
      telefono: formData.telefono || '',
      mensaje,
      intencion: 'whatsapp',
      id_utm: leadId,
      secretKey: process.env.REACT_APP_CONTACT_SECRET_KEY,
    };

    try {
      await guardarFormulario(datos);
      window.open(urlWhatsapp, '_blank');
    } catch (error) {
      console.error('❌ Error al enviar por WhatsApp:', error);
      setStatusMessage('No se pudo completar el envío por WhatsApp.');
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
        />
      </div>
      <div className="form-buttons">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar por Email'}
        </button>

        {mostrarWhatsapp && (
          <button
            type="button"
            className="btn-whatsapp"
            onClick={handleWhatsappClick}
          >
            {isSubmitting ? 'Enviando...' : 'Contactar por WhatsApp'}
          </button>
        )}
      </div>
      
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </form>
  );
};

export default ContactForm;
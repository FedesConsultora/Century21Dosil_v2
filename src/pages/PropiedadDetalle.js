import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm.js';
import { formatUSD } from '../utils/formatPrice.js';

const PropiedadDetalle = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Array con TODAS las imágenes (principal + Img2..Img5)
  const [images, setImages] = useState([]);

  // Estado para el modal de imágenes (fullscreen)
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const url = 'https://script.google.com/macros/s/AKfycbxhiW8_FJ-KHHE2uSP1UHUiOnY1PpRFGkEfu3PAQL64dAcVjuNXyN_Jh9TDvjZ2kjCU_Q/exec?action=getProperties';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.ID == id);
        setProperty(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener propiedad:', err);
        setLoading(false);
      });
  }, [id]);

  // Construimos el array de imágenes al cambiar property
  useEffect(() => {
    if (property) {
      const allImages = [
        property.ImgPrincipal,
        property.Img2,
        property.Img3,
        property.Img4,
        property.Img5
      ].filter(Boolean); // Omite undefined o strings vacías
      setImages(allImages);
    }
  }, [property]);

  // Imagenes adicionales (índice 1..final)
  const extraImages = images.slice(1);
  const extraImagesClass = extraImages.length < 3 ? 'fewer-than-three' : '';

  // Modal: abrir/cerrar
  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Avanzar/Retroceder en el modal
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Muestra un check si valor es "Si"
  const renderCheck = (value) => {
    if (value && value.toLowerCase() === "si") {
      return <span className="check-icon">✓</span>;
    }
    return null;
  };

  // Renderiza un campo solo si tiene valor
  const renderField = (label, value, suffix = "") => {
    if (!value) return null;
    return (
      <p>
        <strong>{label}:</strong> {value}
        {suffix}
      </p>
    );
  };

  if (loading) {
    return (
      <div className="detalleContainer">
        <div className="spacerProps"></div>
        <div className="propiedad-detalle-page">
          {/* Bordes */}
          <div className="borders">
            <div className="border-top border-top-left"></div>
            <div className="border-top border-top-right"></div>
            <div className="border-right border-right-top"></div>
            <div className="border-right border-right-bottom"></div>
            <div className="border-bottom border-bottom-left"></div>
            <div className="border-bottom border-bottom-right"></div>
            <div className="border-left border-left-top"></div>
            <div className="border-left border-left-bottom"></div>
          </div>
          <section className="contenido-detalle">
            <h2>Cargando detalle...</h2>
          </section>
        </div>
        <div className="spacerProps"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="detalleContainer">
        <div className="spacerProps"></div>
        <div className="propiedad-detalle-page">
          {/* Bordes */}
          <div className="borders">
            <div className="border-top border-top-left"></div>
            <div className="border-top border-top-right"></div>
            <div className="border-right border-right-top"></div>
            <div className="border-right border-right-bottom"></div>
            <div className="border-bottom border-bottom-left"></div>
            <div className="border-bottom border-bottom-right"></div>
            <div className="border-left border-left-top"></div>
            <div className="border-left border-left-bottom"></div>
          </div>
          <section className="contenido-detalle">
            <h2>No se encontró la propiedad con ID {id}</h2>
          </section>
        </div>
        <div className="spacerProps"></div>
      </div>
    );
  }

  // Mensaje por defecto para el formulario
  const defaultMessage = `Hola, estoy interesado en la propiedad - ${property.Título || ''}`;
  // Precio formateado
  const precioFormateado = formatUSD(property["Precio de Venta"]);

  return (
    <div className="detalleContainer">
      <div className="spacerProps"></div>

      <div className="propiedad-detalle-page">
        {/* Bordes */}
        <div className="borders">
          <div className="border-top border-top-left"></div>
          <div className="border-top border-top-right"></div>
          <div className="border-right border-right-top"></div>
          <div className="border-right border-right-bottom"></div>
          <div className="border-bottom border-bottom-left"></div>
          <div className="border-bottom border-bottom-right"></div>
          <div className="border-left border-left-top"></div>
          <div className="border-left border-left-bottom"></div>
        </div>

        <section className="contenido-detalle">
          <h1>{property.Título || "Sin título"}</h1>

          <div className="detalle-info">

            {/* Foto principal + Formulario */}
            <div className="imagenYform">
              {images[0] && (
                <div 
                  className="imagen-principal-container"
                  onClick={() => handleOpenModal(0)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={images[0]}
                    alt={property.Título || 'Propiedad'}
                    className="img-principal"
                  />
                </div>
              )}

              <div className="form-detalle">
                <div className="info-rapida">
                  {precioFormateado && (
                    <p><strong>Precio:</strong> {precioFormateado}</p>
                  )}
                </div>

                <ContactForm 
                  userIntent="Comprar" 
                  defaultMessage={defaultMessage}
                />
              </div>
            </div>

            {/* Datos principales */}
            <div className="datos-principales">
              {renderField("Tipo", property.Tipo)}
              {renderField("Ubicación", property.Ubicación)}
              {renderField("Superficie Total", property["Superficie Total"], " m²")}
              {renderField("Habitaciones", property.Habitaciones)}
              {renderField("Baños", property.Baños)}
              {renderField("Ambientes", property.Ambientes)}
              {renderField("Año de Construcción", property["Año de Construcción"])}
              {renderField("Niveles Construidos", property["Niveles construidos"])}
              {renderField("Piso", property["Piso En Que Se Encuentra"])}
              {renderField("Número de Elevadores", property["Número de Elevadores"])}
              {renderField("Calidad de la Construcción", property["Calidad de la Construcción"])}
              {renderField("Cuota de mantenimiento", property["Cuota de mantenimiento"])}
              {renderField("Tipo Terreno", property["Tipo Terreno"])}
            </div>

            {property.Descripción && (
              <div className="descripcion">
                <h3>Descripción</h3>
                <p>{property.Descripción}</p>
              </div>
            )}

            <div className="servicios">
              <h3>Servicios</h3>
              <ul>
                {renderCheck(property.Agua) && <li>Agua {renderCheck(property.Agua)}</li>}
                {renderCheck(property.Electricidad) && <li>Electricidad {renderCheck(property.Electricidad)}</li>}
                {renderCheck(property["Gas Natural"]) && <li>Gas Natural {renderCheck(property["Gas Natural"])}</li>}
                {renderCheck(property.Internet) && <li>Internet {renderCheck(property.Internet)}</li>}
                {renderCheck(property["Lavadero"]) && <li>Lavadero {renderCheck(property["Lavadero"])}</li>}
                {renderCheck(property["Patio"]) && <li>Patio {renderCheck(property["Patio"])}</li>}
                {renderCheck(property["Pileta"]) && <li>Pileta {renderCheck(property["Pileta"])}</li>}
                {renderCheck(property["Jardín"]) && <li>Jardín {renderCheck(property["Jardín"])}</li>}
                {renderCheck(property["Cable"]) && <li>Cable {renderCheck(property["Cable"])}</li>}
                {renderCheck(property["Apto Mascotas"]) && <li>Apto Mascotas {renderCheck(property["Apto Mascotas"])}</li>}
                {renderCheck(property["Luminoso"]) && <li>Luminoso {renderCheck(property["Luminoso"])}</li>}
                {renderCheck(property["Aire Acondicionado"]) && <li>Aire Acondicionado {renderCheck(property["Aire Acondicionado"])}</li>}
              </ul>
            </div>

            {/* Mapa (SOLO si existe property.Ubicación) */}
            {property.Ubicación && (
              <div className="map-container">
                <h3>Ubicación</h3>
                <div className="map-embed">
                  {/* 
                    Opción 1: Usar "iframe" con un embed
                    Asumiendo que property.Ubicación es algo como "Av. Corrientes 500, CABA" 
                    Podrías usar Google Maps con q=(address), z=16, etc.
                  */}
                  <iframe
                    title="Mapa de la propiedad"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      property.Ubicación
                    )}&z=16&output=embed`}
                  />
                </div>
              </div>
            )}

            {/* Galería adicional (índice 1 en adelante) */}
            <div className="galeria-adicional">
              <h3>Más imágenes</h3>
              <div className={`imagenes-extra ${extraImagesClass}`}>
                {extraImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Imagen Extra ${i}`}
                    onClick={() => handleOpenModal(i + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL fullscreen */}
      {showModal && images[currentIndex] && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-arrow left-arrow" onClick={handlePrev}>&lt;</button>
            <button className="modal-close" onClick={handleCloseModal}>X</button>
            <img
              src={images[currentIndex]}
              alt={`Foto ${currentIndex}`}
              className="fullscreen-img"
            />
            <button className="modal-arrow right-arrow" onClick={handleNext}>&gt;</button>
          </div>
        </div>
      )}

      <div className="spacerProps"></div>
    </div>
  );
};

export default PropiedadDetalle;
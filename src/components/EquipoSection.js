// src/components/EquipoCarousel.js

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EquipoCarousel = () => {
  const reels = [
    {
      id: 1,
      videoSrc: '/assets/video/reel1.mp4',
      title: 'Reel del Agente 1',
    },
    {
      id: 2,
      videoSrc: '/assets/video/reel2.mp4',
      title: 'Reel del Agente 2',
    },
    {
      id: 3,
      videoSrc: '/assets/video/reel3.mp4',
      title: 'Reel del Agente 3',
    },
    // Agrega más reels según sea necesario
  ];

  const videoRefs = useRef([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  // Pausar video al cambiar de slide
  const handleSlideChange = () => {
    if (currentPlaying !== null && videoRefs.current[currentPlaying]) {
      videoRefs.current[currentPlaying].pause();
      setCurrentPlaying(null);
    }
  };

  // Pausar video al hacer clic fuera del carrusel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.equipo-carousel')) {
        if (currentPlaying !== null && videoRefs.current[currentPlaying]) {
          videoRefs.current[currentPlaying].pause();
          setCurrentPlaying(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [currentPlaying]);

  const handleVideoClick = (index) => {
    // Si otro video está reproduciéndose, pausarlo
    if (currentPlaying !== null && currentPlaying !== index) {
      if (videoRefs.current[currentPlaying]) {
        videoRefs.current[currentPlaying].pause();
      }
    }

    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
      setCurrentPlaying(index);
    } else {
      video.pause();
      setCurrentPlaying(null);
    }
  };

  return (
    <div id="equipo" className="equipo-carousel_container">
      <div className="spacerEquipo"></div>
      <div className="equipo-carousel">
        <div className="borders">
          {/* ... (bordes omitidos para brevedad) */}
        </div>
        <article className='textoContainer'>
          <h2 className='tituloEquipo'>Nuestro equipo y cómo trabajamos</h2>
          <p className='parrafoEquipo'>Comprar una casa no es cualquier cosa y lo sabemos: <strong>nos lo tomamos en serio</strong> y te aseguramos una experiencia en la que no te vas a llevar ningún fiasco.</p>
        </article>
        
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          grabCursor={true}
          onSlideChange={handleSlideChange}
        >
          {reels.map((reel, index) => (
            <SwiperSlide key={reel.id}>
              <div className="reel" onClick={() => handleVideoClick(index)}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                preload="metadata"
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                controls={false} // Asegura que no aparezcan los controles
                controlsList="nodownload noremoteplayback noplaybackrate nodoubletapplayback" // Opcional
              >
                <source src={reel.videoSrc} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="spacerEquipo"></div>
    </div>
  );
};

export default EquipoCarousel;

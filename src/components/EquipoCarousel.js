// src/components/EquipoCarousel.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const EquipoCarousel = () => {
  const reels = [
    {
      id: 1,
      videoSrc: '/videos/reel1.mp4',
      title: 'Reel del Agente 1'
    },
    // Agrega más reels según sea necesario
  ];

  return (
    <div className="equipo-carousel">
      <Carousel showThumbs={false} showStatus={false}>
        {reels.map((reel) => (
          <div key={reel.id}>
            <video controls>
              <source src={reel.videoSrc} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            <p className="legend">{reel.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EquipoCarousel;

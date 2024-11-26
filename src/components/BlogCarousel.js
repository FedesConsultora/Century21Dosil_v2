// src/components/BlogCarousel.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlogCarousel = () => {
  const blogNotes = [
    {
      id: 1,
      imageSrc: '/assets/images/blog1.jpg',
      title: 'Guía completa para comprar una vivienda.',
      link: 'https://www.infobae.com/economia/2024/09/07/blanqueo-y-propiedades-guia-completa-para-comprar-viviendas-con-beneficios-fiscales/',
    },
    {
      id: 2,
      imageSrc: '/assets/images/blog2.jpg',
      title: 'Efecto de los créditos hipotecarios en la economía.',
      link: 'https://eleconomista.com.ar/economia/efecto-creditos-hipotecarios-blanqueo-demanda-inmuebles-disparo-100-anual-caba-n78900',
    },
    {
      id: 3,
      imageSrc: '/assets/images/blog3.jpg',
      title: '¿Qué es hipoteca divisible?',
      link: 'https://www.lanacion.com.ar/propiedades/casas-y-departamentos/la-hipoteca-del-futuro-dijo-caputo-que-son-las-hipotecas-divisibles-y-como-funciona-el-sistema-que-nid13112024/',
    },
  ];

  return (
    <Swiper
      modules={[Pagination, A11y]}
      spaceBetween={40}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      grabCursor={true}
    >
      {blogNotes.map((note) => (
        <SwiperSlide key={note.id}>
          <Link to={`${note.link}`} className="blog-note-link">
            <div className="blog-note">
              <img src={note.imageSrc} alt={note.title} />
              <div className="note-content">
                <h3>{note.title}</h3>
                <img className='flecha' src="/assets/icons/flecha-derecha.png" alt="Siguiente" />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogCarousel;

// src/components/BlogCarousel.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

Modal.setAppElement('#root');

const BlogCarousel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const notes = [
    {
      id: 1,
      title: 'Título de la Nota 1',
      image: '/images/nota1.jpg',
      content: 'Contenido completo de la nota 1...'
    },
    // Agrega más notas según sea necesario
  ];

  const openModal = (note) => {
    setCurrentNote(note);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentNote(null);
  };

  return (
    <div className="blog-carousel">
      <Carousel showThumbs={false} showStatus={false}>
        {notes.map((note) => (
          <div key={note.id} onClick={() => openModal(note)}>
            <img src={note.image} alt={note.title} />
            <div className="note-info">
              <h3>{note.title}</h3>
              <span className="arrow">→</span>
            </div>
          </div>
        ))}
      </Carousel>

      {currentNote && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="blog-modal"
          overlayClassName="blog-modal-overlay"
        >
          <button onClick={closeModal} className="close-button">
            &times;
          </button>
          <h2>{currentNote.title}</h2>
          <p>{currentNote.content}</p>
        </Modal>
      )}
    </div>
  );
};

export default BlogCarousel;

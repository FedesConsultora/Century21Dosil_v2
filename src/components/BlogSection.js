// src/components/BlogSection.js

import React from 'react';
import BlogCarousel from './BlogCarousel.js';

const BlogSection = () => (
  <div className="blog-section-container">
    <div className="spacer-blog"></div>
    <div id="blog" className="blog-section">
      <article className="texto-container">
        <h2 className="titulo-blog">Últimas novedades inmobiliarias</h2>

      </article>
      <BlogCarousel />
    </div>
    <div className="spacer-blog"></div>
  </div>
);

export default BlogSection;

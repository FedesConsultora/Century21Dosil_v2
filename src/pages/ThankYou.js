import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const ThankYou = () => {
  return (
    <>
        <div className="home-page">
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

            <section className="thank-you-section">
                <div className="check-animation">
                    <Player
                        autoplay
                        loop
                        src="/assets/video/check_dosil.json"
                        style={{ height: '300px', width: '300px' }}
                    />
                </div>
                <h2>¡Gracias por tu consulta!</h2>
                <p>Nos comunicaremos con vos a la brevedad.</p>
                <Link to="/" className="return-home-btn">
                Volver al inicio
                </Link>
            </section>
            
        </div>
        <div className="spacerHome"></div>
    </>
  );
};

export default ThankYou;

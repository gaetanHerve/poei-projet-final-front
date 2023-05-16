import React from "react";

function Footer() {
    return (
      <div className="footer-container">
        <div className="card bg-dark text-white">
        
        <div className="card-body">
          <h3 className="card-title">Venez nous <img src="assets/heart.png" style={{width:30}} alt="logo amour" /> !</h3>
          <h5 className="card-subtitle">Ici on cherche seulement de l'amour</h5>
          <p className="card-text">Aidez nos fidèles compagnons <img src="assets/chat50.png" alt="logo chat" /> <img src="assets/chien50.png" alt="logo chien" />à retrouver une famille aimante</p>
        </div>

        <div className="button-container">
          <a href="#" className="button">Nous Contacter</a>
        </div>
        
        <div className="footer-links">
          <a href="https://www.facebook.com/AdoptionChatsNantes/?locale=fr_FR"><img src="assets/fb50.png" alt="logo Facebook" /></a>
          <a href="https://www.instagram.com/henrythecoloradodog/"><img src="assets/insta50.png" alt="logo Instagram" /></a>
          <a href="https://twitter.com/chats_chiens?lang=fr"><img src="assets/twi50.png" alt="logo Twitter" /></a>
        </div>

      </div>
    </div>

    );
  }
  
  export default Footer;
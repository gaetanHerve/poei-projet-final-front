import React from "react";
import "./Contact.css";

function PageContact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Nous contacter</h1>
      <div className="contact-container-infos">
        <img className="contact-image" src="assets/contact.jpg" alt="contact" />
        <div className="contact-container-ul">
          <ul className="contact-ul">
            <li>
              Email :{" "}
              <a href="mailto:contact@patoune-moi.fr">contact@patoune-moi.fr</a>
            </li>
            <li>
              Facebook :{" "}
              <a href="https://www.facebook.com/AdoptionChatsNantes/?locale=fr_FR">
                Patoune-moi
              </a>
            </li>
            <li>
              Instagram :{" "}
              <a href="https://www.instagram.com/henrythecoloradodog/">
                patoune_moi
              </a>
            </li>
            <li>
              Twitter :{" "}
              <a href="https://twitter.com/chats_chiens?lang=fr">patoune_moi</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default PageContact;

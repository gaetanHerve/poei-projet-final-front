import React from "react";
import CarouselComponent from "./CarouselComponent";
import "./Entete.css";
import ButtonComponent from "./ButtonComponent";

function Entete() {
  const tableauCarousel = [
    { img: "assets/cat10.jpg" },
    { img: "assets/chien1.jpg" },
    { img: "assets/cat9.jpg" },
    { img: "assets/chien2.jpg" },
  ];
  return (
    <section className="entete-section">
      <div className="entete-text-section">
        <h1 className="entete-titre">Adoptez votre futur meilleur ami !</h1>

        <p className="entete-description">
          Patoûne-moi vous aide à trouver l'animal qui vous correspond.
        </p>
        <ButtonComponent
          lien="/noscompagnons"
          text="J'adopte"
          handleOnClick={() => {}}
        ></ButtonComponent>
      </div>
      <CarouselComponent itemsCarousel={tableauCarousel}></CarouselComponent>
      <img className="entete-pattounes" src="assets/pattounes.png" />
      <img className="entete-paw" src="assets/paw.png" />
    </section>
  );
}

export default Entete;

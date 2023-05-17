import React, { useEffect, useState } from "react";
import { Animal } from "./Animal";
import Entete from "./Entete";
import CardComponent from "./CardComponent";
import "./PageAccueil.css";
import CompagnyDescription from "./CompagnyDescription";

function PageAccueil() {
  // const [animals, setAnimals] = useState<(Animal[])>([]);
  // useEffect(() => {
  //     fetch('http://localhost:8080/site/animal').then((res) => res.json()).then(data => setAnimals(data));
  // }, [])
  const animal1 = new Animal();
  animal1.id = 1;
  animal1.nom = "Chat1";
  animal1.race = "Egyptien";
  animal1.espece = "chat";
  animal1.age = 4;
  animal1.poids = 12.5;
  animal1.sexe = "Femelle";
  animal1.endroit = "Paris";
  animal1.urlImage = "cactus.jpg";
  animal1.prix = 5;
  animal1.description =
    "Félix est un chat charmant et joueur à la recherche d'une maison pour la vie. Avec ses grands yeux verts et son pelage doux et soyeux, Félix est une véritable beauté. Ce félin élégant a environ deux ans et déborde d'énergie et de curiosité.";

  const animal2 = new Animal();
  animal2.id = 2;
  animal2.nom = "Chat2";
  animal2.espece = "chat";
  animal2.race = "test";
  animal2.age = 4;
  animal2.poids = 12.5;
  animal2.sexe = "Male";
  animal2.endroit = "Paris";
  animal2.urlImage = "cat2.jpg";
  animal2.prix = 10;
  animal2.description =
    "Félix est connu pour sa nature amicale et affectueuse. Il adore la compagnie des humains et aime se blottir sur les genoux, ronronnant de satisfaction lorsqu'on le caresse. Il apprécie également les jeux interactifs, surtout lorsqu'il s'agit de poursuivre des jouets ou de taper sur des plumes. Félix saura apporter une joie infinie et beaucoup de divertissement à sa nouvelle famille.";

  const animal3 = new Animal();
  animal3.id = 3;
  animal3.nom = "Chat3";
  animal3.race = "toto";
  animal3.age = 4;
  animal3.poids = 12.5;
  animal3.sexe = "Male";
  animal3.endroit = "Paris";
  animal3.urlImage = "cactus.jpg";
  animal3.espece = "chien";
  animal3.prix = 20;
  animal3.description =
    "Ce chat adorable est également très intelligent et apprend rapidement. Il sait déjà utiliser sa litière et son griffoir, ce qui facilitera son intégration dans n'importe quel foyer. Félix est sociable avec les autres chats et s'est bien entendu avec les chiens lorsqu'il a été présenté, ce qui en fait un excellent compagnon pour les animaux déjà présents.";

  const animal4 = new Animal();
  animal4.id = 4;
  animal4.nom = "Chat4";
  animal4.race = "titi";
  animal4.espece = "chien";
  animal4.age = 4;
  animal4.poids = 12.5;
  animal4.sexe = "Male";
  animal4.endroit = "Paris";
  animal4.urlImage = "chien2.jpg";
  animal4.prix = 30;
  animal4.description =
    "Si vous recherchez un ami fidèle et affectueux, Félix est le compagnon idéal pour vous. Sa personnalité vibrante et son tempérament aimant apporteront chaleur et bonheur à votre foyer. Adoptez Félix dès aujourd'hui et découvrez les joies d'avoir ce merveilleux chat comme membre de votre famille !";

  const animal5 = new Animal();
  animal5.id = 5;
  animal5.nom = "Chat5";
  animal5.race = "dede";
  animal5.espece = "chat";
  animal5.age = 4;
  animal5.poids = 12.5;
  animal5.sexe = "Femelle";
  animal5.endroit = "Paris";
  animal5.urlImage = "cat9.jpg";
  animal5.prix = 40;
  animal5.description = "Pour rencontrer Félix ou vous ";

  const animals = [animal1, animal2, animal3, animal4, animal5];

  const animalList = animals.slice(-4);

  return (
    <>
      <Entete></Entete>

      <div className="pageaccueil-container">
        <div className="pageaccueil-titre-container">
          <h1 className="pageaccueil-titre">Les derniers arrivants</h1>
        </div>
        <CardComponent animalList={animalList}></CardComponent>
      </div>

      <CompagnyDescription></CompagnyDescription>
    </>
  );
}

export default PageAccueil;

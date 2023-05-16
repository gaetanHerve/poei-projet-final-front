import React, { useEffect, useState } from "react";
import { Animal } from "./Animal";
import Entete from "./Entete";
// import Carousel from 'react-bootstrap/Carousel';
declare function require(path: string);

function PageAccueil() {
  // const [animals, setAnimals] = useState<(Animal[])>([]);
  // useEffect(() => {
  //     fetch('http://localhost:8080/site/animal').then((res) => res.json()).then(data => setAnimals(data));
  // }, [])
  const animal1 = new Animal();
  animal1.nom = "Chat1";
  animal1.race = "Egyptien";
  animal1.age = 4;
  animal1.poids = 12.5;
  animal1.sexe = "Femelle";
  animal1.endroit = "Paris";

  const animal2 = new Animal();
  animal2.nom = "Chat2";
  animal2.race = "test";
  animal2.age = 4;
  animal2.poids = 12.5;
  animal2.sexe = "Femelle";
  animal2.endroit = "Paris";

  const animal3 = new Animal();
  animal3.nom = "Chat3";
  animal3.race = "toto";
  animal3.age = 4;
  animal3.poids = 12.5;
  animal3.sexe = "Femelle";
  animal3.endroit = "Paris";

  const animal4 = new Animal();
  animal4.nom = "Chat4";
  animal4.race = "titi";
  animal4.age = 4;
  animal4.poids = 12.5;
  animal4.sexe = "Femelle";
  animal4.endroit = "Paris";

  const animal5 = new Animal();
  animal5.nom = "Chat5";
  animal5.race = "dede";
  animal5.age = 4;
  animal5.poids = 12.5;
  animal5.sexe = "Femelle";
  animal5.endroit = "Paris";

  const animals = [animal1, animal2, animal3, animal4, animal5];

  const animalList = animals.slice(-4);

  return (
    <>
      <Entete></Entete>

      <div className="container my-5">
        <div className="row">
          <div>
            <h1>Les derniers arrivants</h1>
          </div>
        </div>
        <div className="row">
          {animalList.length > 0 &&
            animalList.map((animal, index) => (
              <div key={index} className="col">
                <div
                  className="card shadow mb-5 bg-white rounded"
                  style={{ width: 270 }}
                >
                  <img
                    className="card-img-top"
                    src="assets/cactus.jpg"
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{animal.nom}</h4>
                    <p>{animal.sexe}</p>
                    <p>{animal.age}</p>
                    <p>{animal.race}</p>
                    <p>{animal.poids}</p>
                    <p className="card-text">Léo recherche </p>
                    <a href="/findbyid/" className="btn btn-primary">
                      Voir sa fiche
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="my-5">
        <h2>Qui sommes-nous ?</h2>
        <p style={{ width: 700, margin: "auto" }}>
          Patoûne-moi oeuvre au quotidien, au côté d’autres associations du
          secteur, pour améliorer le bien-être de ces fidèles compagnons chats
          et chiens en souffrance de Nantes à Brest en passant par Rennes. Son
          action vise essentiellement à faire adopter des animaux victimes de
          maltraitance ou abandonnés, placés en familles d’accueil et remis sur
          pattes. Son action porte également sur la sensibilisation du grand
          public aux sujets de protection animale.
        </p>
      </div>
    </>
  );
}

export default PageAccueil;

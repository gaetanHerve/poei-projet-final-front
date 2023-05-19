import { ComplementAnimal } from "./ComplementAnimal";

export class Animal {
  id: number;
  nom: string;
  race: string;
  espece: string;
  age: number;
  poids: number;
  sexe: string;
  localisation: string;
  urlImage: string;
  prix: number;
  complement: ComplementAnimal;
  status: string;
}

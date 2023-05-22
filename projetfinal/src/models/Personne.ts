import Complement from "./ComplementPersonne";

export default class Personne {
  id: number;
  login: string;
  password: string;
  nom: string;
  prenom: string;
  admin: boolean;
  complement: Complement;
  version?: number;
}

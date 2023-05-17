import Complement from "./ComplementPersonne";

export default class Personne {
    id: number;
    password: string;
    nom: string;
    prenom: string;
    admin: boolean;
    complement: Complement;
    version?: number;
}
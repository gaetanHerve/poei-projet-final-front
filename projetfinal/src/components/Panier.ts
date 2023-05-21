export interface Panier {

    nomClient:string;
    idAnimal: number;
    listeLignes: Array<Ligne>;
    prixTotalFacture: number;
    jour?: string
}

export interface Ligne {

    id:number;
    nom:string;
    quantite: number;
    prix:number;
    prixLigne: number;

}
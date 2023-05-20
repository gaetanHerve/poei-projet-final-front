export interface Panier {

    nomClient:string;
    listeLignes: Array<Ligne>;
    prixTotalFacture: number;

}

export interface Ligne {

    id:number;
    nom:string;
    quantite: number;
    prix:number;
    prixLigne: number;

}
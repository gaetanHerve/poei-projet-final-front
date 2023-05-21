
export default interface ICommande {
  id: number;
  idAnimal: number;
  idClient: number;
  jour: string;
  prixTotal: number;
  infos: string;
  facture: boolean;
  version?: number;
}

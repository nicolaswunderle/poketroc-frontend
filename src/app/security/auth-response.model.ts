import { Dresseur } from "./dresseur.model";

export type AuthResponse = {
  token: string;
  dresseur: Dresseur;
};
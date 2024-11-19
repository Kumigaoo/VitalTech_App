import { EpisodiMedic } from "./episodis-medics.interface";

export interface Medico {
    dni: string;
    nom: string;
    telefon: number;
    usuariId: string;
    especialitat: string;
    episodiMedics: EpisodiMedic[]
  }
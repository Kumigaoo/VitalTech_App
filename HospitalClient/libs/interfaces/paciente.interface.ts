import { EpisodiMedic } from "./episodis-medics.interface";

export interface Paciente {
  dni: string;
  numSS: string;
  nom: string;
  cognom1: string;
  cognom2: string;
  sexe: string;
  telefono: string;
  nacionalidad: string;
  email: string;
  birthDay: string;
  estado: string;
  episodisMedics: EpisodiMedic[];
}

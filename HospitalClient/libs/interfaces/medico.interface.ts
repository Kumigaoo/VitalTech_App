import { EpisodiMedic } from '../../apps/GoldenFold/src/app/interface/episodis-medics.interface';
import { PruebaDiagnostica } from '../../apps/GoldenFold/src/app/interface/pruebas-diagnosticas.interface';

export interface Medico {
  dni: string;
  nom: string;
  telefon: number;
  usuariId: number;
  especialitat: string;
  episodiMedics: EpisodiMedic[];
  pruebasDiagnosticas: PruebaDiagnostica[];
}

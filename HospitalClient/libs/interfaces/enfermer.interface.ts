import { PruebaDiagnostica } from './pruebas-diagnosticas.interface';

export interface Enfermero {
  dni: string;
  nom: string;
  telefon: string;
  usuariId: string;
  especialitat: string;
  pruebasDiagnosticas: PruebaDiagnostica[];
}

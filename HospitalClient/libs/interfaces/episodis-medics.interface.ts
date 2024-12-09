import { PruebaDiagnostica } from './../../apps/GoldenFold/src/app/interface/pruebas-diagnosticas.interface';
import { Ingreso } from './../../apps/GoldenFold/src/app/interface/ingreso.interface';

export interface EpisodiMedic {
  id: number;
  dataObertura: string;
  dataTancament: string;
  motivo: string;
  urgencia: string;
  recepta: string;
  estat: string;
  dniPacient: string;
  dniMetge: string;
  pruebasDiagnosticas: PruebaDiagnostica[];
  ingresos: Ingreso[];
}

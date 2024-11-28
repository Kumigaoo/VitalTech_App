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
  pruebasDiagnosticas: [];
  ingresos: [];
}
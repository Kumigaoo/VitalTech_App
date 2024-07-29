export interface EpisodiMedic {
    id: number;
    dataObertura: string;
    dataTancament: string;
    dolencia: string;
    estat: string;
    pacientId: string;
    consultes: string[];
    ingressos: string[];
  }
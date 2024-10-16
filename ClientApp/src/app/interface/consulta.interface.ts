export interface Consulta {
    IdConsulta: number;
    IdPaciente: number;
    IdMedico: number;
    Motivo: string;
    FechaSolicitud: Date;
    FechaConsulta: Date | null;
    Estado: string;
  }
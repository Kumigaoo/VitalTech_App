export interface Ingreso {
    IdIngreso: number;
    IdPaciente: number;
    IdMedico: number;
    Motivo: string;
    FechaSolicitud: Date;
    FechaIngreso: Date | null;
    Estado: string;
    TipoCama: string;
    IdAsignacion: number | null;
  }
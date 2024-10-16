export interface Asignacion {
    IdAsignacion: number;
    IdPaciente: number;
    IdCama: number;
    FechaAsignacion: Date;
    FechaLiberacion: Date | null;
    AsignadoPor: number;
  }
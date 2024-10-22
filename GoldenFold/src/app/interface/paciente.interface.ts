export interface Paciente {
    /*IdPaciente: number;
    Nombre: string;
    Dni: string;
    FechaNacimiento: Date;
    Estado: string;
    FechaRegistro: Date;
    SeguridadSocial: string;
    Direccion: string;
    Telefono: string;
    Email: string;
    HistorialMedico: string; */
    dni: string;
    numSS: string;
    nom: string;
    cognom1: string;
    cognom2: string;
    sexe: string;
    birthDay : string;
    episodisMedics: string[];
  }
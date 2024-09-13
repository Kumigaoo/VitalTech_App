export interface Habitacio {
    codiHabitacio: number;
    capacitatLlits: number;
    plantaId: number;
    llits: string[];
  }

  export interface HabitacioNoLlit {

    codiHabitacio: (number | null);
    capacitatLlits: number;
    plantaId: number; 

  }
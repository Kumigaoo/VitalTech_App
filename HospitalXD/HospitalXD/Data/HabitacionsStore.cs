using HospitalXD.DTO;

/*
 * Classe que simula una BBDD en aquest cas tenim
 una llista statica amb moltes habitacions
 */

namespace HospitalXD.Data
{
    public static class HabitacionsStore
    {
        public static List<HabitacioDTO> habitacioDTOs = new List<HabitacioDTO>
        {
            new HabitacioDTO{Id=1, Capacitat=3},
            new HabitacioDTO{Id =2, Capacitat=1}
        };
    }
}

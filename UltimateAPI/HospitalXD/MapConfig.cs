using AutoMapper;
using HospitalXD.DTO;
using HospitalXD.Models;

/*
 Aquesta classe es la que configurara el automapper per poder relacionar
 els DTOs amb els nostres models
 */

namespace HospitalXD
{
    public class MapConfig : Profile
    {

        public MapConfig()
        {
            // Vull crea un mapa que relacioni cada habitacio amb el seu habDTO
            CreateMap<Habitacio, HabitacioDTO>();
            // Vull crea un mapa que relacioni cada habDTO amb el seu model hab
            CreateMap<HabitacioDTO, Habitacio>();

            // Abreviatura per fer els dos mapes a l'hora
            CreateMap<Habitacio, HabitacioAddDbDTO>().ReverseMap();
            CreateMap<Habitacio, HabitacioDTO>().ReverseMap();

        }

    }
}

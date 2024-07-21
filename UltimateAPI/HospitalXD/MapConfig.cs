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
            CreateMap<Habitacio, HabitacioDTO>().ReverseMap();

            CreateMap<Habitacio, HabitacioCreateDTO>().ReverseMap();

            CreateMap<Llit, LlitDTO>().ReverseMap();

            CreateMap<Llit, LlitCreateDTO>().ReverseMap();

            CreateMap<Planta, PlantaDTO>().ReverseMap();

            CreateMap<Planta, PlantaCreateDTO>().ReverseMap();
        }

    }
}

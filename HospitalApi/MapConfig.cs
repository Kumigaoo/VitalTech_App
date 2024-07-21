using AutoMapper;
using HospitalAPI.DTO;
using HospitalAPI.Models;

namespace HospitalAPI
{
    public class MapConfig : Profile
    {

        public MapConfig()
        {
            CreateMap<Habitacio, HabitacioDTO>().ReverseMap();

            CreateMap<Habitacio, HabitacioCreateDTO>().ReverseMap();

            CreateMap<Llit, LlitDTO>().ReverseMap();

            CreateMap<Llit, LlitCreateDTO>().ReverseMap();

            CreateMap<Planta, PlantaDTO>().ReverseMap();

            CreateMap<Planta, PlantaCreateDTO>().ReverseMap();
        }

    }
}

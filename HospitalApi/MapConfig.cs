using AutoMapper;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;

namespace HospitalAPI
{
    public class MapConfig : Profile
    {

        public MapConfig()
        {
            CreateMap<Consulta, ConsultaCreateDTO>().ReverseMap();
            CreateMap<Consulta, ConsultaDTO>().ReverseMap();

            CreateMap<Habitacio, HabitacioDTO>().ReverseMap();
            CreateMap<Habitacio, HabitacioCreateDTO>().ReverseMap();

            CreateMap<Llit, LlitDTO>().ReverseMap();
            CreateMap<Llit, LlitCreateDTO>().ReverseMap();

            CreateMap<Planta, PlantaDTO>().ReverseMap();
            CreateMap<Planta, PlantaCreateDTO>().ReverseMap();
            CreateMap<Planta, PlantaUpdateDTO>().ReverseMap();

            CreateMap<EpisodiMedic, EpisodiMedicDTO>().ReverseMap();
            CreateMap<EpisodiMedic, EpisodiMedicCreateDTO>().ReverseMap();

            CreateMap<Ingres, IngresDTO>().ReverseMap();
            CreateMap<Ingres, IngresCreateDTO>().ReverseMap();

            CreateMap<Pacient, PacientDTO>().ReverseMap();
            CreateMap<Pacient, PacientCreateDTO>().ReverseMap();

            CreateMap<Personal, PersonalDTO>().ReverseMap();
            CreateMap<Personal, PersonalCreateDTO>().ReverseMap();


            
        }

    }
}

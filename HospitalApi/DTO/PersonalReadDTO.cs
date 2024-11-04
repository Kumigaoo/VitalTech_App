﻿using HospitalAPI.Models;

namespace HospitalApi.DTO

{
    public class PersonalReadDTO
    
    {
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public ICollection<ConsultaReferenceDTO>? Consultes { get; set; }
    }
}

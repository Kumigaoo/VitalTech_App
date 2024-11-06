﻿using HospitalAPI.Models;

namespace HospitalApi.DTO

{
    public class MetgeReadDTO
    
    {
        public string DNI { get; set;} = string.Empty;

        public string Especialitat { get; set;} = string.Empty;

        public string Nom { get; set;} = string.Empty;

        public ICollection<PruebaDiagnosticaReferenceDTO>? Consultes {get; set;}
    }
}

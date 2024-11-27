﻿using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class MetgeCreateDTO
    {

        [DNIrestriction]
        public string DNI { get; set; } = string.Empty;
        [Required]
        public string Nom { get; set; } = string.Empty;
        [TELEFONrestriction]
        public string Telefon { get; set; } = string.Empty;
        [Required]
        public string Especialitat { get; set; } = string.Empty;
        [Required]
        public string UsuariId { get; set; } = string.Empty;

    }
}

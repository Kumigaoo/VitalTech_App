﻿using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class LlitCreateDTO
    {
   
        public string CodiLlit { get; set; } = string.Empty;
        
        [NotMapped]
        public int CodiHabitacio { get; set; }

       
    }
}

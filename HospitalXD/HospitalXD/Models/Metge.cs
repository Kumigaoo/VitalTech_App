﻿namespace HospitalXD.Models
{
    public class Metge
    {

        public int Id { get; set; }

        public string DNI { get; set; }

        public string Especialitat { get; set; }

        public string Nom { get; set; }

        public ICollection<Consulta> Consultes { get; set; }

    }
}

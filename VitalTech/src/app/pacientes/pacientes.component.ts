
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { PacientService } from './pacientes.service';


interface Pacient {
  id: number;
  numSS: string;
  nom: string;
  estat: string;
  sexe: string;
  consultes: string[];
  episodisMedics: string[];
}

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {

  pacients: Pacient[] = [];

  constructor(private pacienteService: PacientService) { }

  ngOnInit() {
    this.pacienteService.getPacients().subscribe((data: Pacient[]) => {
      
      this.pacients = data;
    });
  }

}

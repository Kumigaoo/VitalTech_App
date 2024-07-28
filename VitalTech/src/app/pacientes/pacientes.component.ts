
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PacientService } from './pacientes.service';


interface Pacient {
  dni: string;
  numSS: string;
  nom: string;
  sexe: string;
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
  selectedPacient: any;

  constructor(private pacienteService: PacientService) { }

  ngOnInit() {
    this.loadPacients();
  }

  loadPacients(): void {
    this.pacienteService.getPacients().subscribe(data => {
      this.pacients = data;
    });
  }


  

}

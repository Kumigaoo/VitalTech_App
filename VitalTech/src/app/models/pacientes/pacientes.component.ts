
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PacientService } from './pacientes.service';
import {Pacient} from '../../interface/pacient.interface'
import { MatDialog } from '@angular/material/dialog';
import { EpisodisMedicsPopupComponent } from './episodis-medics-popup/episodis-medics-popup.component';

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

  constructor(public dialog: MatDialog, private pacienteService: PacientService) { }

  ngOnInit() {
    this.loadPacients();
  }

  loadPacients(): void {
    this.pacienteService.getPacients().subscribe(data => {
      this.pacients = data;
    });
  }

  openEpisodisMedics(pacient: any): void {
    this.dialog.open(EpisodisMedicsPopupComponent, {
      data: { episodisMedics: pacient.episodisMedics },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }
  

}

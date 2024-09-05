
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PacientService } from '../../service/pacientes.service';
import {Pacient} from '../../interface/pacient.interface'
import { MatDialog } from '@angular/material/dialog';
import { EpisodisMedicsPopupComponent } from '../../pop-ups/episodis-medics-popup/episodis-medics-popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})

export class PacientesComponent {

  pacients: Pacient[] = [];
  originalPacient: Pacient[] = [];
  
  searchCriteria: string = "dni";
  searchInput: string = "";

  constructor(public dialog: MatDialog, private pacienteService: PacientService) { }

  ngOnInit() {
    this.loadPacients();
  }

  loadPacients(): void {
    this.pacienteService.getPacients().subscribe(data => {
      this.pacients = data;
      this.originalPacient =  data;
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

  deletePacient(id: string): void {
    this.pacienteService.deletePacient(id).subscribe({
      error: error => alert('ERROR, el pacient encara té episodis médics'),
      complete: () => {
        alert('Pacient Borrat'),
        this.loadPacients()
      }
    })
  }

  updatePacient(dataPacient: Pacient) {
   
    

  }

  searchPatient(): void {

    if (this.searchInput.trim() === '') {
      this.loadPacients();
      return;
    }

    this.pacients = this.originalPacient

    let busqueda: Pacient[] = [];

    switch (this.searchCriteria) {
      case 'name':
        for (let i = 0; i < this.pacients.length; i++) {
          if (this.pacients[i].nom.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.pacients[i]);
          }
        }
        break;
        case 'dni':
          for (let i = 0; i < this.pacients.length; i++) {
            if (this.pacients[i].dni.toLowerCase().includes(this.searchInput.toLowerCase())) {
              busqueda.push(this.pacients[i]);
            }
          }
          break;
          case 'ss':
            for (let i = 0; i < this.pacients.length; i++) {
              if (this.pacients[i].numSS.toLowerCase().includes(this.searchInput.toLowerCase())) {
                busqueda.push(this.pacients[i]);
              }
            }
            break;
            case 'sexe':
        for (let i = 0; i < this.pacients.length; i++) {
          if (this.pacients[i].sexe.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.pacients[i]);
          }
        }
        break;
        
    }

    this.pacients = busqueda;

  }
  

}

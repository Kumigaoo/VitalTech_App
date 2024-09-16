
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientService } from '../../service/pacientes.service';
import { Pacient } from '../../interface/pacient.interface'
import { MatDialog } from '@angular/material/dialog';
import { EpisodisMedicsPopupComponent } from '../../pop-ups/episodis-medics-popup/episodis-medics-popup.component';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-pacientes',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NavComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})

export class PacientesComponent {

  pacients: Pacient[] = [];
  originalPacient: Pacient[] = [];
  pagedPacient: Pacient[] = [];

  searchCriteria: string = "dni";
  searchInput: string = "";

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(public dialog: MatDialog, private pacienteService: PacientService, private router: Router) { }

  ngOnInit() {
    this.loadPacients();
  }

  loadPacients(): void {
    this.pacienteService.getPacients().subscribe(data => {
      this.pacients = data;
      this.originalPacient = data;
      this.totalPages = Math.ceil(this.pacients.length / this.itemsPerPage);
      this.updatePagedPacientes();
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

    if(confirm('Esta seguro de eliminar este paciente?')) {
      this.pacienteService.deletePacient(id).subscribe({
        error: error => alert('ERROR, el pacient encara té episodis médics'),
        complete: () => {
          alert('Pacient Borrat'),
          this.loadPacients()
        }
      });
    }
  }

  updatePacient(idPacient: string) {
    this.router.navigate(['/modif-paciente', idPacient]);
  }

  updatePagedPacientes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedPacient = this.pacients.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedPacientes();
    }
  }

  previousPage(): void {
    if (this.currentPage >1) {
      this.currentPage--;
      this.updatePagedPacientes();
    }
  }

  searchPatient(): void {

    if (this.searchInput.trim() === '') {
      this.loadPacients();
      return;
    }

    this.pagedPacient = this.originalPacient

    let busqueda: Pacient[] = [];

    this.totalPages = 1; // como solo se muestra una solo hay una pagina
    this.currentPage = 1;
    this.updatePagedPacientes(); 

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

    this.pagedPacient = busqueda;

  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePagedPacientes();
    }
  }

  lastPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePagedPacientes();
    }
  }
  
}

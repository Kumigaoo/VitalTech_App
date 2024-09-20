
import { Component} from '@angular/core';
import { PacientService } from '../../../../service/pacientes.service';
import { Pacient } from '../../../../interface/pacient.interface'
import { MatDialog } from '@angular/material/dialog';
import { EpisodisMedicsPopupComponent } from '../../../../components/pop-ups/episodis-medics-popup/episodis-medics-popup.component';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
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

    Swal.fire({

      title: 'Eliminar episodio médico',
      text: "¿Quieres borrar este episodio médico?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'

    }).then((result) => {

      if (result.isConfirmed) { 
        this.pacienteService.deletePacient(String(id)).subscribe({
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Paciente eliminado',
              text: 'El paciente ha sido eliminado con éxito.'
            });
            if (this.pagedPacient.length === 0){
                this.currentPage--;
            }
            this.loadPacients();
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error'
            });
          }        
        });
      }
    });
    
    //delete antiguo por si aca
    // if(confirm('Esta seguro de eliminar este paciente?')) {
    //   this.pacienteService.deletePacient(id).subscribe({
    //     error: error => alert('ERROR, el pacient encara té episodis médics'),
    //     complete: () => {
    //       alert('Pacient Borrat'),
    //       this.loadPacients()
    //     }
    //   });
    // }
  }

  updatePacient(idPacient: string) {
    this.router.navigate(['/inicio/paciente/modif-paciente', idPacient]);
  }

  updatePagedPacientes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedPacient = this.pacients.slice(startIndex, endIndex);

    if(this.pacients.length == 0){
      return;
    }

    if(this.pagedPacient.length == 0) {
        this.currentPage = this.currentPage - 1;
        this.loadPacients();
    }
    
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

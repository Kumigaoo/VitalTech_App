import { Component } from '@angular/core';
import { PacientService } from '../../../../service/pacientes.service';
import { Pacient } from '../../../../interface/pacient.interface';
import { MatDialog } from '@angular/material/dialog';
import { EpisodisMedicsPopupComponent } from '../../../../components/pop-ups/episodis-medics-popup/episodis-medics-popup.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
})
export class PacientesComponent {
  pacients: Pacient[] = [];
  originalPacient: Pacient[] = [];
  pagedPacient: Pacient[] = [];

  searchCriteria: string = 'dni';
  searchInput: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  fuse: Fuse<Pacient> | null = null;

  constructor(
    public dialog: MatDialog,
    private pacienteService: PacientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPacients();
  }

  loadPacients(): void {
    this.pacienteService.getPacients().subscribe((data) => {
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
      maxHeight: '500px',
    });
  }

  deletePacient(id: string): void {
    Swal.fire({
      title: 'Eliminar paciente',
      text: '¿Quieres borrar este paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.deletePacient(String(id)).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Paciente eliminado',
              text: 'El paciente ha sido eliminado con éxito.',
            });
            if (this.pagedPacient.length === 0) {
              this.currentPage--;
            }
            this.loadPacients();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error',
            });
          },
        });
      }
    });
  }

  updatePacient(idPacient: string) {
    this.router.navigate(['/inicio/paciente/modif-paciente', idPacient]);
  }

  updatePagedPacientes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedPacient = this.pacients.slice(startIndex, endIndex);

    if (this.pacients.length == 0) {
      return;
    }

    if (this.pagedPacient.length == 0) {
      this.currentPage = this.currentPage - 1;
      this.loadPacients();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedPacientes();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedPacientes();
    }
  }

  searchPatient(): void {
    if (this.searchInput.trim() === '') {
      this.loadPacients();
      return;
    }

    if (this.searchCriteria == "birthDay") {
      this.fuse = new Fuse(this.originalPacient, {
        keys: [this.searchCriteria],
        threshold: 0,
      });
    } else {
      this.fuse = new Fuse(this.originalPacient, {
        keys: [this.searchCriteria],
        threshold: 0.3,
      });
    }
      

      const result = this.fuse.search(this.searchInput);
      this.pacients = result.map((res) => res.item);
    

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.pacients.length / this.itemsPerPage);
    this.updatePagedPacientes();
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePagedPacientes();
    }
  }

  lastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePagedPacientes();
    }
  }
}

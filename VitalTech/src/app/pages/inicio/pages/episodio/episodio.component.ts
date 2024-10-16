import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { EpisodiService } from '../../../../service/episodis.service';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { ConsultesPopupComponent } from '../../../../components/pop-ups/consultes-popup/consultes-popup.component';
import { IngressosPopupComponent } from '../../../../components/pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrl: './episodio.component.css',
})
export class EpisodioComponent {
  episodis: EpisodiMedic[] = [];
  originalEpisodis: EpisodiMedic[] = [];
  selectedEpisodi: any;

  searchCriteria: string = 'id';
  searchInput: string = '';

  pagedEpisodis: EpisodiMedic[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 3;

  fuse: Fuse<EpisodiMedic> | null = null; 

  constructor(
    public dialog: MatDialog,
    private episodiService: EpisodiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEpisodis();
  }

  loadEpisodis(): void {
    this.episodiService.getEpisodis().subscribe((data) => {
      this.episodis = data;
      this.originalEpisodis = data;
      this.totalPages = Math.ceil(this.episodis.length / this.itemsPerPage);
      this.updatePage();
    });
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedEpisodis = this.episodis.slice(startIndex, endIndex);
  
    if(this.episodis.length == 0){
      return;
    }

    if(this.pagedEpisodis.length == 0) {
      this.currentPage = this.currentPage - 1;
      this.loadEpisodis();
  }

  }

  searchEpisodi(): void {
    if (this.searchInput.trim() === '') {
      this.loadEpisodis();
      return;
    }

    if (this.searchCriteria == "dataObertura" || this.searchCriteria == "dataTancament" || this.searchCriteria == "id") {
      this.fuse = new Fuse(this.originalEpisodis, {
        keys: [this.searchCriteria],
        threshold: 0,
      });
    } else {
      this.fuse = new Fuse(this.originalEpisodis, {
        keys: [this.searchCriteria],
        threshold: 0.3,
      });
    }
      

      const result = this.fuse.search(this.searchInput);
      this.episodis = result.map((res) => res.item);

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.episodis.length / this.itemsPerPage);
    this.updatePage();
  }

  modificarEpisodi(id: number): void {
    this.router.navigate(['inicio/episodio/modif-episodio', id]);
  }

  deleteEpisodi(id: number): void {
    Swal.fire({
      title: 'Eliminar episodio médico',
      text: '¿Quieres borrar este episodio médico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.episodiService.deleteEpisodi(String(id)).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Episodio médico eliminado',
              text: 'El episodio médico ha sido eliminado con éxito.',
            });
            if (this.pagedEpisodis.length === 0) {
              this.currentPage--;
            }
            this.loadEpisodis();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error, no se puede eliminar este episodio médico: todavía existen consultas o ingresos.',
            });
          },
        });
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePage();
    }
  }

  lastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePage();
    }
  }

  openConsultes(episodi: any): void {
    this.dialog.open(ConsultesPopupComponent, {
      data: { consultes: episodi.consultes },
      width: '80vw',
      height: '70vh',
      maxWidth: '1000px',
      maxHeight: '500px',
    });
  }

  openIngressos(episodi: any): void {
    this.dialog.open(IngressosPopupComponent, {
      data: { ingressos: episodi.ingressos },
      width: '80vw',
      height: '70vh',
      maxWidth: '1000px',
      maxHeight: '500px',
    });
  }
}

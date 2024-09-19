import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { EpisodiService } from '../../../../service/episodis.service';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { ConsultesPopupComponent } from '../../../../components/pop-ups/consultes-popup/consultes-popup.component';
import { IngressosPopupComponent } from '../../../../components/pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrl: './episodio.component.css'

})

export class EpisodioComponent {

  episodis: EpisodiMedic[] = [];
  originalEpisodis: EpisodiMedic[] = [];
  selectedEpisodi: any;

  searchCriteria: string = "id";
  searchInput: string = "";

  pagedEpisodis: EpisodiMedic[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 3;

  constructor(public dialog: MatDialog, private episodiService: EpisodiService, private router: Router) { }

  ngOnInit() {
    this.loadEpisodis();
  }

  loadEpisodis(): void {
    this.episodiService.getEpisodis().subscribe(data => {
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
  }

  searchEpisodi(): void {

    if (this.searchInput.trim() === '') {
      this.loadEpisodis();
      return;
    }

    this.episodis = this.originalEpisodis

    let busqueda: EpisodiMedic[] = [];

    switch (this.searchCriteria) {
      case 'id':
        for (let i = 0; i < this.episodis.length; i++) {
          if (this.episodis[i].id.toString().includes(this.searchInput)) {
            busqueda.push(this.episodis[i]);
          }
        }
        break;
      case 'dolencia':
        for (let i = 0; i < this.episodis.length; i++) {
          if (this.episodis[i].dolencia.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.episodis[i]);
          }
        }
        break;
      case 'estat':
        for (let i = 0; i < this.episodis.length; i++) {
          if (this.episodis[i].estat.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.episodis[i]);
          }
        }
        break;

    }

    this.episodis = busqueda;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.episodis.length / this.itemsPerPage);
    this.updatePage();

  }

  modificarEpisodi(id: number): void {
    this.router.navigate(['inicio/episodio/modif-episodio', id]);
  }

  deleteEpisodi(id: number): void {
    if (confirm('¿Estás seguro de querer eliminar este episodio médico?')) {

      // this.episodiService.deleteEpisodi(String(id)).subscribe({
      //   next: () => {
      //     alert('Episodio médico eliminado correctamente.');
      //     this.loadEpisodis();
      //   },
      //   error: (error) => {
      //     alert('Error, no se puede eliminar este episodio médico: todavía existen consultas o ingresos.');
      //   }
      // });

      this.episodiService.deleteEpisodi(String(id)).subscribe({
        next: response => {
          this.loadEpisodis();
          Swal.fire({
            
            icon: 'success',
            title: 'Episodio médico eliminado',
            text: 'El episodio médico se ha registrado correctamente.'
          });
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error, no se puede eliminar este episodio médico: todavía existen consultas o ingresos.'
          });
        }        
      });


    }
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
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
    if(this.currentPage < this.totalPages) {
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
      maxHeight: '500px'
    });
  }

  openIngressos(episodi: any): void {
    this.dialog.open(IngressosPopupComponent, {
      data: { ingressos: episodi.ingressos },
      width: '80vw',
      height: '70vh',
      maxWidth: '1000px',
      maxHeight: '500px'
    });
  }

}

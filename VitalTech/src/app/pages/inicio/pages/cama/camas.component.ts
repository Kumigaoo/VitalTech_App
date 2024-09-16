import { Component } from '@angular/core';
import { Llit } from '../../interface/llit.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CamasService } from '../../service/camas.service';
import { IngressosPopupComponent } from '../../pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../common/nav/nav.component';


@Component({
  selector: 'app-camas',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NavComponent],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent {

  llits: Llit[] = [];
  originalLlit: Llit[] = [];
  searchCriteria: string = "ocupat";
  searchInput: string = "";

  pagedLlits: Llit[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 4;

  constructor(public dialog: MatDialog, private llitService: CamasService, private router: Router) { }

  ngOnInit() {
    this.loadLlits();
  }

  loadLlits(): void {
    this.llitService.getLlits().subscribe(data => {
      this.llits = data;
      this.originalLlit = data;
      this.totalPages = Math.ceil(this.llits.length / this.itemsPerPage);
      this.updatePage();
    });
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedLlits = this.llits.slice(startIndex, endIndex);
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

  searchLlit(): void {

    if (this.searchInput.trim() === '') {
      this.loadLlits();
      return;
    }

    this.llits = this.originalLlit;

    let busqueda: Llit[] = [];

    switch (this.searchCriteria) {
      case 'idLlit':
        for (let i = 0; i < this.llits.length; i++) {
          if (this.llits[i].codiLlit.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.llits[i]);
          }
        }
      break;
      case 'ocupat':
        for (let i = 0; i < this.llits.length; i++) {
          if (this.searchInput.toLowerCase() === "true" && this.llits[i].ocupat == true) {
            busqueda.push(this.llits[i]);
          }
          if (this.searchInput.toLowerCase() === "false" && this.llits[i].ocupat == false) {
            busqueda.push(this.llits[i]);
          } 
        }
      break;
      case 'idHabitacion':
        for (let i = 0; i < this.llits.length; i++) {
          if(Number(this.searchInput) === this.llits[i].habitacioId) {
            busqueda.push(this.llits[i]);
          }
        }      
      break;
    }

    this.llits = busqueda;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.llits.length / this.itemsPerPage);
    this.updatePage();

  }


  deleteLlit(id: string): void {
    if (confirm('Estas seguro de eliminar esta cama?')) { 
      this.llitService.deleteLlit(id).subscribe({
        next: () => {
          console.log('Planta eliminada correctamente');
          alert('Cama eliminada');
          this.loadLlits();
        },
        error: (error) => {
          console.error('Error, no se pudo eliminar esta cama:', error);
          alert('La cama no se ha eliminado porque tiene ingresos asociados');
        }
      });
    }
  }

  modificarLlit(id: string): void {
    this.router.navigate(['/modif-llit', id]);
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

}

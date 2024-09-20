import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Planta } from '../../../../interface/planta.interface';
import { PlantaService } from '../../../../service/planta.service';
import { PlantaPopupComponent } from '../../../../components/pop-ups/planta-popup/planta-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../../../../components/nav/nav.component';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrl: './planta.component.css'
})

export class PlantaComponent {

  plantes: Planta[] = [];
  pagedPlantes: Planta[] = [];
  protected searchInput: number = 1;

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 4;

  constructor(public dialog: MatDialog, private plantaService: PlantaService, private router: Router) { }

  ngOnInit() {
    this.loadPlantes();
  }

  loadPlantes(): void {
    this.plantaService.getPlantes().subscribe(data => {
      this.plantes = data;
      this.totalPages = Math.ceil(this.plantes.length / this.itemsPerPage);
      this.updateItemsPerPage();
    });
  }

  updateItemsPerPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedPlantes = this.plantes.slice(startIndex, endIndex);

    if(this.plantes.length == 0){
      return;
    }

    if(this.pagedPlantes.length == 0) {
        this.currentPage = this.currentPage - 1;
        this.loadPlantes();
    }

  }
  searchPlanta(): void {
    if (!isNaN(this.searchInput)) { 
        this.plantaService.getPlanta(this.searchInput).subscribe({
          next: (data) => {
            this.plantes.splice(0, this.plantes.length + 1, data);
            this.currentPage = 1;
            this.totalPages = 1;
            this.updateItemsPerPage();
          },
          error: (error) => {
            console.error('Error al buscar la planta:', error),
            alert('No existe la planta con id ' + this.searchInput );
          }
        });
      } else {
        alert('Por favor, ingresa un ID válido.'); 
      }
  }

  deletePlanta(id: number): void {
    if (confirm('Estas seguro de eliminar esta planta?')) { 
      this.plantaService.deletePlanta(id).subscribe({
        next: () => {
          console.log('Planta eliminada correctamente');
          alert('Planta eliminada');
          this.loadPlantes();
        },
        error: (error) => {
          console.error('Error, no se pudo eliminar esta planta:', error);
          alert('La planta no se ha eliminado porque tiene habitaciones o camas asociadas');
        }
      });
    }
  }

  modificarPlanta(id: number): void {
    this.router.navigate(['/inicio/planta/modif-planta', id]);
  }
  
  openHabitacions(planta: any): void {
    this.dialog.open(PlantaPopupComponent, {
      data: { habitacions: planta.habitacions },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateItemsPerPage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateItemsPerPage();
    }
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updateItemsPerPage();
    }
  }

  lastPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updateItemsPerPage();
    }
  }

}

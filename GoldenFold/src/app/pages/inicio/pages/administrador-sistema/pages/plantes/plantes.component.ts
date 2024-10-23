import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Planta } from '../../../../../../interface/planta.interface';
import { PlantaService } from '../../../../../../services/planta.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { DialogFormularioComponent } from '../../../../../../components/dialog-formulario/dialog-formulario.component';

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrls: ['./plantes.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class PlantesComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  plantes: Planta[] = [];
  pagedPlantes: Planta[] = [];
  searchInput: number = 1;
  currentPage: number = 1;
  
  totalPages: number = 1;
  itemsPerPage: number = 5;
  pageIndex = 0;

  displayedColumns: string[] = ['piso', 'capacitatHabitacions', 'habitacions','acciones'];
  dataMostra = new MatTableDataSource<Planta>([]);
  

  nuevaPlanta: Planta;

  constructor(public dialog: MatDialog, private plantaService: PlantaService, private router: Router) {
    this.nuevaPlanta = {
      piso: 0,
      capacitatHabitacions: 0,
      habitacions: [''] 
    };
   }

  ngOnInit() {
    this.loadPlantes();
    
  }

  ngAfterViewInit() {
    this.dataMostra.paginator = this.paginator;
    this.dataMostra.sort = this.sort;
  }

  ngOnInit() {
    this.loadPlantes();
  }

  toggleFormularioAgregar() {
    this.nuevaPlanta = {
      piso: 0,
      capacitatHabitacions: 0,
      habitacions: [''] 
    };

    this.dialog.open(DialogFormularioConsultaPlantes, {
      data: this.nuevaPlanta
    }).afterClosed().subscribe((consultaCreada) => {
        this.plantaService.postPlanta(consultaCreada);
    });
    
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
            console.log(this.plantes.splice(0, this.plantes.length + 1, data));
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

  deletePlanta(piso: number): void {
    Swal.fire({
      title: 'Eliminar planta',
      text: "¿Quieres borrar esta planta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantaService.deletePlanta(piso).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Planta eliminada',
              text: 'La planta ha sido eliminada con éxito.'
            });
            this.loadPlantes();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se puede eliminar esta planta porque todavía tiene habitaciones o camas asociadas.'
            });
          }
        });
      }
    });
  }

  modificarPlanta(planta: Planta): void {

    this.dialog.open(DialogFormularioConsultaPlantes, {
      data: planta
    }).afterClosed().subscribe((consultaCreada) => {
       this.plantaService.putPlanta(planta);
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


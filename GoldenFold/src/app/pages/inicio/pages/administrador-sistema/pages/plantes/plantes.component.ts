import { Component, ViewChild } from '@angular/core';
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
  styleUrl: './plantes.component.css'
})
export class PlantesComponent {
 @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent

  plantes: Planta[] = [];
  pagedPlantes: Planta[] = [];
  searchInput: number = 1;

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 4;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  PlantaSeleccionado: Planta | null = null;
  displayedColumns: string[] = ['piso', 'capacitatHabitacions', 'habitacions'];
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

  toggleFormularioAgregar(): void {
    this.nuevaPlanta = {
      piso: 0,
      capacitatHabitacions: 0,
      habitacions: [''] 
    };
    this.dialog.open(DialogFormularioComponent, {
      data: this.nuevaPlanta
    }).afterClosed().subscribe((pacienteCreado) => {
      if (pacienteCreado) {
        this.guardarPaciente();
      }
    });
  }

  guardarPaciente(): void {
    this.plantaService.postPlanta(this.nuevaPlanta).subscribe({
      next: () => {
        this.obtenerPacientes();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Paciente guardado exitosamente'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al guardar el paciente', error);
        this.snackbar.showNotification('error', 'Error al guardar el paciente'); // Notificación de error
      },
    });
  }

  guardarPlanta(): void {
    this.plantaService.putPlanta(this.nuevaPlanta).subscribe({
      next: () => {
        this.obtenerPacientes();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Paciente guardado exitosamente'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al guardar el paciente', error);
        this.snackbar.showNotification('error', 'Error al guardar el paciente'); // Notificación de error
      },
    });
  }

  cerrarFormulario(): void {
    this.PlantaSeleccionado = null;
  }

  obtenerPacientes(): void {
    this.plantaService.getPlantes().subscribe((data: Planta[]) => {
      this.plantes = data;
      //this.totalItems = data.length;
      this.actualizarPagina(0, this.itemsPerPage);
    });
  }

  actualizarPagina(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.dataMostra.data = this.plantes.slice(startIndex, endIndex);
  }

  loadPlantes(): void {
    this.plantaService.getPlantes().subscribe(data => {
      this.plantes = data;
      this.dataMostra.data = this.plantes;
      this.totalPages = Math.ceil(this.plantes.length / this.itemsPerPage);
    });
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
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Planta eliminada',
              text: 'La planta ha sido eliminada con éxito.'
            });
            if (this.pagedPlantes.length === 0){
                this.currentPage--;
            }
            this.loadPlantes();
          },
          error: error => {
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

  modificarPlanta(id: number): void {
    this.router.navigate(['/inicio/planta/modif-planta', id]);
  }
  
  openHabitacions(planta: any): void {
    // this.dialog.open(PlantaPopupComponent, {
    //   data: { habitacions: planta.habitacions },
    //   width: '80vw', 
    //   height: '70vh', 
    //   maxWidth: '1000px',
    //   maxHeight: '500px' 
    // });
  }

}


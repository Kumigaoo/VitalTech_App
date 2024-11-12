import { Component, OnInit, ViewChild } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { Habitacion } from '../../../../../../interface/habitacion.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component'; // Importar el componente standalone
import { MatTableDataSource } from '@angular/material/table'; // Módulo de tabla de Angular Material
import { MatPaginator } from '@angular/material/paginator'; // Módulo de paginación de Angular Material
import { MatSort } from '@angular/material/sort'; // Módulo de ordenación de Angular Material
import { MatDialog } from '@angular/material/dialog';
import { CamasDialogComponent } from '../../../../../../components/popups/camas-popup';
import { DialogCrearHabitacionComponent } from '../../../../../../components/Formularios/Habitacion/dialog-crear-habitacion/dialog-crear-habitacion/dialog-crear-habitacion.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogActualizarHabitacionComponent } from '../../../../../../components/Formularios/Habitacion/dialog-actualizar-habitacion/dialog-actualizar-habitacion.component';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
})
export class HabitacionesComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;  // Referencia al snackbar
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Referencia al paginador de Angular Material
  @ViewChild(MatSort) sort!: MatSort;  // Referencia al orden de Angular Material

  habitaciones: Habitacion[] = [];
  habitacionesDataSource = new MatTableDataSource<Habitacion>();  // DataSource para la tabla
  nuevaHabitacion: Habitacion = {
    codiHabitacio: 0,
    capacitatLlits: 0,
    plantaId: 0,
    llits: [],
  };
  habitacionParaActualizar: Habitacion | null = null;

  displayedColumns: string[] = ['NumeroHabitacion', 'CapCamas', 'Planta', 'Camas', 'Acciones'];  // Columnas de la tabla

  constructor(private habitacionService: HabitacionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  ngAfterViewInit() {
    this.habitacionesDataSource.paginator = this.paginator;  // Enlazar el paginador a la tabla
    this.habitacionesDataSource.sort = this.sort;  // Enlazar la ordenación a la tabla
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getHabitacions().subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.habitacionesDataSource.data = this.habitaciones;  // Asignar los datos al datasource de la tabla
      },
      error: (error: any) => {
        console.error('Error al obtener las habitaciones', error);
        this.snackbar.showNotification('error', 'Error al obtener las habitaciones');  // Mostrar notificación de error
      },
    });
  }

  agregarHabitacion(): void {
    const dialogRef = this.dialog.open(DialogCrearHabitacionComponent, {
      width: '470px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.habitacionService.postHabitacion(result).subscribe({
          next: (nuevaHabitacion: Habitacion) => {
            this.habitaciones.push(nuevaHabitacion); // Añade la nueva habitación a la lista
            this.habitacionesDataSource.data = this.habitaciones; // Actualiza la fuente de datos de la tabla
            this.snackbar.showNotification('success', 'Habitación agregada exitosamente');
          },
          error: (error) => {
            console.error('Error al agregar la habitación:', error);
            this.snackbar.showNotification('error', 'Error al agregar la habitación');
          },
        });
      }
    });
  }

  borrarHabitacion(id : number): void {
    this.habitacionService.deleteHabitacion(id).subscribe({
      next: () => {
        this.obtenerHabitaciones();
        this.snackbar.showNotification('success', 'Habitación eliminada correctamente');
      },
      error: () => {
        console.error('Error al eliminar la habitación');
        this.snackbar.showNotification('error', 'Error al eliminar la habitación');
      }
    })
  }

  toggleActualizarHabitacion(habitacion: Habitacion): void {
    this.habitacionParaActualizar = habitacion;  // Guardar habitación para actualización

    const dialogRef = this.dialog.open(DialogActualizarHabitacionComponent, {
      width: '470px',
      data: { habitacion: habitacion }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.habitacionService.putHabitacion(result).subscribe({
          next: () => {
            const index = this.habitaciones.findIndex(h => h.plantaId === result.IdHabitacion);
            if (index !== -1) {
              this.habitaciones[index] = result; // Actualizar la lista con los nuevos datos
              this.habitacionesDataSource.data = this.habitaciones; // Refrescar la tabla
              this.snackbar.showNotification('success', 'Habitación actualizada exitosamente');
            }
          },
          error: (error) => {
            console.error('Error al actualizar la habitación:', error);
            this.snackbar.showNotification('error', 'Error al actualizar la habitación');
          }
        });
      }
    });
  }

  verCamas(habitacion: any): void {
    this.dialog.open(CamasDialogComponent, {
      width: '1200px',
      data: habitacion.llits
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.habitacionesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.habitacionesDataSource.paginator) {
      this.habitacionesDataSource.paginator.firstPage();  // Reiniciar la paginación cuando se aplica el filtro
    }
  }



}

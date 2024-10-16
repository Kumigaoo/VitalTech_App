import { Component, OnInit, ViewChild } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { Habitacion } from '../../../../../../interface/habitacion.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component'; // Importar el componente standalone
import { MatTableDataSource } from '@angular/material/table'; // Módulo de tabla de Angular Material
import { MatPaginator } from '@angular/material/paginator'; // Módulo de paginación de Angular Material
import { MatSort } from '@angular/material/sort'; // Módulo de ordenación de Angular Material

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
    IdHabitacion: 0,
    Edificio: '',
    Planta: '',
    NumeroHabitacion: '',
    TipoCama: '',
  };
  habitacionParaActualizar: Habitacion | null = null;

  displayedColumns: string[] = ['Edificio', 'Planta', 'NumeroHabitacion', 'Acciones'];  // Columnas de la tabla

  constructor(private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  ngAfterViewInit() {
    this.habitacionesDataSource.paginator = this.paginator;  // Enlazar el paginador a la tabla
    this.habitacionesDataSource.sort = this.sort;  // Enlazar la ordenación a la tabla
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getHabitaciones().subscribe({
      next: (data: Habitacion[]) => {
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
    if (this.nuevaHabitacion.Edificio && this.nuevaHabitacion.Planta && this.nuevaHabitacion.NumeroHabitacion && this.nuevaHabitacion.TipoCama) {
      this.habitacionService.addHabitacion(this.nuevaHabitacion).subscribe({
        next: (nuevaHabitacion: Habitacion) => {
          this.habitaciones.push(nuevaHabitacion);
          this.habitacionesDataSource.data = this.habitaciones;  // Actualizar los datos en la tabla
          this.nuevaHabitacion = { IdHabitacion: 0, Edificio: '', Planta: '', NumeroHabitacion: '', TipoCama: '' };  // Resetear el formulario
          this.snackbar.showNotification('success', 'Habitación agregada exitosamente');  // Mostrar notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al agregar la habitación', error);
          this.snackbar.showNotification('error', 'Error al agregar la habitación');  // Mostrar notificación de error
        },
      });
    } else {
      this.snackbar.showNotification('error', 'Por favor, completa todos los campos');  // Notificación para campos faltantes
    }
  }

  actualizarHabitacion(): void {
    if (this.habitacionParaActualizar) {
      this.habitacionService.updateHabitacion(this.habitacionParaActualizar).subscribe({
        next: (habitacionActualizada: Habitacion) => {
          const index = this.habitaciones.findIndex(
            (h) => h.IdHabitacion === habitacionActualizada.IdHabitacion
          );
          if (index !== -1) {
            this.habitaciones[index] = habitacionActualizada;
            this.habitacionesDataSource.data = this.habitaciones;  // Actualizar la tabla con los datos actualizados
          }
          this.habitacionParaActualizar = null;  // Limpiar el formulario de actualización
          this.snackbar.showNotification('success', 'Habitación actualizada correctamente');  // Mostrar notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar la habitación', error);
          this.snackbar.showNotification('error', 'Error al actualizar la habitación');  // Mostrar notificación de error
        },
      });
    }
  }

  borrarHabitacion(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta habitación?');
    if (confirmacion) {
      this.habitacionService.deleteHabitacion(id).subscribe({
        next: () => {
          this.habitaciones = this.habitaciones.filter(h => h.IdHabitacion !== id);
          this.habitacionesDataSource.data = this.habitaciones;  // Actualizar la tabla sin la habitación borrada
          this.snackbar.showNotification('success', 'Habitación borrada correctamente');  // Mostrar notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al borrar la habitación', error);
          this.snackbar.showNotification('error', 'Error al borrar la habitación');  // Mostrar notificación de error
        },
      });
    }
  }

  toggleActualizarHabitacion(habitacion: Habitacion): void {
    this.habitacionParaActualizar = habitacion;  // Mostrar los datos en el formulario de actualización
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.habitacionesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.habitacionesDataSource.paginator) {
      this.habitacionesDataSource.paginator.firstPage();  // Reiniciar la paginación cuando se aplica el filtro
    }
  }

  cancelarNuevoHabitacion(): void {
    // Resetear el formulario de agregar habitación
    this.nuevaHabitacion = {
      IdHabitacion: 0,
      Edificio: '',
      Planta: '',
      NumeroHabitacion: '',
      TipoCama: '',
    };
  }
  
}

import { DialogActualizarHabitacionComponent } from '../../forms/Habitacion/Modif/dialog-actualizar-habitacion.component';
import { DialogCrearHabitacionComponent } from '../../forms/Habitacion/Create/dialog-crear-habitacion.component';
import { CamasDialogComponent } from './../../../apps/GoldenFold/src/app/components/popups/camas-popup';
import { SnackbarComponent } from './../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { HabitacionService } from './../../services/habitacion.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Habitacion } from '../../interfaces/habitacion.interface';
import { MatTableDataSource } from '@angular/material/table'; // Módulo de tabla de Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Módulo de paginación de Angular Material
import { MatSort } from '@angular/material/sort'; // Módulo de ordenación de Angular Material
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AbstractTableComponent } from '../abstract-logic';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: [],
})
export class HabitacionesComponent extends AbstractTableComponent<Habitacion> implements OnInit, AfterViewInit {

  isPortVitalTech = false;

  constructor(
    private habitacionService: HabitacionService,
    public override dialog: MatDialog
  ) {
    super(); // Llamada al constructor del abstracto
    this.dialog = dialog;
    this.addingItem = this.crearItemInicial();
  }

  ngOnInit(): void {
    this.obtenerItems(this.habitacionService.getAll());

    // Lógica para definir los estilos (CSS)
    const currentPort = window.location.port;
    let cssPath: string[] = [];

    this.isPortVitalTech = currentPort === '4200';

    if (currentPort === '4201') {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/habitacion/4201.component.css'];
    } else {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/habitacion/4200.component.css'];
    }
    
    // Cargar los estilos específicos del componente
    this.cargarEstilos(cssPath);

    // Configuración de las columnas para la tabla
    this.displayedColumns = [
      'NumeroHabitacion',
      'CapCamas',
      'Planta',
      'Camas',
      'Acciones',
    ];
}

  crearItemInicial(): Habitacion {
      return {
        codiHabitacio: 0,
        capacitatLlits: 0,
        plantaId: 0,
        llits: [''],
      };
  }

  verRelaciones(habitacion: Habitacion): void {
    this.dialog.open(CamasDialogComponent, {
      width: '1200px',
      data: habitacion.llits,  // Pasar las pruebas diagnósticas como data
    });
  } 

  obtenerDialogoFormularioRegistro(): any {
    return DialogCrearHabitacionComponent;
  }
  
  obtenerDialogoFormularioModificacion(): any {
    return DialogActualizarHabitacionComponent; // Aquí se devuelve el diálogo de modificación específico
  }
  
  obtenerItemsService(): Observable<Habitacion[]> {
    return this.habitacionService.getAll();
  }
  
  guardarService(item: Habitacion): Observable<any> {
    return this.habitacionService.post(item);
  }
  
  obtenerIdOriginal(item: Habitacion): number {
    return item.codiHabitacio; 
  }
  
  actualizarService(id: number, item: Habitacion): Observable<any> {
    return this.habitacionService.put(id, item);
  }
  
  eliminarService(id: number): Observable<any> {
    return this.habitacionService.delete(id);
  }
  
  necesitaConfirmacion(): boolean {
    return this.isPortVitalTech;
  }

  mostrarConfirmacion(): Promise<any> {
    return Swal.fire({
      title: 'Eliminar habitación',
      text: '¿Quieres borrar esta habitación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      });
    }

  definirFiltro(data: Habitacion, type: string, filter: string): boolean {
    switch (type) {
      case 'habitacion':
        return data.codiHabitacio.toString().toLowerCase() === filter;
      case 'capacitat':
        return data.capacitatLlits.toString().toLowerCase() === filter;
      case 'planta':
        return data.plantaId.toString().toLowerCase() === filter;
      default:
        return false;
    }
  }
}

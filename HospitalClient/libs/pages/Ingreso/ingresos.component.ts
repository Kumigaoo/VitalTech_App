
import { CamaService } from '../../../libs/services/cama.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Ingreso } from '../../../libs/interfaces/ingreso.interface';
import { IngresoService } from '../../../libs/services/ingreso.service';
import { EpisodiMedic } from '../../../libs/interfaces/episodis-medics.interface';
import { MatTableDataSource } from '@angular/material/table';
import { EpisodiService } from '../../../libs/services/episodis.service';
//import { DialogFormularioIngresoModifComponent } from '../../../../../../components/Formularios/Ingreso/dialog-formulario-ingreso-modif/dialog-formulario-ingreso-modif.component';
import { AbstractTableComponent } from '../../utils/abstract-logic';
import { EpisodiosDialogComponent } from '../../../apps/GoldenFold/src/app/components/popups/episodis-popup';
import { Observable } from 'rxjs';
//import { IngresosDialogComponent } from '../../../../HospitalClient/apps/VitalTech/src/app/components/'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: [],
})
export class IngresosComponent extends AbstractTableComponent<Ingreso> implements OnInit, AfterViewInit {
  
  //angular material
  ingresos: MatTableDataSource<Ingreso> = new MatTableDataSource<Ingreso>([]);

  // Formularios reactivos
  ingresoForm!: FormGroup;
  ingresoParaActualizar: Ingreso | null = null;
  isPortGolden: boolean = true;

  constructor(
    private ingresoService: IngresoService,
    private camaService: CamaService,
    private episodiService: EpisodiService,
    private fb: FormBuilder,
  ) {
    super();
    // Obtener los ingresos y camas disponibles al iniciar el componente
    this.obtenerIngresos();
    // Crear el formulario para manejar los ingresos
    //this.crearFormularioIngreso();
  }

  ngOnInit(): void {
    const currentPort = window.location.port;
    let cssPath: string[] = [];

    this.isPortGolden = currentPort === '4201';

    if (this.isPortGolden) {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/habitacion/4201.component.css'];
    } else {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/habitacion/4200.component.css'];
    }

    this.cargarEstilos(cssPath);

  }

  crearItemInicial(): Ingreso {
    return {
      id: 0,
      dataEntrada: new Date(),
      dataSortida: null,
      episodiMedicId: 0,
      codiLlit: 0,
    };
  }

  verRelaciones(ingreso: Ingreso): void {
    this.dialog.open(EpisodiosDialogComponent, {
      width: '1200px',
      data: ingreso.episodiMedicId,
    });
  }

  obtenerDialogoFormularioRegistro() {
    return;
  }

  obtenerDialogoFormularioModificacion() {
    return;
  }

  obtenerItemsService(): Observable<Ingreso[]> {
    return this.ingresoService.getAll();
  }

  guardarService(item: Ingreso): Observable<any> {
    return this.ingresoService.post(item);
  }

  obtenerIdOriginal(item: Ingreso): number | string | null {
    return item.id;
  }

  actualizarService(id: number, item: Ingreso): Observable<any> {
    return this.ingresoService.put(id, item);
  }

  eliminarService(id: number): Observable<any> {
    return this.ingresoService.delete(id);
  }

  necesitaConfirmacion(): boolean {
    return this.isPortGolden;
  }

  mostrarConfirmacion(): Promise<any> {
      return Swal.fire({
        title: 'Eliminar ingreso',
        text: '¿Quieres borrar este ingreso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        });
    }

    definirFiltro(data: Ingreso, type: string, filter: string): boolean {
      // switch (type) {
      //   default:
      //     return false;
      // }
      return true;
    }




  // Obtener la lista de ingresos desde el servicio correspondiente
  obtenerIngresos(): void {
    this.ingresoService.getAll().subscribe({
      next: (data: Ingreso[]) => {
        this.ingresos.data = data;
        this.ingresos.paginator = this.paginator;
        this.ingresos.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error al obtener los ingresos', error);
      },
    });
  }

  // Agregar un nuevo ingreso a la lista
  agregarIngreso(): void {
    if (this.ingresoForm.valid) {
      // Crear un nuevo objeto de tipo Ingreso basado en los valores del formulario
      const nuevoIngreso: Ingreso = this.ingresoForm.value;
      nuevoIngreso.dataEntrada = new Date(); //ponemos la fecha de hoy
      this.ingresoService.post(nuevoIngreso).subscribe({
        next: (ingreso: Ingreso) => {
          console.log('Ingreso: ', ingreso);
          // Agregar el ingreso a la lista de ingresos
          this.ingresos.data = [...this.ingresos.data, ingreso];
          // Reiniciar el formulario después de agregar el ingreso
          this.obtenerIngresos();
          this.ingresoForm.reset();
          this.snackbar.showNotification('success', 'Ingreso creado con exito'); // Notificación de éxito
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError); // Notificación de éxito
        },
      });
    } else {
      console.log(this.ingresoForm.value);
    }
  }

  // Actualizar un ingreso existente
  actualizarIngreso(): void {
    if (this.ingresoParaActualizar) {
      // Crear una copia del ingreso existente con los valores actualizados
      const ingresoActualizado: Ingreso = { ...this.ingresoParaActualizar };
      this.ingresoService
        .put(ingresoActualizado.id, ingresoActualizado)
        .subscribe({
          next: () => {
            // Obtener la lista de ingresos actualizada
            this.obtenerIngresos();
            // Restablecer las variables del formulario y del ingreso a actualizar
            this.ingresoParaActualizar = null;
            this.ingresoForm.reset();
            this.snackbar.showNotification(
              'success',
              'Ingreso actualizado correctamente'
            ); // Notificación de éxito
          },
          error: (error: any) => {
            console.error('Error al actualizar el ingreso', error);
          },
        });
    }
  }
  filtrarIngresos(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchTerm = term.trim().toLowerCase();

    this.ingresos.filterPredicate = (data: Ingreso, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();

      if (type === 'id') {
        return (
          data.id.toString().toLowerCase() === lowerCaseFilter.toString() ||
          false
        ); // Si busca por ID
      } else if (type === 'episodiMedicId') {
        return (
          data.episodiMedicId.toString().toLowerCase() ===
          lowerCaseFilter.toString() || false
        );
      } else if (type === 'codiLlit') {
        return (
          data.codiLlit?.toString().toLowerCase().includes(lowerCaseFilter) ||
          false
        );
      }
      return false; // Si no coincide ningún tipo
    };

    this.ingresos.filter = searchTerm;

    if (this.ingresos.paginator) {
      this.ingresos.paginator.firstPage(); // Resetea a la primera página si hay un filtro activo
    }
  }

  // Borrar un ingreso de la lista
  borrarIngreso(id: number): void {
    this.ingresoService.delete(id).subscribe({
      next: () => {
        // Eliminar el ingreso de la lista de ingresos
        this.ingresos.data = this.ingresos.data.filter((i) => i.id !== id);
        this.snackbar.showNotification(
          'success',
          'Ingreso eliminado correctamente'
        ); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al borrar el ingreso', error);
      },
    });
  }

  // Cambiar entre agregar o actualizar un ingreso existente
  // toggleActualizarIngreso(ingreso: Ingreso): void {
  //   this.ingresoParaActualizar = { ...ingreso };
  //   this.dialog
  //     .open(DialogFormularioIngresoModifComponent, {
  //       data: this.ingresoParaActualizar,
  //     })
  //     .afterClosed()
  //     .subscribe((ingresoActualizado) => {
  //       if (ingresoActualizado) {
  //         this.ingresoParaActualizar = ingresoActualizado;
  //         this.actualizarIngreso();
  //       }
  //     });
  // }
  // toggleAgregarIngreso(): void {
  //   this.crearFormularioIngreso();
  //   this.dialog
  //     .open(DialogFormularioIngresoModifComponent, {
  //       data: this.ingresoForm,
  //     })
  //     .afterClosed()
  //     .subscribe((ingresoCreado) => {
  //       if (ingresoCreado) {
  //         this.ingresoForm.patchValue(ingresoCreado);
  //         this.agregarIngreso();
  //       }
  //     });
  // }
}

import { PlantaService } from '../../services/planta.service';
import { Planta } from '../../interfaces/planta.interface';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarComponent } from '../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { DialogPlantaComponent } from '../../forms/Planta/dialog-planta-component';
import { HabitacionesDialogComponent } from '../../../apps/GoldenFold/src/app/components/popups/habitaciones-popup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { plantaExistsValidator } from '../../validators/plantaExistsValidator';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: [],
})
export class PlantaComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  plantaForm!: FormGroup; 

  displayedColumns: string[] = [
    'piso',
    'capacitatHabitacions',
    'habitacions',
    'acciones',
  ];

  plantas: MatTableDataSource<Planta> = new MatTableDataSource<Planta>([]);

  currentPort: string;
  isPortGolden: boolean;
   
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  nuevaPlanta: Planta;
  plantes: Planta[] = [];
  notificacion: string | null = null;

  plantaSeleccionado: Planta | null = null;

  templateUrl!: string
  styleUrls!: string[]
  cssPaths!: string[];
  data: any;

  constructor(public dialog: MatDialog, private plantaService: PlantaService, private fb: FormBuilder) {
    this.nuevaPlanta = {
      piso: 0,
      capacitatHabitacions: 0,
      habitacions: [''],
      
    };

        //cambiar html
        this.currentPort = window.location.port;
        this.isPortGolden = this.currentPort==="4201"; //4201
     
        //cambiar css
        if (this.isPortGolden) {
          //css golden
          this.cssPaths = ['/assets/styles/styles.css','/assets/styles/planta/4001.component.css'];
        } else {
          //css vital
          this.cssPaths = ['/assets/styles/styles.css','/assets/styles/planta/4000.component.css'];
        }
     
        this.cssPaths.forEach(css => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = css;
          document.head.appendChild(link);
        });
        this.crearFormularioPlanta();
      }

  ngOnInit() {
    this.loadPlantes();
  }

  ngAfterViewInit() {
    this.plantas.paginator = this.paginator;
    this.plantas.sort = this.sort;
  }

  // LA MOVIDITA A IMPLENATR XD 
  tooggleActualizarPlanta(planta: any): void {

  }

  loadPlantes(): void {
    this.plantaService.getAll().subscribe({
      next: (data: Planta[]) => {
        this.plantes = data;
        this.totalItems = data.length;
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener las plantas', error);
      },
    });
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.actualizarPagina(this.pageIndex, this.itemsPerPage);
  }

  actualizarPagina(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.plantas.data = this.plantes.slice(startIndex, endIndex);
  }

  toggleFormularioAgregar() {
    this.crearFormularioPlanta();

    this.dialog
      .open(DialogPlantaComponent, {
        data: this.nuevaPlanta,
      })
      .afterClosed()
      .subscribe((plantaCreada) => {
        if (plantaCreada) {
          this.nuevaPlanta = plantaCreada;
          this.guardarPlanta();
        }
      });
  }

  

  guardarPlanta() {
    this.plantaService.post(this.nuevaPlanta).subscribe({
      next: () => {
        this.loadPlantes(); // Cargar plantas después de agregar
        this.snackbar.showNotification(
          'success',
          'Planta guardada exitosamente'
        ); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al guardar la planta', error);
        this.snackbar.showNotification('error', 'Error al guardar la planta'); // Notificación de error
      },
    });
  }

  verHabitaciones(planta: any): void {
    console.log(planta.habitacions);
    this.dialog.open(HabitacionesDialogComponent, {
      width: '80em',
      height: '90%',
      data: planta.habitacions,
    });
  }

  delete(piso: number): void {
    Swal.fire({
      title: 'Eliminar planta',
      text: '¿Quieres borrar esta planta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantaService.delete(piso.toString()).subscribe({
          next: () => {
            this.loadPlantes();
            this.snackbar.showNotification(
              'success',
              'Planta eliminada correctamente'
            ); // Notificación de éxito
          },
          error: () => {
            this.snackbar.showNotification(
              'error',
              'Error al eliminar la planta'
            ); // Notificación de error
          },
        });
      }
    });
  }

  modificarPlanta(): void {
    if (this.plantaSeleccionado) {
      this.plantaService
        .put(this.plantaSeleccionado.piso.toString(), this.plantaSeleccionado)
        .subscribe({
          next: () => {
            this.loadPlantes();
            this.cerrarFormulario();
            this.snackbar.showNotification(
              'success',
              'Planta actualizada correctamente'
            ); // Notificación de éxito
          },
          error: (error: any) => {
            this.snackbar.showNotification(
              'error',
              'Error al actualizar la planta'
            ); // Notificación de error
          },
        });
    }
  }

  cerrarFormulario(): void {
    this.plantaSeleccionado = null;
  }
  
  tooggleAgregarPlanta(): void {
    this.crearFormularioPlanta();
    this.dialog
      .open(DialogPlantaComponent, {
        data: this.plantaForm,
      })
      .afterClosed()
  }

  crearFormularioPlanta(): void{
      this.plantaForm = this.fb.group({ //lo crear con el form builder
        piso: [ //campo dni
          this.data.piso, //valor puesto en el campo dni 
          {
            validators: [Validators.required], //comprueba que el dni sea valido
            asyncValidators: [plantaExistsValidator(this.plantaService)], //comprueba que no exista un administrador de sistema con ese dni
          }
        ],
        capacitatHabitacions: [
          this.data.capacitatHabitacions,
          {
            validators:[Validators.required, Validators.pattern(/^(?:[1-9]|[1-9][0-9])$/)
  
            ],
          }
        ],
      });
    }

  agregarPlanta(): void {
      if (this.plantaForm.valid) {
        const nuevoMedico: Planta = this.plantaForm.value;
        this.plantaService.post(nuevoMedico).subscribe({
          next: (planta: Planta) => {
            this.plantas.data = [...this.plantas.data, planta];
            this.loadPlantes();
            this.plantaForm.reset();
            this.snackbar.showNotification('success', 'Planta creado con exito'); // Notificación de éxito
          },
          error: (error: any) => {
            const mensajeError =
              error.error || 'Error inesperado. Inténtalo de nuevo.';
            this.snackbar.showNotification('error', mensajeError); // Notificación de éxito
          },
        });
      }
    }

  filtrarPlantes(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();

    this.plantas.filterPredicate = (data: Planta, filter: string) => {
      switch (type) {
        case 'planta':
          return data.piso?.toString().includes(filter.toLowerCase()) ?? false;

        case 'capacitat':
          return (
            data.capacitatHabitacions
              ?.toString()
              .includes(filter.toLowerCase()) ?? false
          );

        default:
          return false;
      }
    };
    this.plantas.filter = searchterm;

    if (this.plantas.paginator) {
      this.plantas.paginator.firstPage();
    }
  }
}

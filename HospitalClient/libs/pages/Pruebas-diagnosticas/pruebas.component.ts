import { DialogFormularioConsultaModifComponent } from './../../../apps/GoldenFold/src/app/components/Formularios/Consulta/dialog-formulario-consulta-modif/dialog-formulario-consulta-modif.component';
import { DialogFormularioConsultaComponent } from './../../../apps/GoldenFold/src/app/components/Formularios/Consulta/dialog-formulario-consulta-registro/dialog-formulario-consulta.component';
import { SnackbarComponent } from './../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { PruebasService } from './../../services/pruebas.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PruebaDiagnostica } from '../../interfaces/pruebas-diagnosticas.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: [],
})
export class PruebasComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  displayedColumns: string[] = [
    'id',
    'dniMetge',
    'dniEnfermer',
    'episodiMedicId',
    'dolencia',
    'pruebas',
    'resultados',
    'correcta',
    'acciones',
  ];
  dataSource: MatTableDataSource<PruebaDiagnostica> =
    new MatTableDataSource<PruebaDiagnostica>([]);

  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  isPortVitalTech = false;

  pruebas: PruebaDiagnostica[] = [];
  addingPrueba;
  pruebaSeleccionada: PruebaDiagnostica | null = null;

  noti: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pruebaService: PruebasService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.addingPrueba = {
      id: 0,
      dniMetge: '',
      dniEnfermer: '',
      episodiMedicId: 0,
      dolencia: '',
      pruebas: '',
      resultados: '',
      correcta: false
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerConsultas();
    const currentPort = window.location.port;
    let cssPath: string[];

    this.isPortVitalTech = currentPort === '4200';

    if (currentPort == '4201'){
      cssPath = ['/assets/styles/styles.css', '/assets/styles/Pruebas-Diagnosticas/pruebas.component.css'];
    } else {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/Pruebas-Diagnosticas/pruebas-diagnosticas.component.css'];
    }

    cssPath.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
  }

  obtenerConsultas(): void {
    this.pruebaService.getAll().subscribe({
      next: (data: PruebaDiagnostica[]) => {
        this.pruebas = data;
        this.totalItems = data.length;
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener las consultas', error);
      },
    });
  }

  actualizarPagina(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.dataSource.data = this.pruebas.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.actualizarPagina(this.pageIndex, this.itemsPerPage);
  }

  toggleFormularioAgregar(): void {
    this.addingPrueba = {
      id: 0,
      dniMetge: '',
      dniEnfermer: '',
      episodiMedicId: 0,
      dolencia: '',
      pruebas: '',
      resultados: '',
      correcta: false
    };
    this.dialog
      .open(DialogFormularioConsultaComponent, {
        data: this.addingPrueba,
      })
      .afterClosed()
      .subscribe((consultaCreada) => {
        if (consultaCreada) {
          this.addingPrueba = consultaCreada;
          this.guardarConsulta();
        }
      });
  }

  toggleActualizarConsulta(prueba: PruebaDiagnostica): void {
    if(this.isPortVitalTech){
      window.location.href = `https://localhost:4200/inicio/consulta/modif-consulta/${prueba.id}`;
    }else {
      this.pruebaSeleccionada = { ...prueba };
      this.dialog
        .open(DialogFormularioConsultaModifComponent, {
          data: this.pruebaSeleccionada,
        })
        .afterClosed()
        .subscribe((pruebaActualizada) => {
          if (pruebaActualizada) {
            this.pruebaSeleccionada = pruebaActualizada;
            this.actualizarConsulta();
          }
        });
    }
  }

  navigateToRegistroEpisodio(): void {
    window.location.href = 'https://localhost:4200/inicio/consulta/registro-consulta';
  }

  cerrarFormulario(): void {
    this.pruebaSeleccionada = null;
  }

  guardarConsulta(): void {
    this.pruebaService.post(this.addingPrueba)
      .subscribe({
        next: () => {
          this.obtenerConsultas();
          this.cerrarFormulario();
          this.snackbar.showNotification(
            'success',
            'Consulta guardada exitosamente'
          );
        },
        error: (error: any) => {
          console.error('Error al guardar la consulta', error);
          this.snackbar.showNotification(
            'error',
            'Error al guardar la consulta'
          );
        },
      });
  }

  borrarConsulta(id: number): void {
    if(this.isPortVitalTech){
      Swal.fire({
            title: 'Eliminar consulta',
            text: '¿Quieres borrar esta consulta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.pruebaService.delete(id).subscribe({
                next: () => {
                  Swal.fire(
                    'Consulta eliminada',
                    'La consulta ha sido eliminada con éxito.',
                    'success'
                  );
                  this.obtenerConsultas();
                },
                error: () => {
                  Swal.fire(
                    'Error',
                    'No se puede eliminar este episodio médico: todavía existen consultas o ingresos.',
                    'error'
                  );
                },
              });
            }
          });
    }else {
    this.pruebaService.delete(id).subscribe({
      next: () => {
        this.obtenerConsultas();
        this.snackbar.showNotification(
          'success',
          'Consulta eliminada correctamente'
        );
      },
      error: (error: any) => {
        console.error('Error al eliminar la consulta', error);
        this.snackbar.showNotification(
          'error',
          'Error al eliminar la consulta'
        );
      },
    });
  }
  }

  actualizarConsulta(): void {
    if (this.pruebaSeleccionada) {
      this.pruebaService
        .put(this.pruebaSeleccionada.id, this.pruebaSeleccionada)
        .subscribe({
          next: () => {
            this.obtenerConsultas();
            this.cerrarFormulario();
            this.snackbar.showNotification(
              'success',
              'Consulta actualizada correctamente'
            ); // Notificación de éxito
          },
          error: (error: any) => {
            console.error('Error al actualizar la Consulta', error);
            this.snackbar.showNotification(
              'error',
              'Error al actualizar la Consulta'
            ); // Notificación de error
          },
        });
    } else {
      console.error('Cama seleccionada no es válida');
    }
  }

  filtrarConsultas(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();

    this.dataSource.filterPredicate = (
      data: PruebaDiagnostica,
      filter: string
    ) => {
      switch (type) {
        case 'urgencia':
          return data.dniMetge?.toLowerCase().includes(filter) ?? false;
        case 'sintomatologia':
          return data.dniEnfermer?.toLowerCase().includes(filter) ?? false;
        case 'receta':
          return data.episodiMedicId?.toString().includes(filter) ?? false;
        case 'dniPersonal':
          return data.dolencia?.toLowerCase().includes(filter) ?? false;
        case 'id':
          return data.id?.toString().includes(filter) ?? false;
        default:
          return false;
      }
    };

    // Aplicar el filtro al dataSource
    this.dataSource.filter = searchterm;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

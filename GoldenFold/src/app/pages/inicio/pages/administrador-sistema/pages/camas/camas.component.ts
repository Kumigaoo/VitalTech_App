import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CamaService } from '../../../../../../services/cama.service';
import { Cama } from '../../../../../../interface/cama.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormularioComponent } from '../../../../../../components/dialog-formulario/dialog-formulario.component';
import { HttpClient } from '@angular/common/http';
import { DialogFormulariocamaComponent } from '../../../../../../components/Formularios/Cama/dialog-formulario-cama-registro/dialog-formulario-cama.component';
import { DialogFormulariocamaModifComponent } from '../../../../../../components/Formularios/Cama/dialog-formulario-cama-modif/dialog-formulario-cama-modif.component';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css']
})
export class CamasComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent
  displayedColumns: string[] = ['codiLlit', 'ocupat', 'foraDeServei', 'codiHabitacio', 'acciones'];
  dataSource = new MatTableDataSource<Cama>([]);
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  camas: Cama[] = [];
  nuevaCama: Cama;
  notificacion: string | null = null;
  //camasFiltradas: Cama[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  camaSeleccionada: Cama | null = null;

  constructor(private camaService: CamaService, public dialog: MatDialog, private http: HttpClient){
    this.nuevaCama = {
      codiLlit: '',
      ocupat: false,
      foraDeServei: false,
      codiHabitacio: 0,
      ingressos: []
    };
  }

  /*nuevaCama: Cama = {
    codiLlit: '',
    ocupat: false,
    foraDeServei: false,
    codiHabitacio: 0,
    ingressos: []
  };*/
  //camaParaActualizar: Cama | null = null;

  /*paginaActual: number = 1;
  camasPorPagina: number = 10;
  totalPaginas: number = 0;

  mostrarFormularioAgregarCama: boolean = false;
  mostrarFormularioActualizarCama: boolean = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  filtroUbicacion: string = '';
  filtroEstado: string = '';
  filtroTipo: string = '';*/

  //constructor(private camaService: CamaService) {}
  ngOnInit(): void {
    this.obtenerCamas();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  obtenerCamas(): void {
    this.camaService.getLlits().subscribe({
      next: (data: Cama[]) => {
        this.camas = data;
        this.totalItems = data.length;
        //this.camasFiltradas = [...this.camas];
        //this.totalPaginas = Math.ceil(this.camasFiltradas.length / this.camasPorPagina);
        //this.verificarPaginaActual();
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener las camas', error);
      }
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
    this.dataSource.data = this.camas.slice(startIndex, endIndex);
  }

  filtrarCamas(event: { type: string; term: string }): void {
    const { term } = event;
    this.dataSource.filter = term.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
  // Mostrar el formulario para actualizar paciente
  toggleActualizarCama(cama: Cama): void {
    this.camaSeleccionada = { ...cama };
    this.dialog.open(DialogFormulariocamaModifComponent, {
      data: this.camaSeleccionada
    }).afterClosed().subscribe((camaActualizada) => {
      if (camaActualizada) {
        this.camaSeleccionada = camaActualizada;
        this.actualizarCama();
      }
    });
  }

  toggleFormularioAgregar(): void {
    this.nuevaCama = {
      codiLlit: '',
      ocupat: false,
      foraDeServei: false,
      codiHabitacio: 0,
      ingressos: []
    };
    this.dialog.open(DialogFormulariocamaComponent, {
      data: this.nuevaCama
    }).afterClosed().subscribe((camaCreada) => {
      if (camaCreada) {
        this.guardarCama();
      }
    });
  } 
  cerrarFormulario(): void {
    this.camaSeleccionada = null;
  }

  borrarCama(codiLlit: string): void {
    this.camaService.deleteLlit(codiLlit).subscribe({
      next: () => {
        this.obtenerCamas(); // Refrescar la tabla tras borrar
        this.snackbar.showNotification('success', 'Cama eliminada correctamente'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al eliminar la cama', error);
        this.snackbar.showNotification('error', 'Error al eliminar la cama'); // Notificación de error
      },
    });
  }
  // Guardar un nuevo paciente
  guardarCama(): void {
    this.http.post('http://localhost:5296/api/Llit', this.nuevaCama).subscribe({
      next: () => {
        this.obtenerCamas();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Cama guardada exitosamente'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al guardar la cama', error);
        this.snackbar.showNotification('error', 'Error al guardar la cama'); // Notificación de error
      },
    });
  }
  actualizarCama(): void {
    console.log(this.camaSeleccionada); // Para verificar que pacienteSeleccionado no sea null o undefined
    if (this.camaSeleccionada) {
      this.camaService.putLlit(this.camaSeleccionada).subscribe({
        next: () => {
          this.obtenerCamas();
          this.cerrarFormulario();
          this.snackbar.showNotification('success', 'Cama actualizada correctamente'); // Notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar la cama', error);
          this.snackbar.showNotification('error', 'Error al actualizar la cama'); // Notificación de error
        },
      });
    } else {
      console.error('Cama seleccionada no es válida');
    }
  }

  /*aplicarFiltros(): void {
    this.camasFiltradas = this.camas.filter(cama => {
      const coincideUbicacion = this.filtroUbicacion
        ? cama.Ubicacion.toLowerCase().includes(this.filtroUbicacion.toLowerCase())
        : true;
      const coincideEstado = this.filtroEstado ? cama.Estado === this.filtroEstado : true;
      const coincideTipo = this.filtroTipo ? cama.Tipo === this.filtroTipo : true;

      return coincideUbicacion && coincideEstado && coincideTipo;
    });

    this.totalPaginas = Math.ceil(this.camasFiltradas.length / this.camasPorPagina);
    this.verificarPaginaActual();
  }

  verificarPaginaActual(): void {
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas; // Redirige a la última página si la actual es mayor
    }
    if (this.paginaActual < 1) {
      this.paginaActual = 1; // Redirige a la primera página si la actual es menor
    }
  }*/

  /*filtrarPorUbicacion(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filtroUbicacion = inputElement.value;
    this.aplicarFiltros();
  }

  filtrarPorEstado(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filtroEstado = selectElement.value;
    this.aplicarFiltros();
  }

  filtrarPorTipo(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filtroTipo = selectElement.value;
    this.aplicarFiltros();
  }*/

  /*siguientePagina(): void {
    this.paginaActual++;
    this.verificarPaginaActual();
  }

  paginaAnterior(): void {
    this.paginaActual--;
    this.verificarPaginaActual();
  }

  primeraPagina(): void {
    this.paginaActual = 1;
  }

  ultimaPagina(): void {
    this.paginaActual = this.totalPaginas;
  }

  // Método para obtener las camas para la página actual
  obtenerCamasParaPagina(): Cama[] {
    const inicio = (this.paginaActual - 1) * this.camasPorPagina;
    return this.camasFiltradas.slice(inicio, inicio + this.camasPorPagina);
  }*/
}

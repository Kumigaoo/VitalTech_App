import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CamaService } from '../../../../../../services/cama.service';
import { Cama } from '../../../../../../interface/cama.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css']
})
export class CamasComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent
  displayedColumns: string[] = ['Codigo Llit', 'Disponibilidad', 'Fuera de servicio', 'Codigo Habitacion'];
  dataSource = new MatTableDataSource<Cama>([]);
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  camas: Cama[] = [];
  nuevaCama: Cama;
  notificacion: string | null = null;
  camasFiltradas: Cama[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  camaSeleccionada: Cama | null = null;

  constructor(private camaService: CamaService, public dialog: MatDialog){
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
  camaParaActualizar: Cama | null = null;

  paginaActual: number = 1;
  camasPorPagina: number = 10;
  totalPaginas: number = 0;

  mostrarFormularioAgregarCama: boolean = false;
  mostrarFormularioActualizarCama: boolean = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  filtroUbicacion: string = '';
  filtroEstado: string = '';
  filtroTipo: string = '';

  //constructor(private camaService: CamaService) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.obtenerCamas();
  }

  obtenerCamas(): void {
    this.camaService.getLlits().subscribe({
      next: (data: Cama[]) => {
        this.camas = data;
        this.camasFiltradas = [...this.camas];
        this.totalPaginas = Math.ceil(this.camasFiltradas.length / this.camasPorPagina);
        this.verificarPaginaActual();
      },
      error: (error: any) => {
        console.error('Error al obtener las camas', error);
      }
    });
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
  }*/

  verificarPaginaActual(): void {
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas; // Redirige a la última página si la actual es mayor
    }
    if (this.paginaActual < 1) {
      this.paginaActual = 1; // Redirige a la primera página si la actual es menor
    }
  }

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

  siguientePagina(): void {
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
  }
}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PacienteService } from '../../../../../../services/paciente.service';
import { Paciente } from '../../../../../../interface/paciente.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormularioComponent } from '../../../../../../components/Formularios/Paciente/dialog-formulario/dialog-formulario.component';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit, AfterViewInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent
  // Variables relacionadas con la tabla y los datos
  displayedColumns: string[] = ['dni', 'numSS', 'nom', 'birthDay', 'sexe', 'acciones'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>([]);
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  pacientes: Paciente[] = [];
  nuevoPaciente: Paciente;
  notificacion: string | null = null;  // Variable para notificaciones

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pacienteSeleccionado: Paciente | null = null;

  constructor(private pacienteService: PacienteService, public dialog: MatDialog) {
    this.nuevoPaciente = {
      dni: '',
      numSS: '',
      nom: '',
      cognom1: '',
      cognom2: '',
      sexe: '',
      birthDay : '',
      episodisMedics: []
      /*IdPaciente: 0,
      Nombre: '',
      Dni: '',
      FechaNacimiento: new Date(),
      Estado: 'Registrado',
      FechaRegistro: new Date(),
      SeguridadSocial: '',
      Direccion: '',
      Telefono: '',
      Email: '',
      HistorialMedico: ''*/
    };
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerPacientes(): void {
    this.pacienteService.getPacients().subscribe({
      next: (data: Paciente[]) => {
      this.pacientes = data;
      this.totalItems = data.length;
      this.actualizarPagina(0, this.itemsPerPage);
    },
    error: (error: any) => {
      console.error('Error al obtener los pacientes', error);
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
    this.dataSource.data = this.pacientes.slice(startIndex, endIndex);
  }

  /*filtrarPacientes(event: { type: string; term: string }): void {
    const { term } = event;
    this.dataSource.filter = term.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

  // Mostrar el formulario para actualizar paciente
  toggleActualizarPaciente(paciente: Paciente): void {
    this.pacienteSeleccionado = { ...paciente };
    this.dialog.open(DialogFormularioComponent, {
      data: this.pacienteSeleccionado
    }).afterClosed().subscribe((pacienteActualizado) => {
      if (pacienteActualizado) {
        this.pacienteSeleccionado = pacienteActualizado;
        this.actualizarPaciente();
      }
    });
  }

  toggleFormularioAgregar(): void {
    this.nuevoPaciente = {
      dni: '',
      numSS: '',
      nom: '',
      cognom1: '',
      cognom2: '',
      sexe: '',
      birthDay : '',
      episodisMedics: []
    };
    this.dialog.open(DialogFormularioComponent, {
      data: this.nuevoPaciente
    }).afterClosed().subscribe((pacienteCreado) => {
      if (pacienteCreado) {
        this.nuevoPaciente = pacienteCreado;
        this.guardarPaciente();
      }
    });
  }

  cerrarFormulario(): void {
    this.pacienteSeleccionado = null;
  }

  // Eliminar paciente
borrarPaciente(id: string): void {
  this.pacienteService.deletePacient(id).subscribe({
    next: () => {
      this.obtenerPacientes(); // Refrescar la tabla tras borrar
      this.snackbar.showNotification('success', 'Paciente eliminado correctamente'); // Notificación de éxito
    },
    error: (error: any) => {
      console.error('Error al eliminar el paciente', error);
      this.snackbar.showNotification('error', 'Error al eliminar el paciente'); // Notificación de error
    },
  });
}

// Guardar un nuevo paciente
guardarPaciente(): void {
  this.pacienteService.postPacient(this.nuevoPaciente).subscribe({
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

actualizarPaciente(): void {
  console.log(this.pacienteSeleccionado); // Para verificar que pacienteSeleccionado no sea null o undefined
  if (this.pacienteSeleccionado) {
    this.pacienteService.putPacient(this.pacienteSeleccionado, this.pacienteSeleccionado.dni).subscribe({
      next: () => {
        this.obtenerPacientes();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Paciente actualizado correctamente'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al actualizar el paciente', error);
        this.snackbar.showNotification('error', 'Error al actualizar el paciente'); // Notificación de error
      },
    });
  } else {
    console.error('pacienteSeleccionado no es válido');
  }
}

  filtrarPacientes(event: {type: string; term: string}): void {
    const {type, term} = event;
    const searchterm = term.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Paciente, filter: string) => {
      switch (type){
        case 'dni':
          return data.dni?.toLowerCase().includes(filter.toLowerCase()) ?? false;
        
        case 'numSS':
          return data.numSS?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        case 'nom':
          return data.nom?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        case 'sexe':
          return data.sexe?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        default: 
          return false;
      }
    };
    this.dataSource.filter = searchterm;

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


}

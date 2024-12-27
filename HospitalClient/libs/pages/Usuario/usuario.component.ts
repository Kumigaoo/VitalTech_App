import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuari } from '../../interfaces/usuari.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarComponent } from '../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { EpisodiosDialogComponent } from '../../../apps/GoldenFold/src/app/components/popups/episodis-popup';
import { DialogUsuarioComponent } from '../../forms/Usuario/dialog-usuario-lista-modif.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: [],
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Variables relacionadas con la tabla y los datos
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'rolId',
    'imagen',
    'acciones'
  ];
  dataSource: MatTableDataSource<Usuari> = new MatTableDataSource<Usuari>([]);
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;
  isPortGolden = true;
  usuarios: Usuari[] = [];
  nuevoUsuario: Usuari;
  notificacion: string | null = null; // Variable para notificaciones

  usuarioSeleccionado: Usuari | null = null;

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {
    this.nuevoUsuario = {
      id: 0,
      username: '',
      password: '',
      email: '',
      rolId: '',
      imagen: ''
    };
  }

  ngOnInit(): void {
    let port = window.location.port;

    let cssPath: string[];

    if (port == '4201') {
      this.isPortGolden = true;
      cssPath = ['/assets/styles/styles.css','/assets/styles/pacientes/pacientes-4201.component.css'];
    } else {
      this.isPortGolden = false;
      cssPath = ['/assets/styles/styles.css','/assets/styles/pacientes/pacientes-4200.component.css'];
    }

    cssPath.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data: Usuari[]) => {
        this.usuarios = data;
        this.totalItems = data.length;
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios', error);
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
    this.dataSource.data = this.usuarios.slice(startIndex, endIndex);
  }

  // Mostrar el formulario para actualizar usuario
  toggleActualizarUsuario(usuario: Usuari): void {
    this.usuarioSeleccionado = { ...usuario };
    this.dialog
      .open(DialogUsuarioComponent, {
        data: this.usuarioSeleccionado,
      })
      .afterClosed()
      .subscribe((usuarioActualizado) => {
        if (usuarioActualizado) {
          this.usuarioSeleccionado = usuarioActualizado;
          this.actualizarUsuario();
        }
      });
  }

  toggleFormularioAgregar(): void {
    this.nuevoUsuario = {
      id: 0,
      username: '',
      password: '',
      email: '',
      rolId: '',
      imagen: '',
    };
    this.dialog
      .open(DialogUsuarioComponent, {
        data: this.nuevoUsuario,
      })
      .afterClosed()
      .subscribe((usuarioCreado) => {
        if (usuarioCreado) {
          this.nuevoUsuario = usuarioCreado;
          this.guardarUsuario();
        }
      });
  }

  cerrarFormulario(): void {
    this.usuarioSeleccionado = null;
  }

  // Eliminar usuario
  borrarUsuario(id: string): void {
    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.obtenerUsuarios(); // Refrescar la tabla tras borrar
        this.snackbar.showNotification(
          'success',
          'Usuario eliminado correctamente'
        ); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al eliminar el usuario', error);
        this.snackbar.showNotification(
          'error',
          'Error al eliminar el usuario'
        ); // Notificación de error
      },
    });
  }

  // Guardar un nuevo usuario
  guardarUsuario(): void {
    this.usuarioService.post(this.nuevoUsuario).subscribe({
      next: () => {
        this.obtenerUsuarios();
        this.cerrarFormulario();
        this.snackbar.showNotification(
          'success',
          'Usuario guardado exitosamente'
        ); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al guardar el usuario', error);
        this.snackbar.showNotification('error', 'Error al guardar el usuario'); // Notificación de error
      },
    });
  }

  actualizarUsuario(): void {
    console.log(this.usuarioSeleccionado); // Para verificar que usuarioSeleccionado no sea null o undefined
    if (this.usuarioSeleccionado) {
      this.usuarioService
        .put( String(this.usuarioSeleccionado.id) , this.usuarioSeleccionado)
        .subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.cerrarFormulario();
            this.snackbar.showNotification(
              'success',
              'Usuario actualizado correctamente'
            ); // Notificación de éxito
          },
          error: (error: any) => {
            console.error('Error al actualizar el usuario', error);
            this.snackbar.showNotification(
              'error',
              'Error al actualizar el usuario'
            ); // Notificación de error
          },
        });
    } else {
      console.error('usuarioSeleccionado no es válido');
    }
  }

  filtrarUsuarios(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Usuari, filter: string) => {
      switch (type) {
        case 'id':
          return data.id.toString().includes(filter);

        case 'username':
          return data.username?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        case 'email':
          return data.email?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        case 'rolId':
          return data.rolId?.toLowerCase().includes(filter.toLowerCase()) ?? false;

        default:
          return false;
      }
    };
    this.dataSource.filter = searchterm;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

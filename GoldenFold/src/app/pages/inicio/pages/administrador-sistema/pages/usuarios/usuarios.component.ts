import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from '../../../../../../interface/rol.interface';
import { RoleService } from '../../../../../../services/role.service';
import { UsuarioService } from '../../../../../../services/usuario.service';
import { Personal } from '../../../../../../interface/personal.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserValidators } from '../../../../../../validators/usuarios.validators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;  // Referencia al snackbar

  //tabla Angular Material
  usuarios: MatTableDataSource<Personal> = new MatTableDataSource<Personal>();

  //columnas que se mostraran en la tabla
  displayedColumns: string[] = ['dni','nom'];

  //paginador y ordenador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //formularios reactivos
  usuarioForm!: FormGroup;
  buscarUsuario!: FormGroup;
  usuarioParaActualizar: Personal | null = null;

  //propiedades utiles
  roles: Rol[] = [];

  constructor(private rolService: RoleService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.crearFormularioUsuario()
  }

  crearFormularioUsuario(): void {
    this.usuarioForm = new FormGroup({
      IdUsuario: new FormControl({ value: '', disabled: true }),
      Nombre: new FormControl('',[UserValidators.noWhitespaceValidator(),Validators.pattern(' *[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.]+)+ *')]) //no puede estar en blanco y tiene que tener minimo 2 palabras

    });

  }

  // configurarValidaciones(): void{
  //   if(!this.usuarioParaActualizar){
  //     this.usuarioForm.get('NombreUsuario')?.setAsyncValidators(UserValidators.asyncFieldExisting(this.usuarioService));
  //   }
  //   else{
  //     this.usuarioForm.get('NombreUsuario')?.clearAsyncValidators();
  //   }
  //   this.usuarioForm.get('NombreUsuario')?.updateValueAndValidity();
  // }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuario: Personal[]) => {
        this.usuarios.data = usuario;
        this.usuarios.paginator = this.paginator;
        this.usuarios.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios', error);
      },
    });
  }

  obtenerRoles(): void {
    // Este método simplemente llama al servicio
    this.rolService.getRoles().subscribe({
      next: (data: Rol[]) => {
        this.roles = data; // Asignar los roles a la variable roles
      },
      error: (error: any) => {
        console.error('Error al cargar los roles', error);
      },
    });
  }

  filtrarUsuarios(event: { type: string;term:string}): void {
    const {term } = event;

    //aplica el filtro a la tabla
    this.usuarios.filter = term.trim().toLowerCase();

    if(this.usuarios.paginator){
      this.usuarios.paginator.firstPage();
    }
  }

  agregarUsuario(): void {
    if(this.usuarioForm.valid) {
      const nuevoUsuario: Personal = this.usuarioForm.value; // Obtener los datos del formulario
      this.usuarioService.addUsuario(nuevoUsuario).subscribe({
        next: (usuario: Personal) => {
          this.usuarios.data = [...this.usuarios.data,usuario];
          this.usuarioForm.reset(); //despues de agregarlo, reseteas el formulario
          alert('Usuario creado con exito');
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError); // Notificación de error
        },
      });
    } else {
      this.snackbar.showNotification('error', 'Por favor, completa todos los campos requeridos.'); // Notificación de error de validación
    }
  }


  toggleActualizarUsuario(usuario: Personal): void {
    if (
      this.usuarioParaActualizar &&
      this.usuarioParaActualizar.dni === usuario.dni
    ) {
      this.usuarioParaActualizar = null;
      this.usuarioForm.reset();
    } else {
      this.usuarioParaActualizar = { ...usuario };
      this.usuarioForm.patchValue(this.usuarioParaActualizar); //rellenar el formulario con los datos del usuario
    }
  }

  actualizarUsuario(): void {
    if (this.usuarioParaActualizar) {
      const usuarioActualizado: Personal = { ...this.usuarioParaActualizar, ...this.usuarioForm.value };

      this.usuarioService.updateUsuario(usuarioActualizado).subscribe({
        next: () => {
          this.obtenerUsuarios(); // Refrescar la lista de usuarios
          this.usuarioParaActualizar = null;
          this.usuarioForm.reset(); // Resetear el formulario
          this.snackbar.showNotification('success', 'Usuario actualizado con éxito'); // Notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar el usuario', error);
          this.snackbar.showNotification('error', 'Error al actualizar el usuario. Por favor, inténtelo de nuevo.'); // Notificación de error
        },
      });
    }
  }


  borrarUsuario(idUsuario: number): void {
    this.usuarioService.deleteUsuario(idUsuario).subscribe({
      next: () => {
        this.obtenerUsuarios(); // Refrescar la lista de usuarios
        this.snackbar.showNotification('success', 'Usuario eliminado con éxito'); // Notificación de éxito
      },
      error: (error: any) => {
        console.error('Error al eliminar el usuario', error);
        this.snackbar.showNotification('error', 'Error al eliminar el usuario. Por favor, inténtelo de nuevo.'); // Notificación de error
      },
    });
  }


  resetUsuario(): Personal {
    return {
      dni: 0,
      especialitat: '',
      nom: '',
      consultes: ['']
    };
  }

  cancelarNuevoUsuario(): void {
    this.usuarioForm.reset(); // Resetea los campos
  }

  cancelarActualizarUsuario(): void {
    this.usuarioParaActualizar = null; // Oculta el formulario y resetea los datos
    this.usuarioForm.reset();
  }
}

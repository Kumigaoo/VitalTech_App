import { AdministradorSistemaService } from '../../services/administrador-sistema.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarComponent } from '../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';
import { AdministradorSistema } from '../../interfaces/administrador-sistema.interface';
import { obtenerNombreUsuario, obtenerUsuariosDisponibles } from '../../utils/utilFunctions';
import { Usuari } from '../../interfaces/usuari.interface';
import { UsuarioService } from '../../services/usuario.service';
import { DialogFormularioAdministradorSistemaModifComponent } from '../../forms/AdministradorSistema/dialog-formulario-administradorSistema-modif.component';
import { dniValidator } from '../../validators/dniValidator';
@Component({
  selector: 'app-administradores-sistema',
  templateUrl: './administradores-sistema.component.html',
  styleUrls: [],
})
export class AdministradoresSistemaComponent {
  displayedColumns: string[] = [
    'dni',
    'nom',
    'telefon',
    'usuariId',
    'prioridad',
    'actions',
  ];
  administradores: MatTableDataSource<AdministradorSistema> = new MatTableDataSource<AdministradorSistema>();
  usuarios: MatTableDataSource<Usuari> = new MatTableDataSource<Usuari>([]);
  usuariosDisponibles: MatTableDataSource<Usuari> = new MatTableDataSource<Usuari>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  administradorSistemaForm!: FormGroup;
  administradorSistemaParaActualizar: AdministradorSistema | null = null;

  //puerto actual
  currentPort!: string;
  //booleano para facilitar legibilidad
  isPortGolden!: boolean;
  //csspaths
  cssPaths!: string[];

  constructor(
    private administradorSistemaService: AdministradorSistemaService,
     private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    //cambiar html
    this.currentPort = window.location.port;
    this.isPortGolden = this.currentPort==="4201";

    //cambiar css
    if (this.isPortGolden) {
      //css golden
      this.cssPaths = ['/assets/styles/styles.css','/assets/styles/AdministradorSistema/4001.component.css'];
    } else {
      //css vital
      this.cssPaths = ['/assets/styles/styles.css','/assets/styles/AdministradorSistema/4000.component.css'];
    }

    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
    this.obtenerAdministradoresDeSistema();
    this.obtenerUsuarios();
    this.crearFormularioAdministradorDeSistema();
  }

  obtenerAdministradoresDeSistema(): void {
    this.administradorSistemaService.getAll().subscribe({
      next: (data: AdministradorSistema[]) => {
        this.administradores.data = data;
        this.administradores.sort = this.sort;
        this.administradores.paginator = this.paginator;
        this.getUsuariosDisponibles();
      },
      error: (error: any) => {
        console.log('ERROR:', error);
      },
    });
  }

  obtenerUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data: Usuari[]) => {
        this.usuarios.data = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  crearFormularioAdministradorDeSistema(): void {
    this.administradorSistemaForm = this.fb.group({ //lo crear con el form builder
      dni: [ //campo dni
        {
          validators: [Validators.required,dniValidator()], //comprueba que el dni sea valido
          asyncValidators: [], //comprueba que no exista un administrador de sistema con ese dni
        }
      ],
      nom: [
        {
          validators:[Validators.required],
        }
      ],
      telefon: [
        {
          validators:[Validators.pattern('^[^a-zA-Z]*$')], //comprueba que no hayan letras 
        }
      ],
      usuariId: [
        {
          validators:[Validators.required]
        }
      ],
      prioridad: [
        {
          validators:[Validators.required] 
        }
      ],
    });
  }

  eliminarAdministradorSistema(administrador: AdministradorSistema): void {
    this.administradorSistemaService.delete(administrador.dni).subscribe({
      next: () => {
        this.obtenerAdministradoresDeSistema();
        this.snackbar.showNotification(
          'success',
          'Administrador de sistema eliminado correctamente'
        );
      },
      error: (error: any) => {
        console.log('ERR0R', error);
      },
    });
  }

  filtrarAdministradoresDeSistema(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchTerm = term.trim().toLowerCase();

    this.administradores.filterPredicate = (
      data: AdministradorSistema,
      filter: string
    ) => {
      switch (type) {
        case 'dni':
          return data.dni.toString().toLowerCase().includes(filter);
        case 'nom':
          return data.nom.toString().toLowerCase().includes(filter);
        case 'usuariId':
          return data.usuariId.toString().toLowerCase().includes(filter);
        case 'telefon':
          return data.telefon.toString().toLowerCase().includes(filter);
        case 'prioridad':
          return data.prioridad.toString().toLowerCase().includes(filter);
        default:
          return false;
      }
    };
    this.administradores.filter = searchTerm;
    if (this.administradores.paginator) {
      this.administradores.paginator.firstPage();
    }
  }

  getUserName(id: number,users: MatTableDataSource<Usuari>): string | null {
    return obtenerNombreUsuario(id,users);
  }

  toggleAgregarAdministradorSistema(): void {
    this.crearFormularioAdministradorDeSistema();
    if(this.checkNoUsuarios()){
      this.snackbar.showNotification('error','No hay usuarios disponibles');
      return;
    } 
    this.dialog.open(DialogFormularioAdministradorSistemaModifComponent,{
      data: this.administradorSistemaForm
    }).afterClosed().subscribe((administradorActualizado)=>{
      if(administradorActualizado){
        this.administradorSistemaForm.patchValue(administradorActualizado);
        this.aregarAdministradorSistema();
      }
    })
  }

  toggleActualizarAdministradorSistema(administrador: AdministradorSistema): void {
    this.administradorSistemaParaActualizar = {...administrador}
    this.dialog.open(DialogFormularioAdministradorSistemaModifComponent,{
      data: this.administradorSistemaParaActualizar
    }).afterClosed().subscribe((administradorActualizado)=>{
      if(administradorActualizado){
        this.administradorSistemaParaActualizar = administradorActualizado;
        this.actualizarAdministradorSistema(administrador.dni);
      }
    })
  }

  actualizarAdministradorSistema(dniAntiguo: string): void {
    if (this.administradorSistemaParaActualizar) {
      const administradorActualizado = { ...this.administradorSistemaParaActualizar };
      this.administradorSistemaService.put(dniAntiguo, administradorActualizado).subscribe({
        next: () => {
          this.obtenerAdministradoresDeSistema();
          this.administradorSistemaParaActualizar = null;
          this.administradorSistemaForm.reset();
          this.snackbar.showNotification(
            'success',
            'Administrador de Sistema actualizado correctamente'
          ); // Notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar el Administrador de Sistema', error);
        },
      });
    }
  }

  aregarAdministradorSistema(): void {
    if (this.administradorSistemaForm.valid) {
      const nuevoAdministrador: AdministradorSistema = this.administradorSistemaForm.value;
      console.log('B');
      this.administradorSistemaService.post(nuevoAdministrador).subscribe({
        next: (administrador: AdministradorSistema) => {
          console.log(2);
          this.administradores.data = [...this.administradores.data, administrador];
          this.obtenerAdministradoresDeSistema();
          this.administradorSistemaForm.reset();
          this.snackbar.showNotification('success', 'Administrador de sistema creado con exito'); // Notificación de éxito
        },
        error: (error: any) => {
          console.log(3);
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError); // Notificación de éxito
        },
      });
    }
  }

  //metodo para obtener los usuariosDisponibles
  getUsuariosDisponibles(): void {
    obtenerUsuariosDisponibles("Administrador del Sistema",this.administradores.data,this.usuarioService).subscribe({
      next:(usuariosDisponibles: Usuari[]) => {
        this.usuariosDisponibles.data = usuariosDisponibles;
      },
      error:(error:any)=>{
        console.log('Error al obtener los usuarios disponibles:',error);
      }
    })
  }

  //verificar disponibilidad de usuarios
  checkNoUsuarios(): boolean{
    if(this.usuariosDisponibles.data.length<=0){
      return true;
    }
    return false;
  }
}

import { DialogFormularioAdministrativoModifComponent } from '../../forms/Administrativo/dialog-formulario-administrativo-modif.component';
import { UsuarioService } from '../../services/usuario.service';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarComponent } from '../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { MatSort } from '@angular/material/sort';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrativo } from '../../interfaces/administrativo.interface';
import { AdministrativoService } from '../../services/administrativo.service';
import { MatDialog } from '@angular/material/dialog';
//habrá que hacer un administrativoDashboard...etc?
import { obtenerUsuariosDisponibles } from '../../utils/utilFunctions';
import { Usuari } from '../../interfaces/usuari.interface';
import { obtenerNombreUsuario } from '../../utils/utilFunctions';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: [],
})
export class AdministrativoComponent {
  //columnas a mostrar
  displayedColumns: string[] = [
    'dni',
    'nom',
    'usuariId',
    'telefon',
    'hobby',
    'Actions',
  ];
  administrativos: MatTableDataSource<Administrativo> = new MatTableDataSource<Administrativo>([]);
  usuarios: MatTableDataSource<Usuari> = new MatTableDataSource<Usuari>([]);
  usuariosDisponibles: MatTableDataSource<Usuari> = new MatTableDataSource<Usuari>([]);

  currentPort: string;
  isPortGolden: boolean;

  //paginator, ordenador y snackbar(para las notificaciones)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  //formularios reactivos
  administrativoForm!: FormGroup;
  administrativoParaActualizar: Administrativo | null = null;

  templateUrl!: string
  styleUrls!: string[]
  cssPaths!: string[];

  constructor(
    private administrativoService: AdministrativoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    //cambiar html
    this.currentPort = window.location.port;
    this.isPortGolden = this.currentPort==="4201"; //4201

    //cambiar css
    if (this.isPortGolden) { 
      //css golden
      this.cssPaths = ['/assets/styles/styles.css','/assets/styles/Administrativo/4001.component.css'];
    } else {
      //css vital
      this.cssPaths = ['/assets/styles/styles.css','/assets/styles/Administrativo/4000.component.css'];
    }
 
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

    this.obtenerUsuarios();
    this.crearFormularioAdministrativo();
  }


  ngAfterViewInit(): void {
    this.administrativos.paginator = this.paginator;
    this.administrativos.sort = this.sort;
  }

  //metodo para obtener administrativos:
  obtenerAdministrativos(): void {
    this.administrativoService.getAll().subscribe({
      next: (data: Administrativo[]) => {
        this.administrativos.data = data;
        this.getUsuariosDisponibles();
      },
      error: (error: any) => {
        console.error('Error al obtener los administrativos', error);
      },
    });
  }

  //crear el formulario reactivo
  crearFormularioAdministrativo(): void {
    this.administrativoForm = this.fb.group({
      dni: ['', Validators.required],
      nom: ['', Validators.required],
      telefon: [0],
      usuariId: [0, Validators.required],
      hobby: [''],
    });
  }

  agregarAdministrativo(): void {
    if (this.administrativoForm.valid) {
      const nuevoAdministrativo: Administrativo = this.administrativoForm.value;
      this.administrativoService.post(nuevoAdministrativo).subscribe({
        next: (administrativo: Administrativo) => {
          this.administrativos.data = [...this.administrativos.data, administrativo];
          this.obtenerAdministrativos();
          this.administrativoForm.reset();
          this.snackbar.showNotification('success', 'Administrativo creado con éxito'); // Notificación de éxito
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError); // Notificación de éxito
        },
      });
    }
  }

  actualizarAdministrativo(dniAntiguo: string): void {
    if (this.administrativoParaActualizar) {
      const administrativoActualizado = { ...this.administrativoParaActualizar };
      this.administrativoService.put(dniAntiguo, administrativoActualizado).subscribe({
        next: () => {
          this.obtenerAdministrativos();
          this.administrativoParaActualizar = null;
          this.administrativoForm.reset();
          this.snackbar.showNotification(
            'success',
            'Administrativo actualizado correctamente'
          ); // Notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar el administrativo', error);
        },
      });
    }
  }

  tooggleAgregarAdministrativo(): void {
    this.crearFormularioAdministrativo();
    if(this.checkNoUsuarios()){
      this.snackbar.showNotification('error','No hay usuarios disponibles');
      return;
    } 
    this.dialog
      .open(DialogFormularioAdministrativoModifComponent, {
        data: this.administrativoForm,
      })
      .afterClosed()
      .subscribe((administrativoActualizado) => {
        if (administrativoActualizado) {
          this.administrativoForm.patchValue(administrativoActualizado);
          console.log(this.administrativoForm.value);
          this.agregarAdministrativo();
        }
      });
  }

  tooggleActualizarAdministrativo(administrativo: Administrativo): void {
    this.administrativoParaActualizar = { ...administrativo };
    this.dialog
      .open(DialogFormularioAdministrativoModifComponent, {
        data: this.administrativoParaActualizar,
      })
      .afterClosed()
      .subscribe((administrativoActualizado) => {
        if (administrativoActualizado) {
          this.administrativoParaActualizar = administrativoActualizado;
          this.actualizarAdministrativo(administrativo.dni);
        }
      });
  }

  filtrarAdministrativos(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();

    this.administrativos.filterPredicate = (data: Administrativo, filter: string) => {
      switch (type) {
        case 'dni':
          return data.dni.toString().toLowerCase().includes(filter);
        case 'nom':
          return data.nom.toString().toLowerCase().includes(filter);
        case 'usuariId':
          return data.usuariId.toString().toLowerCase().includes(filter);
        case 'telefon':
          return data.telefon.toString().toLowerCase().includes(filter);
        case 'hobby':
          return data.hobby.toString().toLowerCase().includes(filter);
        default:
          return false;
      }
    };
    this.administrativos.filter = searchterm;

    if (this.administrativos.paginator) {
      this.administrativos.paginator.firstPage();
    }
  }

  borrarAdministrativo(dni: string): void {
    this.administrativoService.delete(dni).subscribe({
      next: () => {
        this.administrativos.data = this.administrativos.data.filter((i) => i.dni != dni);
        this.snackbar.showNotification(
          'success',
          'Administrativo eliminado correctamente'
        ); // Notificación de éxito
        this.getUsuariosDisponibles();
      },
      error: (error: any) => {
        console.log('ERROR', error);
      },
    });
  }

  obtenerUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data: Usuari[]) => {
        this.usuarios.data = data;
        this.obtenerAdministrativos();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getUsuariosDisponibles(): void {
    obtenerUsuariosDisponibles("Administratiu",this.administrativos.data,this.usuarioService).subscribe({
      next:(usuariosDisponibles: Usuari[]) => {
        this.usuariosDisponibles.data = usuariosDisponibles;
      },
      error:(error:any)=>{
        console.log('Error al obtener los usuarios disponibles:',error);
      }
    })
  }

  checkNoUsuarios(): boolean{
    if(this.usuariosDisponibles.data.length<=0){
      return true;
    }
    return false;
  }

  getUserName(id: number,users: MatTableDataSource<Usuari>): string | null {
    return obtenerNombreUsuario(id,users);
  }
}

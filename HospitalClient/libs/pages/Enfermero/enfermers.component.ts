// enfermers.component.ts
import { DialogFormularioEnfermeroModifComponent } from './pages/popaps/dialog-formulario-ingreso-modif/dialog-formulario-enfermero-modif.component';
import { PruebasDialogComponent } from './../../../apps/GoldenFold/src/app/components/popups/pruebas-popup';
import { EnfermeroService } from './../../services/enfermero.service';
import { SnackbarComponent } from './../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { Enfermero } from './../../interfaces/enfermer.interface';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usuari } from '../../interfaces/usuari.interface';
import { obtenerUsuariosDisponibles } from '../../utils/utilFunctions';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-enfermers',
  templateUrl: './enfermers.component.html',
  styleUrls: [],
})
export class EnfermersComponent {
  displayedColumns: string[] = [
    'dni',
    'nom',
    'telefon',
    'usuariId',
    'especialitat',
    'pruebasDiagnosticas',
    'Actions',
  ];

  enfermeros: MatTableDataSource<Enfermero> = new MatTableDataSource<Enfermero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  enfermeroForm!: FormGroup;
  enfermeroParaActualizar: Enfermero | null = null;
  usuariosDisponibles!: Usuari[]; 

  currentPort: string;
  isPortGolden: boolean;
  cssPaths!: string[];

  constructor(
    private enfermeroService: EnfermeroService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private usuarioService: UsuarioService
  ) {
    this.obtenerEnfermeros();
    this.crearFormularioEnfermero();

    this.currentPort = window.location.port;
    this.isPortGolden = this.currentPort === '4201';

    this.cssPaths = this.isPortGolden
      ? ['/assets/styles/styles.css', '/assets/styles/enfermero/4001.component.css']
      : ['/assets/styles/styles.css', '/assets/styles/enfermero/4000.component.css'];

    this.cargarEstilosDinamicos();
  }

  ngAfterViewInit(): void {
    this.enfermeros.paginator = this.paginator;
    this.enfermeros.sort = this.sort;
  }

  private cargarEstilosDinamicos(): void {
    this.cssPaths.forEach((css) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
  }

  obtenerEnfermeros(): void {
    this.enfermeroService.getAll().subscribe({
      next: (data: Enfermero[]) => {
        this.enfermeros.data = data;
        this.getUsuariosDisponibles();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  //verificar disponibilidad de usuarios
  checkNoUsuarios(): boolean{
    if(this.usuariosDisponibles.length<=0){
      return true;
    }
    return false;
  }

  crearFormularioEnfermero(): void {
    this.enfermeroForm = this.fb.group({
      dni: ['', Validators.required],
      nom: ['', Validators.required],
      telefon: [0],
      usuariId: ['', Validators.required],
      especialitat: ['', Validators.required],
    });
  }

  deleteEnfermero(enfermero: Enfermero): void {
    this.enfermeroService.delete(enfermero.dni).subscribe({
      next: () => {
        this.enfermeros.data = this.enfermeros.data.filter((i) => i.dni !== enfermero.dni);
        this.getUsuariosDisponibles();
        this.snackbar.showNotification('success', 'Enfermero eliminado correctamente');
      },
      error: (error: any) => {
        console.error('Error eliminando enfermero:', error);
      },
    });
  }

  filtrarEnfermeros(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchTerm = term.trim().toLowerCase();

    this.enfermeros.filterPredicate = (data: Enfermero, filter: string) => {
      switch (type) {
        case 'dni':
          return data.dni.toString().toLowerCase().includes(filter);
        case 'nom':
          return data.nom.toLowerCase().includes(filter);
        case 'usuariId':
          return data.usuariId.toLowerCase().includes(filter);
        case 'telefon':
          return data.telefon.toString().toLowerCase().includes(filter);
        case 'especialitat':
          return data.especialitat.toLowerCase().includes(filter);
        default:
          return false;
      }
    };

    this.enfermeros.filter = searchTerm;

    if (this.enfermeros.paginator) {
      this.enfermeros.paginator.firstPage();
    }
  }

  tooggleAgregarEnfermero(): void {
    if(this.checkNoUsuarios()){
       this.snackbar.showNotification('error','No hay usuarios disponibles');
       return;
    }
    this.crearFormularioEnfermero();
    this.dialog
      .open(DialogFormularioEnfermeroModifComponent, {
        data: this.enfermeroForm,
      })
      .afterClosed()
      .subscribe((enfermeroActualizado) => {
        if (enfermeroActualizado) {
          this.enfermeroForm.patchValue(enfermeroActualizado);
          this.agregarEnfermero();
        }
      });
  }

  agregarEnfermero(): void {
    if (this.enfermeroForm.valid) {
      const nuevoEnfermero: Enfermero = this.enfermeroForm.value;
      this.enfermeroService.post(nuevoEnfermero).subscribe({
        next: (enfermero: Enfermero) => {
          this.enfermeros.data = [...this.enfermeros.data, enfermero];
          this.enfermeroForm.reset();
          this.obtenerEnfermeros();
          this.snackbar.showNotification('success', 'Enfermero creado correctamente');
        },
        error: (error: any) => {
          const mensajeError = error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError);
        },
      });
    }
  }

  actualizarEnfermero(dniAntiguo: string): void {
    if (this.enfermeroParaActualizar) {
      const enfermeroActualizado = { ...this.enfermeroParaActualizar };
      this.enfermeroService.put(dniAntiguo, enfermeroActualizado).subscribe({
        next: () => {
          this.obtenerEnfermeros();
          this.enfermeroParaActualizar = null;
          this.enfermeroForm.reset();
          this.snackbar.showNotification('success', 'Enfermero actualizado correctamente');
        },
        error: (error: any) => {
          console.error('Error al actualizar el enfermero:', error);
        },
      });
    }
  }

  getUsuariosDisponibles(): void {
    obtenerUsuariosDisponibles("Enfermer",this.enfermeros.data,this.usuarioService).subscribe({
      next:(usuariosDisponibles: Usuari[]) => {
        this.usuariosDisponibles = usuariosDisponibles;
        console.log('USUARIOSS',this.usuariosDisponibles);
      },
      error:(error:any)=>{
        console.log('Error al obtener los usuarios disponibles:',error);
      }
    })
  }

  toogleActualizarEnfermero(enfermero: Enfermero): void {
    this.enfermeroParaActualizar = { ...enfermero };
    this.dialog
      .open(DialogFormularioEnfermeroModifComponent, { data: this.enfermeroParaActualizar })
      .afterClosed()
      .subscribe((enfermeroActualizado) => {
        if (enfermeroActualizado) {
          this.enfermeroParaActualizar = enfermeroActualizado;
          this.actualizarEnfermero(enfermero.dni);
        }
      });
  }

  verPruebasDiagnosticas(enfermero: Enfermero): void {
    this.dialog.open(PruebasDialogComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      data: enfermero.pruebasDiagnosticas,
    });
  }
}

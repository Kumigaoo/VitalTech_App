import { PruebasDialogComponent } from './../../../apps/GoldenFold/src/app/components/popups/pruebas-popup';
import { DialogFormularioEnfermeroModifComponent } from './../../../apps/GoldenFold/src/app/components/Formularios/Enfermero/dialog-formulario-ingreso-modif/dialog-formulario-enfermero-modif.component';
import { EnfermeroService } from './../../services/enfermero.service';
import { SnackbarComponent } from './../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { Enfermero } from './../../interfaces/enfermer.interface';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';


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

  enfermeros: MatTableDataSource<Enfermero> =
    new MatTableDataSource<Enfermero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  enfermeroForm!: FormGroup;
  enfermeroParaActualizar: Enfermero | null = null;

  currentPort: string;
  isPortGolden: boolean;

  templateUrl!: string;
  styleUrls!: string[];
  cssPaths!: string[];

  constructor(
    private enfermeroService: EnfermeroService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.obtenerEnfermeros();
    this.crearFormularioEnfermero();

    //cambiar html
    this.currentPort = window.location.port;
    this.isPortGolden = this.currentPort === "4201"; //4201

    //cambiar css
    if (this.isPortGolden) {
      //css golden
      this.cssPaths = ['/assets/styles/styles.css', '../../../public/assets/styles/Enfermero/4001.component.css'];
    } else {
      //css vital
      this.cssPaths = ['/assets/styles/styles.css', '../../../public/assets/styles/Enfermero/4000.component.css'];
    };

    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

  }

  ngAfterViewInit(): void {
    this.enfermeros.paginator = this.paginator;
    this.enfermeros.sort = this.sort;
  }

  obtenerEnfermeros(): void {
    this.enfermeroService.getAll().subscribe({
      next: (data: Enfermero[]) => {
        this.enfermeros.data = data;
        console.log(this.enfermeros.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
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
        this.enfermeros.data = this.enfermeros.data.filter(
          (i) => i.dni != enfermero.dni
        );
        this.snackbar.showNotification(
          'success',
          'Enfermero eliminado correctamente'
        ); // Notificación de éxito
      },
      error: (error: any) => {
        console.log('ERROR', error);
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
          return data.nom.toString().toLowerCase().includes(filter);
        case 'usuariId':
          return data.usuariId.toString().toLowerCase().includes(filter);
        case 'telefon':
          return data.telefon.toString().toLowerCase().includes(filter);
        case 'especialitat':
          return data.especialitat.toString().toLowerCase().includes(filter);
        default:
          return false;
      }
    };
    this.enfermeros.filter = searchTerm;

    if (this.enfermeros.paginator) {
      this.enfermeros.paginator.firstPage();
    }
  }

  agregarEnfermero(): void {
    if (this.enfermeroForm.valid) {
      const nuevoEnfermero: Enfermero = this.enfermeroForm.value;
      console.log(nuevoEnfermero);
      this.enfermeroService.post(nuevoEnfermero).subscribe({
        next: (enfermero: Enfermero) => {
          console.log('Enfermero:', enfermero);
          this.enfermeros.data = [...this.enfermeros.data, enfermero];
          this.obtenerEnfermeros();
          this.enfermeroForm.reset();
          this.snackbar.showNotification(
            'success',
            'Enfermero creado correctamente'
          );
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          this.snackbar.showNotification('error', mensajeError); // Notificación de éxito
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
          this.snackbar.showNotification(
            'success',
            'Enfermero actualizado correctamente'
          );
        },
        error: (error: any) => {
          console.log('Error al actualizar el enfermero', error);
        },
      });
    }
  };

  tooggleAgregarEnfermero(): void {
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

  toogleActualizarEnfermero(enfermero: Enfermero): void {
    this.enfermeroParaActualizar = { ...enfermero };
    this.dialog
      .open(DialogFormularioEnfermeroModifComponent, {
        data: this.enfermeroParaActualizar,
      })
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

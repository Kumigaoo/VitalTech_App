import { UsuarioService } from '../../services/usuario.service';
import { Usuari } from '../../interfaces/usuari.interface';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Ingreso } from '../../interfaces/ingreso.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../interfaces/episodis-medics.interface';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Cama } from '../../interfaces/cama.interface';
import { CommonModule, NumberFormatStyle } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomDateAdapter } from '../../../apps/GoldenFold/src/app/custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  dataInici,
  dataIniciFinalValidator,
} from '../../validators/ingresos.validators';
import { Administrativo } from '../../interfaces/administrativo.interface';
import { AdministrativoService } from '../../services/administrativo.service';
import { dniValidator } from '../../validators/dniValidator';
import { map } from 'rxjs';
import { dniExisteValidator } from '../../validators/dniExistsValidatos';
import { obtenerUsuariosDisponibles } from '../../utils/utilFunctions';

@Component({
  selector: 'app-dialog-formulario-administrativo-modif',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-formulario-administrativo-modif.component.html',
  styleUrls: [],
})
export class DialogFormularioAdministrativoModifComponent implements OnInit {
  isEditing: boolean = true; // Variable para controlar el modo
  administrativoForm!: FormGroup;
  usuaris!: Usuari[];
  administrativos!: Administrativo[];
  
  usuarioIdsAdministrativos = new Set('');
  cssPaths!: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Administrativo,
    private administrativoService: AdministrativoService,
    public dialogRef: MatDialogRef<DialogFormularioAdministrativoModifComponent>,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.obtenerAdministrativos();
  }

  ngOnInit(): void {
    this.cssPaths =  ['/assets/styles/styles.css','/assets/styles/Administrativo/Popups/dialog-formulario-administrativo-modif.component.css'];
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
    this.crearFormularioAdministrativo();
    if (this.data.dni) {
      this.showDetails();
    }
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    if (this.administrativoForm.valid) {
      const administrativoActualizado: Administrativo = {
        ...this.data,
        ...this.administrativoForm.value,
      };
      administrativoActualizado.telefon = administrativoActualizado.telefon.toString().trim();
      administrativoActualizado.dni = administrativoActualizado.dni.toString().trim();
      administrativoActualizado.hobby = administrativoActualizado.hobby.toString().trim();
      administrativoActualizado.nom = administrativoActualizado.nom.toString().trim();
      this.dialogRef.close(administrativoActualizado);
    }
  }

  // Getter para simplificar el acceso al estado de solo lectura
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
    this.administrativoForm.enable();
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
    this.administrativoForm.disable();
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioAdministrativo(): void {
    this.administrativoForm = this.fb.group({
      dni: [
        this.data.dni,
        {
          validators: [dniValidator()],
          asyncValidators: [
            dniExisteValidator(this.administrativoService, this.data.dni),
          ],
          updateOn: 'blur',
        },
      ],
      nom: [this.data.nom],
      telefon: [this.data.telefon, [Validators.pattern('^[^a-zA-Z]*$')]],
      usuariId: [
        this.data.usuariId,
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'blur',
        },
      ],
      hobby: [this.data.hobby],
    });
    console.log(this.administrativoForm.value);
  }

  obtenerAdministrativos(): void {
    this.administrativoService.getAll().subscribe({
      next: (data: Administrativo[]) => {
        this.administrativos = data;
        this.getUsuariosDisponibles();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

    getUsuariosDisponibles(): void {
      obtenerUsuariosDisponibles("Administratiu",this.administrativos,this.usuarioService).subscribe({
        next:(usuariosDisponibles: Usuari[]) => {
          this.usuaris = usuariosDisponibles;
        },
        error:(error:any)=>{
          console.log('Error al obtener los usuarios disponibles:',error);
        }
      })
    }
}

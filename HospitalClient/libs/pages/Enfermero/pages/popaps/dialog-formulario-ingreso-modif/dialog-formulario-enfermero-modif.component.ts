import { EspecialidadesEnfermero } from '../../../../../enums/especialidadesEnfermero';
import { EnfermeroAsyncValidator } from '../../../../../validators/enfermeroExistsValidator';
import { UsuarioService } from './../../../../../services/usuario.service';
import { EnfermeroService } from '../../../../../services/enfermero.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Usuari } from '../../../../../interfaces/usuari.interface';
import { dniValidator } from '../../../../../validators/dniValidator';
import { map } from 'rxjs';
import { Enfermero } from '../../../../../interfaces/enfermer.interface';
import { dniExisteValidator } from '../../../../../validators/dniExistsValidatos';
import { obtenerUsuariosDisponibles } from '../../../../../utils/utilFunctions';

@Component({
  selector: 'app-dialog-formulario-enfermero-modif',
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
  templateUrl: './dialog-formulario-enfermero-modif.component.html',
  styleUrls: ['./dialog-formulario-enfermero-modif.component.css'],
})
export class DialogFormularioEnfermeroModifComponent implements OnInit {
  isEditing: boolean = true; // Variable para controlar el modo
  enfermeroForm!: FormGroup;
  usuaris!: Usuari[];
  enfermeros!: Enfermero[];
  usuarioIdsEnfermeros = new Set('');
  especialidades = Object.entries(EspecialidadesEnfermero)
    .filter(([key, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({ id: value as number, nombre: key }));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Enfermero,
    private enfermeroService: EnfermeroService,
    public dialogRef: MatDialogRef<DialogFormularioEnfermeroModifComponent>,
    private fb: FormBuilder,
    private usuariService: UsuarioService,
    private enfermeroValidator: EnfermeroAsyncValidator
  ) {
    this.obtenerEnfemeros();
  }

  ngOnInit(): void {
    this.crearFormularioEnfermero();
    this.obtenerUsuaris();
    if (this.data.dni) {
      this.showDetails();
    }
  }

  obtenerEnfemeros():void{
    this.enfermeroService.getAll().subscribe({
      next:(data:Enfermero[])=>{
        this.enfermeros = data;
        this.obtenerUsuaris();
      },
      error:(error:any[]) => {
        console.log(error);
      }
    })
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    if (this.enfermeroForm.valid) {
      const enfermeroActualizado: Enfermero = {
        ...this.data,
        ...this.enfermeroForm.value,
      };
      enfermeroActualizado.dni = enfermeroActualizado.dni.toUpperCase();

      enfermeroActualizado.dni.trim();

      enfermeroActualizado.nom.trim();

      enfermeroActualizado.telefon.trim();

      this.dialogRef.close(enfermeroActualizado);
      
    }
  }

  // Getter para simplificar el acceso al estado de solo lectura
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
    this.enfermeroForm.enable();
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
    this.enfermeroForm.disable();
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioEnfermero(): void {
    this.enfermeroForm = this.fb.group({
      dni: [
        this.data.dni,
        {
          validators: [dniValidator()],
          asyncValidators: [
            dniExisteValidator(this.enfermeroService, this.data.dni),
          ],
          updateOn: 'blur',
        },
      ],
      nom: [this.data.nom],
      telefon: [this.data.telefon, [Validators.pattern('^[^a-zA-Z]*$')]],
      usuariId: [
        this.data.usuariId,
        [],
        (control: AbstractControl) => {
          return this.enfermeroValidator.validate(control).pipe(
            map((result) => {
              // solo actua el validador si el usuario lo toca
              return control.touched ? result : null;
            })
          );
        },
      ],
      especialitat: [this.data.especialitat],
    });
  }

  obtenerUsuaris(): void {
  obtenerUsuariosDisponibles("Enfermer",this.enfermeros,this.usuariService).subscribe({
    next:(usuariosDisponibles: Usuari[]) => {
      this.usuaris = usuariosDisponibles;
    },
    error:(error:any)=>{
      console.log('Error al obtener los usuarios disponibles:',error);
    }
  })
}
}

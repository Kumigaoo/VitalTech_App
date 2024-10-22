import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../../../../interface/paciente.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule,  // Necesario para ngModel
    MatFormFieldModule, 
    MatSelectModule,
    MatInputModule, 
    MatOptionModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule // Para el botón "Cancelar" y "Guardar"
    ],
  templateUrl: './dialog-formulario.component.html',
  styleUrls: ['./dialog-formulario.component.css']
})
export class DialogFormularioComponent {

  pacienteForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Paciente, 
    public dialogRef: MatDialogRef<DialogFormularioComponent>,
    private fb: FormBuilder  
  ) {
    // Inicializamos el formulario con los valores del paciente y sus validaciones
    this.pacienteForm = this.fb.group({
      dni: [this.data.dni, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],  // Ejemplo de validación para DNI
      numSS: [this.data.numSS, Validators.required],
      nom: [this.data.nom, Validators.required],
      cognom1: [this.data.cognom1, Validators.required],
      cognom2: [this.data.cognom2],
      sexe: [this.data.sexe, Validators.required],
      birthDay: [this.data.birthDay, Validators.required]
    });
  }
  guardar(): void {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;
      this.dialogRef.close(formData);  
    }
  }

}

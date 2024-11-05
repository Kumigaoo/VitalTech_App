import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-dialog-crear-habitacion',
  templateUrl: './dialog-crear-habitacion.component.html',
  styleUrl: './dialog-crear-habitacion.component.css',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDialogTitle, MatDialogContent, MatDialogClose, MatButton]
})
export class DialogCrearHabitacionComponent {
  //Variables principales de la clase
  habForm: FormGroup;

  constructor(private dialog: MatDialogRef<DialogCrearHabitacionComponent>, private fb: FormBuilder) {
    this.habForm = this.fb.group({
      codiHabitacio: [ ,Validators.required],
      capacitatLlits: [ , Validators.required],
      plantaId: [ , Validators.required],
      llits: [],
    });
  }




  //guardar form
  guardar(): void {
    if (this.habForm.valid) {
      const formData = this.habForm.value;
      formData.codiHabitacio = Number(formData.codiHabitacio);
      formData.capacitatLlits = Number(formData.capacitatLlits);
      formData.plantaId = Number(formData.plantaId);
      formData.llits = [];
      this.dialog.close(formData);
    }
  }
}

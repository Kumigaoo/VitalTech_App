import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { HabitacionService } from '../../../../services/habitacion.service';
import { Inject } from '@angular/core';
import { Habitacion } from '../../../../interface/habitacion.interface';

@Component({
  selector: 'app-dialog-actualizar-habitacion',
  templateUrl: './dialog-actualizar-habitacion.component.html',
  styleUrl: './dialog-actualizar-habitacion.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDialogTitle, MatDialogContent, MatDialogClose, MatButton]

})
export class DialogActualizarHabitacionComponent {
  habForm: FormGroup;
  constructor(private habitacioService: HabitacionService, private dialog: MatDialogRef<DialogActualizarHabitacionComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {habitacion: Habitacion}) {
    this.habForm = this.fb.group({
      codiHabitacio: [data.habitacion.codiHabitacio ,Validators.required],
      capacitatLlits: [data.habitacion.capacitatLlits , Validators.required],
      plantaId: [data.habitacion.plantaId , Validators.required],
      llits: []
    });
  }

  guardar() {
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
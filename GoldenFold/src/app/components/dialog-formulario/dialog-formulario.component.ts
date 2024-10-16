import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../../interface/paciente.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule,  // Necesario para ngModel
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    MatButtonModule // Para el botón "Cancelar" y "Guardar"
    ],
  templateUrl: './dialog-formulario.component.html',
  styleUrls: ['./dialog-formulario.component.css']
})
export class DialogFormularioComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Paciente, 
    public dialogRef: MatDialogRef<DialogFormularioComponent>  
  ) {}

  // Método para manejar el envío del formulario
  guardar(): void {
    this.dialogRef.close(this.data);  
  }
}

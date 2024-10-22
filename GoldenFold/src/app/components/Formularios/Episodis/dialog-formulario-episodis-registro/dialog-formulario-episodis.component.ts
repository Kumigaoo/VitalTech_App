import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Cama } from '../../../../interface/cama.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';

@Component({
  selector: 'app-dialog-formulario-episodis',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule,  // Necesario para ngModel
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    MatButtonModule // Para el botón "Cancelar" y "Guardar"
    ],
  templateUrl: './dialog-formulario-episodis.component.html',
  styleUrls: ['./dialog-formulario-episodis.component.css']
})
export class DialogFormularioEpisodisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EpisodiMedic, 
    public dialogRef: MatDialogRef<DialogFormularioEpisodisComponent>
  ) {
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    this.dialogRef.close(this.data);  
  }
}

import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';

@Component({
  selector: 'app-dialog-formulario-episodis-modif',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule,  // Necesario para ngModel
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    MatButtonModule // Para el botón "Cancelar" y "Guardar"
    ],
  templateUrl: './dialog-formulario-episodis-modif.component.html',
  styleUrls: ['./dialog-formulario-episodis-modif.component.css']
})
export class DialogFormularioEpisodisModifComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EpisodiMedic, 
    public dialogRef: MatDialogRef<DialogFormularioEpisodisModifComponent>
  ) {}

  // Método para manejar el envío del formulario
  guardar(): void {
    this.dialogRef.close(this.data);  
  }
}

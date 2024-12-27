import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PruebaDiagnostica } from '../../../interfaces/pruebas-diagnosticas.interface';

@Component({
  selector: 'app-dialog-formulario-consulta-modif',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, // Necesario para ngModel
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule, // Para el botón "Cancelar" y "Guardar"
  ],
  templateUrl: './dialog-formulario-consulta-modif.component.html',
  styleUrls: [],
})
export class DialogFormularioConsultaModifComponent {
  isEditing: boolean = false; // Variable para controlar el modo
  cssPaths!: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PruebaDiagnostica,
    public dialogRef: MatDialogRef<DialogFormularioConsultaModifComponent>
  ) {
    this.showDetails();
    this.cssPaths =  ['/assets/styles/Pruebas-Diagnosticas/popup/dialog-formulario-consulta.component.css'];
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    this.dialogRef.close(this.data);
  }
  get isReadOnly(): boolean {
    return !this.isEditing;
  }
  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }
}

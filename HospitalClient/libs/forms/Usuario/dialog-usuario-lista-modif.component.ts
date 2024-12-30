import { UsuarioService } from '../../services/usuario.service';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Usuari } from '../../interfaces/usuari.interface';
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
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, // Necesario para ngModel
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule, // Para los botones de "Cancelar" y "Guardar"
  ],
  templateUrl: './dialog-usuario-lista-modif.component.html',
  styleUrls: [],
})
export class DialogUsuarioComponent {
  usuarioForm!: FormGroup;
  isEditing: boolean = true;
  cssPaths!: string[];
  usuarios!: Usuari[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuari,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    private fb: FormBuilder
  ) {

    this.cssPaths =  ['/assets/styles/styles.css','/assets/styles/pacientes/popups/dialog-formulario-paciente.component.css'];
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

    this.crearFormularioUsuario(); // Crear formulario reactivo
    if (this.data.id) {
      this.showDetails();
    }
  }

  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
    this.usuarioForm.enable();
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
    this.usuarioForm.disable();
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioUsuario(): void {
    this.usuarioForm = this.fb.group({
      id: [
        this.data.id,
        [Validators.required],
      ],
      username: [this.data.username, Validators.required],
      password: [this.data.password, Validators.required],
      email: [
        this.data.email,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      rolId: [this.data.rolId, Validators.required],
      imagen: [this.data.imagen],
    });
  }

  guardar(): void {
    if (this.usuarioForm.valid) {
      const formData = this.usuarioForm.value;
      this.dialogRef.close(formData);
    }
  }
}

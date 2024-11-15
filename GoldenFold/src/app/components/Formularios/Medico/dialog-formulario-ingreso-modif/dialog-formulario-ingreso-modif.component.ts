import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Ingreso } from '../../../../interface/ingreso.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { EpisodiService } from '../../../../services/episodis.service';
import { Cama } from '../../../../interface/cama.interface';
import { CamaService } from '../../../../services/cama.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomDateAdapter } from '../../../../custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { dataInici, dataIniciFinalValidator } from '../../../../validators/ingresos.validators';
import { Medico } from '../../../../interface/medico.interface';


@Component({
  selector: 'app-dialog-formulario-medico-modif',
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
    MatButtonModule
  ],
  templateUrl: './dialog-formulario-medico-modif.component.html',
  styleUrls: ['./dialog-formulario-medico-modif.component.css']
})
export class DialogFormularioMedicoModifComponent implements OnInit {
  isEditing: boolean = true; // Variable para controlar el modo
  medicoForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    public dialogRef: MatDialogRef<DialogFormularioMedicoModifComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormularioMedico();
    if(this.data.dni){
      this.showDetails();
    }
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    if (this.medicoForm.valid) {
      const medicoActualizado: Medico = {
        ...this.data,
        ...this.medicoForm.value
      };
      this.dialogRef.close(medicoActualizado);
    }
  }

  // Getter para simplificar el acceso al estado de solo lectura
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
    this.medicoForm.enable();
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
    this.medicoForm.disable();
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioMedico(): void {
    this.medicoForm = this.fb.group({
      dni: [this.data.dni],
      nom:[this.data.nom],
      telefon:[this.data.telefon],
      usuariId:[this.data.usuariId],
      especialitat:[this.data.especialitat]
    });
  }
}


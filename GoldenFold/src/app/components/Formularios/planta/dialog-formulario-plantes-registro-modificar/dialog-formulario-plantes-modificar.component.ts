import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PlantesComponent } from '../../../../pages/inicio/pages/administrador-sistema/pages/plantes/plantes.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Planta } from '../../../../interface/planta.interface';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-formulario-plantas-modificar',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,  // Necesario para ngModel
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule, // Para el botón "Cancelar" y "Guardar"
    CommonModule
  ],

  templateUrl: './dialog-formulario-plantes-modificar.component.html',
  styleUrls: ['./dialog-formulario-plantes-modificar.component.css']
})

export class DialogFormularioConsultaPlantesModificar {

  plantaForm!:FormGroup;
  editar: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Planta,
    public dialogRef: MatDialogRef<DialogFormularioConsultaPlantesModificar>,
    private fb: FormBuilder) 
  { };

  ngOnInit(): void {
    this.crearFormularioPlanta();
    this.showDetails();
  }

  get isReadOnly(): boolean {
    return !this.editar;
  }

  enableEditing() : void {
    this.editar = true;
    this.plantaForm.enable();
  }
  showDetails(): void {
    this.editar = false;
    this.plantaForm.disable();
  }

  crearFormularioPlanta(): void {
    this.plantaForm = this.fb.group({
      piso: [this.data.piso, [Validators.required]],
      capacitatHabitacions: [this.data.capacitatHabitacions]
    });
  }

  // Método para manejar el envío del formulario
  guardar(): void {

    if (this.plantaForm.valid){
      const formData = this.plantaForm.value;

      this.dialogRef.close(formData);

    }
    
  }
}
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paciente-dialog',
  template: `
  <h2>Detalles del Paciente</h2>
    <p><strong>DNI: </strong>{{data.dni}}</p>
    <p><strong>Tarjeta Sanitaria: </strong>{{data.numSS}}</p>
    <p><strong>Nombre Propio: </strong>{{data.nom}}</p>
    <p><strong>Primer apellido: </strong>{{data.cognom1}}</p>
    @if(data.cognom2 != null) {<p><strong>Segundo apellido: </strong>{{data.cognom2}}</p>}
    <p><strong>Fecha de nacimiento: </strong>{{data.birthDay}}</p>
    <p><strong>Sexo: </strong>{{data.sexe}}</p>
    <button mat-button (click)="onClose()">Cerrar</button>
    `
})
export class FichaPacienteComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<FichaPacienteComponent>
      ) {}

    onClose(): void {
        this.dialogRef.close();
    }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingreso-dialog',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatListModule,MatButtonModule],
  template: `
  <mat-card>
    <mat-card-header>
        <mat-card-title style='font-size: 1.5rem;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;'>Detalles del Ingreso</mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <mat-list>
        <mat-list-item>
            <strong>ID:</strong>&nbsp;{{ data.id }}
        </mat-list-item>
        <mat-list-item>
            <strong>Fecha entrada:</strong>&nbsp;{{ data.dataEntrada | date: 'dd/MM/yyyy' }}
        </mat-list-item>
        @if (data.dataSortida != null) {
            <mat-list-item>
            <strong>Fecha salida:</strong>&nbsp;{{ data.dataSortida | date: 'dd/MM/yyyy' }}
            </mat-list-item>
        }
        <mat-list-item>
            <strong>Episodio médico:</strong>&nbsp;{{ data.episodiMedicId }}
        </mat-list-item>
        <mat-list-item>
            <strong>Cama:</strong>&nbsp;{{ data.codiLlit }}
        </mat-list-item>
        </mat-list>
    </mat-card-content>
    <mat-card-actions align="end">
        <button mat-button color="primary" (click)="onClose()">Cerrar</button>
    </mat-card-actions>
    </mat-card>

    `
})
export class FichaIngresoComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<FichaIngresoComponent>
      ) {}

    onClose(): void {
        this.dialogRef.close();
    }
}

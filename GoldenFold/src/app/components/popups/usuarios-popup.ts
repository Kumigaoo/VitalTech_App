import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-consultas-dialog',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div>
      <h1 mat-dialog-title>Consultas</h1>
    </div>
    <div class="table-container mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Id</th>
          <td mat-cell *matCellDef="let consulta">{{ consulta.id }}</td>
        </ng-container>

        <ng-container matColumnDef="urgencia">
          <th mat-header-cell *matHeaderCellDef>Urgencia</th>
          <td mat-cell *matCellDef="let consulta">
            {{ consulta.urgencia ? 'Si' : 'No' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="sintomatologia">
          <th mat-header-cell *matHeaderCellDef>Sintomatologia</th>
          <td mat-cell *matCellDef="let consulta">
            {{ consulta.sintomatologia }}
          </td>
        </ng-container>

        <ng-container matColumnDef="receta">
          <th mat-header-cell *matHeaderCellDef>Receta</th>
          <td mat-cell *matCellDef="let consulta">{{ consulta.recepta }}</td>
        </ng-container>

        <ng-container matColumnDef="dniPersonal">
          <th mat-header-cell *matHeaderCellDef>Dni Personal</th>
          <td mat-cell *matCellDef="let consulta">
            {{ consulta.dniPersonal }}
          </td>
        </ng-container>

        <ng-container matColumnDef="episodiMedicId">
          <th mat-header-cell *matHeaderCellDef>Id E.M.</th>
          <td mat-cell *matCellDef="let consulta">
            {{ consulta.episodiMedicId }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns" class="clickable-row"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./custom-table.component.css'],
})
export class UsuariosDialogComponent {
  dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    console.log(this.data);
    this.dataSource = data;
  }

displayedColumns: string[] = ['id','urgencia', 'sintomatologia', 'receta','dniPersonal','episodiMedicId'];
}

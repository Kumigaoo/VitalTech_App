import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ingresos-dialog',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h1 mat-dialog-title>Ingressos</h1>
    <div class="table-container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Id</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="dataEntrada">
          <th mat-header-cell *matHeaderCellDef>Data Entrada</th>
          <td mat-cell *matCellDef="let element">
            {{ element.dataEntrada | date : 'dd/MM/yyyy' }}
          </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="dataSortida">
          <th mat-header-cell *matHeaderCellDef>Data Sortida</th>
          <td mat-cell *matCellDef="let element">
            {{ element.dataSortida | date : 'dd/MM/yyyy' }}
          </td>
        </ng-container>

        <!-- Symbol Column -->

        <ng-container matColumnDef="codiLlit">
          <th mat-header-cell *matHeaderCellDef>Codi Llit</th>
          <td mat-cell *matCellDef="let element">{{ element.codiLlit }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./custom-table.component.css'],
})
export class IngresosDialogComponent {
  dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.dataSource = data;
  }

  displayedColumns: string[] = ['id', 'dataEntrada', 'dataSortida', 'codiLlit'];
}

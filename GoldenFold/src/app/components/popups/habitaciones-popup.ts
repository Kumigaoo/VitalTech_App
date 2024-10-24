import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-habitaciones-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  template: `
    <h1 mat-dialog-title>Habitaciones</h1>

    <div class="table-container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <ng-container matColumnDef="codiHabitacio">
          <th mat-header-cell *matHeaderCellDef> Número de habitación </th>
          <td mat-cell *matCellDef="let element"> {{element.codiHabitacio}} </td>
        </ng-container>

 
        <ng-container matColumnDef="capacitatLlits">
          <th mat-header-cell *matHeaderCellDef> Capacidad de camas </th>
          <td mat-cell *matCellDef="let element"> {{element.capacitatLlits}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>


  `,
  styleUrls: ['./custom-table.component.css']

})
export class HabitacionesDialogComponent {

    dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    console.log(data);
    this.dataSource = data;
  }

  displayedColumns: string[] = ['codiHabitacio', 'capacitatLlits'];
  
}

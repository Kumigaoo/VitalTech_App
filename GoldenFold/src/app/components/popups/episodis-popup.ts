import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-episodis-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  template: `
    <h1 mat-dialog-title>Episodios Medicos</h1>
    <div class="table-container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> Id </th>
          <td mat-cell *matCellDef="let element"> {{element.id}} </td>
        </ng-container>

 
        <ng-container matColumnDef="dataObertura">
          <th mat-header-cell *matHeaderCellDef> Fecha apertura </th>
          <td mat-cell *matCellDef="let element"> {{element.dataObertura | date: 'dd/MM/yyyy'}} </td>
        </ng-container>

        <ng-container matColumnDef="dataTancament">
          <th mat-header-cell *matHeaderCellDef> Fecha cierre </th>
          <td mat-cell *matCellDef="let element"> {{element.dataTancament | date: 'dd/MM/yyyy'}} </td>
        </ng-container>

        <ng-container matColumnDef="dolencia">
          <th mat-header-cell *matHeaderCellDef> Dolencia </th>
          <td mat-cell *matCellDef="let element"> {{element.dolencia}} </td>
        </ng-container>

        <ng-container matColumnDef="estat">
          <th mat-header-cell *matHeaderCellDef> Estado </th>
          <td mat-cell *matCellDef="let element"> {{element.estat}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>


  `,
  styleUrls: ['./custom-table.component.css']

})
export class EpisodiosDialogComponent {

    dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    console.log(data);
    this.dataSource = data;
  }

  displayedColumns: string[] = ['id', 'dataObertura', 'dataTancament', 'dolencia', 'estat'];
  
}

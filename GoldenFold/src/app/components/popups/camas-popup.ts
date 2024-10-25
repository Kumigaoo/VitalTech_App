import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-consultas-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  template: `
    <h1 mat-dialog-title>
    Camas
    </h1>


    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <ng-container matColumnDef="codiLlit">
    <th mat-header-cell *matHeaderCellDef> Codigo cama </th>
    <td mat-cell *matCellDef="let element"> {{element.codiLlit}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="ocupat">
    <th mat-header-cell *matHeaderCellDef> Disponibilidad </th>
    <td mat-cell *matCellDef="let element"> {{element.ocupat ? 'Si' : 'No'}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="foraDeServei">
    <th mat-header-cell *matHeaderCellDef> Fuera de servicio </th>
    <td mat-cell *matCellDef="let element"> {{element.foraDeServei ? 'Si':'No'}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>


  `,
  styleUrls: ['./custom-table.component.css']
  
})
export class CamasDialogComponent {

    dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    console.log(this.data);
    this.dataSource = data;
  }

  displayedColumns: string[] = ['codiLlit', 'ocupat', 'foraDeServei'];
  
}

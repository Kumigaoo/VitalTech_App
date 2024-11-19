import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-episodis-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule
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

        <ng-container matColumnDef="motivo">
          <th mat-header-cell *matHeaderCellDef> Motivo </th>
          <td mat-cell *matCellDef="let element"> {{element.motivo}} </td>
        </ng-container>

        <ng-container matColumnDef="urgencia">
          <th mat-header-cell *matHeaderCellDef> Urgencia </th>
          <td mat-cell *matCellDef="let element"> {{element.urgencia}} </td>
        </ng-container>

        <ng-container matColumnDef="recepta">
          <th mat-header-cell *matHeaderCellDef> Receta </th>
          <td mat-cell *matCellDef="let element"> {{element.recepta}} </td>
        </ng-container>

        <ng-container matColumnDef="estat">
          <th mat-header-cell *matHeaderCellDef> Estado </th>
          <td mat-cell *matCellDef="let element"> {{element.estat}} </td>
        </ng-container>

        <ng-container matColumnDef="dniPacient">
          <th mat-header-cell *matHeaderCellDef> Paciente </th>
          <td mat-cell *matCellDef="let element"> {{element.dniPacient}} </td>
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

  displayedColumns: string[] = ['id', 'dataObertura', 'dataTancament', 'motivo', 'urgencia','recepta','estat','dniPacient'];
  
}

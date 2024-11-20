import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interface/paciente.interface';
import { PruebaDiagnostica } from '../../interface/pruebas-diagnosticas.interface';
import { PruebasService } from '../../services/pruebas.service';


@Component({
  selector: 'app-pruebas-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule
  ],
  template: `
    <h1 mat-dialog-title>Pruebas diagnosticas</h1>
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
          <td mat-cell *matCellDef="let element"> {{element.dataTancament ?  (element.dataTancament| date: 'dd/MM/yyyy')  : 'Pendiente'}} </td>
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
          <td mat-cell *matCellDef="let element"> {{ element.id }} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
    
  `,
  styleUrls: ['./custom-table.component.css']

})
export class PruebasDialogComponent {

    dataSource: any;
    purebasDiagnosticas!: MatTableDataSource<PruebaDiagnostica>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[], private pruebasService: PruebasService) {
    this.dataSource = data;
    this.purebasDiagnosticas = new MatTableDataSource<PruebaDiagnostica>();
    this.obtenerPruebasDiagnosticas();
  }

  obtenerPruebasDiagnosticas(): void{
    this.pruebasService.getPruebasDiagnostricas().subscribe({
      next:(data: PruebaDiagnostica[]) => {
        // Filter the data based on the ids present in the `data` array
        const filteredData = data.filter(prueba => this.data.some(item => item.id === prueba.id));
        this.purebasDiagnosticas.data = filteredData;
        console.log('Pruebas: ',filteredData);
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }


  displayedColumns: string[] = ['id', 'dataObertura', 'dataTancament', 'motivo', 'urgencia','recepta','estat','dniPacient'];
}

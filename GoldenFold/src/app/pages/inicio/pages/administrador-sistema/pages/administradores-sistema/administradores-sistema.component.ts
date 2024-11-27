import { Component, ViewChild } from '@angular/core';
import { AdministradorSistema } from '../../../../../../interface/administrador-sistema.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdministradorSistemaService } from '../../../../../../services/administrador-sistema.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-administradores-sistema',
  templateUrl: './administradores-sistema.component.html',
  styleUrl: './administradores-sistema.component.css'
})
export class AdministradoresSistemaComponent {
  displayedColumns: string[]  = ['dni','nom','telefon','usuariId','prioridad'];
  administradores : MatTableDataSource<AdministradorSistema> = new MatTableDataSource<AdministradorSistema>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  constructor(private administradorSistemaService: AdministradorSistemaService, private fb: FormBuilder, private dialog: MatDialog){}

  obtenerAdministradoresDeSistema(): void{
    this.administradorSistemaService.getAll().subscribe({
      next:(data:AdministradorSistema[])=>{
        this.administradores.data = data;
        this.administradores.sort = this.sort;
        this.administradores.paginator = this.paginator;
      },
      error:(error:any)=>{
        console.log('ERROR:',error);
      }
    })
  }

  
  
}

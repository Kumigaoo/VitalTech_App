import { Component, ViewChild } from '@angular/core';
import { AdministradorSistema } from '../../../../../../interface/administrador-sistema.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdministradorSistemaService } from '../../../../../../services/administrador-sistema.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  administradorSistemaForm!: FormGroup;
  administradorSistemaParaActualizar: AdministradorSistema | null = null;

  constructor(private administradorSistemaService: AdministradorSistemaService, private fb: FormBuilder, private dialog: MatDialog){
    this.obtenerAdministradoresDeSistema();
    this.crearFormularioAdministradorDeSistema();
  }

  obtenerAdministradoresDeSistema(): void{
    this.administradorSistemaService.getAll().subscribe({
      next:(data:AdministradorSistema[])=>{
        this.administradores.data = data;
        this.administradores.sort = this.sort;
        this.administradores.paginator = this.paginator;
        console.log('Administradores de sistema:',this.administradores.data);
      },
      error:(error:any)=>{
        console.log('ERROR:',error);
      }
    })
  }

  crearFormularioAdministradorDeSistema(): void{
    this.administradorSistemaForm = this.fb.group({
      dni: ['',Validators.required],
      nom:['',Validators.required],
      telefon:[0],
      usuariId:['',Validators.required],
      especialitat:['',Validators.required]
    });
  }

  
  
}

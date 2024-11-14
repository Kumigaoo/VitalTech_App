import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Medico } from '../../../../../../interface/medico.interface';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatSort } from '@angular/material/sort';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../../../../../services/metge.service';
import { UsuarioService } from '../../../../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-metges',
  templateUrl: './metges.component.html',
  styleUrl: './metges.component.css'
})
export class MetgesComponent {
  //columnas a mostrar
  displayedColumns: string[] = ['DNI', 'Nombre','Nombre de usuario','Teléfono','Especialidad','Episodios medicos','Pruebas diagnosticas']
  
  medicos : MatTableDataSource<Medico> = new MatTableDataSource<Medico>([]);

  //paginator, ordenador y snackbar(para las notificaciones)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) nackbar!: SnackbarComponent;

  //formularios reactivos
  medicoForm!: FormGroup;
  medicoParaActualizar: Medico | null = null;

  constructor(private medicoService: MedicoService, private usuarioService: UsuarioService, private fb: FormBuilder, public dialog:MatDialog) {
    this.obtenerMedicos(); 
    this.crearFormularioMedico();
  }

  //metodo para obtener medicos
  obtenerMedicos(): void{
    this.medicoService.getMedicos().subscribe({
      next: (data:Medico[]) => {
        console.log('Medicos: ',data);
        this.medicos.data = data;
        this.medicos.paginator = this.paginator;
        this.medicos.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error al obtener los medicos',error);
      }
    });
  }

  //crear el formulario reactivo
  crearFormularioMedico(): void{
    this.medicoForm = this.fb.group({
      DNI: ['',Validators.required],
      Nom: ['',Validators.required],
      Telefon:  [0],
      UsuariId: [0,Validators.required],
      Especialitat: ['',Validators.required]
    })
  }

}

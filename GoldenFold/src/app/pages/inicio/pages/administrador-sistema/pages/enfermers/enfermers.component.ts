import { Component, ViewChild } from '@angular/core';
import { Enfermero } from '../../../../../../interface/enfermer.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnfermeroService } from '../../../../../../services/enfermero.service';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

@Component({
  selector: 'app-enfermers',
  templateUrl: './enfermers.component.html',
  styleUrl: './enfermers.component.css'
})
export class EnfermersComponent {
  displayedColumns: string[] = ['dni','nom','telefon','usuariId','especialitat','pruebasDiagnosticas','Actions'];

  enfermeros : MatTableDataSource<Enfermero> = new MatTableDataSource<Enfermero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
  
  enfermeroForm!: FormGroup;
  enfermeroParaActualizar: Enfermero | null = null;

  constructor(private enfermeroService: EnfermeroService, private fb: FormBuilder){
    this.obtenerEnfermeros();
    this.crearFormularioEnfermero();
  }

  ngAfterViewInit(): void {
    this.enfermeros.paginator = this.paginator;
    this.enfermeros.sort = this.sort;
  }

  obtenerEnfermeros(): void{
    this.enfermeroService.getEnfermeros().subscribe({
      next: (data:Enfermero[]) => {
        this.enfermeros.data = data;
        console.log(this.enfermeros.data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  crearFormularioEnfermero(): void{
    this.enfermeroForm = this.fb.group({
      dni: ['',Validators.required],
      nom:['',Validators.required],
      telefon:[0],
      usuariId:['',Validators.required],
      Especialitat:['',Validators.required]
    })
  }

  deleteEnfermero(enfermero: Enfermero): void{
    this.enfermeroService.deleteEnfermero(enfermero.dni).subscribe({
      next:() => {
        this.enfermeros.data = this.enfermeros.data.filter(i => i.dni != enfermero.dni);
        this.snackbar.showNotification('success', 'Enfermero eliminado correctamente'); // Notificación de éxito
      },
      error:(error: any) => {
        console.log('ERROR',error);
      }
    })
  }

  filtrarEnfermeros(event: {type: string, term: string}): void{
    const {type,term} = event;
    const searchTerm = term.trim().toLowerCase();

    this.enfermeros.filterPredicate = (data:Enfermero,filter:string) => {
      switch(type) {
        case 'dni':
          return data.dni.toString().toLowerCase().includes(filter);
        case 'nom':
          return data.nom.toString().toLowerCase().includes(filter);
        case 'usuariId':
          return data.usuariId.toString().toLowerCase().includes(filter);
        case 'telefon':
          return data.telefon.toString().toLowerCase().includes(filter);
        case 'especialitat':
          return data.especialitat.toString().toLowerCase().includes(filter);
        default:
          return false;
      }
    };
    this.enfermeros.filter = searchTerm;

    if(this.enfermeros.paginator){
      this.enfermeros.paginator.firstPage();
    }
  }

}

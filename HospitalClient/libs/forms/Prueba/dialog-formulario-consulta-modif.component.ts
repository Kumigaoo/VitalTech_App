import { MatSelectModule } from '@angular/material/select';
import { PruebaDiagnostica } from './../../interfaces/pruebas-diagnosticas.interface';
import { EpisodiService } from './../../services/episodis.service';
import { MedicoService } from './../../services/metge.service';
import { EnfermeroService } from './../../services/enfermero.service';
import { Enfermero } from '../../interfaces/enfermer.interface';
import { Medico } from '../../interfaces/medico.interface';
import { EpisodiMedic } from '../../interfaces/episodis-medics.interface';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-formulario-consulta-modif',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, // Necesario para ngModel
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule, // Para el botón "Cancelar" y "Guardar"
    MatOptgroup,
    MatOption,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './dialog-formulario-consulta-modif.component.html',
  styleUrls: [],
})
export class DialogFormularioConsultaModifComponent {
  isEditing: boolean = false; // Variable para controlar el modo
  pruebaForm!: FormGroup;
  episodis: EpisodiMedic[] = [];
  medicos: Medico[]  = [];
  enfermeros : Enfermero[] = [];
  cssPaths!: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PruebaDiagnostica,
    public dialogRef: MatDialogRef<DialogFormularioConsultaModifComponent>,
    private fb: FormBuilder,
    private episodiService: EpisodiService,
    private medicoService: MedicoService,
    private enfermeroService: EnfermeroService
  ) {
    this.cssPaths =  ['/assets/styles/Pruebas-Diagnosticas/popup/dialog-formulario-consulta.component.css'];
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });
    this.crearFormularioPrueba();
    if(this.data.id){
      this.disableEditing();
    }

  }

  ngOnInit(): void {
    this.obtenerEpisodios();
    this.obtenerMedicos();
    this.obtenerEnfermeros();
  }
  
  // metodo para saber si esta en modo lectura o no
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // habilitar modo edición
  enableEditing(): void {
    this.isEditing = true; //modo edición
    this.pruebaForm.enable(); //formuario editable
  }

  // deshabilitar modo edición
  disableEditing(): void {
    this.isEditing = false; //modo lectura
    this.pruebaForm.disable(); //formulario no editable
  }

  //cerrar dialogo
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioPrueba(): void {
    // Crear el formulario con los campos obligatorios
    this.pruebaForm = this.fb.group({
      dniMetge: [this.data.dniMetge],
      dniEnfermer: [this.data.dniEnfermer],
      episodiMedicId: [this.data.episodiMedicId, [Validators.required]],
      dolencia: [this.data.dolencia, [Validators.required]],
      pruebas: [this.data.pruebas, [Validators.required]],
      resultados : [this.data.resultados],
      correcta: [this.data.correcta]
    });
  } 

  guardar(): void {
      if (this.pruebaForm.valid) {
        //si los datos son validos
        const prueba: PruebaDiagnostica = {
          //creamos un nuevo administrador
          ...this.data,
          ...this.pruebaForm.value,
        };
        //quitamos el espacio de los lados a todos los atributos
        if(prueba.dniMetge != null){
          prueba.dniMetge.toString().trim();
        }
        if(prueba.dniEnfermer != null) {
          prueba.dniEnfermer.toString().trim();
        }
        prueba.dolencia.toString().trim();
        if(prueba.pruebas != null){
          prueba.pruebas.toString().trim();
        }
        if(prueba.resultados != null){
          prueba.resultados.toString().trim();
        }
        
        //cerramos el dialog y enviamos los datos
        this.dialogRef.close(prueba);
      }
    }

  obtenerEpisodios(): void {
    this.episodiService.getAll().subscribe({
      next:(data: EpisodiMedic[]) => {
        this.episodis = data;
        console.log(this.episodis);
      },
      error: (error:any) => {
        console.log('ERROR', error);
      }
    })
  }

  obtenerMedicos(): void {
    this.medicoService.getAll().subscribe({
      next:(data: Medico[]) => {
        this.medicos = data;
        console.log(this.episodis);
      },
      error: (error:any) => {
        console.log('ERROR', error);
      }
    })
  }

  obtenerEnfermeros(): void {
    this.enfermeroService.getAll().subscribe({
      next:(data: Enfermero[]) => {
        this.enfermeros = data;
        console.log(this.episodis);
      },
      error: (error:any) => {
        console.log('ERROR', error);
      }
    })
  }
}

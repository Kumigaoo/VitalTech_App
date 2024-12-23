import { UsuarioService } from './../../services/usuario.service';
import { AdministradorSistemaService } from './../../services/administrador-sistema.service';
import { AdministradorSistema } from './../../interfaces/administrador-sistema.interface';
import { Usuari } from '../../interfaces/usuari.interface';
import { CamaService } from '../../services/cama.service';
import { EpisodiService } from '../../services/episodis.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Ingreso } from '../../interfaces/ingreso.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../interfaces/episodis-medics.interface';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Cama } from '../../interfaces/cama.interface';
import { CommonModule, NumberFormatStyle } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomDateAdapter } from '../../../apps/GoldenFold/src/app/custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  dataInici,
  dataIniciFinalValidator,
} from '../../../apps/GoldenFold/src/app/validators/ingresos.validators';
import { Medico } from '../../interfaces/medico.interface';
import { MedicoService } from '../../services/metge.service';
import { dniValidator } from '../../validators/dniValidator';
import { map } from 'rxjs';
import { EspecialidadesMedico } from '../../../apps/GoldenFold/src/app/enums/especialidadesMedico';
import { dniExisteValidator } from '../../validators/dniExistsValidatos';
import { obtenerUsuariosDisponibles } from '../../utils/utilFunctions';

@Component({
  selector: 'app-dialog-formulario-aministradorSistema-modif',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-formulario-administradorSistema-modif.component.html',
  styleUrls: [],
})
export class DialogFormularioAdministradorSistemaModifComponent{
  isEditing: boolean = true; //propiedad para saber si el usuario esta editando o visualizando
  administradorForm!: FormGroup; //para hacer el formulario reactivo
  usuarios!: Usuari[]; //lista de usuarios disponibles
  administradores!: AdministradorSistema[]; //lista de administradores
  cssPaths!: string[]; //para poner el css

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdministradorSistema, //los datos que le pasamos al dialog
    private administradorSistemaService: AdministradorSistemaService, //servicio administrador de sistema
    public dialogRef : MatDialogRef<DialogFormularioAdministradorSistemaModifComponent>, // gestionar el dialog
    private fb: FormBuilder, //crear formulario reactivo
    private usuarioService: UsuarioService //servicio de usuarios
  ) {
    //rutas CSS
    this.cssPaths =  ['/assets/styles/styles.css','/assets/styles/AdministradorSistema/Popups/dialog-formulario-administradorSistema-modif.component.css'];

    //poner el CSS en el HTML
    this.cssPaths.forEach(css => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

    this.obtenerAdministradores(); //obtener administradores de sistema
    this.crearFormularioAdministrador(); //crear formulario reactivo
    if(this.data.dni){ //comprueba si se le han pasado datos
      this.disableEditing(); //se pone en modo solo lectura
    }
  }

  //metodo para pasar la información al componente correspondiente
  guardar(): void {
    if(this.administradorForm.valid){ //si los datos son validos
      const administradorActualizado: AdministradorSistema = { //creamos un nuevo administrador
        ...this.data,
        ...this.administradorForm.value
      };
      //quitamos el espacio de los lados a todos los atributos
      administradorActualizado.telefon.toString().trim(); 
      administradorActualizado.dni.toString().trim();
      administradorActualizado.nom.toString().trim();
      administradorActualizado.prioridad.toString().trim();
      this.dialogRef.close(administradorActualizado);

      //cerramos el dialog y enviamos los datos
      this.dialogRef.close(administradorActualizado);
    }
  }

  // metodo para saber si esta en modo lectura o no
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // habilitar modo edición
  enableEditing(): void{
    this.isEditing = true; //modo edición
    this.administradorForm.enable(); //formuario editable
  }

  // deshabilitar modo edición
  disableEditing(): void{
    this.isEditing = false; //modo lectura
    this.administradorForm.disable(); //formulario no editable
  }

  //cerrar dialogo
  cancelar(): void{
    this.dialogRef.close();
  }

  //crear formulario reactivo
  crearFormularioAdministrador(): void{
    this.administradorForm = this.fb.group({ //lo crear con el form builder
      dni: [ //campo dni
        this.data.dni, //valor puesto en el campo dni 
        {
          validators: [Validators.required,dniValidator()], //comprueba que el dni sea valido
          asyncValidators: [dniExisteValidator(this.administradorSistemaService,this.data.dni)], //comprueba que no exista un administrador de sistema con ese dni
        }
      ],
      nom: [
        this.data.nom,
        {
          validators:[Validators.required],
        }
      ],
      telefon: [
        this.data.telefon,
        {
          validators:[Validators.pattern('^[^a-zA-Z]*$')], //comprueba que no hayan letras 
        }
      ],
      usuariId: [
        this.data.usuariId,
        {
          validators:[Validators.required]
        }
      ],
      prioridad: [
        this.data.prioridad,
        {
          validators:[Validators.required] 
        }
      ],
    });
  }

  //metodo par aobtener los administradores de sistema
  obtenerAdministradores(): void {
    this.administradorSistemaService.getAll().subscribe({
      next:(data: AdministradorSistema[]) =>{
        this.administradores = data;
        this.getUsuariosDisponibles(); //obtener usuarios
      },
      error:(error:any)=>{
        console.log('ERROR',error);
      }
    })
  }

  //metodo para obtener los usuariosDisponibles
  getUsuariosDisponibles(): void {
    obtenerUsuariosDisponibles("Administrador del Sistema",this.administradores,this.usuarioService).subscribe({
      next:(usuariosDisponibles: Usuari[]) => {
        this.usuarios = usuariosDisponibles;
      },
      error:(error:any)=>{
        console.log('Error al obtener los usuarios disponibles:',error);
      }
    })
  }

}

import { Planta } from './../../interfaces/planta.interface';
import { UsuarioService } from '../../services/usuario.service';
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
import { PlantaService } from '../../services/planta.service';
import { plantaExistsValidator } from '../../validators/plantaExistsValidator';

@Component({
  selector: 'app-dialog-planta',
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
  templateUrl: './dialog-planta-component.html',
  styleUrls: [],
})
export class DialogPlantaComponent {
  isEditing: boolean = true; //propiedad para saber si el usuario esta editando o visualizando
  plantaForm!: FormGroup; //para hacer el formulario reactivo
  usuarios!: Usuari[]; //lista de usuarios disponibles
  plantas!: Planta[]; //lista de administradores
  cssPaths!: string[]; //para poner el css

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Planta, //los datos que le pasamos al dialog
    private plantaService: PlantaService, //servicio administrador de sistema
    public dialogRef: MatDialogRef<DialogPlantaComponent>, // gestionar el dialog
    private fb: FormBuilder //crear formulario reactivo
  ) {
    //rutas CSS
    this.cssPaths = [
      '/assets/styles/styles.css',
      '/assets/styles/Planta/Popups/dialog-planta-component.css',
    ];

    //poner el CSS en el HTML
    this.cssPaths.forEach((css) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = css;
      document.head.appendChild(link);
    });

    this.obtenerPlantas(); //obtener administradores de sistema
    this.crearFormularioPlanta(); //crear formulario reactivo
    if (this.data.piso) {
      //comprueba si se le han pasado datos
      this.disableEditing(); //se pone en modo solo lectura
    }
  }

  //metodo para pasar la información al componente correspondiente
  guardar(): void {
    if (this.plantaForm.valid) {
      //si los datos son validos
      const plantaActualizada: Planta = {
        //creamos un nuevo administrador
        ...this.data,
        ...this.plantaForm.value,
      };
      //quitamos el espacio de los lados a todos los atributos
      plantaActualizada.piso.toString().trim();
      plantaActualizada.capacitatHabitacions.toString().trim();

      //cerramos el dialog y enviamos los datos
      this.dialogRef.close(plantaActualizada);
    }
  }

  // metodo para saber si esta en modo lectura o no
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // habilitar modo edición
  enableEditing(): void {
    this.isEditing = true; //modo edición
    this.plantaForm.enable(); //formuario editable
  }

  // deshabilitar modo edición
  disableEditing(): void {
    this.isEditing = false; //modo lectura
    this.plantaForm.disable(); //formulario no editable
  }

  //cerrar dialogo
  cancelar(): void {
    this.dialogRef.close();
  }

  //crear formulario reactivo
  crearFormularioPlanta(): void{
    this.plantaForm = this.fb.group({ //lo crear con el form builder
      piso: [ //campo dni
        this.data.piso, //valor puesto en el campo dni 
        {
          validators: [Validators.required], //comprueba que el dni sea valido
          asyncValidators: [plantaExistsValidator(this.plantaService)], //comprueba que no exista un administrador de sistema con ese dni
        }
      ],
      capacitatHabitacions: [
        this.data.capacitatHabitacions,
        {
          validators:[Validators.required, Validators.pattern(/^(?:[1-9]|[1-9][0-9])$/)

          ],
        }
      ],
    });
  }
 
//metodo par aobtener los administradores de sistema
obtenerPlantas(): void {
  this.plantaService.getAll().subscribe({
    next:(data: Planta[]) =>{
      this.plantas = data;
    },
    error:(error:any)=>{
      console.log('ERROR',error);
    }
  })
}
  
}

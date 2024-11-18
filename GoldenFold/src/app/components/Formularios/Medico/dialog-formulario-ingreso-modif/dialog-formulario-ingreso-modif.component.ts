import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Ingreso } from '../../../../interface/ingreso.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { EpisodiService } from '../../../../services/episodis.service';
import { Cama } from '../../../../interface/cama.interface';
import { CamaService } from '../../../../services/cama.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomDateAdapter } from '../../../../custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { dataInici, dataIniciFinalValidator } from '../../../../validators/ingresos.validators';
import { Medico } from '../../../../interface/medico.interface';
import { Usuari } from '../../../../interface/usuari.interface';
import { UsuarioService } from '../../../../services/usuario.service';
import { MedicoService } from '../../../../services/metge.service';
import { UsernameAsyncValidator } from '../../../../validators/usernameExistsValidator';
import { dniValidator } from '../../../../validators/dniValidator';


@Component({
  selector: 'app-dialog-formulario-medico-modif',
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
    MatButtonModule
  ],
  templateUrl: './dialog-formulario-medico-modif.component.html',
  styleUrls: ['./dialog-formulario-medico-modif.component.css']
})
export class DialogFormularioMedicoModifComponent implements OnInit {
  isEditing: boolean = true; // Variable para controlar el modo
  medicoForm!: FormGroup;
  usuaris! : Usuari[];
  medicos!: Medico[];
  usuarioIdsMedicos = new Set('');
  especialidades = [
    { id: 1, value: "MedicoGeneral" },
    { id: 2, value: "Cardiologo" },
    { id: 3, value: "Dermatologo" },
    { id: 4, value: "Ginecologo" },
    { id: 5, value: "Neumologo" },
    { id: 6, value: "Neurologo" },
    { id: 7, value: "Oncologo" },
    { id: 8, value: "Pediatra" },
    { id: 9, value: "Psiquiatra" },
    { id: 10, value: "Radiologo" },
    { id: 11, value: "Traumatologo" },
    { id: 12, value: "Urologo" },
    { id: 13, value: "Anestesiologo" },
    { id: 14, value: "Oftalmologo" },
    { id: 15, value: "Otorrinolaringologo" },
    { id: 16, value: "Nefrologo" },
    { id: 17, value: "Hematologo" },
    { id: 18, value: "Gastroenterologo" },
    { id: 19, value: "Endocrinologo" },
    { id: 20, value: "CirujanoGeneral" },
    { id: 21, value: "CirujanoCardiovascular" },
    { id: 22, value: "CirujanoPlastico" },
    { id: 23, value: "Neurocirujano" },
    { id: 24, value: "CirujanoOrtopedico" }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService,
    public dialogRef: MatDialogRef<DialogFormularioMedicoModifComponent>,
    private fb: FormBuilder,
    private usuariService: UsuarioService,
    private usernameValidator: UsernameAsyncValidator
  ) {}

  ngOnInit(): void {
    this.crearFormularioMedico();
    this.obtenerUsuaris();
    if(this.data.dni){
      this.showDetails();
    }
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    if (this.medicoForm.valid) {
      const medicoActualizado: Medico = {
        ...this.data,
        ...this.medicoForm.value
      };
      this.dialogRef.close(medicoActualizado);
    }
  }

  // Getter para simplificar el acceso al estado de solo lectura
  get isReadOnly(): boolean {
    return !this.isEditing;
  }

  // Función para habilitar el modo edición
  enableEditing(): void {
    this.isEditing = true;
    this.medicoForm.enable();
  }

  // Función para mostrar detalles (solo lectura)
  showDetails(): void {
    this.isEditing = false;
    this.medicoForm.disable();
  }

  // Función para cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  crearFormularioMedico(): void {
    this.medicoForm = this.fb.group({
      dni: [this.data.dni,dniValidator()],
      nom:[this.data.nom],
      telefon:[this.data.telefon],
      usuariId:[this.data.usuariId, [], this.usernameValidator.validate.bind(this.usernameValidator)],
      especialitat:[this.data.especialitat]
    });
  }

  obtenerUsuaris(): void {
    this.usuariService.getUsuarios().subscribe({
      next: (data:Usuari[]) => {
        
        //cojemos los usuarios con rolId medico
        this.usuaris = data.filter((usuari) => usuari.rolId === 'Metge');
        
        
      },
      error: (error: any) => {
        console.log('Error al obtener los usuarios');
      }
    });
  }
}


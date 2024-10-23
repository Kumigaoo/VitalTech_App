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


@Component({
  selector: 'app-dialog-formulario-ingreso-modif',
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
  providers: [  
    provideNativeDateAdapter()  
  ],
  templateUrl: './dialog-formulario-ingreso-modif.component.html',
  styleUrls: ['./dialog-formulario-ingreso-modif.component.css']
})
export class DialogFormularioIngresoModifComponent implements OnInit {
  episodisMedics: EpisodiMedic[] = [];
  llits: Cama[] = [];
  ingresoForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Ingreso,
    public dialogRef: MatDialogRef<DialogFormularioIngresoModifComponent>,
    private episodiService: EpisodiService,
    private fb: FormBuilder,
    private camaService: CamaService
  ) {}

  ngOnInit(): void {
    this.obtenerEpisodisMedics();
    this.obtenerCamas();
    this.crearFormularioIngreso();
  }
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  // Método para manejar el envío del formulario
  guardar(): void {
    if (this.ingresoForm.valid) {
      const ingresoActualizado: Ingreso = {
        ...this.data,
        ...this.ingresoForm.value
      };
      ingresoActualizado.dataSortida?.setDate(ingresoActualizado.dataSortida?.getDate() + 1); //para que ponga la fecha bien
      this.dialogRef.close(ingresoActualizado);
    } 
  }

  // Obtener la lista de episodios médicos desde el servicio correspondiente
  obtenerEpisodisMedics(): void {
    this.episodiService.getEpisodis().subscribe({
      next: (data: EpisodiMedic[]) => {
        this.episodisMedics = data;
      },
      error: (error: any) => {
        console.log('Error al cargar los episodios médicos', error);
      }
    });
  }

  // Obtener la lista de camas disponibles desde el servicio correspondiente
  obtenerCamas(): void {
    this.camaService.getLlits().subscribe({
      next: (data: Cama[]) => {
        this.llits = data.filter(llit => !llit.ocupat && !llit.foraDeServei);
      },
      error: (error: any) => {
        console.error('Error al cargar las camas', error);
      }
    });
  }

  crearFormularioIngreso(): void {
    this.ingresoForm = this.fb.group({
      id: [this.data.id],
      dataEntrada: [this.data.dataEntrada],
      dataSortida: [this.data.dataSortida],
      episodiMedicId: [this.data.episodiMedicId, [Validators.required]],
      codiLlit: [this.data.codiLlit, [Validators.required]],
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { FormsModule } from '@angular/forms';
import {MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule, formatDate } from '@angular/common';
import { CustomDateAdapter } from '../../../../custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-dialog-formulario-episodis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,  // Necessary for ngModel
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule, // For "Cancel" and "Save" buttons
    MatDatepickerModule
  ],
  providers: [  
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  
  templateUrl: './dialog-formulario-episodis.component.html',
  styleUrls: ['./dialog-formulario-episodis.component.css']
})

export class DialogFormularioEpisodisComponent {

  episodiForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EpisodiMedic, 
  public dialogRef: MatDialogRef<DialogFormularioEpisodisComponent>,
  private fb: FormBuilder) {

    this.episodiForm = this.fb.group({
      dataObertura: [this.data.dataObertura, [Validators.required]],
      dataTancament: [this.data.dataTancament],
      motivo: [this.data.motivo, [Validators.required]],
      urgencia: [this.data.urgencia, [Validators.required]],
      recepta: [this.data.recepta],
      estat: [this.data.estat],
      dniPacient: [this.data.dniPacient, [Validators.required]],
      dniMetge: [this.data.dniMetge, [Validators.required]]
    }); 
  }

  guardar(): void {
    if (this.episodiForm.valid) {
      const formData = this.episodiForm.value;
      
      formData.dataObertura = formatDate(formData.dataObertura, 'yyyy-MM-dd', 'en');
      formData.dataTancament = null;
      formData.estat = "No Resuelto";
      formData.recepta = null;

      this.dialogRef.close(formData); 
    }
      
  }

}

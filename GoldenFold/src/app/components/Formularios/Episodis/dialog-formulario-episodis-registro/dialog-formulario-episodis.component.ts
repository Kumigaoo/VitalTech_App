import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EpisodiMedic } from '../../../../interface/episodis-medics.interface';
import { FormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { CustomDateAdapter } from '../../../../custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

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
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
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
  public dialogRef: MatDialogRef<DialogFormularioEpisodisComponent>) {

    this.episodiForm = new FormGroup({
      dataObertura: new FormControl(''),
      dolencia: new FormControl(''),
      estat: new FormControl(''),
      dniPacient: new FormControl('')
    });

    
  }

  guardar(): void {

    
   
      this.data.dataObertura = formatDate(this.episodiForm.value.dataObertura, 'yyyy-MM-dd', 'en');
      this.data.dolencia = this.episodiForm.value.dolencia;
      this.data.estat =this.episodiForm.value.estat;
      this.data.dniPacient =this.episodiForm.value.dniPacient;

      this.dialogRef.close(this.data); 
      
  }

}

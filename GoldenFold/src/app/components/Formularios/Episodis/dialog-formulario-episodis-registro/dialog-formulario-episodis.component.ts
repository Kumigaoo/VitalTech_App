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
    provideNativeDateAdapter()  
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

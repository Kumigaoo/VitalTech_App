import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IngresService } from '../../../../../../service/ingres.service';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.component.html',
  styleUrl: './registro-ingreso.component.css'

})

export class RegistroIngresoComponent {

  ingresForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private ingresService: IngresService) {
    this.ingresForm = this.fb.group({
      dataEntrada: [''],
      dataSortida: [''],
      episodiMedicId: [''],
      llitId: ['']
    });
  }

  onSubmit() {

    const ingresData = this.ingresForm.value;

    this.ingresService.postIngres(ingresData).subscribe({
      next: response => alert('Ingres registrat'),
      error: error => alert('ERROR, camps no valids '),
      complete: () => alert('Operacio completada')
    });

  }

}

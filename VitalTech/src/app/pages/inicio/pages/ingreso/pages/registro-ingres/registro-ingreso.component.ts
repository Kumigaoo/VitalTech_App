import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IngresService } from '../../../../../../service/ingres.service';
import Swal from 'sweetalert2';

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

    if (ingresData.dataEntrada > ingresData.dataSortida) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar el ingreso',
        text: 'La fecha de salida introducida es anterior a la de entrada.'
      });
      return;
    } else if (new Date(ingresData.dataEntrada) > new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar el ingreso',
        text: 'La fecha de entrada del ingreso es posterior a la fecha actual.'
      });
      return;
    }



    this.http.post('http://localhost:5296/api/Ingres', ingresData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Ingreso registrado',
          text: 'El ingreso se ha registrado correctamente.'
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ERROR, campos no válidos.'
        });
      },
      complete: () => {
        Swal.fire({
          icon: 'info',
          title: 'Operación completada',
          text: 'La operación ha finalizado.'
        });
      }
    });

    

  }

}

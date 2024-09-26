import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { dataIniciFinalValidator,pacientIdexists } from '../../../../../../validator/episodio/episodio-validator.validator';
import { PacientService } from '../../../../../../service/pacientes.service';
 


@Component({
  selector: 'app-registro-episodio',
  templateUrl: './registro-episodio.component.html',
  styleUrl: './registro-episodio.component.css'
})
export class RegistroEpisodiComponent {

  episodiForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private pacienteService: PacientService) {
    this.episodiForm = this.fb.group({
      dataObertura: ['', {
        validators: [Validators.required],
      }],
      dataTancament: ['', {
        validators: [Validators.required],
      }],
      dolencia: ['', {
        validators: [Validators.required],
      }],
      estat: ['', {
        validators: [Validators.required],
      }],
      pacientId: ['', {
        validators: [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{8}[A-Za-z]$/)],
        asyncValidators: [pacientIdexists(pacienteService)]
      }]
    },
    {
      validators: dataIniciFinalValidator()
    }
);
  }

  onSubmit() {

    if(this.episodiForm.invalid){
      this.episodiForm.markAllAsTouched();
      return;
    }
    const episodiData = this.episodiForm.value;

    /*if (new Date(episodiData.dataObertura) > new Date(episodiData.dataTancament)) {
      alert("No se puede viajar al pasado");
      return;
    } else if (new Date(episodiData.dataObertura) > new Date()) {
      alert("No puedes viajar al futuro");
      return;
    }*/

    /*
    this.http.post('http://localhost:5296/api/EpisodiMedic', episodiData).subscribe({
      next: response => alert('Episodio médico registrado:'),
      error: error => alert('ERROR, campos no válidos'),
      complete: () => alert('Operació completada')
    })
    */

    this.http.post('http://localhost:5296/api/EpisodiMedic', episodiData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Episodio médico registrado',
          text: 'El episodio se ha registrado correctamente.'
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

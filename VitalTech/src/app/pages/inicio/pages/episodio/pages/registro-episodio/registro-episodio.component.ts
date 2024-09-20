import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-episodio',
  templateUrl: './registro-episodio.component.html',
  styleUrl: './registro-episodio.component.css'
})
export class RegistroEpisodiComponent {

  episodiForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.episodiForm = this.fb.group({
      dataObertura: [''],
      dataTancament: [''],
      dolencia: [''],
      estat: [''],
      pacientId: [''],
      consultes: [''],
      ingressos: ['']
    });
  }

  onSubmit() {
    const episodiData = this.episodiForm.value;

    if (new Date(episodiData.dataObertura) > new Date(episodiData.dataTancament)) {
      alert("No se puede viajar al pasado");
      return;
    } else if (new Date(episodiData.dataObertura) > new Date()) {
      alert("No puedes viajar al futuro");
      return;
    }

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

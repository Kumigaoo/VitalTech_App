import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-consulta',
  templateUrl: './registro-consulta.component.html',
  styleUrl: './registro-consulta.component.css'
})
export class RegistroConsultaComponent {

  consultaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient){
    this.consultaForm = this.fb.group({
      urgencia: [''],
      sintomatologia: [''],
      recepta: [''],
      personalId: [''],
      episodiMedicId: ['']
    });
  }

  onSubmit(){
    const consultaData = this.consultaForm.value;

    this.http.post('http://localhost:5296/api/Consulta', consultaData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Consulta registrada',
          text: 'La consulta se ha registrado correctamente.'
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ERROR, campos no válidos.'
        });
      }
    });

  }
}

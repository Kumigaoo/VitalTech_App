import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HabitacioService } from '../../../../../../service/habitaciones.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-habitacion',
  templateUrl: './registro-habitacion.component.html',
  styleUrl: './registro-habitacion.component.css'
})

export class RegistroHabitacionComponent {

  habitacionForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private habService: HabitacioService) {
    this.habitacionForm = this.fb.group({
      CodiHabitacio: [''],
      PlantaId:[''],
      CapacitatLlits: ['']
    })
  }

  onSubmit() {
    const habitacionData = this.habitacionForm.value;

  //   this.habService.postHabitacio(habitacionData).subscribe({
  //     next: response => alert('Habitació creada'),
  //     error: error => alert('Error, camps no vàlids'),
  //     complete: () => alert('Operació completada'),
  // });

  this.http.post('http://localhost:5296/api/habitacio', habitacionData).subscribe({
    next: response => {
      Swal.fire({
        icon: 'success',
        title: 'Habitación registrada',
        text: 'La habitación se ha registrado correctamente.'
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
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HabitacioService } from '../../../../../../service/habitaciones.service';
import { HttpClient } from '@angular/common/http';

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
    this.habService.postHabitacio(habitacionData).subscribe({
      next: response => alert('Habitació creada'),
      error: error => alert('Error, camps no vàlids'),
      complete: () => alert('Operació completada'),
  });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HabitacioService } from '../../../../../../service/habitaciones.service';
import { NavComponent } from '../../../../../../components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registro-habitacion',
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './registro-habitacion.component.html',
  styleUrl: './registro-habitacion.component.css'
})
export class RegistroHabitacionComponent {

  habitacionForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private habService: HabitacioService) {
    this.habitacionForm = this.fb.group({
      codiHabitacio: [''],
      capacitatLlits: [''],
      plantaId:[''],
    })
  }

  onSubmit() {
    const habitacionData = this.habitacionForm.value;
    this.habService.postHabitacio(habitacionData).subscribe({
      next: response => alert('Personal creat'),
      error: error => alert('Error, camps no vàlids'),
      complete: () => alert('Operació completada'),
  });

  }

}

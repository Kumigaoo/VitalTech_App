import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-planta.component.html',
  styleUrl: './registro-planta.component.css'
})
export class RegistroPlantaComponent {
  plantaForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient){
    this.plantaForm = this.fb.group({
      capacitatHabitacions: [''],
    });
  }


  onSubmit(){
    const plantaData = this.plantaForm.value;

    this.http.post('http://localhost:5296/api/Planta', plantaData).subscribe({
      next: response => console.log('Planta registrada:', response),
      error: error => alert('ERROR, camps no valids'),
      complete: () => alert('Operacio completada')
    })
  }
}

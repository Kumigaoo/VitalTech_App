import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  pacientForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.pacientForm = this.fb.group({
      dni: [''],
      numSS: [''],
      nom: [''],
      sexe: ['']
    });
  }

  onSubmit() {

    const pacienteData = this.pacientForm.value;

    this.http.post('http://localhost:5296/api/Pacient', pacienteData).subscribe({
      next: response => console.log('Pacient registrat:', response),
      error: error => alert('ERROR, camps no valids'),
      complete: () => alert('Operacio completada')
    });
  }

}

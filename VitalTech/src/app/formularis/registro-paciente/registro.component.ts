import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PacientService } from '../../service/pacientes.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  pacientForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private pacientService: PacientService) {
    this.pacientForm = this.fb.group({
      dni: [''],
      numSS: [''],
      nom: [''],
      sexe: ['']
    });
  }

  onSubmit() {

    const pacienteData = this.pacientForm.value;

    this.pacientService.postPacient(pacienteData).subscribe({
      next: response => alert('Pacient registrat'),
      error: error => alert('ERROR, camps no valids '),
      complete: () => alert('Operacio completada')
    });

  }

}

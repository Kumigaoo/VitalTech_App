import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PacientService } from '../../../../../../service/pacientes.service';
import { pacienteDniValidator, pacienteDniLetraCorrect } from '../../../../../../validator/paciente/paciente-validator.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  pacientForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private pacientService: PacientService) {
    this.pacientForm = this.fb.group({
      dni: ['', {
        validators: [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{8}[A-Za-z]$/)],
        asyncValidators: [pacienteDniValidator(this.pacientService)],
        updateOn: 'blur'
      }],
      numSS: ['', {
        validators: [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)]
      }],
      nom: [''],
      sexe: ['']
    },
  {
    validator:pacienteDniLetraCorrect()
  });
  }

  onSubmit() {
    if(this.pacientForm.invalid){
      this.pacientForm.markAllAsTouched();
      return;
    }
    const pacienteData = this.pacientForm.value;

    this.pacientService.postPacient(pacienteData).subscribe({
      next: response => alert('Pacient registrat'),
      error: error => alert('ERROR, camps no valids '),
      complete: () => alert('Operacio completada')
    });

  }

}

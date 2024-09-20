import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PacientService } from '../../../../../../service/pacientes.service';
import { pacienteDniValidator, pacienteDniLetraCorrect, pacienteSSValidator } from '../../../../../../validator/paciente/paciente-validator.validator';
import Swal from 'sweetalert2';

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
        validators: [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)],
        asyncValidators: [pacienteSSValidator(this.pacientService)]
      }],
      nom: ['', {
        validotors: [Validators.required]
      }],
      sexe: ['', {
        validators: [Validators.required]
      }]
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

    this.http.post('http://localhost:5296/api/Pacient', pacienteData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Paciente registrado',
          text: 'El paciente se ha registrado correctamente.'
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

    // this.pacientService.postPacient(pacienteData).subscribe({
    //   next: response => alert('Pacient registrat'),
    //   error: error => alert('ERROR, camps no valids '),
    //   complete: () => alert('Operacio completada')
    // });

  }

}

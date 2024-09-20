import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientService } from '../../../../../../service/pacientes.service';
import { Pacient } from '../../../../../../interface/pacient.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './modif-paciente.component.html',
  styleUrl: './modif-paciente.component.css'
})

export class ModifPacienteComponent {

  modiPacientForm: FormGroup;
  pacientId: string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private pacientService: PacientService,private router: Router, private route: ActivatedRoute) {
    this.modiPacientForm = this.fb.group({
      dni: [''],
      numSS: [''],
      nom: [''],
      sexe: ['']
    });
  }

  ngOnInit(): void {
    this.pacientId = String(this.route.snapshot.paramMap.get('id')); 
    this.pacientService.getPacientId(this.pacientId).subscribe(pacient => {
      this.modiPacientForm.patchValue(pacient);
    })
  }

  onUpdate(): void {

    if(this.modiPacientForm.valid) {
      const updatedPacient: Pacient = { ...this.modiPacientForm.getRawValue(), dni: this.pacientId };
      this.pacientService.putPacient(updatedPacient).subscribe({

        next: response => {
          Swal.fire({
            icon: 'success',
            title: 'Paciente modificado',
            text: 'El paciente se ha modificado correctamente.'
          });
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ERROR, campos no válidos.'
          });
        }

        // next:() => {
        //   alert('Pacient actualizat amb exit');
        //   this.router.navigate(['/pacientes']);
        // },
        // error: (error) => {
        //   console.error('Error al actualitzar el pacient:', error);
        //   alert('Error al actualitzar el paciente');
        // }
      })

    }
  }

}

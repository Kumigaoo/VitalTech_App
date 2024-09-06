import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PacientService } from '../../service/pacientes.service';
import { Pacient } from '../../interface/pacient.interface';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    this.pacientService.getPacientId(this.pacientId).subscribe(consulta => {
      this.modiPacientForm.patchValue(consulta);
    })
  }

  onUpdate(): void {

    if(this.modiPacientForm.valid) {
      const updatedPacient: Pacient = { ...this.modiPacientForm.getRawValue(), dni: this.pacientId };
      this.pacientService.putPacient(updatedPacient).subscribe({
        next:() => {
          alert('Pacient actualizat amb exit');
          this.router.navigate(['/pacientes']);
        },
        error: (error) => {
          console.error('Error al actualitzar el pacient:', error);
        }
      })

    }

  }

}

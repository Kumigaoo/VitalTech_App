import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EnfermeroService } from '../../../../../../service/enfermero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enfermer } from '../../../../../../interface/enfermer.inferface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modif-enfermero',
  templateUrl: './modif-enfermero.component.html',
  styleUrl: './modif-enfermero.component.css',
})
export class ModifEnfermeroComponent {
  modiPersonalForm: FormGroup;
  personalId: string = '';
  dniOriginal: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private personalService: EnfermeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.modiPersonalForm = this.fb.group({
      dni: [''],
      nom: [''],
      especialitat: [''],
    });
  }

  ngOnInit(): void {
    this.personalId = String(this.route.snapshot.paramMap.get('id'));
    this.personalService
      .getPersonalId(this.personalId)
      .subscribe((personal) => {
        this.modiPersonalForm.patchValue(personal);
        this.dniOriginal = personal.dni;
      });
  }
  onUpdate() {
    if (this.modiPersonalForm.valid) {
      const updatePersonal: Enfermer = {
        ...this.modiPersonalForm.getRawValue(),
      };
      this.personalService
        .putPacient(updatePersonal, this.dniOriginal)
        .subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Empleado modificado',
              text: 'El empleado se ha modificado correctamente.',
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'ERROR, campos no válidos.',
            });
          },

          // next: () => {
          //   alert("Personal modificat amb éxit");
          //   this.router.navigate(['/metge']);
          // },
          // error: (error) => {
          //   console.error('Error al modificar el personal', error);
          //   alert('Error al modificar el personal');
          // }
        });
    }
  }
}

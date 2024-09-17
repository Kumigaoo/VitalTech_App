import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Habitacio } from '../../../../../../interface/habitacio.interface';
import { HabitacioService } from '../../../../../../service/habitaciones.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modif-habitacion',
  templateUrl: './modif-habitacion.component.html',
  styleUrl: './modif-habitacion.component.css'
})
export class ModifHabitacionComponent {
  habitacionForm: FormGroup;
  habitacioId: number = 0;

  constructor(private habService: HabitacioService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.habitacionForm = this.fb.group({
      codiHabitacio: [{ value: '', disabled: true }],
      capacitatLlits: [''],
      plantaId: ['']
    });
  }

  ngOnInit() {

    this.habitacioId = Number(this.route.snapshot.paramMap.get('id')); // obtiene el id de la consulta desde la url 
    this.habService.getHabitacio(this.habitacioId).subscribe(habitacio => {
    this.habitacionForm.patchValue(habitacio);

    })
  }

  onSubmit() {
    if(this.habitacionForm.valid){
      const updateHabitacion: Habitacio = { ...this.habitacionForm.getRawValue(), id: this.habitacioId};
      this.habService.putHabitcions(updateHabitacion).subscribe({
        next:() => {
          alert('Habitación actualitzada amb exit');
          this.router.navigate(['/habitacion']);
        },
        error: (error) => {
          console.error('Error al actualitzar la habitación:', error);
          alert('Error al actualitzar la habitación');
        }
      })
    }
  }

}

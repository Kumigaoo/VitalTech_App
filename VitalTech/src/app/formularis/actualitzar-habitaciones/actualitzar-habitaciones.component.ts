import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-actualitzar-habitaciones',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './actualitzar-habitaciones.component.html',
  styleUrl: './actualitzar-habitaciones.component.css'
})
export class ActualitzarHabitacionesComponent {
  consultaForm: FormGroup;

  // Variables
  protected id: number = 0;
  protected capacitat: number = 0;
  protected planta: number = 0;

  // Array
  protected llits: string[] = [];

  constructor(private habService: HabitacioService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.consultaForm = this.fb.group({
      codiHabitacio: [{ value: '', disabled: true }],
      capacitatLlits: [''],
      plantaId: [''],
      nLlits: ['']
    });
  }

  ngOnInit() {

    this.id = Number(this.route.snapshot.paramMap.get('id')); // obtiene el id de la consulta desde la url 
    this.habService.getHabitacio(this.id).subscribe(habitacio => {
    this.consultaForm.patchValue(habitacio);

    })
  }

  onSubmit() {

  }

}

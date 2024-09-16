import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Planta } from '../../../../../../interface/planta.interface';
import { PlantaService } from '../../../../../../service/planta.service';
import { NavComponent } from '../../../../../../components/nav/nav.component';

@Component({
  selector: 'app-modif-planta',
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './modif-planta.component.html',
  styleUrl: './modif-planta.component.css'
})
export class ModifPlantaComponent {
  plantaForm: FormGroup;
  plantaId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private plantaService: PlantaService,
    private router: Router, private route: ActivatedRoute,){
    this.plantaForm = this.fb.group({
      id: [{value: '', disabled: true}],
      capacitatHabitacions: ['']
      
    });
  }

  ngOnInit(): void {
    this.plantaId = Number(this.route.snapshot.paramMap.get('id')); // obtiene el id de la planta desde la url 
    this.plantaService.getPlanta(this.plantaId).subscribe(planta => {
      this.plantaForm.patchValue(planta);
    })
  }

  onActualice(): void {
    if(this.plantaForm.valid) {
      const updatedLlit: Planta = { ...this.plantaForm.getRawValue(), id: this.plantaId };
      this.plantaService.putPlanta(updatedLlit).subscribe({
        next:() => {
          alert('Planta actualitzada amb exit');
          this.router.navigate(['/planta']);
        },
        error: (error) => {
          console.error('Error al actualitzar la planta:', error);
          alert('Error al actualitzar la planta');
        }
      })

    }
  }
}

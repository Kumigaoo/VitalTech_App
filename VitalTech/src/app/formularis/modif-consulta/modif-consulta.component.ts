import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../service/consulta.service';
import { Consulta } from '../../interface/consulta.interface';

@Component({
  selector: 'app-modif-consulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modif-consulta.component.html',
  styleUrl: './modif-consulta.component.css'
})
export class ModifConsultaComponent {
  consultaForm: FormGroup;
  consultaId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private consultaService: ConsultaService,
    private router: Router, private route: ActivatedRoute,){
    this.consultaForm = this.fb.group({
      id: [{value: '', disabled: true}],
      urgencia: [''],
      sintomatologia: [''],
      recepta: [''],
      personalId: [''],
      episodiMedicId: ['']
    });
  }

  ngOnInit(): void {
    this.consultaId = Number(this.route.snapshot.paramMap.get('id')); // obtiene el id de la consulta desde la url 
    this.consultaService.getConsulta(this.consultaId).subscribe(consulta => {
      this.consultaForm.patchValue(consulta);
    })
  }

  onActualice(): void {
    if(this.consultaForm.valid) {
      const updatedConsulta: Consulta = { ...this.consultaForm.getRawValue(), id: this.consultaId };
      this.consultaService.putConsulta(updatedConsulta).subscribe({
        next:() => {
          alert('Consulta actualitzada amb exit');
          this.router.navigate(['/consulta']);
        },
        error: (error) => {
          console.error('Error al actualitzar la consulta:', error);
          alert('Error al actualitzar la consulta');
        }
      })
    }
  }

  onActualicePatch(): void {
    if(this.consultaForm.valid) {
      const updatedConsulta = this.consultaForm.getRawValue();
      const patchData: Partial<Consulta> = { ...updatedConsulta, id: this.consultaId };
      this.consultaService.patchConsulta(patchData).subscribe({
        next:() => {
          alert('Consulta actualitzada amb exit');
          this.router.navigate(['/consulta']);
        },
        error: (error) => {
          console.error('Error al actualitzar la consulta:', error);
          alert('Error al actualitzar la consulta');
        }
      })
    }
  }
}


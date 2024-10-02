import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../../../../../service/consulta.service';
import { Consulta } from '../../../../../../interface/consulta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modif-consulta',
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
      dniPersonal: [''],
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
      const updatedConsulta: Consulta = { ...this.consultaForm.getRawValue(), id: this.consultaId }

      this.consultaService.putConsulta(updatedConsulta).subscribe({

        next: response => {
          Swal.fire({
            icon: 'success',
            title: 'Consulta modificada',
            text: 'La consulta se ha modificado correctamente.'
          });
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ERROR, campos no válidos.'
          });
        }
      })
    }

  }

  
}


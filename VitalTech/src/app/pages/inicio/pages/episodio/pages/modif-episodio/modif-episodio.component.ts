import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodiService } from '../../../../../../service/episodis.service';
import { EpisodiMedic } from '../../../../../../interface/episodis-medics.interface';
import Swal from 'sweetalert2';
import { dataIniciFinalValidator,pacientIdexists } from '../../../../../../validator/episodio/episodio-validator.validator';
import { PacientService } from '../../../../../../service/pacientes.service';


@Component({

  selector: 'app-modif-episodio',
  templateUrl: './modif-episodio.component.html',
  styleUrl: './modif-episodio.component.css'
})

export class ModifEpisodiComponent {

  modifEpisodiForm: FormGroup;
  episodiId: number=0;

  constructor(private fb: FormBuilder, private http: HttpClient, private episodiService: EpisodiService, private router: Router, private route: ActivatedRoute,  private pacienteService: PacientService) {
    this.modifEpisodiForm = this.fb.group({
      dataObertura: ['', {
        validators: [Validators.required],
      }],
      dataTancament: ['', {
        validators: [Validators.required],
      }],
      dolencia: ['', {
        validators: [Validators.required],
      }],
      estat: ['', {
        validators: [Validators.required],
      }],
      pacientId: ['', {
        validators: [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{8}[A-Za-z]$/)],
        asyncValidators: [pacientIdexists(pacienteService)]
      }]
    },
    {
      validators: dataIniciFinalValidator()
    });
  }

  ngOnInit(): void {
    this.episodiId = Number(this.route.snapshot.paramMap.get('id'));
    this.episodiService.getEpisodisId(this.episodiId).subscribe(consulta => {

      consulta.dataObertura = consulta.dataObertura.split('T')[0];

      if(consulta.dataTancament != null) {
        consulta.dataTancament = consulta.dataTancament.split('T')[0];
      }

      this.modifEpisodiForm.patchValue(consulta);
      
    })
  }

  onUpdate(): void {
    if(this.modifEpisodiForm.invalid){
      this.modifEpisodiForm.markAllAsTouched();
      return;
    }
    if (this.modifEpisodiForm.valid) {
      const updatedPacient: EpisodiMedic = { ...this.modifEpisodiForm.getRawValue(), id: this.episodiId };


      /*if (new Date(updatedPacient.dataObertura) > new Date(updatedPacient.dataTancament)) {
        
        Swal.fire({
          icon: 'error',
          title: 'No se puede modificar',
          text: 'La nueva fecha de cierre del episodio es anterior a la de apertura.'
        });
        return;

      } else if (new Date(updatedPacient.dataObertura) > new Date()) {
         Swal.fire({
          icon: 'error',
          title: 'No se puede modificar',
          text: 'La nueva fecha de apertura del episodio es posterior a la fecha actual.'
        });
        return;
      }*/

      this.episodiService.putEpisodi(updatedPacient).subscribe({

        // next:() => {
        //   alert('Episodio actualizado con éxito.');
        //   this.router.navigate(['/episodis']);
        // },
        // error: (error) => {
        //   console.error('Error al actualitzar el pacient:', error);
        // }

        next: response => {
          Swal.fire({
            icon: 'success',
            title: 'Episodio médico modificado',
            text: 'El episodio se ha modificado correctamente.'
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

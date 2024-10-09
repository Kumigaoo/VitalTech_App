import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodiService } from '../../../../../../service/episodis.service';
import { EpisodiMedic } from '../../../../../../interface/episodis-medics.interface';
import Swal from 'sweetalert2';
import { dataIniciFinalValidator,dataIniciValidator,pacientIdexists } from '../../../../../../validator/episodio/episodio-validator.validator';
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
      dataTancament: [''],
      dolencia: ['', {
        validators: [Validators.required],
      }],
      estat: ['', {
        validators: [Validators.required],
      }],
      dniPacient: ['', {
        validators: [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{8}[A-Za-z]$/)],
        asyncValidators: [pacientIdexists(pacienteService)]
      }]
    },
    {
      validators: [dataIniciFinalValidator(), dataIniciValidator()]
    });

    this.modifEpisodiForm.get('estat')?.valueChanges.subscribe(estat => {
      if(estat ==="No Resuelto"){
        this.modifEpisodiForm.get('dataTancament')?.setValue(null);
      } else if (estat === "Resuelto" && this.modifEpisodiForm.get('dataTancament')?.value === null){
        this.modifEpisodiForm.get('dataTancament')?.setValue(new Date());
      }
    });

    this.modifEpisodiForm.get('dataTancament')?.valueChanges.subscribe(dataTancament => {
      if(dataTancament != null) {
        this.modifEpisodiForm.get('estat')?.setValue("Resuelto");
      }
    })
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

      this.episodiService.putEpisodi(updatedPacient).subscribe({
        
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

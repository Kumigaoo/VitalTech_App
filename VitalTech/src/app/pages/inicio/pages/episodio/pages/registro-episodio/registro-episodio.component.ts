import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { pacientIdexists,dataIniciValidator } from '../../../../../../validator/episodio/episodio-validator.validator';
import { PacientService } from '../../../../../../service/pacientes.service';
 

@Component({
  selector: 'app-registro-episodio',
  templateUrl: './registro-episodio.component.html',
  styleUrl: './registro-episodio.component.css'
})
export class RegistroEpisodiComponent {

  episodiForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private pacienteService: PacientService) {
    this.episodiForm = this.fb.group({
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
        asyncValidators: [pacientIdexists(pacienteService)],

      }]
    },
    {
      validators: dataIniciValidator()
    }

    
  );
    this.episodiForm.get('estat')?.valueChanges.subscribe(estat => {
      if(estat ==="Resuelto"){
        this.episodiForm.addControl('dataTancament', this.fb.control(new Date())); // es parecido al setValue, pero como este atrivuto no lo tenemos inicializado en el formulario se usa addControl
      } else {
        this.episodiForm.removeControl('dataTancament');
      }
      
    });
  }

  onSubmit() {

    if(this.episodiForm.invalid){
      this.episodiForm.markAllAsTouched();
      return;
    }
    const episodiData = this.episodiForm.value;

    /*if (new Date(episodiData.dataObertura) > new Date(episodiData.dataTancament)) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar episodio',
        text: 'La fecha de cierre del episodio introducida es anterior a la de apertura.'
      });
      return;
    } else if (new Date(episodiData.dataObertura) > new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar episodio',
        text: 'La fecha de apertura del episodio es posterior a la fecha actual.'
      });
      return;
    }*/

   
    this.http.post('http://localhost:5296/api/EpisodiMedic', episodiData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Episodio médico registrado',
          text: 'El episodio se ha registrado correctamente.'
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'ERROR, campos no válidos.'
        });
      }
    });

  }
}

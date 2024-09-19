import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CamasService } from '../../../../../../service/camas.service';
import { camaidValidator } from '../../../../../../validator/cama/cama-id.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-cama',
  templateUrl: './registro-cama.component.html',
  styleUrl: './registro-cama.component.css'
})
export class RegistroCamaComponent {
  llitForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private route: ActivatedRoute,private llitService: CamasService){
    this.llitForm = this.fb.group({
      codiLlit: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\d{3}[AB]$/)],
        asyncValidators: [camaidValidator(this.llitService)],
        updateOn: 'blur'
      }],
      ocupat: ['', Validators.required],
      habitacioId: ['', Validators.required],
    });
  }
  onSubmit(){
    if(this.llitForm.invalid){
      this.llitForm.markAllAsTouched();
      return;
    }
    const llitData = this.llitForm.value;
    
    this.http.post('http://localhost:5296/api/EpisodiMedic', llitData).subscribe({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Cama registrada',
          text: 'La cama se ha registrado correctamente.'
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

    // this.http.post('http://localhost:5296/api/Llit', llitData).subscribe({
    //   next: response => console.log('Llit registrada:', response),
    //   error: error => alert('ERROR, camps no valids'),
    //   complete: () => alert('Operacio completada'),
    // })
    

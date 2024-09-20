import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Llit } from '../../../../../../interface/llit.interface';
import { CamasService } from '../../../../../../service/camas.service';
import Swal from 'sweetalert2';
import { camaidValidator, habidValidator, codiLlitHabitacioValidator, camaIdValidatorModif } from '../../../../../../validator/cama/cama-validator.validator';
import { HabitacioService } from '../../../../../../service/habitaciones.service';

@Component({
  selector: 'app-modif-cama',
  templateUrl: './modif-cama.component.html',
  styleUrl: './modif-cama.component.css'
})

export class ModifCamaComponent {
  llitForm: FormGroup;
  llitId: string = "";
  originalCamaId: string | null= null;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private route: ActivatedRoute,private llitService: CamasService, private habitacioService: HabitacioService){
    
    const camaId = this.route.snapshot.paramMap.get('id') || '';
    this.originalCamaId = camaId;
    
    this.llitForm = this.fb.group({
      codiLlit: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\d{3}[AB]$/)],
        asyncValidators: [camaIdValidatorModif(this.llitService, this.originalCamaId)],
        updateOn: 'blur'
      }],
      ocupat: [''],
      foraDeServei: [''],
      habitacioId: ['', {
        validators: [Validators.required, Validators.pattern(/^\d{3}$/)],
        asyncValidators: [habidValidator(this.habitacioService)],
        updateOn: 'blur'
      }]
    }, {
      validator: codiLlitHabitacioValidator()
    });
    this.validadorDeDisponibilidad();
  }

  ngOnInit(): void {
    this.llitId = String(this.route.snapshot.paramMap.get('id')); // obtiene el id de la planta desde la url 
    this.llitService.getLlit(this.llitId).subscribe(llit => {
      this.llitForm.patchValue(llit);
    })
  }

  validadorDeDisponibilidad(){
    this.llitForm.get('ocupat')?.valueChanges.subscribe((isOcupat) => {
      if(isOcupat == 'true'){
        this.llitForm.get('foraDeServei')?.setValue('false', {emitEvent: false });
      }
    });

    this.llitForm.get('foraDeServei')?.valueChanges.subscribe((isForaDeServei) => {
      if(isForaDeServei == 'true'){
        this.llitForm.get('ocupat')?.setValue('false', {emitEvent: false});
      }
    });
  }

  onActualice(): void {
    
    if(this.llitForm.invalid){
      this.llitForm.markAllAsTouched();
      return;
    }
    if(this.llitForm.valid) {
      const updatedLlit: Llit = { ...this.llitForm.getRawValue(), id: this.llitId };
      this.llitService.putLlit(updatedLlit).subscribe({
        // next:() => {
        //   alert('Llit actualitzada amb exit');
        //   this.router.navigate(['/camas']);
        // },
        // error: (error) => {
        //   console.error('Error al actualitzar la cama:', error);
        //   alert('Error al actualitzar la cama');
        // }

        next: response => {
          Swal.fire({
            icon: 'success',
            title: 'Cama modificada',
            text: 'La cama se ha modificado correctamente.'
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

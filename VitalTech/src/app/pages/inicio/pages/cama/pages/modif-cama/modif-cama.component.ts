import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Llit } from '../../../../../../interface/llit.interface';
import { CamasService } from '../../.,/../../../../../service/camas.service';


@Component({
  selector: 'app-modif-cama',
  templateUrl: './modif-cama.component.html',
  styleUrl: './modif-cama.component.css'
})
export class ModifCamaComponent {
  llitForm: FormGroup;
  llitId: string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private llitService: CamasService,
    private router: Router, private route: ActivatedRoute,){
    this.llitForm = this.fb.group({
      codiLlit: [''],
      ocupat: [''],
      foraDeServei: [''],
      habitacioId: [''],
      
    });
  }

  ngOnInit(): void {
    this.llitId = String(this.route.snapshot.paramMap.get('id')); // obtiene el id de la planta desde la url 
    this.llitService.getLlit(this.llitId).subscribe(llit => {
      this.llitForm.patchValue(llit);
    })
  }

  onActualice(): void {
    if(this.llitForm.valid) {
      const updatedLlit: Llit = { ...this.llitForm.getRawValue(), id: this.llitId };
      this.llitService.putLlit(updatedLlit).subscribe({
        next:() => {
          alert('Llit actualitzada amb exit');
          this.router.navigate(['/camas']);
        },
        error: (error) => {
          console.error('Error al actualitzar la cama:', error);
          alert('Error al actualitzar la cama');
        }
      })

    }
  }
}

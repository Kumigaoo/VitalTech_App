import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetgeService } from '../../service/metge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Metge } from '../../interface/metge.interface';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-modif-personal',
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './modif-personal.component.html',
  styleUrl: './modif-personal.component.css'
})
export class ModifPersonalComponent {
  modiPersonalForm: FormGroup;
  personalId: string = "";


  constructor(private fb: FormBuilder, private http: HttpClient, private personalService: MetgeService, private router: Router, private route: ActivatedRoute) {
    this.modiPersonalForm = this.fb.group({
      dni: [''],
      nom: [''],
      especialitat: ['']
    })
  }

  ngOnInit(): void {
    this.personalId = String(this.route.snapshot.paramMap.get('id'));
    this.personalService.getPersonalId(this.personalId).subscribe(personal => {
      this.modiPersonalForm.patchValue(personal);
    })
  }
  onUpdate() {
    if (this.modiPersonalForm.valid) {
      const updatePersonal: Metge = { ...this.modiPersonalForm.getRawValue(), dni: this.personalId };
      this.personalService.putPacient(updatePersonal).subscribe({
        next: () => {
          alert("Personal modificat amb éxit");
          this.router.navigate(['/metge']);
        },
        error: (error) => {
          console.error('Error al modificar el personal', error);
          alert('Error al modificar el personal');
        }
      })
    }
  }
}


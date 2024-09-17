import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../../../../../../components/nav/nav.component';

@Component({
  selector: 'app-registro-cama',
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './registro-cama.component.html',
  styleUrl: './registro-cama.component.css'
})
export class RegistroCamaComponent {
  llitForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private route: ActivatedRoute ){
    this.llitForm = this.fb.group({
      codiLlit: ['', [Validators.required, Validators.minLength(4)], Validators.pattern(/^\d{4}[AB]$/)],
      ocupat: ['', Validators.required],
      foraDeServei: ['', Validators.required],
      habitacioId: ['', Validators.required],
    });
  }

  onSubmit(){
    const llitData = this.llitForm.value;

    this.http.post('http://localhost:5296/api/Llit', llitData).subscribe({
      next: response => console.log('Llit registrada:', response),
      error: error => alert('ERROR, camps no valids'),
      complete: () => alert('Operacio completada'),
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-llit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-llit.component.html',
  styleUrl: './registro-llit.component.css'
})
export class RegistroLlitComponent {
  llitForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private route: ActivatedRoute ){
    this.llitForm = this.fb.group({
      codiLlit: [''],
      ocupat: [''],
      foraDeServei: [''],
      habitacioId: [''],
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

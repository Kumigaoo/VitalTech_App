import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetgeService } from '../../service/metge.service';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-registrar-personal',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './registrar-personal.component.html',
  styleUrl: './registrar-personal.component.css'
})
export class RegistrarPersonalComponent {
  personalForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private personalService: MetgeService) {
    this.personalForm = this.fb.group({
      dni : [''],
      nom : [''],
      especialitat : ['']
    })
  }

  onSubmit() {
    const personalData = this.personalForm.value;

    this.personalService.postPersonal(personalData).subscribe({
      next: response => alert('Personal creat'),
      error: error => alert('Error, camps no vàlids'),
      complete: () => alert('Operació completada'),
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EpisodiService } from '../../service/episodis.service';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-registro-episodi',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './registro-episodi.component.html',
  styleUrl: './registro-episodi.component.css'
})
export class RegistroEpisodiComponent {

  episodiForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient){
    this.episodiForm = this.fb.group({
      dataObertura: [''],
      dataTancament: [''],
      dolencia: [''],
      estat: [''],
      pacientId: [''],
      consultes: [''],
      ingressos: ['']
    });
  }

  onSubmit(){
    const episodiData = this.episodiForm.value;

    this.http.post('http://localhost:5296/api/EpisodiMedic', episodiData).subscribe({
      next: response => alert('Episodi mèdic registrat:'),
      error: error => alert('ERROR, camps no valids'),
      complete: () => alert('Operació completada')
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-episodio',
  templateUrl: './registro-episodio.component.html',
  styleUrl: './registro-episodio.component.css'
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

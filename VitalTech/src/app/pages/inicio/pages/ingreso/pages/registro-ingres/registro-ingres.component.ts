import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresService } from '../../service/ingres.service';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-registro-ingres',
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './registro-ingres.component.html',
  styleUrl: './registro-ingres.component.css'
})

export class RegistroIngresComponent {

  ingresForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private ingresService: IngresService) {
    this.ingresForm = this.fb.group({
      dataEntrada: [''],
      dataSortida: [''],
      episodiMedicId: [''],
      llitId: ['']
    });
  }

  onSubmit() {

    const ingresData = this.ingresForm.value;

    this.ingresService.postIngres(ingresData).subscribe({
      next: response => alert('Ingres registrat'),
      error: error => alert('ERROR, camps no valids '),
      complete: () => alert('Operacio completada')
    });

  }

}

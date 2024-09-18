import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingres } from '../../../../../../interface/../interface/ingres.interface';
import { IngresService } from '../../../../../../service/ingres.service';

@Component({
  selector: 'app-modif-ingreso',
  templateUrl: './modif-ingreso.component.html',
  styleUrl: './modif-ingreso.component.css'
})

export class ModifIngresComponent {

  modiIngresForm: FormGroup;
  ingresId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private ingresService: IngresService,private router: Router, private route: ActivatedRoute) {
    this.modiIngresForm = this.fb.group({
      dataEntrada: [''],
      dataSortida: [''],
      episodiMedicId: [''],
      llitId: ['']
    });
  }

  ngOnInit(): void {
    this.ingresId = Number(this.route.snapshot.paramMap.get('id')); 
    this.ingresService.getIngresId(String(this.ingresId)).subscribe(consulta => {

      consulta.dataEntrada = consulta.dataEntrada.split('T')[0];

      if(consulta.dataSortida != null) {
        consulta.dataSortida = consulta.dataSortida.split('T')[0];
      }

      this.modiIngresForm.patchValue(consulta);
    })
  }

  onUpdate(): void {

    if(this.modiIngresForm.valid) {
      const updatedIngres: Ingres = { ...this.modiIngresForm.getRawValue(), id: this.ingresId };
      this.ingresService.putIngres(updatedIngres).subscribe({
        next:() => {
          alert('Ingres actualizat amb exit');
          this.router.navigate(['/ingres']);
        },
        error: (error) => {
          alert('Algun camp erroni');
          console.error('Error al actualitzar el ingres:', error);
        }
      })

    }

  }


}

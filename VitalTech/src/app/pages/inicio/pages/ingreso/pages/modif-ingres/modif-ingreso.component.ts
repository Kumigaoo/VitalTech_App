import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingres } from '../../../../../../interface/../interface/ingres.interface';
import { IngresService } from '../../../../../../service/ingres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modif-ingreso',
  templateUrl: './modif-ingreso.component.html',
  styleUrl: './modif-ingreso.component.css'
})

export class ModifIngresoComponent {

  modiIngresForm: FormGroup;
  ingresId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private ingresService: IngresService, private router: Router, private route: ActivatedRoute) {
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

      if (consulta.dataSortida != null) {
        consulta.dataSortida = consulta.dataSortida.split('T')[0];
      }

      this.modiIngresForm.patchValue(consulta);
    })
  }

  onUpdate(): void {
    if (this.modiIngresForm.valid) {
      const updatedIngres: Ingres = { ...this.modiIngresForm.getRawValue(), id: this.ingresId };
      if (updatedIngres.dataEntrada > updatedIngres.dataSortida) {
        Swal.fire({
          icon: 'error',
          title: 'No se puede modificar el ingreso',
          text: 'La nueva fecha de salida del ingreso es anterior a la de entrada.'
        });
        return;
      } else if (new Date(updatedIngres.dataEntrada) > new Date()) {
        Swal.fire({
          icon: 'error',
          title: 'No se puede modificar el ingreso',
          text: 'La nueva fecha de entrada del ingreso es posterior a la fecha actual.'
        });
        return;
      }
      this.ingresService.putIngres(updatedIngres).subscribe({

        next: response => {
          Swal.fire({
            icon: 'success',
            title: 'Ingreso modificado',
            text: 'El ingreso se ha modificado correctamente.'
          });
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ERROR, campos no válidos.'
          });
        }

        // next:() => {
        //   alert('Ingres actualizat amb exit');
        //   this.router.navigate(['/ingres']);
        // },
        // error: (error) => {
        //   alert('Algun camp erroni');
        //   console.error('Error al actualitzar el ingres:', error);
        // }
      })

    }

  }


}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingres } from '../../../../../../interface/../interface/ingres.interface';
import { IngresService } from '../../../../../../service/ingres.service';
import Swal from 'sweetalert2';
import { EpisodiService } from '../../../../../../service/episodis.service';
import { episodioidexists, dataIniciValidator, ingresoEnCamaModif, dataIniciFinalValidator, llitIdexists, ingresoEnCama } from '../../../../../../validator/ingreso/ingreso-validator.validator';
import { CamasService } from '../../../../../../service/camas.service';


@Component({
  selector: 'app-modif-ingreso',
  templateUrl: './modif-ingreso.component.html',
  styleUrl: './modif-ingreso.component.css'
})

export class ModifIngresoComponent {

  modiIngresForm: FormGroup;
  ingresId: number = 0;
  sysdate: Date = new Date();
  fechaMin: string = "2020-01-01";
  fechaMax: string = "2030-12-30";
  originalCamaId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private ingresService: IngresService, private router: Router, private route: ActivatedRoute, private episodiService: EpisodiService, private llitService: CamasService) {
    this.ingresId = Number(this.route.snapshot.paramMap.get('id'));
    this.ingresService.getIngresId(String(this.ingresId)).subscribe(ingreso => {
      this.originalCamaId =ingreso.llitId;
    });

    this.modiIngresForm = this.fb.group({
      dataEntrada: ['', {
        validators: [Validators.required]
      }],
      dataSortida: [''],
      episodiMedicId: ['', {
        validators: [Validators.required],
        asyncValidators: [episodioidexists(this.episodiService)],
        updateOn: 'blur'
      }],
      llitId: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\d{3}[AB]$/)],
        asyncValidators: [llitIdexists(this.llitService), ingresoEnCama(this.ingresService)],
        updateOn: 'blur'
      }]
    }, {
      validators: [dataIniciFinalValidator(), dataIniciValidator()],
      asyncValidators: [ingresoEnCamaModif(this.ingresService, this.originalCamaId ?? '')],
      updateOn: 'blur'
    });
  }
  formatearFecha(fecha: Date): string {
    const any = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${any}-${mes}-${dia}`;
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
    this.fechaMax = this.formatearFecha(this.sysdate);
    this.fechaMin = this.formatearFecha(new Date(this.sysdate.getTime() - 432000000));
  }

  onUpdate(): void {
    if(this.modiIngresForm.invalid){
      this.modiIngresForm.markAllAsTouched();
      return;
    }
    if (this.modiIngresForm.valid) {
      const updatedIngres: Ingres = { ...this.modiIngresForm.getRawValue(), id: this.ingresId };
      /*if (updatedIngres.dataEntrada > updatedIngres.dataSortida) {
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
      }*/



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
      })
    }
  }
}

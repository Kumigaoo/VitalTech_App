import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodiService } from '../../../../../../service/episodis.service';
import { EpisodiMedic } from '../../../../../../interface/episodis-medics.interface';

@Component({
  selector: 'app-modif-episodio',
  templateUrl: './modif-episodio.component.html',
  styleUrl: './modif-episodio.component.css'
})

export class ModifEpisodiComponent {

  modifEpisodiForm: FormGroup;
  episodiId: number=0;

  constructor(private fb: FormBuilder, private http: HttpClient, private episodiService: EpisodiService, private router: Router, private route: ActivatedRoute) {
    this.modifEpisodiForm = this.fb.group({
      id: [{value: '', disabled: true}],
      dataObertura: [''],
      dataTancament: [''],
      dolencia: [''],
      estat: [''],
      pacientId: [''],
      
    });
  }

  ngOnInit(): void {
    this.episodiId = Number(this.route.snapshot.paramMap.get('id'));
    this.episodiService.getEpisodisId(this.episodiId).subscribe(consulta => {

      consulta.dataObertura = consulta.dataObertura.split('T')[0];

      if(consulta.dataTancament != null) {
        consulta.dataTancament = consulta.dataTancament.split('T')[0];
      }

      this.modifEpisodiForm.patchValue(consulta);
      
    })
  }

  onUpdate(): void {

    if (this.modifEpisodiForm.valid) {
      const updatedPacient: EpisodiMedic = { ...this.modifEpisodiForm.getRawValue(), id: this.episodiId };
      this.episodiService.putEpisodi(updatedPacient).subscribe({
        next:() => {
          alert('Episodio actualizado con éxito.');
          this.router.navigate(['/episodis']);
        },
        error: (error) => {
          console.error('Error al actualitzar el pacient:', error);
        }
      })

    }

  }

}

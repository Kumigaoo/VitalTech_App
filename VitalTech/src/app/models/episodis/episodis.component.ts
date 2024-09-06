import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EpisodiService } from '../../service/episodis.service';
import { EpisodiMedic } from '../../interface/episodis-medics.interface';
import { ConsultesPopupComponent } from '../../pop-ups/consultes-popup/consultes-popup.component';
import { IngressosPopupComponent } from '../../pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-episodis',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './episodis.component.html',
  styleUrl: './episodis.component.css'
})

export class EpisodisComponent {

  episodis: EpisodiMedic[] = [];
  originalEpisodis: EpisodiMedic[] = [];
  selectedEpisodi: any;

  searchCriteria: string = "id";
  searchInput: string = "";

  constructor(public dialog: MatDialog,private episodiService: EpisodiService) { }

  ngOnInit() {
    this.loadEpisodis();
  }

  loadEpisodis(): void {
    this.episodiService.getEpisodis().subscribe(data => {
      this.episodis = data;
      this.originalEpisodis = data;
    });
  }

  searchEpisodi(): void {

    if (this.searchInput.trim() === '') {
      this.loadEpisodis();
      return;
    }

    this.episodis = this.originalEpisodis

    let busqueda: EpisodiMedic[] = [];

    switch (this.searchCriteria) {
      case 'id':
        for (let i = 0; i < this.episodis.length; i++) {
          if (this.episodis[i].id.toString().includes(this.searchInput)) {
            busqueda.push(this.episodis[i]);
          }
        }
        break;
      case 'dolencia':
        for (let i = 0; i < this.episodis.length; i++) {
          if (this.episodis[i].dolencia.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.episodis[i]);
          }
        }
        break;
     
    }

    this.episodis = busqueda;

  }

  deleteEpisodi(id: number): void {
    if (confirm('¿Estás seguro de querer eliminar este episodio médico?')) {
      this.episodiService.deleteEpisodi(String(id)).subscribe({
        next: () => {
          alert('Episodio médico eliminado correctamente.');
          this.loadEpisodis();
        },
        error: (error) => {
          alert('Error, no se puede eliminar este episodio médico: todavía existen consultas o ingresos.');
        }
      });
    }
  }
    
  openConsultes(episodi: any): void {
    this.dialog.open(ConsultesPopupComponent, {
      data: { consultes: episodi.consultes },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }

  openIngressos(episodi: any): void {
    this.dialog.open(IngressosPopupComponent, {
      data: { ingressos: episodi.ingressos },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }
  
}

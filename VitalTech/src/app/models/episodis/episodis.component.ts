import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EpisodiService } from './episodis.service';
import { EpisodiMedic } from '../../interface/episodis-medics.interface';
import { ConsultesPopupComponent } from './consultes-popup/consultes-popup.component';
import { IngressosPopupComponent } from './ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-episodis',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './episodis.component.html',
  styleUrl: './episodis.component.css'
})

export class EpisodisComponent {

  episodis: EpisodiMedic[] = [];
  selectedEpisodi: any;

  constructor(public dialog: MatDialog,private episodiService: EpisodiService) { }

  ngOnInit() {
    this.loadEpisodis();
  }

  loadEpisodis(): void {
    this.episodiService.getEpisodis().subscribe(data => {
      this.episodis = data;
    });
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

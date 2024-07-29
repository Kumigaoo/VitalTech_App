import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EpisodiService } from './episodis.service';

interface EpisodiMedic {
  id: number;
  dataObertura: string;
  dataTancament: string;
  dolencia: string;
  estat: string;
  pacientId: string;
  consultes: string[];
  ingressos: string[];
}

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

  constructor(private episodiService: EpisodiService) { }

  ngOnInit() {
    this.loadEpisodis();
  }

  loadEpisodis(): void {
    this.episodiService.getEpisodis().subscribe(data => {
      this.episodis = data;
    });
  }


}

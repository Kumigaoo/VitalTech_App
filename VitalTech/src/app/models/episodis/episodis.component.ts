import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EpisodiService } from './episodis.service';
import { EpisodiMedic } from '../../interface/episodis-medics.interface';


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

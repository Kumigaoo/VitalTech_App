import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Planta } from '../../interface/planta.interface';
import { PlantaService } from './planta.service';

@Component({
  selector: 'app-planta',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './planta.component.html',
  styleUrl: './planta.component.css'
})

export class PlantaComponent {


  
  plantes: Planta[] = [];

  constructor(private plantaService: PlantaService) { }

  ngOnInit() {
    this.loadPlantes();
  }

  loadPlantes(): void {
    this.plantaService.getPlantes().subscribe(data => {
      this.plantes = data;
    });
  }

}

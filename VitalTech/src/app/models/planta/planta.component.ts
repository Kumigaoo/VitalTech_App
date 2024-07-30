import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Planta } from '../../interface/planta.interface';
import { PlantaService } from './planta.service';
import { PlantaPopupComponent } from './planta-popup/planta-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-planta',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './planta.component.html',
  styleUrl: './planta.component.css'
})

export class PlantaComponent {


  
  plantes: Planta[] = [];

  constructor(public dialog: MatDialog, private plantaService: PlantaService) { }

  ngOnInit() {
    this.loadPlantes();
  }

  loadPlantes(): void {
    this.plantaService.getPlantes().subscribe(data => {
      this.plantes = data;
    });
  }

  openHabitacions(planta: any): void {
    this.dialog.open(PlantaPopupComponent, {
      data: { habitacions: planta.habitacions },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }

}

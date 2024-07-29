import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from './habitaciones.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})

export class HabitacionesComponent {

  habitacions: Habitacio[] = [];

  constructor(private habService: HabitacioService) { }

  ngOnInit() {
    this.loadHabitacions();
  }

  loadHabitacions(): void {
    this.habService.getHabitacions().subscribe(data => {
      this.habitacions = data;
    });
  }
}

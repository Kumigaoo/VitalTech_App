import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';
import { LlitsPopupComponent } from '../../pop-ups/llits-popup/llits-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})

export class HabitacionesComponent implements OnInit {

  constructor(public dialog: MatDialog, private habService: HabitacioService) { }

  protected inputValueId: number = 101;

  habitacions: Habitacio[] = [];

  async ngOnInit() {

    // Inicialització graella 
    this.loadHabitacions();

    // await this.loadHabitacio(this.inputValueId);

  }

  loadHabitacions() {

    this.habService.getHabitacions().subscribe(data => {
      this.habitacions = data;

    });


  }

  loadHabitacio() {

    this.habService.getHabitacio(this.inputValueId).subscribe(data =>
      this.habitacions.splice(0, this.habitacions.length + 1, data));

  }

  openLlits(habitacio: any): void {
    this.dialog.open(LlitsPopupComponent, {
      data: { llits: habitacio.llits },
      width: '80vw',
      height: '70vh',
      maxWidth: '1000px',
      maxHeight: '500px'
    });
  }

}

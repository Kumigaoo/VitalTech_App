import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';
import { LlitsPopupComponent } from '../../pop-ups/llits-popup/llits-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActualitzarHabitacionesComponent } from '../../formularis/actualitzar-habitaciones/actualitzar-habitaciones.component';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})

export class HabitacionesComponent implements OnInit {

  constructor(public dialog: MatDialog, private habService: HabitacioService) { }

  // Variables
  protected inputValueId: number = 101;

  protected id: number = 0;
  protected capacitat: number = 0;
  protected planta: number = 0;

  // Arays
  habitacions: Habitacio[] = [];

  nLlits: string[] = [];

  async ngOnInit() {

    // Inicialització graella 
    this.loadHabitacions();

  }

  // Constructor obllecte habitacio
  obllecteHabitacio(): Habitacio {
    const habitacioObject: Habitacio = this.habService.habitacioModel(this.id, this.capacitat, this.planta, this.nLlits);
    return habitacioObject;
  }

  // Mostra tota les habitacions
  loadHabitacions() {

    this.habService.getHabitacions().subscribe(data => {
      this.habitacions = data;

    });

  }

  // Mostra habitacio per ID
  loadHabitacio() {

    this.habService.getHabitacio(this.inputValueId).subscribe(data =>
      this.habitacions.splice(0, this.habitacions.length + 1, data));

  }

  // Afegir habitacio
  postHabitacio() {

    this.habService.postHabitacio(this.obllecteHabitacio());

  }

  // Actualiçar habitacio
  updateHabitacio(habitacio: Habitacio) {

    ActualitzarHabitacionesComponent.cargaFormulario(habitacio);

    this.habService.patchHabitcio(habitacio.codiHabitacio, habitacio).subscribe({

    });

  }

  // Eliminar habitacio
  deleteHabitacio(id: number) {

    this.habService.deleteHabitacio(id).subscribe({

    });

  }

  // Mostre els llits
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

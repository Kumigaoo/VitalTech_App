import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Habitacio, HabitacioNoLlit } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';
import { LlitsPopupComponent } from '../../pop-ups/llits-popup/llits-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { HabitacionesComponent } from '../../models/habitaciones/habitaciones.component';
import { NavComponent } from '../../common/nav/nav.component';


@Component({
  selector: 'app-agregar-habitaciones',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NavComponent],
  templateUrl: './agregar-habitaciones.component.html',
  styleUrl: './agregar-habitaciones.component.css'
})
export class AgregarHabitacionesComponent {

  // Variables
  protected id: number = 0;
  protected capacitat: number = 0;
  protected planta: number = 0;

  constructor(private habService: HabitacioService) {};

  // Constructor obllecte habitacio
  obllecteHabitacioNoLlit(): HabitacioNoLlit {
    let habitacioObjectNoLlit: HabitacioNoLlit = this.habService.habitacioModelNoLlit(this.id, this.capacitat, this.planta);
    return habitacioObjectNoLlit;
  }

  onSubmit() {
    
  this.habService.postHabitacio(this.obllecteHabitacioNoLlit()).subscribe({

    error: error => alert('ERROR, camps no valids'),
    complete: () => alert('Operacio completada')

  });

  }

}

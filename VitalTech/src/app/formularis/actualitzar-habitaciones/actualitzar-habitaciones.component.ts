import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';

@Component({
  selector: 'app-actualitzar-habitaciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actualitzar-habitaciones.component.html',
  styleUrl: './actualitzar-habitaciones.component.css'
})
export class ActualitzarHabitacionesComponent {

  // Variables
  protected id: number = 0;
  protected capacitat: number = 0;
  protected planta: number = 0;

  // Array
  protected llits: string[] = [];

  constructor(private habService: HabitacioService) { };

  // Constructor obllecte habitacio
  obllecteHabitacio(): Habitacio {
    const habitacioObject: Habitacio = this.habService.habitacioModel(this.id, this.capacitat, this.planta, this.llits);
    return habitacioObject;
  }

  // Inicializa los datos del formulario con los valores del objeto pasado
  async cargaFormulario(habitacio: Habitacio): Promise<Habitacio> {

    this.id = habitacio.codiHabitacio;
    this.capacitat = habitacio.capacitatLlits;
    this.planta = habitacio.plantaId;
    this.llits = habitacio.llits;

    await habitacio == this.onSubmit();

    return habitacio;

  }

  onSubmit(): Habitacio {

    return this.obllecteHabitacio();

  }

}

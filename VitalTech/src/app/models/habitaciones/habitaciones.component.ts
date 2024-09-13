import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Habitacio } from '../../interface/habitacio.interface';
import { HabitacioService } from '../../service/habitaciones.service';
import { LlitsPopupComponent } from '../../pop-ups/llits-popup/llits-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})

export class HabitacionesComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private habService: HabitacioService, 
    private sb: FormBuilder, 
    private router: Router
  ) { }

  // Variables
  protected inputValueId: number = 101;

  protected id: number = 0;
  protected capacitat: number = 0;
  protected planta: number = 0;

  public objHabitacio: Habitacio = this.obllecteHabitacio();

  // Estas son las variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  consultesHabitacio: Habitacio[] = [];
  pagedConsultes: Habitacio[] = []; // creo otra array de consultas que mostrara solamente aquellas por pagina

  // Arays
  habitacions: Habitacio[] = [];

  nLlits: string[] = [];

  async ngOnInit() {

    // Inicialització graella 
    this.loadHabitacions();

  }

  // Constructor objecte habitacio
  obllecteHabitacio(): Habitacio {
    const habitacioObject: Habitacio = this.habService.habitacioModel(
      this.id, 
      this.capacitat, 
      this.planta, 
      this.nLlits
    );
    return habitacioObject;
  }

  // Mostra tota les habitacions
  loadHabitacions() {

    this.habService.getHabitacions().subscribe({

      next: (Response) => {
        this.habitacions = Response;
        this.totalPages = Math.ceil(this.habitacions.length / this.itemsPerPage); // calcula cuantas paginas tendra dependiendo de los items que tenga cada una
        this.updatePagedConsultes();
      },
      error: (error) => {
        console.error('Error al buscar las habitaciones', error)
      }

    });

  }

  // Mostra habitacio per ID
  loadHabitacio() {

    this.habService.getHabitacio(this.inputValueId).subscribe({

      next: (response) => {
        this.habitacions.splice(0, this.habitacions.length + 1, response);
        this.totalPages = Math.ceil(this.habitacions.length / this.itemsPerPage); // calcula cuantas paginas tendra dependiendo de los items que tenga cada una
        this.updatePagedConsultes();
      },
      error: (error) => {
        console.error('Error al buscar la habitació', error);
      }
    });

  }

  // Afegir habitacio
  postHabitacio() {
    this.habService.postHabitacio(this.obllecteHabitacio());
  }

  // Actualizar habitacio
  updateHabitacio(habitacio: Habitacio) {
    this.router.navigate(['/habitaciones/actualizar', habitacio.codiHabitacio]);
  }

  // Eliminar habitacio
  deleteHabitacio(id: number) {

    if(confirm('¿Esta seguro de eliminar esta habitación?')){
      this.habService.deleteHabitacio(id).subscribe({
      next: (response) => {
        console.log('Habitació eliminada amb èxit', response);
        this.loadHabitacions();
      },
      error: (error) => {
        console.error('Error al eliminar la habitació', error);
      }
    });
  }

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

  // Paginasio
  // Esta función calcula los indices inicial y final, y mediante una función de types (slice), elimina de la array todos aquellos items que no entren en esa pagina
  updatePagedConsultes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedConsultes = this.habitacions.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedConsultes();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedConsultes();
    }
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePagedConsultes();
    }
  }

  lastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePagedConsultes();
    }
  }

}

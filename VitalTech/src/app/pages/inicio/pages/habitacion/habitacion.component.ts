import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Habitacio } from '../../../../interface/habitacio.interface';
import { HabitacioService } from '../../../../service/habitaciones.service';
import { LlitsPopupComponent } from '../../../../components/pop-ups/llits-popup/llits-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrl: './habitacion.component.css'
})

export class HabitacionComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private habService: HabitacioService, 
    private sb: FormBuilder, 
    private router: Router
  ) { }

  // Variables
  inputValueId: number = 101;

  // Estas son las variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pagedConsultes: Habitacio[] = []; // creo otra array de consultas que mostrara solamente aquellas por pagina

  // Arays
  habitacions: Habitacio[] = [];

  async ngOnInit() {

    // Inicialització graella 
    this.loadHabitacions();

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

  // Actualizar habitacio
  updateHabitacio(habitacio: Habitacio) {
    this.router.navigate(['/inicio/habitacion/modif-habitacion', habitacio.codiHabitacio]);
  }

  // Eliminar habitacio
  deleteHabitacio(id: number) {

    Swal.fire({

      title: 'Eliminar habitación',
      text: "¿Quieres borrar esta habitación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'

    }).then((result) => {

      if (result.isConfirmed) { 
        this.habService.deleteHabitacio(id).subscribe({
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Habitación eliminada',
              text: 'La habitación ha sido eliminada con éxito.'
            });
            if (this.pagedConsultes.length === 0){
                this.currentPage--;
            }
            this.loadHabitacions();
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error, no se puede eliminar esta habitación.'
            });
          }        
        });
      }
    });
    
  //   if(confirm('¿Esta seguro de eliminar esta habitación?')){
  //     this.habService.deleteHabitacio(id).subscribe({
  //     next: (response) => {
  //       console.log('Habitació eliminada amb èxit', response);
  //       this.loadHabitacions();
  //     },
  //     error: (error) => {
  //       console.error('Error al eliminar la habitació', error);
  //     }
  //   });
  // }

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

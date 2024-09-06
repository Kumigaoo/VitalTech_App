import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Planta } from '../../interface/planta.interface';
import { PlantaService } from '../../service/planta.service';
import { PlantaPopupComponent } from '../../pop-ups/planta-popup/planta-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-planta',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './planta.component.html',
  styleUrl: './planta.component.css'
})

export class PlantaComponent {

  plantes: Planta[] = [];
  protected searchInput: number = 1;



  constructor(public dialog: MatDialog, private plantaService: PlantaService, private router: Router) { }

  ngOnInit() {
    this.loadPlantes();
  }

  loadPlantes(): void {
    this.plantaService.getPlantes().subscribe(data => {
      this.plantes = data;
    });
  }

  searchPlanta(): void {
    if (!isNaN(this.searchInput)) { 
        this.plantaService.getPlanta(this.searchInput).subscribe({
          next: (data) => {
            this.plantes.splice(0, this.plantes.length + 1, data);
          },
          error: (error) => {
            console.error('Error al buscar la planta:', error),
            alert('No existe la planta con id ' + this.searchInput );
          }
        });
      } else {
        alert('Por favor, ingresa un ID válido.'); 
      }
  }

  deletePlanta(id: number): void {
    if (confirm('Estas seguro de eliminar esta planta?')) { 
      this.plantaService.deletePlanta(id).subscribe({
        next: () => {
          console.log('Planta eliminada correctamente');
          alert('Planta eliminada');
          this.loadPlantes();
        },
        error: (error) => {
          console.error('Error, no se pudo eliminar esta planta:', error);
          if (error.status == 400) {
              if (confirm('Esta planta tiene habitaciones y camas asociadas. ¿Deseas eliminar también habitaciones y camas?')) {
                this.deleteHabitacionesYPlanta(id);
              }else {
                alert('La planta no se ha eliminado porque tiene habitaciones o camas asociadas')
              }

          } else { 
            
            alert('Error al intentar eliminar la planta2');
          }
        }
      });
    }
  }

  modificarPlanta(id: number): void {
    this.router.navigate(['/modif-planta', id]);
  }
  deleteHabitacionesYPlanta(plantaId: number): void {

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

import { Component } from '@angular/core';
import { Llit } from '../../interface/llit.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CamasService } from '../../service/camas.service';
import { IngressosPopupComponent } from '../../pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-camas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent {

  llits: Llit[] = [];
  contador = 1;
  originalLlit: Llit[] = [];
  searchCriteria: string = "ocupat";
  searchInput: string = "";

  constructor(public dialog: MatDialog, private llitService: CamasService, private router: Router) { }

  ngOnInit() {
    this.loadLlits();
  }

  loadLlits(): void {
    this.llitService.getLlits().subscribe(data => {
      this.llits = data;
      this.originalLlit = data;
    });
  }

  openIngressos(episodi: any): void {
    this.dialog.open(IngressosPopupComponent, {
      data: { ingressos: episodi.ingressos },
      width: '80vw', 
      height: '70vh', 
      maxWidth: '1000px',
      maxHeight: '500px' 
    });
  }

  searchLlit(): void {

    if (this.searchInput.trim() === '') {
      this.loadLlits();
      return;
    }

    this.llits = this.originalLlit;

    let busqueda: Llit[] = [];

    switch (this.searchCriteria) {
      case 'idLlit':
        for (let i = 0; i < this.llits.length; i++) {
          if (this.llits[i].codiLlit.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.llits[i]);
          } 
        }
        alert('Por favor, ingresa un ID válido.'); 
        this.loadLlits();
        return;
      break;
      case 'ocupat':
        for (let i = 0; i < this.llits.length; i++) {
          if (this.searchInput.toLowerCase() === "true" && this.llits[i].ocupat == true) {
            busqueda.push(this.llits[i]);
          }
          if (this.searchInput.toLowerCase() === "false" && this.llits[i].ocupat == false) {
            busqueda.push(this.llits[i]);
          } 
        }
        alert('Por favor, ingresa true o false.'); 
        this.loadLlits();
        return;
      break;
      case 'idHabitacion':
        for (let i = 0; i < this.llits.length; i++) {
          if(Number(this.searchInput) === this.llits[i].habitacioId) {
            busqueda.push(this.llits[i]);
          }
        }
        alert('Por favor, ingresa un ID válido.'); 
        this.loadLlits();
        return;       
      break;
    }

    this.llits = busqueda;

  }


  deleteLlit(id: string): void {
    if (confirm('Estas seguro de eliminar esta cama?')) { 
      this.llitService.deleteLlit(id).subscribe({
        next: () => {
          console.log('Planta eliminada correctamente');
          alert('Cama eliminada');
          this.loadLlits();
        },
        error: (error) => {
          console.error('Error, no se pudo eliminar esta cama:', error);
          alert('La cama no se ha eliminado porque tiene ingresos asociados');
        }
      });
    }
  }

  modificarLlit(id: string): void {
    this.router.navigate(['/modif-llit', id]);
  }
  incrementar() {
    this.contador++;
  }

  decrementar() {
    this.contador--;
  }

}

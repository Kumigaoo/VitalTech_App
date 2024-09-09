import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresService } from '../../service/ingres.service';
import { Ingres } from '../../interface/ingres.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingres',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './ingres.component.html',
  styleUrl: './ingres.component.css',
})
export class IngresComponent {
  searchCriteria: string = 'id';
  searchInput: string = '';

  ingressos: Ingres[] = [];
  originalIngressos: Ingres[] = [];

  constructor(private ingresService: IngresService, private router: Router) {}

  ngOnInit() {
    this.loadIngres();
  }

  loadIngres(): void {
    this.ingresService.getIngressos().subscribe((data) => {
      this.ingressos = data;
      this.originalIngressos = data;
    });
  }

  updateIngres(idIngres: number) {
    this.router.navigate(['/modif-ingres', idIngres]);
  }

  deleteIngres(id: number) {
    if(confirm('¿Estas seguro de eliminar este ingreso?')) {
      this.ingresService.deleteIngres(id).subscribe({
      error: (error) => alert('ERROR'),
      complete: () => {
        alert('Ingres Borrat'), this.loadIngres();
      },
    });
  }
  }

  search(): void {
    if (this.searchInput.trim() === '') {
      this.loadIngres();
      return;
    }

    this.ingressos = this.originalIngressos;
    let busqueda: Ingres[] = [];

    switch (this.searchCriteria) {
      case 'id':
        for (let i = 0; i < this.ingressos.length; i++) {
          if (this.ingressos[i].id === Number(this.searchInput)) {
            busqueda.push(this.ingressos[i]);
          }
        }
        break;
      case 'entrada':
        for (let i = 0; i < this.ingressos.length; i++) {
          if (
            this.ingressos[i].dataEntrada
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())
          ) {
            busqueda.push(this.ingressos[i]);
          }
        }
        break;
      case 'sortida':
        for (let i = 0; i < this.ingressos.length; i++) {
          if (
            this.ingressos[i].dataSortida
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())
          ) {
            busqueda.push(this.ingressos[i]);
          }
        }
        break;
      case 'episodi':
        for (let i = 0; i < this.ingressos.length; i++) {
          if (this.ingressos[i].episodiMedicId === Number(this.searchInput)) {
            busqueda.push(this.ingressos[i]);
          }
        }
        break;
      case 'llit':
        for (let i = 0; i < this.ingressos.length; i++) {
          if (
            this.ingressos[i].llitId
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())
          ) {
            busqueda.push(this.ingressos[i]);
          }
        }
        break;
    }

    this.ingressos = busqueda;
  }
}

import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { Consulta } from '../../interface/consulta.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})

export class ConsultaComponent {
  constructor(private consultaService: ConsultaService, private router: Router) { }

  consultes: Consulta[] = [];
  protected searchId: number = 1;
  pagedConsultes: Consulta[] = []; // creo otra array de consultas que mostrara solamente aquellas por pagina
  searchCriteria: string = "dni";
  // Estas son las variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  searchInput: string = '';
  originalConsultes: Consulta[] = [];


  ngOnInit() {
    this.loadConsultes();
  }

  loadConsultes(): void {
    this.consultaService.getConsultes().subscribe(data => {
      this.consultes = data;
      this.originalConsultes = data;
      this.totalPages = Math.ceil(this.consultes.length / this.itemsPerPage); // calcula cuantas paginas tendra dependiendo de los items que tenga cada una
      this.updatePagedConsultes();
    });
  }

  //esta función calcula los indices inicial y final, y mediante una función de types (slice), elimina de la array todos aquellos items que no entren en esa pagina
  updatePagedConsultes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedConsultes = this.consultes.slice(startIndex, endIndex);
  }

  deleteConsulta(id: number): void {
    if (confirm('Estas seguro de eliminar esta consulta?')) {
      this.consultaService.deleteConsulta(id).subscribe({
        next: () => {
          console.log('Consulta eliminada correctamente');
          this.loadConsultes();
        },
        error: (error) => {
          console.error('Error, no se pudo eliminar esta consulta:', error);
        }
      });
    }
  }

  modificarConsulta(id: number): void {
    this.router.navigate(['/modif-consulta', id]);
  }

  searchConsulta(): void {
    if (this.searchInput.trim() == "") {
      this.loadConsultes()
      return;
    }

    this.consultes = this.originalConsultes
    let busqueda: Consulta[] = [];

    switch (this.searchCriteria.toLowerCase()) {
      case "idconsulta":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].id.toString() == this.searchInput) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;

      case "urgencia":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].urgencia.toString().toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;
      case "sintomatologia":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].sintomatologia.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;
      case "receta":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].recepta?.toLowerCase().includes(this.searchInput)) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;
      case "dni":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].personalId.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;
      case "episodio":
        for (let i = 0; i < this.consultes.length; i++) {
          if (this.consultes[i].episodiMedicId.toString() == this.searchInput) {
            busqueda.push(this.consultes[i]);
          }
        }
        break;
    }// como solo se muestra una solo hay una pagina
    
    this.consultes = busqueda;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.consultes.length / this.itemsPerPage);
    this.updatePagedConsultes();
   
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

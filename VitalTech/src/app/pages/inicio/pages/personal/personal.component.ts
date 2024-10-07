
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MetgeService } from '../../../../service/metge.service';
import { Metge } from '../../../../interface/metge.interface';
import { ConsultesPopupComponent } from '../../../../components/pop-ups/consultes-popup/consultes-popup.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EnumTranslatePipe } from '../../../../pipes/enum-translate.pipe';

@Component({
  selector: 'app-metge',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})

export class PersonalComponent {

  metges: Metge[] = [];
  originalMetge: Metge[] = [];
  searchInput: string = "";
  searchCriteria: string = "dni";

  constructor(public dialog: MatDialog, private metgeService: MetgeService, private router : Router) { }

  pagedPersonals: Metge[] = []; // creo otra array de consultas que mostrara solamente aquellas por pagina

  // Estas son las variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal(): void {
    this.metgeService.getPersonals().subscribe(data => {
      this.metges = data;
      this.originalMetge = data;
      this.totalPages = Math.ceil(this.metges.length / this.itemsPerPage); // calcula cuantas paginas tendra dependiendo de los items que tenga cada una
      this.updatePagedPersonals();
    });
  }
  
  updatePagedPersonals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedPersonals = this. metges.slice(startIndex, endIndex);

    if(this.metges.length == 0){
      return;
    }

    if(this.pagedPersonals.length == 0) {
        this.currentPage = this.currentPage - 1;
        this.loadPersonal();
    }

  }

  openConsultes(metge: any): void {
    this.dialog.open(ConsultesPopupComponent, {
      data: { consultes: metge.consultes },
      width: '80vw',
      height: '70vh',
      maxWidth: '1000px',
      maxHeight: '500px'
    });
  }

  searchPersonal(): void {
    if (this.searchInput.trim() === '') {
      this.loadPersonal();
      return;
    }

    this.metges = this.originalMetge;

    let busqueda: Metge[] = [];

    switch (this.searchCriteria.toLowerCase()) {
      case 'dni':
        for (let i = 0; i < this.metges.length; i++) {
          if (this.metges[i].dni.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.metges[i]);
          }
        }
        break;
      case 'nom':
        for (let i = 0; i < this.metges.length; i++) {
          if (this.metges[i].nom.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.metges[i]);
          }
        }
        break;
      case 'especialitat':
        for (let i = 0; i < this.metges.length; i++) {
          if (this.metges[i].especialitat.toLowerCase().includes(this.searchInput.toLowerCase())) {
            busqueda.push(this.metges[i]);
          }
        }
        break;
    }
    this.metges = busqueda;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.metges.length / this.itemsPerPage);
    this.updatePagedPersonals();
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedPersonals();
    }

  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedPersonals();
    }

  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePagedPersonals();
    }
  }

  lastPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePagedPersonals();
    }
  }

  updatePersonal(id : string) {
    this.router.navigate(['/inicio/personal/modif-personal', id]);
  }

  deletePersonal(idPersonal : string) {

    Swal.fire({

      title: 'Eliminar empleado',
      text: "¿Quieres borrar este empleado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'

    }).then((result) => {

      if (result.isConfirmed) { 
        this.metgeService.deletePacient(idPersonal).subscribe({
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Empleado eliminado',
              text: 'El empleado ha sido eliminado con éxito.'
            });
            if (this.pagedPersonals.length === 0){
                this.currentPage--;
            }
            this.loadPersonal();
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se puede eliminar este empleado: todavía existen consultas asociadas.'
            });
          }        
        });
      }
    });

  //   if(confirm('¿Desea eliminar este personal?')){
  //     this.metgeService.deletePacient(idPersonal).subscribe({
  //     error: error => alert('Hay Consultas relacionadas'),
  //     complete: () => {
  //       alert('Borrado con éxito'), this.loadPersonal()
  //     }
  //   })
  // }

}
}

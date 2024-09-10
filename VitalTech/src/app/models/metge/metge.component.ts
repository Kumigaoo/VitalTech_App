
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetgeService } from '../../service/metge.service';
import { Metge } from '../../interface/metge.interface'
import { ConsultesPopupComponent } from '../../pop-ups/consultes-popup/consultes-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metge',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './metge.component.html',
  styleUrl: './metge.component.css'
})


export class MetgeComponent {

  metges: Metge[] = [];
  originalMetge: Metge[] = [];
  searchInput: string = "";
  searchCriteria: string = "dni";

  constructor(public dialog: MatDialog, private metgeService: MetgeService, private router : Router) { }

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal(): void {
    this.metgeService.getPersonals().subscribe(data => {
      this.metges = data;
      this.originalMetge = data;
    });
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
  }
  updatePersonal(idPersonal : string) {
    this.router.navigate(['/modif-personal', idPersonal]);
  }

  deletePersonal(idPersonal : string) {
    this.metgeService.deletePacient(idPersonal).subscribe({
      error: error => alert('Hay Consultas relacionadas'),
      complete: () => {
        alert('Borrado con éxito'), this.loadPersonal()
      }
    })
  }
}

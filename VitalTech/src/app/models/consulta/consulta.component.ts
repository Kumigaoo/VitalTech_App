import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ConsultaService } from './consulta.service';
import { Consulta } from '../../interface/consulta.interface';



@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})

export class ConsultaComponent {

  consultes: Consulta[] = [];
  consultaSelec: Consulta | null = null;
  searchId: number | null = null;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit() {
    this.loadConsultes();
  }

  loadConsultes(): void {
    this.consultaService.getConsultes().subscribe(data => {
      this.consultes = data;
      this.consultaSelec = null;
    });
  }

  searchConsulta(): void {
    if(this.searchId !== null) {
      this.consultaService.getConsulta(this.searchId).subscribe(data => { 
        this.consultaSelec = data;
        this.consultes = [data];
      }, error => {
        console.error('No existeix cap consulta amb el id proporcionat'); 
        this.consultaSelec = null; 
        this.consultes = [];
      });
    } else {
      this.loadConsultes();
    }
  }

  

}

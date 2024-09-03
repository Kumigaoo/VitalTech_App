import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IngresService } from '../../service/ingres.service';
import { Ingres } from '../../interface/ingres.interface';


@Component({
  selector: 'app-ingres',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './ingres.component.html',
  styleUrl: './ingres.component.css'
})

export class IngresComponent {

  ingressos: Ingres[] = [];

  constructor(private ingresService: IngresService) { }

  ngOnInit() {
    this.loadIngres();
  }

  loadIngres(): void {
    this.ingresService.getIngressos().subscribe(data => {
      this.ingressos = data;
    });
  }

}


import { RouterLinkActive, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MetgeService } from './metge.service';
import {Metge} from '../../interface/metge.interface'
import { ConsultesPopupComponent } from './consultes-popup/consultes-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-metge',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './metge.component.html',
  styleUrl: './metge.component.css'
})


export class MetgeComponent {

  metges: Metge[] = [];

  constructor(public dialog: MatDialog, private metgeService: MetgeService) { }

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal(): void {
    this.metgeService.getPersonal().subscribe(data => {
      this.metges = data;
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

}

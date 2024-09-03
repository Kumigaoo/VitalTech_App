import { Component } from '@angular/core';
import { Llit } from '../../interface/llit.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CamasService } from '../../service/camas.service';
import { IngressosPopupComponent } from '../../pop-ups/ingressos-popup/ingressos-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-camas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent {

  llits: Llit[] = [];

  constructor(public dialog: MatDialog, private llitService: CamasService) { }

  ngOnInit() {
    this.loadLlits();
  }

  loadLlits(): void {
    this.llitService.getLlits().subscribe(data => {
      this.llits = data;
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

}

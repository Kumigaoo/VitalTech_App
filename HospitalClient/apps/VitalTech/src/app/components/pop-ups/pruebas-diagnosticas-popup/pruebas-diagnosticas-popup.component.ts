import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pruebas-diagnosticas-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pruebas-diagnosticas-popup.component.html',
  styleUrl: './pruebas-diagnosticas-popup.component.css',
})
export class PruebasDiagnosticasPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

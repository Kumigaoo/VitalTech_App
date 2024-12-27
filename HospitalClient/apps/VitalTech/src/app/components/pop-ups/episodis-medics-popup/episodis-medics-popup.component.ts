import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episodis-medics-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodis-medics-popup.component.html',
  styleUrl: './episodis-medics-popup.component.css',
})
export class EpisodisMedicsPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

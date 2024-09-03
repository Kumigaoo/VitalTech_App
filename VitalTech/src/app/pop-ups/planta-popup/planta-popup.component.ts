import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-planta-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planta-popup.component.html',
  styleUrl: './planta-popup.component.css'
})
export class PlantaPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

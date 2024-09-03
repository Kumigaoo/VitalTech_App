import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-consultes-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultes-popup.component.html',
  styleUrl: './consultes-popup.component.css'
})
export class ConsultesPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

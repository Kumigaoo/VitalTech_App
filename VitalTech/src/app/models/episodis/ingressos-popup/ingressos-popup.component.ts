import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-ingressos-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingressos-popup.component.html',
  styleUrl: './ingressos-popup.component.css'
})
export class IngressosPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}

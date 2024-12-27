import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-llits-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './llits-popup.component.html',
  styleUrl: './llits-popup.component.css',
})
export class LlitsPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

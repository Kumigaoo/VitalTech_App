import { Component } from '@angular/core';
import { Llit } from '../../interface/llit.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CamasService } from './camas.service';

@Component({
  selector: 'app-camas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent {

  llits: Llit[] = [];

  constructor(private llitService: CamasService) { }

  ngOnInit() {
    this.loadLlits();
  }

  loadLlits(): void {
    this.llitService.getLlits().subscribe(data => {
      this.llits = data;
    });
  }

}

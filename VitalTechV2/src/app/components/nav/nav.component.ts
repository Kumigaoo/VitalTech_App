import { Component } from '@angular/core';
import { BottonComponent } from '../nav/botton/botton.component';
import {INavBottons} from '../../models/interfaces/NavBottons.interface'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [BottonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor() { }
  
  ngOnInit(): void {

  }

  textBotton(): string {

  return "";

  }

}

import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
}

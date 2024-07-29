import { Component } from '@angular/core';
import { PacientService } from '../pacientes/pacientes.service';
import { PacientesComponent } from '../pacientes/pacientes.component';

interface JsonPatchDocument {
  op: string;
  path: string;
  value?: any;
}

interface Pacient {
  dni: string;
  numSS: string;
  nom: string;
  sexe: string;
  episodisMedics: string; // Ajusta los tipos según tu modelo real
}

@Component({
  selector: 'app-modificar-paciente',
  standalone: true,
  imports: [],
  templateUrl: './modificar-paciente.component.html',
  styleUrl: './modificar-paciente.component.css'
})

export class ModificarPacienteComponent {

  //pacient: Pacient | null = null;
  //dni: string = '';

  //constructor(private pacientService: PacientService) {}

  //// Buscar paciente por DNI
  //searchPacient(): void {
  //  this.pacientService.getPacient(this.dni).subscribe({
  //    next: (data) => {
  //      this.pacient = data;
  //    },
  //    error: (error) => {
  //      console.error('Error al buscar el paciente', error);
  //      this.pacient = null;
  //    }
  //  });
  //}

  //// Actualizar paciente
  //updatePacient(): void {
  //  if (this.pacient) {
  //    const patchDoc: JsonPatchDocument[] = [
  //      { op: 'replace', path: '/numSS', value: this.pacient.numSS },
  //      { op: 'replace', path: '/nom', value: this.pacient.nom },
  //      { op: 'replace', path: '/sexe', value: this.pacient.sexe },
  //      { op: 'replace', path: '/episodisMedics', value: this.pacient.episodisMedics }
  //    ];

  //    this.pacientService.updatePacient(this.pacient.dni, patchDoc).subscribe({
  //      next: () => {
  //        console.log('Paciente actualizado con éxito.');
  //      },
  //      error: (error) => {
  //        console.error('Error al actualizar el paciente', error);
  //      }
  //    });
  //  }
  //}

}

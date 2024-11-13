import { Component } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-metges',
  templateUrl: './metges.component.html',
  styleUrl: './metges.component.css'
})
export class MetgesComponent {
  //columnas a mostrar
  displayedColumns: string[] = ['DNI', 'Nombre','Nombre de usuario','Teléfono','Especialidad']
  

}

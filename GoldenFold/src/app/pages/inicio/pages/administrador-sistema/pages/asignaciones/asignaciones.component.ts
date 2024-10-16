import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../../../../../services/asignacion.service';
import { Asignacion } from '../../../../../../interface/asignacion.interface';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {
  asignaciones: Asignacion[] = [];
  nuevaAsignacion: Asignacion = {
    IdAsignacion: 0,
    IdPaciente: 0,
    IdCama: 0,
    FechaAsignacion: new Date(),
    FechaLiberacion: new Date(),
    AsignadoPor: 0
  };
  asignacionParaActualizar: Asignacion | null = null;

  constructor(private asignacionService: AsignacionService) {}

  ngOnInit(): void {
    this.obtenerAsignaciones();
  }

  obtenerAsignaciones(): void {
    this.asignacionService.getAsignaciones().subscribe({
      next: (data: Asignacion[]) => {
          this.asignaciones = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las asignaciones', error);
      }
    });
  }

  agregarAsignacion(): void {
    this.asignacionService.addAsignacion(this.nuevaAsignacion).subscribe({
      next: (nuevaAsignacion: Asignacion) => {
        this.asignaciones.push(nuevaAsignacion);
        this.nuevaAsignacion = {
          IdAsignacion: 0,
          IdPaciente: 0,
          IdCama: 0,
          FechaAsignacion: new Date(),
          FechaLiberacion: new Date(),
          AsignadoPor: 0
        };
      },
      error: (error: any) => {
        console.error('Error al agregar la asignación', error);
      }
    });
  }

  actualizarAsignacion(): void {
    if (this.asignacionParaActualizar) {
      this.asignacionService.updateAsignacion(this.asignacionParaActualizar).subscribe({
        next: (asignacionActualizada: Asignacion) => {
          const index = this.asignaciones.findIndex(a => a.IdAsignacion === asignacionActualizada.IdAsignacion);
          if (index !== -1) {
            this.asignaciones[index] = asignacionActualizada;
          }
          this.asignacionParaActualizar = null;
        },
        error: (error: any) => {
          console.error('Error al actualizar la asignación', error);
        }
      });
    }
  }

  borrarAsignacion(id: number): void {
    this.asignacionService.deleteAsignacion(id).subscribe({
      next: () => {
        this.asignaciones = this.asignaciones.filter(a => a.IdAsignacion !== id);
      },
      error: (error: any) => {
        console.error('Error al borrar la asignación', error);
      }
    });
  }

  toggleActualizarAsignacion(asignacion: Asignacion): void {
    this.asignacionParaActualizar = asignacion;
  }
}

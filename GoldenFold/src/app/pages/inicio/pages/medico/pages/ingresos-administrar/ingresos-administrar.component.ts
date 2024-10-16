import { Component, OnInit } from '@angular/core';
import { IngresoService } from '../../../../../../services/ingreso.service';
import { PacienteService } from '../../../../../../services/paciente.service';
import { AsignacionService } from '../../../../../../services/asignacion.service';
import { Ingreso } from '../../../../../../interface/ingreso.interface';
import { Asignacion } from '../../../../../../interface/asignacion.interface';
import { HistorialAltaService } from '../../../../../../services/historialAlta.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ingresos-administrar',
  templateUrl: './ingresos-administrar.component.html',
  styleUrls: ['./ingresos-administrar.component.css']
})
export class IngresosAdministrativoComponent implements OnInit {
  ingresos: Ingreso[] = []; // Lista de pacientes ingresados
  errorMensaje: string | null = null;
  ingresoSeleccionado: Ingreso | null = null; // Paciente seleccionado para dar de alta

  // Datos del formulario "Dar de Alta"
  diagnostico: string = '';
  tratamiento: string = '';
  fechaLiberacion: string = ''; // Fecha de liberación de la cama

  constructor(private pacienteService: PacienteService, private ingresoService: IngresoService, private asignacionService: AsignacionService, private historialAltaService: HistorialAltaService) {}

  ngOnInit() {
    this.obtenerPacientesIngresados();
  }

  // Obtener los pacientes ingresados
  obtenerPacientesIngresados() {
    this.ingresoService.getIngresos(undefined, undefined, 'Ingresado').subscribe({
      next: (ingresos: Ingreso[]) => {
        if (ingresos.length > 0) {
          this.ingresos = ingresos;
          this.errorMensaje = null; 
        } else {
          this.ingresos = [];
          this.errorMensaje = 'No hay pacientes ingresados actualmente.';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMensaje = 'Error al cargar los ingresos. Por favor, inténtalo de nuevo.';
        this.ingresos = [];
      }
    });
  }

  // Seleccionar un paciente para dar de alta
  darDeAlta(ingreso: Ingreso) {
    this.ingresoSeleccionado = ingreso;
  }

  // Confirmar el alta del paciente
  confirmarAlta() {
    if (!this.ingresoSeleccionado) {
      return;
    }

    const altaData = {
      IdHistorial: 0,
      IdPaciente: this.ingresoSeleccionado.IdPaciente,
      IdMedico: 6, // Ajusta el IdMedico según sea necesario
      Diagnostico: this.diagnostico,
      Tratamiento: this.tratamiento,
      FechaAlta: new Date(),
      FechaLiberacion: new Date(), // Asignar la fecha de liberación actual
    };

    // 1. Dar de alta al paciente
    this.historialAltaService.addHistorialAlta(altaData).subscribe({
      next: () => {
        // 2. Obtener la asignación asociada al paciente para actualizarla
        this.asignacionService.getAsignaciones(this.ingresoSeleccionado!.IdPaciente).subscribe({
          next: (asignaciones: Asignacion[]) => {
            if (asignaciones.length > 0) {
              const asignacion = asignaciones[0]; // Asumimos una única asignación activa
              asignacion.FechaLiberacion = new Date(); // Asignar la fecha de liberación actual

              // 3. Actualizar la asignación
              this.asignacionService.updateAsignacion(asignacion).subscribe({
                next: () => {
                  window.alert('Paciente dado de alta correctamente y asignación actualizada.');
                  this.resetFormulario();
                  this.obtenerPacientesIngresados();
                },
                error: () => {
                  window.alert('Error al actualizar la asignación.');
                }
              });
            } else {
              window.alert('No se encontró ninguna asignación para este paciente.');
            }
          },
          error: () => {
            window.alert('Error al obtener la asignación del paciente.');
          }
        });
      },
      error: () => {
        window.alert('Error al dar de alta al paciente.');
      }
    });
  }
  

  // Resetear el formulario
  resetFormulario() {
    this.ingresoSeleccionado = null;
    this.diagnostico = '';
    this.tratamiento = '';
    this.fechaLiberacion = '';
  }
}

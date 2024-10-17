import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../../../../../services/consulta.service';
import { Consulta } from '../../../../../../interface/consulta.interface';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  nuevaConsulta: Consulta = {
    id: 0,
    urgencia: '',
    sintomatologia: '',
    recepta: '',
    //IdPaciente: 0,
    dniPersonal: '',
    episodiMedicId: 0
    //Motivo: '',
    //Estado: ''
  };
  consultaParaActualizar: Consulta | null = null;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.obtenerConsultas(); 
  }

  obtenerConsultas(): void {
    this.consultaService.getConsultas().subscribe({
      next: (data: Consulta[]) => {
        this.consultas = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las consultas', error);
      }
    });
  }

  agregarConsulta(): void {
    this.consultaService.addConsulta(this.nuevaConsulta).subscribe({
      next: (nuevaConsulta: Consulta) => {
        this.consultas.push(nuevaConsulta);
        this.nuevaConsulta = {
          id: 0,
          urgencia: '',
          sintomatologia: '',
          recepta: '',
          //IdPaciente: 0,
          dniPersonal: '',
          episodiMedicId: 0
          //Motivo: '',
          //Estado: ''
        };
      },
      error: (error: any) => {
        console.error('Error al agregar la consulta', error);
      }
    });
  }

  actualizarConsulta(): void {
    if (this.consultaParaActualizar) {
      this.consultaService.updateConsulta(this.consultaParaActualizar).subscribe({
        next: (consultaActualizada: Consulta) => {
          const index = this.consultas.findIndex(c => c.id === consultaActualizada.id);
          if (index !== -1) {
            this.consultas[index] = consultaActualizada;
          }
          this.consultaParaActualizar = null;
        },
        error: (error: any) => {
          console.error('Error al actualizar la consulta', error);
        }
      });
    }
  }

  borrarConsulta(id: number): void {
    this.consultaService.deleteConsulta(id).subscribe({
      next: () => {
        this.consultas = this.consultas.filter(c => c.id !== id);
      },
      error: (error: any) => {
        console.error('Error al borrar la consulta', error);
      }
    });
  }

  toggleActualizarConsulta(consulta: Consulta): void {
    this.consultaParaActualizar = consulta;
  }
}

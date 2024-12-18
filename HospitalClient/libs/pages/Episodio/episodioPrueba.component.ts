import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EpisodiMedic } from '../../interfaces/episodis-medics.interface';
import { SnackbarComponent } from '../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EpisodiService } from '../../services/episodis.service';
import { DialogFormularioEpisodisModifComponent } from '../../forms/Episodio/Modif/dialog-formulario-episodis-modif.component';
import { DialogFormularioEpisodisComponent } from '../../forms/Episodio/Create/dialog-formulario-episodis.component';
import { ConsultasDialogComponent } from '../../popups/consultas-popup';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractTableComponent } from '../abstract-logic';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodis-medics-prueba',
  templateUrl: './episodisPrueba.component.html',
  styleUrls: [],
})

export class EpisodiComponent extends AbstractTableComponent<EpisodiMedic> implements OnInit, AfterViewInit {
    
    isPortVitalTech = false;

    constructor(
      private episodiService: EpisodiService,
      public override dialog: MatDialog
    ) {
      super(); // Llamada al constructor del abstracto
      this.dialog = dialog;
      this.addingItem = this.crearItemInicial();
    }

    ngOnInit(): void {
        this.obtenerItems(this.episodiService.getAll(), this.procesarFechas.bind(this));
    
        // Lógica para definir los estilos (CSS)
        const currentPort = window.location.port;
        let cssPath: string[] = [];

        this.isPortVitalTech = currentPort === '4200';
    
        if (currentPort === '4201') {
          cssPath = ['/assets/styles/styles.css', '/assets/styles/Episodio/4001.component.css'];
        } else {
          cssPath = ['/assets/styles/styles.css', '/assets/styles/Episodio/4000.component.css'];
        }
        
        // Cargar los estilos específicos del componente
        this.cargarEstilos(cssPath);
    
        // Configuración de las columnas para la tabla
        this.displayedColumns = [
          'id',
          'dataObertura',
          'dataTancament',
          'motivo',
          'urgencia',
          'recepta',
          'estat',
          'dniPacient',
          'dniMetge',
          'pruebasDiagnosticas',
          'acciones',
        ];
    }

    procesarFechas(data: EpisodiMedic[]): void {
        data.forEach((element) => {
          if (element.dataObertura) element.dataObertura = element.dataObertura.split('T')[0];
          if (element.dataTancament) element.dataTancament = element.dataTancament.split('T')[0];
        });
    }

    verRelaciones(episodi: EpisodiMedic): void {
        this.dialog.open(ConsultasDialogComponent, {
          width: '1200px',
          data: episodi.pruebasDiagnosticas,  // Pasar las pruebas diagnósticas como data
        });
    }

    crearItemInicial(): EpisodiMedic {
        return {
          id: 0,
          dataObertura: '',
          dataTancament: '',
          motivo: '',
          urgencia: '',
          recepta: '',
          estat: '',
          dniPacient: '',
          dniMetge: '',
          pruebasDiagnosticas: [],
          ingresos: [],
        };
    }

    // Implementación del método para obtener el componente del formulario
    obtenerDialogoFormularioRegistro(): any {
        return DialogFormularioEpisodisComponent;
    }

    obtenerDialogoFormularioModificacion(): any {
        return DialogFormularioEpisodisModifComponent; // Aquí se devuelve el diálogo de modificación específico
    }

    obtenerItemsService(): Observable<EpisodiMedic[]> {
        return this.episodiService.getAll();
    }

    guardarService(item: EpisodiMedic): Observable<any> {
        return this.episodiService.post(item);
    }

    obtenerIdOriginal(item: EpisodiMedic): number {
        return item.id; 
    }

    actualizarService(id: number, item: EpisodiMedic): Observable<any> {
        return this.episodiService.put(id, item);
    }

    eliminarService(id: number): Observable<any> {
        return this.episodiService.delete(id);
    }

    necesitaConfirmacion(): boolean {
        return this.isPortVitalTech;
    }

    mostrarConfirmacion(): Promise<any> {
        return Swal.fire({
          title: 'Eliminar episodio médico',
          text: '¿Quieres borrar este episodio médico?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar',
        });
    }

    definirFiltro(data: EpisodiMedic, type: string, filter: string): boolean {
        switch (type) {
          case 'dataObertura':
            return data.dataObertura?.toLowerCase().includes(filter) ?? false;
          case 'dataTancament':
            return data.dataTancament?.toLowerCase().includes(filter) ?? false;
          case 'estat':
            return data.estat?.toLowerCase().includes(filter) ?? false;
          case 'dniPacient':
            return data.dniPacient?.toLowerCase().includes(filter) ?? false;
          case 'id':
            return data.id?.toString().includes(filter) ?? false;
          default:
            return false;
        }
    }

}
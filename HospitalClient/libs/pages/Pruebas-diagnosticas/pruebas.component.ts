import { DialogFormularioConsultaModifComponent } from '../../forms/Prueba/dialog-formulario-consulta-modif.component';
import { SnackbarComponent } from './../../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { PruebasService } from './../../services/pruebas.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PruebaDiagnostica } from '../../interfaces/pruebas-diagnosticas.interface';
import Swal from 'sweetalert2';
import { AbstractTableComponent } from '../../utils/abstract-logic';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: [],
})
export class PruebasComponent extends AbstractTableComponent<PruebaDiagnostica> implements OnInit, AfterViewInit {
  
  isPortVitalTech = false;

  constructor(
    private pruebaService: PruebasService,
    public override dialog: MatDialog,
  ) {
    super();
    this.dialog = dialog;
    this.addingItem = this.crearItemInicial();   
  };


  ngOnInit(): void {
    this.obtenerItems(this.pruebaService.getAll());

    const currentPort = window.location.port;
    let cssPath: string[];

    this.isPortVitalTech = currentPort === '4200';

    if (currentPort == '4201'){
      cssPath = ['/assets/styles/styles.css', '/assets/styles/Pruebas-Diagnosticas/pruebas.component.css'];
    } else {
      cssPath = ['/assets/styles/styles.css', '/assets/styles/Pruebas-Diagnosticas/pruebas-diagnosticas.component.css'];
    }

    this.cargarEstilos(cssPath);

    this.displayedColumns = [
      'id',
      'dniMetge',
      'dniEnfermer',
      'episodiMedicId',
      'dolencia',
      'pruebas',
      'resultados',
      'correcta',
      'acciones',
    ];
  
  }

  crearItemInicial(): PruebaDiagnostica {
    return {
      id: 0,
      dniMetge: '',
      dniEnfermer: '',
      episodiMedicId: 0,
      dolencia: '',
      pruebas: '',
      resultados: '',
      correcta: false
    };
  }


  verRelaciones(prueba: PruebaDiagnostica): void {}

  obtenerDialogoFormularioRegistro(): any {
    return DialogFormularioConsultaModifComponent;
  }
    
  obtenerDialogoFormularioModificacion(): any {
    return DialogFormularioConsultaModifComponent; // Aquí se devuelve el diálogo de modificación específico
  }
    
    obtenerItemsService(): Observable<PruebaDiagnostica[]> {
      return this.pruebaService.getAll();
    }
    
    guardarService(item: PruebaDiagnostica): Observable<any> {
      return this.pruebaService.post(item);
    }
    
    obtenerIdOriginal(item: PruebaDiagnostica): number {
      return item.id; 
    }
    
    actualizarService(id: number, item: PruebaDiagnostica): Observable<any> {
      return this.pruebaService.put(id, item);
    }
    
    eliminarService(id: number): Observable<any> {
      return this.pruebaService.delete(id);
    }
    
    necesitaConfirmacion(): boolean {
      return this.isPortVitalTech;
    }


  mostrarConfirmacion(): Promise<any> {
      return Swal.fire({
        title: 'Eliminar prueba diagnostica',
        text: '¿Quieres borrar esta prueba diagnostica?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        });
  }
  
  definirFiltro(data: PruebaDiagnostica, type: string, filter: string): boolean {
    switch (type) {
      case 'dniMetge':
        return data.dniMetge?.toLowerCase().includes(filter) ?? false;
      case 'dniEnfermer':
        return data.dniEnfermer?.toLowerCase().includes(filter) ?? false;
      case 'episodiMedicId':
        return data.episodiMedicId?.toString().includes(filter) ?? false;
      case 'dolencia':
        return data.dolencia?.toLowerCase().includes(filter) ?? false;
      case 'id':
        return data.id?.toString().includes(filter) ?? false;
      default:
        return false;
    }
  }
}

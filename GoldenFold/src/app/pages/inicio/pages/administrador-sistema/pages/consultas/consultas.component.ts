import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from '../../../../../../services/consulta.service';
import { Consulta } from '../../../../../../interface/consulta.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormularioComponent } from '../../../../../../components/dialog-formulario/dialog-formulario.component';
import { HttpClient } from '@angular/common/http';
import { DialogFormulariocamaComponent } from '../../../../../../components/Formularios/Cama/dialog-formulario-cama-registro/dialog-formulario-cama.component';
import { DialogFormulariocamaModifComponent } from '../../../../../../components/Formularios/Cama/dialog-formulario-cama-modif/dialog-formulario-cama-modif.component';
import { DialogFormularioConsultaComponent } from '../../../../../../components/Formularios/Consulta/dialog-formulario-consulta-registro/dialog-formulario-consulta.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit, AfterViewInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent

  displayedColumns: string[] = ['id', 'urgencia', 'sintomatologia','receta','dniPersonal','episodiMedicId','acciones'];
  dataSource: MatTableDataSource<Consulta>  = new MatTableDataSource<Consulta>([]);
  
  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  consultas: Consulta[] = [];
  addingConsulta;
  consultaSeleccionada: Consulta | null = null;
  
  noti: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private consultaService: ConsultaService,public dialog: MatDialog, private http: HttpClient) {
    this.addingConsulta = {
      urgencia: '',
      sintomatologia: '',
      recepta: '',
      //IdPaciente: 0,
      dniPersonal: '',
      episodiMedicId: 0
      //Motivo: '',
      //Estado: ''
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerConsultas(); 
  }

  obtenerConsultas(): void {
    this.consultaService.getConsultas().subscribe({
      next: (data: Consulta[]) => {
        this.consultas = data;
        this.totalItems = data.length;
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener las consultas', error);
      }
    });
  }

  actualizarPagina(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.dataSource.data = this.consultas.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.actualizarPagina(this.pageIndex, this.itemsPerPage);
  }

  toggleFormularioAgregar(): void {
    this.addingConsulta = {
      urgencia: '',
      sintomatologia: '',
      recepta: '',
      dniPersonal: '',
      episodiMedicId: 0
    };
    this.dialog.open(DialogFormularioConsultaComponent, {
      data: this.addingConsulta
    }).afterClosed().subscribe((consultaCreada) => {
      if (consultaCreada) {
        this.guardarConsulta();
      }
    });
  } 
  cerrarFormulario(): void {
    this.consultaSeleccionada = null;
  }

  guardarConsulta(): void {
    this.http.post('http://localhost:5296/api/Consulta', this.addingConsulta).subscribe({
      next: () => {
        this.obtenerConsultas();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Consulta guardada exitosamente');
      },
      error: (error: any) => {
        console.error('Error al guardar la consulta', error);
        this.snackbar.showNotification('error', 'Error al guardar la consulta');
      },
    });
  }

  borrarConsulta(id: number): void {
    this.consultaService.deleteConsulta(id).subscribe({
      next: () => {
        this.obtenerConsultas(); 
        this.snackbar.showNotification('success', 'Consulta eliminada correctamente');
      },
      error: (error: any) => {
        console.error('Error al eliminar la consulta', error);
        this.snackbar.showNotification('error', 'Error al eliminar la consulta');
      },
    });
  }

  actualizarConsulta(): void {
    if (this.consultaSeleccionada) {
      this.consultaService.updateConsulta(this.consultaSeleccionada).subscribe({
        next: () => {
          this.obtenerConsultas();
          this.cerrarFormulario();
          this.snackbar.showNotification('success', 'Consulta actualizada correctamente'); // Notificación de éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar la Consulta', error);
          this.snackbar.showNotification('error', 'Error al actualizar la Consulta'); // Notificación de error
        },
      });
    } else {
      console.error('Cama seleccionada no es válida');
    }
  }

  filtrarConsultas(event: {type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();
    
    this.dataSource.filterPredicate = (data: Consulta, filter: string) => {
        switch (type) {
            case 'urgencia': 
                return data.urgencia?.toLowerCase().includes(filter) ?? false;
            case 'sintomatologia': 
                return data.sintomatologia?.toLowerCase().includes(filter) ?? false;
            case 'receta': 
                return data.recepta?.toLowerCase().includes(filter) ?? false;
            case 'dniPersonal': 
                return data.dniPersonal?.toLowerCase().includes(filter) ?? false;
            case 'id': 
                return data.id?.toString().includes(filter) ?? false;
            default: 
                return false;
        }
    };
    
    // Aplicar el filtro al dataSource
    this.dataSource.filter = searchterm;

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

}

// HTML code remains the same


    
    
  

}

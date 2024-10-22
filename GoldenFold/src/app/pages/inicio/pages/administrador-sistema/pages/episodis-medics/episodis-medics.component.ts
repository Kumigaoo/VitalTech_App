import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EpisodiMedic } from '../../../../../../interface/episodis-medics.interface';
import { SnackbarComponent } from '../../../../../../components/snackbar/snackbar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EpisodiService } from '../../../../../../services/episodis.service';
import { DialogFormularioEpisodisModifComponent } from '../../../../../../components/Formularios/Episodis/dialog-formulario-episodis-modif/dialog-formulario-episodis-modif.component';
import { DialogFormularioEpisodisComponent } from '../../../../../../components/Formularios/Episodis/dialog-formulario-episodis-registro/dialog-formulario-episodis.component';

@Component({
  selector: 'app-episodis-medics',
  templateUrl: './episodis-medics.component.html',
  styleUrls: ['./episodis-medics.component.css']
})

export class EpisodisMedicsComponent implements OnInit, AfterViewInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  displayedColumns: string[] = ['id', 'dataObertura', 'dataTancament', 'dolencia', 'estat', 'dniPacient', 'consultes', 'acciones'];
  dataSource: MatTableDataSource<EpisodiMedic> = new MatTableDataSource<EpisodiMedic>([]);

  totalItems = 0;
  itemsPerPage = 300;
  pageIndex = 0;

  episodis: EpisodiMedic[] = [];
  addingEpisodi;
  episodiSeleccionada: EpisodiMedic | null = null;
  noti: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private episodiService: EpisodiService, public dialog: MatDialog, private http: HttpClient) {
    this.addingEpisodi = {
      dataObertura: '',
      dataTancament: '',
      dolencia: '',
      estat: '',
      dniPacient: '',
      consultes: []
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerEpisodis();
  }

  obtenerEpisodis(): void {
    this.episodiService.getEpisodis().subscribe({
      next: (data: EpisodiMedic[]) => {
        this.episodis = data;

        this.episodis.forEach(element => {
          if(element.dataObertura) element.dataObertura = element.dataObertura.split("T")[0];
          if(element.dataTancament) element.dataTancament = element.dataTancament.split("T")[0];
        });

        this.totalItems = data.length;
        this.actualizarPagina(0, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error al obtener los episodis', error);
      }
    });
  }

  actualizarPagina(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.dataSource.data = this.episodis.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.actualizarPagina(this.pageIndex, this.itemsPerPage);
  }

  toggleFormularioAgregar(): void {
    this.addingEpisodi = {
      dataObertura: '',
      dataTancament: '',
      dolencia: '',
      estat: '',
      dniPacient: '',
      consultes: []
    };
    this.dialog.open(DialogFormularioEpisodisComponent, {
      data: this.addingEpisodi
    }).afterClosed().subscribe((episodiCreado) => {
      if (episodiCreado) {
        this.guardarEpisodi();
      }
    });
  }

  toggleActualizarEpisodi(episodi: EpisodiMedic): void {
    this.episodiSeleccionada = { ...episodi };
    this.dialog.open(DialogFormularioEpisodisModifComponent, {
      data: this.episodiSeleccionada
    }).afterClosed().subscribe((episodiActualizado) => {
      if (episodiActualizado) {
        this.episodiSeleccionada = episodiActualizado;
        this.actualizarEpisodi();
      }
    });
  }

  cerrarFormulario(): void {
    this.episodiSeleccionada = null;
  }

  guardarEpisodi(): void {
    this.http.post('http://localhost:5296/api/EpisodiMedic', this.addingEpisodi).subscribe({
      next: () => {
        this.obtenerEpisodis();
        this.cerrarFormulario();
        this.snackbar.showNotification('success', 'Episodi guardado exitosamente');
      },
      error: (error: any) => {
        console.error('Error al guardar el episodi', error);
        this.snackbar.showNotification('error', 'Error al guardar el episodi');
      },
    });
  }

  borrarEpisodi(id: number): void {
    this.episodiService.deleteEpisodi(id).subscribe({
      next: () => {
        this.obtenerEpisodis();
        this.snackbar.showNotification('success', 'Episodi eliminado correctamente');
      },
      error: (error: any) => {
        console.error('Error al eliminar el episodi', error);
        this.snackbar.showNotification('error', 'Error al eliminar el episodi');
      },
    });
  }

  actualizarEpisodi(): void {
    if (this.episodiSeleccionada) {
      this.episodiService.putEpisodi(this.episodiSeleccionada).subscribe({
        next: () => {
          this.obtenerEpisodis();
          this.cerrarFormulario();
          this.snackbar.showNotification('success', 'Episodi actualizado correctamente');
        },
        error: (error: any) => {
          console.error('Error al actualizar el episodi', error);
          this.snackbar.showNotification('error', 'Error al actualizar el episodi');
        },
      });
    } else {
      console.error('Episodi seleccionada no es válida');
    }
  }

  filtrarEpisodis(event: {type: string; term: string }): void {
    const { type, term } = event;
    const searchterm = term.trim().toLowerCase();
    
    this.dataSource.filterPredicate = (data: EpisodiMedic, filter: string) => {
        switch (type) {
            case 'dataObertura': 
                return data.dataObertura?.toLowerCase().includes(filter) ?? false;
            case 'dataTancament': 
                return data.dataTancament?.toLowerCase().includes(filter) ?? false;
            case 'dolencia': 
                return data.dolencia?.toLowerCase().includes(filter) ?? false;
            case 'estat': 
                return data.estat?.toLowerCase().includes(filter) ?? false;
            case 'dniPacient': 
                return data.dniPacient?.toLowerCase().includes(filter) ?? false;
            case 'id': 
                return data.id?.toString().includes(filter) ?? false;
            default: 
                return false;
        }
    };
    
    this.dataSource.filter = searchterm;

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}

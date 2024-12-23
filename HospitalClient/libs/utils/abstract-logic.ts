import { MatTableDataSource } from '@angular/material/table';
import { OnInit, AfterViewInit, ViewChild, Directive } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { SnackbarComponent } from '../../apps/GoldenFold/src/app/components/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Directive() 
export abstract class AbstractTableComponent<T> {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
    
    totalItems = 0;
    itemsPerPage = 300;
    pageIndex = 0;

    items: T[] = [];
    selectedItem: T | null = null;
    addingItem: T | null = null;
    noti: string | null = null;

    dialog!: MatDialog;

    constructor() {
        // Aquí no se hace nada específico, ya que la inicialización 
        // de propiedades específicas del tipo T se hace en los componentes hijos.
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    actualizarPagina(pageIndex: number, pageSize: number) {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        this.dataSource.data = this.items.slice(startIndex, endIndex);
    }
    
    onPaginateChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.itemsPerPage = event.pageSize;
        this.actualizarPagina(this.pageIndex, this.itemsPerPage);
    }

    obtenerItems(serviceMethod: Observable<T[]>, processData?: (data: T[]) => void): void {
        serviceMethod.subscribe({
          next: (data: T[]) => {
            this.items = data;
            if (processData) {
              processData(data); // Llamada a la función de procesamiento si está definida
            }
            this.totalItems = data.length;
            this.actualizarPagina(0, this.itemsPerPage);
          },
          error: (error: any) => {
            console.error('Error al obtener los datos', error);
            this.snackbar.showNotification('error', 'Error al obtener los datos');
          },
        });
    }

    cargarEstilos(cssPaths: string[]): void {
        cssPaths.forEach(css => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = css;
          document.head.appendChild(link);
        });
    }

    toggleFormularioAgregar(): void {
        this.addingItem = this.crearItemInicial();  // Llamada a método para inicializar el item
    
        this.dialog
          .open(this.obtenerDialogoFormularioRegistro(), {
            data: this.addingItem,
          })
          .afterClosed()
          .subscribe((itemCreado) => {
            if (itemCreado) {
              this.addingItem = itemCreado;
              this.guardarItem();  // Método para guardar el item, se implementará más tarde
            }
          });
    }


    guardarItem(): void {
        if (!this.addingItem) {
            return;
        }

        this.guardarService(this.addingItem)  // Usamos el método abstracto
          .subscribe({
            next: () => {
              this.obtenerItems(this.obtenerItemsService()); // Recarga los items después de guardar
              this.cerrarFormulario(); // Cierra el formulario después de guardar
              this.notificarExito('Datos guardados exitosamente');
            },
            error: (error: any) => {
              console.error('Error al guardar los datos', error);
              this.notificarError(error, 'Error al guardar los datos');
            }
          });
    }

    actualizarItem(itemOriginal: T) : void {
        if(this.selectedItem){
            const idOriginal  = this.obtenerIdOriginal(itemOriginal);
            this.actualizarService(idOriginal, this.selectedItem)
            .subscribe({
                next:()=> {
                    this.obtenerItems(this.obtenerItemsService());
                    this.cerrarFormulario();
                    this.notificarExito('Datos actualizados exitosamente');
                },
                error: (error: any) => {
                    console.error('Error al actualizar los datos', error);
                    this.notificarError(error, 'Error al actualizar los datos');
                  }
            })
        } else {
            console.error('Datos seleccionados no validos');
        }
    }

    toggleFormularioActualizar(item: T): void {
        this.selectedItem = { ...item };

        this.dialog
            .open(this.obtenerDialogoFormularioModificacion(), {
                data: this.selectedItem,
            })
            .afterClosed()
            .subscribe((itemActualizado) => {
                if (itemActualizado) {
                    this.selectedItem = itemActualizado;
                    this.actualizarItem(item); // Llamada al método abstracto para actualizar el item
                }
            });
    }

    borrarItem(id: number | string): void {
        if (this.necesitaConfirmacion()) {
          // Mostrar confirmación solo si el componente lo requiere
            this.mostrarConfirmacion().then((result) => {
            if (result.isConfirmed) {
                this.eliminarService(id).subscribe({
                    next: () => {
                    this.obtenerItems(this.obtenerItemsService());
                    this.notificarExito('Eliminado correctamente');
                    },
                    error: (error: any) => {
                    this.notificarError(error, 'Error al eliminar');
                    },
                });
                }
            });
        } else {
          // Eliminar directamente si no se requiere confirmación
            this.eliminarService(id).subscribe({
                next: () => {
                this.obtenerItems(this.obtenerItemsService());
                this.notificarExito('Eliminado correctamente');
                },
                error: (error: any) => {
                this.notificarError(error, 'Error al eliminar');
                },
            });
        }
    }

    aplicarFiltro(event: { type: string; term: string }): void {
        const { type, term } = event;
        const searchTerm = term.trim().toLowerCase();
    
        // Definir el predicado de filtrado utilizando el método abstracto
        this.dataSource.filterPredicate = (data: T, filter: string) => {
          return this.definirFiltro(data, type, filter);
        };
    
        // Aplicar el término de búsqueda al filtro
        this.dataSource.filter = searchTerm;
    
        // Reiniciar la paginación al aplicar un filtro
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }


    // Método abstracto para obtener el servicio de los items (a implementar en cada componente hijo)
    abstract obtenerItemsService(): Observable<T[]>;

    // Método abstracto para realizar el guardado (a implementar en cada componente hijo)
    abstract guardarService(item: T): Observable<any>;
    abstract actualizarService(id: number | string | null, item: T): Observable<any>;
    abstract eliminarService(id: number | string): Observable<any>;

    abstract obtenerIdOriginal (item: T): number | string | null;

    // Método abstracto para inicializar el item, debe ser implementado por cada componente
    abstract crearItemInicial(): T;

    // Método abstracto para manejar la confirmación
    abstract necesitaConfirmacion(): boolean;

    // Método abstracto para mostrar confirmación
    abstract mostrarConfirmacion(): Promise<any>;

    // Método abstracto para obtener el componente del diálogo, debe ser implementado por cada componente
    abstract obtenerDialogoFormularioRegistro(): any;
    abstract obtenerDialogoFormularioModificacion(): any;

    abstract verRelaciones(item: T): void;

    // Método abstracto para definir el criterio de filtro específico de cada componente
    abstract definirFiltro(data: T, type: string, filter: string): boolean;

    cerrarFormulario(): void {
        this.selectedItem = null;
    }

    // Manejo genérico de notificaciones
    notificarExito(mensaje: string): void {
        this.snackbar.showNotification('success', mensaje);
    }

    notificarError(error: any, mensaje: string): void {
        console.error(mensaje, error);
        this.snackbar.showNotification('error', mensaje);
    }



}
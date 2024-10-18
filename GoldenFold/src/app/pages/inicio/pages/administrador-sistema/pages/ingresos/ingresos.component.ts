import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ingreso } from '../../../../../../interface/ingreso.interface';
import { IngresoService } from '../../../../../../services/ingreso.service';
import { Cama } from '../../../../../../interface/cama.interface';
import { CamaService } from '../../../../../../services/cama.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EpisodiMedic } from '../../../../../../interface/episodis-medics.interface';
import { EpisodiService } from '../../../../../../services/episodis.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  //angular material
  displayedColumns: string[] = ['id', 'dataEntrada', 'dataSortida', 'episodiMedicId', 'codiLlit','Actions'];
  ingresos: MatTableDataSource<Ingreso> = new MatTableDataSource<Ingreso>([]);

  //paginador y ordenador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Formularios reactivos
  ingresoForm!: FormGroup;
  ingresoParaActualizar: Ingreso | null = null;

  //propiedaddes utiles
  llits: Cama[] = [];
  episodisMedics: EpisodiMedic[] = [];
  datasSortida: Date[] = [];

  constructor(private ingresoService: IngresoService, private camaService: CamaService, private episodiService: EpisodiService, private fb: FormBuilder ) {
    // Obtener los ingresos y camas disponibles al iniciar el componente
    this.obtenerIngresos();
    this.obtenerCamas();
    this.obtenerEpisodisMedics();
    // Crear el formulario para manejar los ingresos
    this.crearFormularioIngreso();
  }

  ngOnInit(): void {
    
  }

  // Crear formulario de ingreso con validaciones necesarias
  crearFormularioIngreso(): void{
    this.ingresoForm = this.fb.group({
      id: [0],
      dataEntrada: [null],
      // Definir campos adicionales si es necesario, comentados para este ejemplo
      // IdMedico: ['', [Validators.required]],
      // Motivo: ['', [IngresosValidators.noWhitespaceValidator()]],
      // FechaSolicitud: [new Date()],
      // FechaIngreso: [null],
      dataSortida: [null],
      episodiMedicId: ['', [Validators.required]],
      codiLlit: ['', [Validators.required]],
      // TipoCama: ['', [Validators.required]],
      // IdAsignacion: [null]
  });
  }

  // Obtener la lista de camas disponibles desde el servicio correspondiente
  obtenerCamas(): void{
    this.camaService.getLlits().subscribe({
      next: (data: Cama[]) => {
        this.llits = data;
      },
      error: (error : any) =>{
        console.error('Error al cargar las camas', error);
      }
    });
  }

  // obtener la lista de episodios medicos desde el servicio correspondiente
  obtenerEpisodisMedics(): void{
    this.episodiService.getEpisodis().subscribe({
      next: (data:EpisodiMedic[]) =>{
        this.episodisMedics = data;
      },
      error: (error:any) =>{
        console.log('Error al cargar los episodios medicos');
      }
    })
  }

  // Obtener la lista de ingresos desde el servicio correspondiente
  obtenerIngresos(): void {
    this.ingresoService.getIngresosos().subscribe({
      next: (data: Ingreso[]) => {
        this.ingresos.data = data;
        this.ingresos.paginator = this.paginator;
        this.ingresos.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error al obtener los ingresos', error);
      }
    });
  }

  // Agregar un nuevo ingreso a la lista
  agregarIngreso(): void {
    if(this.ingresoForm.valid) {
      // Crear un nuevo objeto de tipo Ingreso basado en los valores del formulario
      const nuevoIngreso: Ingreso = this.ingresoForm.value;
      // Asignar la fecha de entrada al nuevo ingreso
      nuevoIngreso.dataEntrada = new Date();
      this.ingresoService.postIngreso(nuevoIngreso).subscribe({
        next: (ingreso: Ingreso) => {
          // Agregar el ingreso a la lista de ingresos
          this.ingresos.data = [...this.ingresos.data,ingreso];
          console.log(ingreso);
          // Reiniciar el formulario después de agregar el ingreso
          this.obtenerIngresos();
          this.ingresoForm.reset();
          alert('Ingreso creado con exito');
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          alert(mensajeError);
        },
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');  
    }
  }

  // Actualizar un ingreso existente
  actualizarIngreso(): void {
    if(this.ingresoParaActualizar && this.ingresoForm.valid){
      // Crear una copia del ingreso existente con los valores actualizados
      const ingresoActualizado: Ingreso = {...this.ingresoParaActualizar, ...this.ingresoForm.value};
      this.ingresoService.putIngreso(ingresoActualizado).subscribe({
        next:() => {
          // Obtener la lista de ingresos actualizada
          this.obtenerIngresos();
          // Restablecer las variables del formulario y del ingreso a actualizar
          this.ingresoParaActualizar = null;
          this.ingresoForm.reset();
          alert('Ingreso actualizado con éxito.');
        },
        error:(error: any) => {
          console.error('Error al actualizar el ingreso', error);
        }
      });
    }
  }
  filtrarIngresos(event: { type: string; term: string }): void {
    const { type, term } = event;
    const searchTerm = term.trim().toLowerCase();
  
    this.ingresos.filterPredicate = (data: Ingreso, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      
      if (type === 'id') {
        return data.id.toString().toLowerCase() === lowerCaseFilter.toString() || false;  // Si busca por ID
      } else if (type === 'episodiMedicId') {
        return data.episodiMedicId.toString().toLowerCase() === lowerCaseFilter.toString() || false;
      } else if (type === 'codiLlit') {
        return (data.codiLlit?.toString().toLowerCase().includes(lowerCaseFilter)) ?? false;
      }
      return false;  // Si no coincide ningún tipo
    };
  
    this.ingresos.filter = searchTerm;
  
    if (this.ingresos.paginator) {
      this.ingresos.paginator.firstPage();  // Resetea a la primera página si hay un filtro activo
    }
  }
  
  // Borrar un ingreso de la lista
  borrarIngreso(id: number): void {
    this.ingresoService.deleteIngreso(id).subscribe({
      next: () => {
        // Eliminar el ingreso de la lista de ingresos
        this.ingresos.data = this.ingresos.data.filter(i => i.id !== id);
        alert('Ingreso eliminado correctamente');
      },
      error: (error: any) => {
        console.error('Error al borrar el ingreso', error);
      }
    });
  }

  // Cambiar entre agregar o actualizar un ingreso existente
  toggleActualizarIngreso(ingreso: Ingreso): void {
    if(this.ingresoParaActualizar && this.ingresoParaActualizar.id === ingreso.id){
      this.ingresoParaActualizar = null;
      this.ingresoForm.reset();
    }
    else {
      // Cargar el ingreso seleccionado para actualizar en el formulario
      this.ingresoParaActualizar = {...ingreso};
      this.ingresoForm.patchValue(this.ingresoParaActualizar);
    }
  }

  // Cancelar la creación de un nuevo ingreso
  cancelarNuevoIngreso(): void{
    this.ingresoForm.reset();
  }

  // Cancelar la actualización de un ingreso existente
  cancelarActualizarIngreso(): void{
    this.ingresoParaActualizar = null;
    this.ingresoForm.reset();
  }
}

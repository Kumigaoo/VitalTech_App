import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingreso } from '../../../../../../interface/ingreso.interface';
import { Paciente } from '../../../../../../interface/paciente.interface';
import { Usuario } from '../../../../../../interface/usuario.interface';
import { IngresoService } from '../../../../../../services/ingreso.service';
import { PacienteService } from '../../../../../../services/paciente.service';
import { UsuarioService } from '../../../../../../services/usuario.service';
import { IngresosValidators } from '../../../../../../validators/ingresos.validators';
import { Cama } from '../../../../../../interface/cama.interface';
import { CamaService } from '../../../../../../services/cama.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  ingresos: Ingreso[] = [];
  llits: Cama[] = [];
  ingresoForm!: FormGroup;
  ingresoParaActualizar: Ingreso | null = null;

  constructor(private ingresoService: IngresoService, private camaService: CamaService, private pacienteService: PacienteService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerIngresos();
    this.obtenerCamas();
    this.crearFormularioIngreso();
  }

  crearFormularioIngreso(): void{
    this.ingresoForm = new FormGroup({
      id: new FormControl(0),
      dataEntrada: new FormControl(null),
      //IdMedico: new FormControl('',[Validators.required]),
      //Motivo: new FormControl('',[IngresosValidators.noWhitespaceValidator()]),
      //FechaSolicitud: new FormControl(new Date()),
      //FechaIngreso: new FormControl (null),
      dataSortida: new FormControl(null),
      episodiMedicId: new FormControl('',[Validators.required]),
      codiLlit: new FormControl('',[Validators.required]),
      //TipoCama: new FormControl('',[Validators.required]),
      //IdAsignacion: new FormControl(null)
    });
  }

  obtenerCamas(): void{
    this.camaService.getCamas().subscribe({
      next: (data: Cama[]) => {
        this.llits = data;
      },
      error: (error : any) =>{
        console.error('Error al cargar las camas',error);
      }
    })
  }

  obtenerIngresos(): void {
    this.ingresoService.getIngresosos().subscribe({
      next: (data: Ingreso[]) => {
        this.ingresos = data;
      },
      error: (error: any) => {
        console.error('Error al obtener los ingresos', error);
      }
    });
  }

  agregarIngreso(): void {
    if(this.ingresoForm.valid) {
      const nuevoIngreso: Ingreso = this.ingresoForm.value; //obtener los datos del formulario
      this.ingresoService.postIngreso(nuevoIngreso).subscribe({
        next: (ingreso: Ingreso) => {
          ingreso.dataEntrada = new Date();
          this.ingresos.push(ingreso);
          console.log(ingreso);
          this.ingresoForm.reset(); //despues de agregarlo, reseteas el formulario
          alert('Ingreso creado con exito');
        },
        error: (error: any) => {
          const mensajeError =
            error.error || 'Error inesperado. Inténtalo de nuevo.';
          alert(mensajeError);
        },
      });
    } else{
      alert('Por favor, completa todos los campos requeridos.');  
    }
  }


  actualizarIngreso(): void {
    if(this.ingresoParaActualizar&&this.ingresoForm.valid){
      const ingresoActualizado: Ingreso = {...this.ingresoParaActualizar,...this.ingresoForm.value};
      this.ingresoService.putIngreso(ingresoActualizado).subscribe({
        next:() =>{
          this.obtenerIngresos();
          this.ingresoParaActualizar=null;
          this.ingresoForm.reset();
          alert('Ingreso actualizado con éxito.');
        },
        error:(error: any)=>{
          console.error('Error al actualizar el ingreso',error);
        }
      })
    }
  }

  borrarIngreso(id: number): void {
    this.ingresoService.deleteIngreso(id).subscribe({
      next: () => {
        this.ingresos = this.ingresos.filter(i => i.id !== id);
      },
      error: (error: any) => {
        console.error('Error al borrar el ingreso', error);
      }
    });
  }

  toggleActualizarIngreso(ingreso: Ingreso): void {
    if(this.ingresoParaActualizar&&this.ingresoParaActualizar.id===ingreso.id){
      this.ingresoParaActualizar==null;
      this.ingresoForm.reset();
    }
    else{
      this.ingresoParaActualizar = {...ingreso};
      this.ingresoForm.patchValue(this.ingresoParaActualizar);
    }
  }

  cancelarNuevoIngreso(): void{
    this.ingresoForm.reset();
  }

  cancelarActualizarIngreso(): void{
    this.ingresoParaActualizar = null;
    this.ingresoForm.reset();
  }
}

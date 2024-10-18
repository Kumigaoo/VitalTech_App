import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';

// Angular Material Imports

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Componentes personalizados
import { DialogFormularioComponent } from '../../components/dialog-formulario/dialog-formulario.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { DialogFormulariocamaComponent } from '../../components/Formularios/Cama/dialog-formulario-cama-registro/dialog-formulario-cama.component';
import { MatCheckboxModule } from '@angular/material/checkbox';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatOption,
    MatCardModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    DialogFormularioComponent,
    DialogFormulariocamaComponent,
    MatCheckboxModule,

    // Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    SearchBoxComponent,
    DialogFormularioComponent,
    SnackbarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatOption,

    // Exportación de componentes
    SearchBoxComponent,
    DialogFormularioComponent, // Exportar si se va a usar fuera del módulo

    // Exportación de Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    SearchBoxComponent,
    DialogFormularioComponent,
    SnackbarComponent,
    DialogFormulariocamaComponent,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class SharedModule { }

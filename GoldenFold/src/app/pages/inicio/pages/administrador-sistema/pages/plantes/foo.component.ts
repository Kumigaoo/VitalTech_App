import { Component } from "@angular/core";
import { PageEvent } from '@angular/material/paginator'; // Asegúrate de importar PageEvent si lo estás usando

@Component({
    selector: 'app-plantes',
    templateUrl: './plantes.component.html', // Asegúrate de tener un archivo HTML asociado
    styleUrls: ['./plantes.component.css'] // Asegúrate de tener un archivo CSS asociado
})
export class PlantesComponent { // Cambiado de FooService a PlantesComponent

    pageEvent: PageEvent | undefined;
    datasource: any[] = []; 
    pageIndex: number = 0; 
    pageSize: number = 10;

    constructor() {
        // Inicializa cualquier dato necesario aquí
    }

    getData(): void {
        // Aquí puedes implementar la lógica para obtener datos
        // Por ejemplo, podrías hacer una llamada a un servicio para obtener datos
        console.log('Obteniendo datos...');
        // Simulación de datos
        this.datasource = Array.from({ length: 100 }, (_, i) => `Item #${i + 1}`);
    }

    onPageChange(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getData(); // Llama a getData para actualizar los datos según la página
    }
}
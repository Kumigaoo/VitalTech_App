import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  // Formato que queremos para mostrar la fecha
  override format(date: Date, displayFormat: Object): string {
    const day = this.padTo2Digits(date.getDate());
    const month = this.padTo2Digits(date.getMonth() + 1); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Método para parsear la fecha desde un string
  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const parts = value.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Ajustar para el mes 0-11
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  }

  // Método para asegurar que los días tengan 2 dígitos
  private padTo2Digits(num: number): string {
    return num < 10 ? '0' + num : String(num);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat', standalone: true })
export class DateFormatPipe implements PipeTransform {
  /**
   * Transforma 'YYYY-MM-DD' + 'HH:mm' a texto legible.
   * Ejemplo: '2025-06-15' + '10:30' → 'Domingo 15 de junio, 10:30 h'
   */
  transform(date: string, time?: string): string {
    if (!date) return '';

    const [year, month, day] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day);

    const formatted = d.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    const capitalized =
      formatted.charAt(0).toUpperCase() + formatted.slice(1);

    return time ? `${capitalized}, ${time} h` : capitalized;
  }
}

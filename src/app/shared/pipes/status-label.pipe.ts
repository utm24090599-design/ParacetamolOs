import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentStatus } from '../../core/entities/appointment.entity';

const STATUS_MAP: Record<AppointmentStatus, string> = {
  confirmed: 'Confirmada',
  pending:   'Pendiente',
  cancelled: 'Cancelada',
};

@Pipe({ name: 'statusLabel', standalone: true })
export class StatusLabelPipe implements PipeTransform {
  transform(status: AppointmentStatus): string {
    return STATUS_MAP[status] ?? status;
  }
}

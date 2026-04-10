import { Injectable } from '@angular/core';
import { Appointment, TimeSlot, createAppointment } from '../entities/appointment.entity';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable({ providedIn: 'root' })
export class BookAppointmentUseCase {
  constructor(private readonly appointmentRepo: AppointmentRepository) {}

  async execute(
    patientId: string,
    doctorId: string,
    slot: TimeSlot
  ): Promise<Appointment> {
    if (!patientId?.trim()) throw new Error('Paciente requerido.');
    if (!doctorId?.trim()) throw new Error('Doctor requerido.');
    if (!slot?.date || !slot?.time) throw new Error('Selecciona fecha y hora.');

    const draft = createAppointment({ patientId, doctorId, slot });
    return this.appointmentRepo.book(draft);
  }
}

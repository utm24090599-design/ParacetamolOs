import { Injectable } from '@angular/core';
import { TimeSlot } from '../entities/appointment.entity';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable({ providedIn: 'root' })
export class GetAvailableSlotsUseCase {
  constructor(private readonly appointmentRepo: AppointmentRepository) {}

  async execute(doctorId: string): Promise<TimeSlot[]> {
    if (!doctorId?.trim()) {
      throw new Error('Se requiere seleccionar un doctor.');
    }
    return this.appointmentRepo.getAvailableSlots(doctorId);
  }
}

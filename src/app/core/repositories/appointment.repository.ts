import { Appointment, TimeSlot } from '../entities/appointment.entity';
import { Doctor } from '../entities/doctor.entity';

export abstract class AppointmentRepository {
  abstract getDoctors(): Promise<Doctor[]>;
  abstract getAvailableSlots(doctorId: string): Promise<TimeSlot[]>;
  abstract book(
    appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>
  ): Promise<Appointment>;
  abstract getByPatient(patientId: string): Promise<Appointment[]>;
}

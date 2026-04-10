import { Doctor } from '../../core/entities/doctor.entity';
import { Appointment, TimeSlot } from '../../core/entities/appointment.entity';
import {
  DoctorDto,
  TimeSlotDto,
  AppointmentResponseDto,
  AppointmentRequestDto,
} from '../dtos/appointment.dto';

// ── Doctor ────────────────────────────────────────────────

export function doctorFromDto(dto: DoctorDto): Doctor {
  return {
    id:         dto.id,
    name:       dto.name,
    specialty:  dto.specialty,
    avatarUrl:  dto.avatar_url,
    available:  dto.available,
  };
}

// ── TimeSlot ──────────────────────────────────────────────

export function timeSlotFromDto(dto: TimeSlotDto): TimeSlot {
  return { date: dto.date, time: dto.time };
}

// ── Appointment ───────────────────────────────────────────

export function appointmentFromDto(dto: AppointmentResponseDto): Appointment {
  return {
    id:        dto.id,
    patientId: dto.patient_id,
    doctorId:  dto.doctor_id,
    slot:      { date: dto.date, time: dto.time },
    status:    dto.status,
    createdAt: dto.created_at,
  };
}

export function appointmentToDto(
  appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>
): AppointmentRequestDto {
  return {
    patient_id: appointment.patientId,
    doctor_id:  appointment.doctorId,
    date:       appointment.slot.date,
    time:       appointment.slot.time,
  };
}

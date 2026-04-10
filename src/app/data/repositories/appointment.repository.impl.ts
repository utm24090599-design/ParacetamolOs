import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppointmentRepository } from '../../core/repositories/appointment.repository';
import { Appointment, TimeSlot } from '../../core/entities/appointment.entity';
import { Doctor } from '../../core/entities/doctor.entity';
import {
  DoctorDto,
  TimeSlotDto,
  AppointmentResponseDto,
} from '../dtos/appointment.dto';
import {
  doctorFromDto,
  timeSlotFromDto,
  appointmentFromDto,
  appointmentToDto,
} from '../dtos/appointment.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentRepositoryImpl extends AppointmentRepository {
  private readonly base = `${environment.apiUrl}/appointments`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  async getDoctors(): Promise<Doctor[]> {
    const dtos = await firstValueFrom(
      this.http.get<DoctorDto[]>(`${environment.apiUrl}/doctors`)
    );
    return dtos.map(doctorFromDto);
  }

  async getAvailableSlots(doctorId: string): Promise<TimeSlot[]> {
    const dtos = await firstValueFrom(
      this.http.get<TimeSlotDto[]>(`${this.base}/slots`, {
        params: { doctor_id: doctorId },
      })
    );
    return dtos.map(timeSlotFromDto);
  }

  async book(
    appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>
  ): Promise<Appointment> {
    const body = appointmentToDto(appointment);
    const dto = await firstValueFrom(
      this.http.post<AppointmentResponseDto>(this.base, body)
    );
    return appointmentFromDto(dto);
  }

  async getByPatient(patientId: string): Promise<Appointment[]> {
    const dtos = await firstValueFrom(
      this.http.get<AppointmentResponseDto[]>(`${this.base}`, {
        params: { patient_id: patientId },
      })
    );
    return dtos.map(appointmentFromDto);
  }
}

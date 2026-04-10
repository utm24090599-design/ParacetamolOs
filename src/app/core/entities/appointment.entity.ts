export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled';

export interface TimeSlot {
  date: string;  // 'YYYY-MM-DD'
  time: string;  // 'HH:mm'
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  slot: TimeSlot;
  status: AppointmentStatus;
  createdAt: string;
}

export function createAppointment(
  partial: Omit<Appointment, 'id' | 'status' | 'createdAt'>
): Appointment {
  return {
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

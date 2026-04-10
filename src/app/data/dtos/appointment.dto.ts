// ── Doctor ──────────────────────────────────────────────────────────────────

export interface DoctorDto {
  id: string;
  name: string;
  specialty: string;
  avatar_url?: string;
  available: boolean;
}

// ── TimeSlot ─────────────────────────────────────────────────────────────────

export interface TimeSlotDto {
  date: string;  // 'YYYY-MM-DD'
  time: string;  // 'HH:mm'
}

// ── Appointment ───────────────────────────────────────────────────────────────

export interface AppointmentRequestDto {
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
}

export interface AppointmentResponseDto {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
}

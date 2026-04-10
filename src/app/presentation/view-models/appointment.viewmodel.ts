import { Injectable, signal, computed } from '@angular/core';
import { Doctor } from '../../core/entities/doctor.entity';
import { Appointment, TimeSlot } from '../../core/entities/appointment.entity';
import { GetAvailableSlotsUseCase } from '../../core/use-cases/get-available-slots.usecase';
import { BookAppointmentUseCase } from '../../core/use-cases/book-appointment.usecase';

export type FlowStep = 'schedule' | 'done';

@Injectable({ providedIn: 'root' })
export class AppointmentViewModel {

  // ── Estado del flujo ────────────────────────────────────
  readonly step        = signal<FlowStep>('schedule');
  readonly loading     = signal(false);
  readonly error       = signal<string | null>(null);

  // ── Selección de cita ───────────────────────────────────
  readonly selectedDoctor = signal<Doctor | null>(null);
  readonly availableSlots = signal<TimeSlot[]>([]);
  readonly selectedSlot   = signal<TimeSlot | null>(null);

  // ── Resultado final ─────────────────────────────────────
  readonly appointment = signal<Appointment | null>(null);

  // ── Computed ────────────────────────────────────────────
  readonly canBook = computed(
    () => !!this.selectedDoctor() && !!this.selectedSlot()
  );

  constructor(
    private readonly getSlots:     GetAvailableSlotsUseCase,
    private readonly bookUseCase:  BookAppointmentUseCase,
  ) {}

  // ── Acciones ────────────────────────────────────────────

  async selectDoctor(doctor: Doctor): Promise<void> {
    this.selectedDoctor.set(doctor);
    this.selectedSlot.set(null);
    await this.run(async () => {
      const slots = await this.getSlots.execute(doctor.id);
      this.availableSlots.set(slots);
    });
  }

  selectSlot(slot: TimeSlot): void {
    this.selectedSlot.set(slot);
  }

  async confirmAppointment(): Promise<void> {
    const doctor = this.selectedDoctor();
    const slot   = this.selectedSlot();

    if (!doctor || !slot) {
      this.error.set('Selecciona un doctor y hora antes de confirmar.');
      return;
    }

    await this.run(async () => {
      const result = await this.bookUseCase.execute('anonymous', doctor.id, slot);
      this.appointment.set(result);
      this.step.set('done');
    });
  }

  reset(): void {
    this.step.set('schedule');
    this.selectedDoctor.set(null);
    this.availableSlots.set([]);
    this.selectedSlot.set(null);
    this.appointment.set(null);
    this.error.set(null);
  }

  // ── Helper privado ──────────────────────────────────────
  private async run(fn: () => Promise<void>): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await fn();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'Error inesperado.');
    } finally {
      this.loading.set(false);
    }
  }
}

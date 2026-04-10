import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AppointmentViewModel } from '../../view-models/appointment.viewmodel';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Doctor } from '../../../core/entities/doctor.entity';
import { TimeSlot } from '../../../core/entities/appointment.entity';
import { AppointmentRepository } from '../../../core/repositories/appointment.repository';

@Component({
  selector: 'app-personal-data-page',
  standalone: true,
  imports: [FormsModule, NavbarComponent, DateFormatPipe],
  template: `
    <app-navbar />

    <div class="min-h-[calc(100vh-60px)] bg-[#F2F2F7] flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">

        @if (formStep() === 'form') {
          <div class="bg-white border border-[#E5E5EA] rounded-[32px] shadow-sm p-6">
            <h1 class="text-2xl font-bold text-[#121212] mb-1">Datos Personales</h1>
            <p class="text-sm text-[#3A3A3C] mb-6">Completa tus datos para continuar con el agendamiento.</p>

            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-3">
                <label class="flex flex-col text-sm text-[#3A3A3C] gap-2">
                  <span class="font-semibold">Nombre(s)</span>
                  <input
                    type="text"
                    [ngModel]="name()"
                    (ngModelChange)="name.set($event)"
                    class="rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-3 py-2 text-sm text-[#121212] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20"
                    placeholder="Nombre(s)"
                  />
                </label>

                <label class="flex flex-col text-sm text-[#3A3A3C] gap-2">
                  <span class="font-semibold">Apellido(s)</span>
                  <input
                    type="text"
                    [ngModel]="lastName()"
                    (ngModelChange)="lastName.set($event)"
                    class="rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-3 py-2 text-sm text-[#121212] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20"
                    placeholder="Apellido(s)"
                  />
                </label>
              </div>

              <div class="grid gap-3">
                <div class="flex items-center gap-4 text-sm text-[#3A3A3C]">
                  <span class="font-semibold">Género</span>
                  <label class="flex items-center gap-2">
                    <input type="radio" name="gender" value="female" [ngModel]="gender()" (ngModelChange)="gender.set($event)" class="h-4 w-4 text-[#007AFF]" />
                    <span>Mujer</span>
                  </label>
                  <label class="flex items-center gap-2">
                    <input type="radio" name="gender" value="male" [ngModel]="gender()" (ngModelChange)="gender.set($event)" class="h-4 w-4 text-[#007AFF]" />
                    <span>Hombre</span>
                  </label>
                </div>

                <label class="flex flex-col text-sm text-[#3A3A3C] gap-2">
                  <span class="font-semibold">Edad</span>
                  <input
                    type="number"
                    [ngModel]="age()"
                    (ngModelChange)="age.set($event)"
                    class="rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-3 py-2 text-sm text-[#121212] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20"
                    placeholder="Edad"
                    min="0"
                  />
                </label>

                <label class="flex flex-col text-sm text-[#3A3A3C] gap-2">
                  <span class="font-semibold">Correo Electrónico</span>
                  <input
                    type="email"
                    [ngModel]="email()"
                    (ngModelChange)="email.set($event)"
                    class="rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-3 py-2 text-sm text-[#121212] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20"
                    placeholder="Correo Electrónico"
                  />
                </label>
              </div>
            </div>

            @if (vm.error()) {
              <p class="text-[#FF3B30] text-xs mt-4">{{ vm.error() }}</p>
            }

            <button
              (click)="goToSchedule()"
              [disabled]="!isFormValid"
              class="mt-6 w-full rounded-lg bg-[#121212] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
              Ver fechas disponibles
            </button>
          </div>
        }

        @if (formStep() === 'schedule') {
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h1 class="text-2xl font-bold text-[#121212] mb-4">Agendar Cita</h1>

            <div class="mb-5">
              <label class="block text-xs font-semibold text-[#3A3A3C] mb-2">A quién te gustaría atender?</label>
              <div class="flex flex-col gap-2">
                @for (doc of doctors(); track doc.id) {
                  <button
                    (click)="selectDoctor(doc)"
                    [class]="vm.selectedDoctor()?.id === doc.id
                      ? 'border-[#007AFF] bg-[#007AFF]/5'
                      : 'border-gray-200 hover:border-gray-300'"
                    class="flex items-center gap-2 border-[1.5px] rounded-lg px-3 py-2.5 text-sm text-left transition-all">
                    <span class="text-lg">{{ doc.name.includes('Dra') ? '👩‍⚕️' : '👨‍⚕️' }}</span>
                    <div>
                      <p class="font-medium text-[#121212]">{{ doc.name }}</p>
                      <p class="text-xs text-[#8E8E93]">{{ doc.specialty }}</p>
                    </div>
                  </button>
                }
              </div>
            </div>

            @if (vm.selectedDoctor()) {
              @if (vm.loading()) {
                <div class="flex justify-center py-4">
                  <div class="w-5 h-5 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              } @else {
                <div class="mb-5">
                  <label class="block text-xs font-semibold text-[#3A3A3C] mb-2">Fecha</label>
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    @for (slot of uniqueDates(); track slot) {
                      <button
                        (click)="selectDate(slot)"
                        [class]="selectedDate() === slot
                          ? 'border-[#007AFF] bg-[#007AFF]/5'
                          : 'border-gray-200 hover:border-gray-300'"
                        class="border-[1.5px] rounded-lg px-2 py-1.5 text-xs font-medium transition-all">
                        {{ slot | dateFormat }}
                      </button>
                    }
                  </div>

                  @if (selectedDate()) {
                    <label class="block text-xs font-semibold text-[#3A3A3C] mb-2">Hora</label>
                    <div class="grid grid-cols-3 gap-2">
                      @for (slot of slotsForDate(); track slot.time) {
                        <button
                          (click)="vm.selectSlot(slot)"
                          [class]="vm.selectedSlot()?.time === slot.time
                            ? 'bg-[#007AFF] text-white'
                            : 'bg-white text-[#3A3A3C] border-gray-200 hover:border-gray-300'"
                          class="border-[1.5px] rounded-lg px-2 py-1.5 text-xs font-semibold transition-all">
                          {{ slot.time }}
                        </button>
                      }
                    </div>
                  }
                </div>
              }
            }

            @if (vm.error()) {
              <p class="text-[#FF3B30] text-xs mb-4 text-center">{{ vm.error() }}</p>
            }

            <button
              (click)="confirm()"
              [disabled]="!vm.canBook() || vm.loading()"
              class="w-full bg-[#007AFF] text-white font-semibold py-2.5 rounded-lg text-sm
                     hover:bg-[#0062CC] transition-colors disabled:opacity-50">
              {{ vm.loading() ? 'Agendando...' : 'Confirmar' }}
            </button>
          </div>
        }

        @if (vm.step() === 'done') {
          <div class="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div class="text-5xl mb-3">✅</div>
            <h2 class="text-xl font-bold text-[#121212] mb-2">¡Listo!</h2>
            <p class="text-[#8E8E93] text-xs mb-4">
              Tu cita ha sido agendada correctamente
            </p>
            @if (vm.appointment(); as appt) {
              <div class="bg-[#F2F2F7] rounded-lg p-3 text-xs text-left mb-4">
                <p class="font-semibold text-[#121212] mb-2">Detalles:</p>
                <p class="text-[#3A3A3C] mb-1">📅 {{ appt.slot.date | dateFormat }}</p>
                <p class="text-[#3A3A3C] mb-1">🕐 {{ appt.slot.time }}</p>
                <p class="text-[#3A3A3C]">👨‍⚕️ {{ vm.selectedDoctor()?.name }}</p>
              </div>
            }
            <button
              (click)="reset()"
              class="w-full bg-[#121212] text-white font-semibold py-2.5 rounded-lg text-sm hover:opacity-80 transition-opacity">
              Volver al inicio
            </button>
          </div>
        }

      </div>
    </div>
  `,
})
export class PersonalDataPage implements OnInit {
  doctors   = signal<Doctor[]>([]);
  selectedDate = signal<string | null>(null);
  formStep = signal<'form' | 'schedule'>('form');
  name = signal('');
  lastName = signal('');
  gender = signal<'female' | 'male'>('female');
  age = signal('');
  email = signal('');

  constructor(
    readonly vm: AppointmentViewModel,
    readonly router: Router,
    private readonly appointmentRepo: AppointmentRepository,
  ) {}

  async ngOnInit(): Promise<void> {
    this.vm.step.set('schedule');
    try {
      const list = await this.appointmentRepo.getDoctors();
      this.doctors.set(list);
    } catch { /* fallback silencioso */ }
  }

  async selectDoctor(doc: Doctor): Promise<void> {
    this.selectedDate.set(null);
    await this.vm.selectDoctor(doc);
  }

  selectDate(date: string): void {
    this.selectedDate.set(date);
    this.vm.selectSlot(null!);
  }

  get uniqueDates(): () => string[] {
    return () => [...new Set(this.vm.availableSlots().map(s => s.date))];
  }

  get slotsForDate(): () => TimeSlot[] {
    return () =>
      this.vm.availableSlots().filter(s => s.date === this.selectedDate());
  }

  get isFormValid(): boolean {
    return (
      this.name().trim().length > 0 &&
      this.lastName().trim().length > 0 &&
      this.age().trim().length > 0 &&
      this.email().trim().length > 0 &&
      this.email().includes('@')
    );
  }

  goToSchedule(): void {
    if (!this.isFormValid) {
      this.vm.error.set('Por favor llena todos los campos correctamente.');
      return;
    }

    this.vm.error.set(null);
    this.formStep.set('schedule');
  }

  async confirm(): Promise<void> {
    await this.vm.confirmAppointment();
  }

  reset(): void {
    this.formStep.set('form');
    this.name.set('');
    this.lastName.set('');
    this.gender.set('female');
    this.age.set('');
    this.email.set('');
    this.selectedDate.set(null);
    this.vm.reset();
  }
}

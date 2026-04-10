import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Doctor } from '../../../core/entities/doctor.entity';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  template: `
    <app-navbar />

    <!-- Hero Simple -->
    <section class="bg-gradient-to-br from-[#F2F2F7] to-[#E8F4FF] px-6 py-24 text-center">
      <div class="max-w-2xl mx-auto">
        <div class="text-6xl mb-4">🏥</div>
        <h1 class="text-4xl font-bold text-[#121212] mb-4">
          Agenda tu cita en minutos
        </h1>
        <p class="text-[#8E8E93] text-base mb-8 leading-relaxed">
          Sin complicaciones. Sin esperas. De forma rápida y fácil.
        </p>
        <a routerLink="/agendar"
           class="inline-block bg-[#007AFF] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#0062CC] transition-colors">
          Comenzar
        </a>
      </div>
    </section>

    <!-- Doctors Grid -->
    <section class="px-6 py-16 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-[#121212] mb-8 text-center">Nuestros Especialistas</h2>
      <div class="grid md:grid-cols-2 gap-4">
        @for (doctor of doctors(); track doctor.id) {
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
            <div class="text-3xl mb-3">{{ doctor.name.includes('Dra') ? '👩‍⚕️' : '👨‍⚕️' }}</div>
            <h3 class="font-semibold text-[#121212]">{{ doctor.name }}</h3>
            <p class="text-xs text-[#8E8E93] mb-3">{{ doctor.specialty }}</p>
            <span class="inline-block bg-[#34C759]/10 text-[#34C759] text-xs font-semibold px-2 py-1 rounded">
              {{ doctor.available ? 'Disponible' : 'No disponible' }}
            </span>
          </div>
        } @empty {
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center">
            <div class="text-3xl mb-3">👨‍⚕️</div>
            <h3 class="font-semibold">Dr. Pancho Herrera</h3>
            <p class="text-xs text-[#8E8E93] mb-3">Medicina General</p>
            <span class="inline-block bg-[#34C759]/10 text-[#34C759] text-xs font-semibold px-2 py-1 rounded">Disponible</span>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center">
            <div class="text-3xl mb-3">👩‍⚕️</div>
            <h3 class="font-semibold">Dra. Pancha Herrera</h3>
            <p class="text-xs text-[#8E8E93] mb-3">Pediatría</p>
            <span class="inline-block bg-[#34C759]/10 text-[#34C759] text-xs font-semibold px-2 py-1 rounded">Disponible</span>
          </div>
        }
      </div>
    </section>

    <!-- Info Simple -->
    <section class="px-6 py-12 bg-[#F2F2F7] text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-[#121212] mb-3">¿Por qué elegirnos?</h2>
        <div class="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div class="text-3xl mb-2">⚡</div>
            <p class="text-[#3A3A3C]"><strong>Rápido</strong></p>
            <p class="text-[#8E8E93] text-xs mt-1">Agenda en segundos</p>
          </div>
          <div>
            <div class="text-3xl mb-2">🔒</div>
            <p class="text-[#3A3A3C]"><strong>Seguro</strong></p>
            <p class="text-[#8E8E93] text-xs mt-1">Tus datos protegidos</p>
          </div>
          <div>
            <div class="text-3xl mb-2">👨‍⚕️</div>
            <p class="text-[#3A3A3C]"><strong>Profesional</strong></p>
            <p class="text-[#8E8E93] text-xs mt-1">Especialistas certificados</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section class="px-6 py-16 text-center">
      <div class="max-w-2xl mx-auto">
        <p class="text-[#8E8E93] text-sm mb-6">¿Listo para agendar tu cita?</p>
        <a routerLink="/agendar"
           class="inline-block bg-[#121212] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-80 transition-opacity">
          Agendar Ahora
        </a>
      </div>
    </section>
  `,
})
export class HomePage implements OnInit {
  readonly doctors = signal<Doctor[]>([]);

  ngOnInit(): void {
    try {
      // Fallback: mostrar doctores estáticos
      this.doctors.set([]);
    } catch {
      // Manejo silencioso
    }
  }
}

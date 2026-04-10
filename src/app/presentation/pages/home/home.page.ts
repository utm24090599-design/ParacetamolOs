import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Doctor } from '../../../core/entities/doctor.entity';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />

    <!-- Hero -->
    <section class="bg-[#F2F2F7] px-6 pt-20 pb-16">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div>
          <span class="inline-flex items-center gap-2 text-[#007AFF] text-xs font-semibold uppercase tracking-[0.35em] mb-5">
            Clínica Médica
          </span>
          <h1 class="text-5xl font-bold text-[#121212] leading-tight mb-6">
            Conócenos más.
          </h1>
          <p class="text-[#4B5563] text-base leading-relaxed max-w-2xl mb-8">
            Big company announcement or simple sub-header taking two or more lines.
          </p>

          <div class="flex flex-wrap gap-4">
            <a routerLink="/agendar"
               class="bg-[#121212] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#333333] transition-colors">
              Agenda tu cita
            </a>
            <a routerLink="/sobre-nosotros"
               class="border border-gray-200 text-[#121212] px-6 py-3 rounded-full text-sm font-semibold hover:border-[#121212] hover:text-[#121212] transition-colors">
              Revisa nuestra sucursal
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 h-full flex items-center justify-center">
            <div class="w-full h-[320px] rounded-[2rem] border border-dashed border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center text-[#9CA3AF]">
              <div class="text-6xl mb-4">↔️</div>
              <p class="text-sm text-center max-w-[220px]">Dashboard minimal y moderno para tu clínica.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Doctors -->
    <section class="px-6 py-16 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-[#121212] mb-10 text-center">Nuestros Servicios</h2>
        <div class="grid md:grid-cols-2 gap-6">
          @for (doctor of doctors(); track doctor.id) {
            <div class="rounded-[1.5rem] border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto rounded-full bg-[#F2F4F7] flex items-center justify-center text-2xl mb-4">{{ doctor.name.includes('Dra') ? '👩‍⚕️' : '👨‍⚕️' }}</div>
              <h3 class="font-semibold text-[#121212] mb-2">{{ doctor.name }}</h3>
              <p class="text-[#6B7280] text-sm mb-3">{{ doctor.specialty }}</p>
              <p class="text-[#10B981] text-xs font-semibold">{{ doctor.available ? 'Disponible' : 'No disponible' }}</p>
            </div>
          } @empty {
            <div class="rounded-[1.5rem] border border-gray-200 p-6 text-center shadow-sm">
              <div class="w-16 h-16 mx-auto rounded-full bg-[#F2F4F7] flex items-center justify-center text-2xl mb-4">👨‍⚕️</div>
              <h3 class="font-semibold text-[#121212] mb-2">Dr. Pancho Herrera</h3>
              <p class="text-[#6B7280] text-sm mb-3">Medicina General</p>
              <p class="text-[#10B981] text-xs font-semibold">Disponible</p>
            </div>
            <div class="rounded-[1.5rem] border border-gray-200 p-6 text-center shadow-sm">
              <div class="w-16 h-16 mx-auto rounded-full bg-[#F2F4F7] flex items-center justify-center text-2xl mb-4">👩‍⚕️</div>
              <h3 class="font-semibold text-[#121212] mb-2">Dra. Pancha Herrera</h3>
              <p class="text-[#6B7280] text-sm mb-3">Pediatría</p>
              <p class="text-[#10B981] text-xs font-semibold">Disponible</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <section class="px-6 py-16 bg-[#F2F2F7]">
      <div class="max-w-6xl mx-auto grid md:grid-cols-[1fr_0.8fr] gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold text-[#121212] mb-3">Nuestros Servicios</h2>
          <p class="text-[#4B5563] text-sm leading-relaxed">
            Big company announcement or simple sub-header taking two or more lines.
          </p>
        </div>
        <a routerLink="/agendar"
           class="inline-flex items-center justify-center bg-[#121212] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#333333] transition-colors">
          Ingresa aquí
        </a>
      </div>
    </section>

    <!-- Feedback -->
    <section class="px-6 pb-16">
      <div class="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
        <label class="block text-[#4B5563] text-xs font-semibold mb-3">Feedback</label>
        <textarea
          rows="5"
          placeholder="Tu opinión nos importa, coméntala aquí."
          class="w-full border border-gray-200 rounded-[1.5rem] p-6 text-sm text-[#121212] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/10 resize-none placeholder:text-[#9CA3AF]"></textarea>
      </div>
    </section>

    <app-footer />
  `,
})
export class HomePage implements OnInit {
  readonly doctors = signal<Doctor[]>([]);

  ngOnInit(): void {
    this.doctors.set([]);
  }
}

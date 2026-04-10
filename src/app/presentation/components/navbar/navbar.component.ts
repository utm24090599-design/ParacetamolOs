import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-[60px] flex items-center justify-between px-6">

      <!-- Logo -->
      <a routerLink="/" class="bg-[#121212] text-white text-[13px] font-semibold px-4 py-1.5 rounded-lg">
        Your Logo
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-7">
        <a routerLink="/sobre-nosotros"
           routerLinkActive="text-[#007AFF]"
           class="text-[#3A3A3C] text-sm font-medium hover:text-[#007AFF] transition-colors">
          Sobre Nosotros
        </a>
        <a routerLink="/agendar"
           routerLinkActive="text-[#007AFF]"
           class="text-[#3A3A3C] text-sm font-medium hover:text-[#007AFF] transition-colors">
          Agendar Cita
        </a>
        <a routerLink="/ingresar"
           class="bg-[#007AFF] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0062CC] transition-colors">
          Ingresar
        </a>
        <a href="#" class="text-[#3A3A3C] text-sm font-medium hover:text-[#007AFF] transition-colors">
          Sucursal
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        (click)="menuOpen = !menuOpen"
        aria-label="Menú">
        <span class="block w-5 h-0.5 bg-[#121212]"></span>
        <span class="block w-5 h-0.5 bg-[#121212]"></span>
        <span class="block w-5 h-0.5 bg-[#121212]"></span>
      </button>

    </nav>

    <!-- Mobile dropdown -->
    @if (menuOpen) {
      <div class="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-sm">
        <a routerLink="/sobre-nosotros" (click)="menuOpen = false"
           class="text-sm font-medium text-[#3A3A3C]">Sobre Nosotros</a>
        <a routerLink="/agendar" (click)="menuOpen = false"
           class="text-sm font-medium text-[#3A3A3C]">Agendar Cita</a>
        <a routerLink="/ingresar" (click)="menuOpen = false"
           class="text-sm font-semibold text-[#007AFF]">Ingresar</a>
      </div>
    }
  `,
})
export class NavbarComponent {
  menuOpen = false;
}

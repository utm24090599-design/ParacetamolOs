import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar />

    <div class="min-h-[calc(100vh-60px)] bg-[#F2F2F7] flex items-center justify-center px-4">
      <div class="text-center">
        <div class="text-6xl mb-4">📅</div>
        <h1 class="text-2xl font-bold text-[#121212] mb-2">Ya puedes agendar</h1>
        <p class="text-[#8E8E93] text-sm mb-6 max-w-xs">
          No necesitas crear una cuenta. Accede directamente a agendar tu cita.
        </p>
        <button
          (click)="router.navigate(['/agendar'])"
          class="bg-[#007AFF] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#0062CC] transition-colors">
          Agendar Cita
        </button>
      </div>
    </div>
  `,
})
export class LoginPage {
  constructor(readonly router: Router) {}
}

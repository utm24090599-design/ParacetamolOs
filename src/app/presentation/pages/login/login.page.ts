import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SendVerificationCodeUseCase } from '../../../core/use-cases/send-verification-code.usecase';
import { VerifyCodeUseCase } from '../../../core/use-cases/verify-code.usecase';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  template: `
    <app-navbar />

    <div class="min-h-[calc(100vh-60px)] bg-[#F2F2F7] flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-6xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

        <div class="bg-white border border-[#E5E5EA] rounded-[32px] shadow-sm p-6">
          <div class="flex flex-col items-center gap-4 mb-6">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl text-white">
              <span>👤</span>
            </div>
            <div class="text-center">
              <h1 class="text-2xl font-bold text-[#121212]">Ingresar</h1>
              <p class="text-sm text-[#3A3A3C]">Ingresa con tu correo electrónico para continuar.</p>
            </div>
          </div>

          <div class="space-y-4">
            <label class="block text-sm font-semibold text-[#121212]">Correo electrónico:</label>
            <input
              type="email"
              [(ngModel)]="email"
              placeholder="ejemplo@correo.com"
              class="w-full rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-4 py-3 text-sm text-[#121212] outline-none transition focus:border-[#121212] focus:ring-1 focus:ring-[#121212]/20"
            />
          </div>

          <button
            (click)="sendCode()"
            [disabled]="loading || !email.trim()"
            class="mt-6 w-full rounded-lg bg-[#121212] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Enviando...' : 'Enviar Código' }}
          </button>

          <p class="mt-4 text-xs text-[#6B6B71] leading-5">
            Se enviará un código de verificación. Para nuevos usuarios, este paso crea la cuenta instantáneamente sin agendar cita previa.
          </p>

          <div class="mt-8 rounded-[24px] border border-[#E5E5EA] bg-[#FAFAFA] p-5 text-center">
            <p class="text-sm text-[#3A3A3C] mb-4">
              ¿No tienes cuenta? Haz clic aquí para registrarte (Se usará el mismo correo proporcionado)
            </p>
            <button
              (click)="createAccount()"
              [disabled]="loading || !email.trim()"
              class="w-full rounded-lg bg-[#121212] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
              Crear cuenta (Sin cita)
            </button>
          </div>

          @if (error) {
            <p class="mt-4 text-sm text-[#FF3B30]">{{ error }}</p>
          }

          @if (infoMessage) {
            <p class="mt-4 text-sm text-[#3A3A3C]">{{ infoMessage }}</p>
          }
        </div>

        <div class="bg-white border border-[#E5E5EA] rounded-[32px] shadow-sm p-6">
          <h2 class="text-xl font-semibold text-[#121212] mb-4">Verificación</h2>

          <div class="space-y-4">
            <label class="block text-sm font-semibold text-[#121212]">Código:</label>
            <input
              type="text"
              [(ngModel)]="code"
              maxlength="6"
              placeholder="______ (6 Dígitos)"
              class="w-full rounded-lg border border-[#D1D1D6] bg-[#F7F7F8] px-4 py-3 text-sm text-[#121212] outline-none transition focus:border-[#121212] focus:ring-1 focus:ring-[#121212]/20"
            />
          </div>

          <button
            (click)="verifyCode()"
            [disabled]="loading || code.trim().length !== 6 || !email.trim()"
            class="mt-6 w-full rounded-lg bg-[#121212] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Verificando...' : 'Verificar y continuar' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LoginPage {
  email = '';
  code = '';
  loading = false;
  error = '';
  infoMessage = '';

  constructor(
    readonly router: Router,
    private readonly sendCodeUseCase: SendVerificationCodeUseCase,
    private readonly verifyCodeUseCase: VerifyCodeUseCase
  ) {}

  async sendCode(): Promise<void> {
    this.error = '';
    this.infoMessage = '';
    this.loading = true;

    try {
      await this.sendCodeUseCase.execute(this.email);
      this.infoMessage = 'Código enviado. Revisa tu correo para continuar.';
    } catch (error: unknown) {
      this.error = error instanceof Error ? error.message : 'Error inesperado.';
    } finally {
      this.loading = false;
    }
  }

  async verifyCode(): Promise<void> {
    this.error = '';
    this.infoMessage = '';
    this.loading = true;

    try {
      await this.verifyCodeUseCase.execute(this.email, this.code);
      this.router.navigate(['/agendar']);
    } catch (error: unknown) {
      this.error = error instanceof Error ? error.message : 'Error inesperado.';
    } finally {
      this.loading = false;
    }
  }

  createAccount(): void {
    if (!this.email.trim()) {
      this.error = 'Ingresa un correo válido para crear tu cuenta.';
      return;
    }

    this.router.navigate(['/agendar']);
  }
}

import { Injectable } from '@angular/core';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class SendVerificationCodeUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(email: string): Promise<void> {
    const trimmed = email.trim().toLowerCase();
    if (!this.isValidEmail(trimmed)) {
      throw new Error('Correo electrónico inválido.');
    }
    await this.authRepo.sendVerificationCode(trimmed);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

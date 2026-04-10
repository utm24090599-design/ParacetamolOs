import { Injectable } from '@angular/core';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class VerifyCodeUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  /**
   * @returns JWT para almacenar en sesión.
   */
  async execute(email: string, code: string): Promise<string> {
    if (!/^\d{6}$/.test(code)) {
      throw new Error('El código debe ser exactamente 6 dígitos numéricos.');
    }
    return this.authRepo.verifyCode(email.trim().toLowerCase(), code);
  }
}

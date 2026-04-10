export abstract class AuthRepository {
  /**
   * Envía un código de verificación de 6 dígitos al correo indicado.
   */
  abstract sendVerificationCode(email: string): Promise<void>;

  /**
   * Valida el código ingresado.
   * @returns JWT de sesión si el código es correcto.
   * @throws Error si el código es inválido o ha expirado.
   */
  abstract verifyCode(email: string, code: string): Promise<string>;
}

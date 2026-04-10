import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthRepository } from '../../core/repositories/auth.repository';
import {
  SendCodeRequestDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '../dtos/auth.dto';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  private readonly base = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  async sendVerificationCode(email: string): Promise<void> {
    const body: SendCodeRequestDto = { email };
    await firstValueFrom(
      this.http.post<void>(`${this.base}/send-code`, body)
    );
  }

  async verifyCode(email: string, code: string): Promise<string> {
    const body: VerifyCodeRequestDto = { email, code };
    const res = await firstValueFrom(
      this.http.post<VerifyCodeResponseDto>(`${this.base}/verify-code`, body)
    );
    return res.token;
  }
}

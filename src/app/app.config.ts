import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';

// Repositorios: interfaces (Core) → implementaciones (Data)
import { AuthRepository } from './core/repositories/auth.repository';
import { AuthRepositoryImpl } from './data/repositories/auth.repository.impl';
import { AppointmentRepository } from './core/repositories/appointment.repository';
import { AppointmentRepositoryImpl } from './data/repositories/appointment.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    // ── Router ──────────────────────────────────────────
    provideRouter(routes, withComponentInputBinding()),

    // ── HTTP + interceptors ──────────────────────────────
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorInterceptor])
    ),

    // ── Dependency Injection: Core → Data ────────────────
    {
      provide:  AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    {
      provide:  AppointmentRepository,
      useClass: AppointmentRepositoryImpl,
    },
  ],
};

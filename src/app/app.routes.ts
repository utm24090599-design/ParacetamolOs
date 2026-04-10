import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () =>
      import('./presentation/pages/about/about.page').then(m => m.AboutPage),
  },
  {
    path: 'ingresar',
    loadComponent: () =>
      import('./presentation/pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'agendar',
    loadComponent: () =>
      import('./presentation/pages/personal-data/personal-data.page').then(
        m => m.PersonalDataPage
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

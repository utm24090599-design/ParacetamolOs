import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />

    <div class="max-w-3xl mx-auto px-6 py-16">

      <!-- Header -->
      <p class="text-[#8E8E93] text-sm italic mb-2">"Quiénes Somos" o "Nuestra Historia"</p>
      <h1 class="text-4xl font-bold text-[#121212] mb-10">Sobre Nosotros</h1>

      <!-- Imagen placeholder -->
      <div class="bg-[#F2F2F7] rounded-2xl h-48 flex items-center justify-center mb-10">
        <div class="text-center text-[#8E8E93]">
          <div class="text-4xl mb-1">🏥</div>
          <p class="text-xs font-medium">Imagen sobre quién somos</p>
        </div>
      </div>

      <!-- Misión -->
      <div class="border border-gray-200 rounded-xl p-5 mb-5">
        <p class="text-sm text-[#3A3A3C] leading-relaxed">
          <strong class="text-[#121212]">Nuestra Misión:</strong>
          "Empoderar tus proyectos proporcionando las herramientas técnicas y
          el respaldo humano necesario para alcanzar la excelencia."
        </p>
      </div>

      <!-- Valores -->
      <div class="border border-gray-100 rounded-xl p-5 mb-5">
        <p class="text-sm text-[#8E8E93] leading-relaxed">
          Nuestros valores se basan de manera religiosa, pero de igual manera
          debemos ser profesionales y acatar la normativa de la empresa.
        </p>
      </div>

      <!-- Filosofía -->
      <div class="border border-gray-200 rounded-xl p-5 mb-5">
        <p class="text-sm text-[#3A3A3C] leading-relaxed">
          <strong class="text-[#121212]">Nuestra Filosofía:</strong>
          "Combinamos la ética y los valores fundamentales con un rigor profesional absoluto,
          asegurando que cada solución cumpla con las normativas vigentes y supere las
          expectativas del mercado."
        </p>
      </div>

      <!-- Valores destacados -->
      <div class="grid md:grid-cols-2 gap-4 my-8">
        <div class="border border-gray-200 rounded-xl p-5">
          <p class="text-sm text-[#3A3A3C] leading-relaxed">
            <strong class="text-[#121212]">Integridad y Ética:</strong>
            Actuamos bajo principios sólidos. Para nosotros, el cumplimiento de la
            normativa no es una opción, es nuestra base de operación.
          </p>
        </div>
        <div class="border border-gray-200 rounded-xl p-5">
          <p class="text-sm text-[#3A3A3C] leading-relaxed">
            <strong class="text-[#121212]">Expertos en Soluciones:</strong>
            Somos un equipo de especialistas dedicados a transformar problemas
            complejos en soluciones viables y eficientes.
          </p>
        </div>
      </div>

      <!-- Imágenes -->
      <div class="grid grid-cols-2 gap-4 mb-10">
        <div class="bg-[#F2F2F7] rounded-xl h-32 flex items-center justify-center text-3xl">📊</div>
        <div class="bg-[#F2F2F7] rounded-xl h-32 flex items-center justify-center text-3xl">🤝</div>
      </div>

      <!-- Contacto -->
      <div>
        <p class="text-sm font-bold text-[#121212] mb-1">Contacto de nuestra Empresa:</p>
        <p class="text-sm text-[#007AFF]">utm24090904&#64;utm24090537</p>
        <p class="text-sm text-[#3A3A3C]">num: 449767893893</p>
      </div>

      <div class="mt-10">
        <a routerLink="/ingresar"
           class="inline-block bg-[#007AFF] text-white font-semibold px-6 py-3 rounded-xl text-sm
                  hover:bg-[#0062CC] transition-colors">
          Agendar una cita →
        </a>
      </div>
    </div>

    <app-footer />
  `,
})
export class AboutPage {}

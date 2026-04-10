import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-[#121212] text-white px-6 pt-10 pb-6">
      <div class="max-w-5xl mx-auto flex flex-wrap justify-between gap-10">

        <!-- Social -->
        <div>
          <h3 class="text-lg font-semibold mb-2">Síguenos</h3>
          <p class="text-[#8E8E93] text-sm mb-5">Contáctanos para más información</p>

          <div class="flex gap-3 mb-5">
            <a href="#" aria-label="Facebook"
               class="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-content-center text-white text-sm font-bold hover:opacity-80 transition-opacity flex items-center justify-center">
              f
            </a>
            <a href="#" aria-label="WhatsApp"
               class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm font-bold hover:opacity-80 transition-opacity">
              w
            </a>
            <a href="#" aria-label="Instagram"
               class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold hover:opacity-80 transition-opacity"
               style="background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)">
              ig
            </a>
          </div>

          <div class="flex flex-col gap-1.5 text-[13px] text-[#8E8E93]">
            <span>f /ClinicaMedica</span>
            <span>ig /ClinicaMedica</span>
            <span>w +52 449 789321</span>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <p class="font-semibold mb-2">Contacto</p>
          <p class="text-[#8E8E93] text-sm">utm24090904&#64;utm24090537</p>
          <p class="text-[#8E8E93] text-sm">num: 449 767 893 893</p>
        </div>

      </div>

      <div class="max-w-5xl mx-auto mt-8 border-t border-[#2C2C2E] pt-5 text-center">
        <p class="text-[#636366] text-xs">
          © {{ year }} Clínica Médica. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

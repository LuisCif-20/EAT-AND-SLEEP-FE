import { Component, computed, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './theme-toggle.html',
  styles: ``,
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);

  protected readonly icon = computed(() => (this.themeService.isDark() ? 'pi-sun' : 'pi-moon'));
  protected readonly nextThemeLabel = computed(() =>
    this.themeService.isDark() ? 'Claro' : 'Oscuro',
  );

  public toggleTheme(): void {
    this.themeService.toggle();
  }
}

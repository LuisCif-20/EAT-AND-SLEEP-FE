import { Component, computed, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { Theme } from '../../services/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './theme-toggle.html',
  styles: ``,
})
export class ThemeToggle {
  private readonly theme = inject(Theme);

  protected readonly icon = computed(() => (this.theme.isDark() ? 'pi-sun' : 'pi-moon'));
  protected readonly nextThemeLabel = computed(() => (this.theme.isDark() ? 'Claro' : 'Oscuro'));

  public toggleTheme(): void {
    this.theme.toggle();
  }
}

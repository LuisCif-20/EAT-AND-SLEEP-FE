import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ThemeToggle } from '../../../theme/components/theme-toggle/theme-toggle';
import { AuthOptions } from '../../../auth/components/auth-options/auth-options';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-menubar',
  imports: [MenubarModule, ButtonModule, CardModule, ThemeToggle, RouterLink, AuthOptions],
  templateUrl: './menubar.html',
  styles: ``,
})
export class Menubar {
  private readonly auth = inject(Auth);

  public readonly show = output();
}

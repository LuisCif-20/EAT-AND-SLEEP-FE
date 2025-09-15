import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';

import { ThemeService } from './theme/services/theme-service';
import { Spinner } from './shared/components/spinner/spinner';
import { AuthState } from './auth/state/auth-state';
import { AuthStatus } from './auth/interfaces/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly authState = inject(AuthState);

  protected readonly isChecking = computed(
    () => this.authState.authStatus() === AuthStatus.CHECKING,
  );
}

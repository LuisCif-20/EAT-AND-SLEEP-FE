import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';

import { ToastModule } from 'primeng/toast';

import { ThemeService } from './theme/services/theme-service';
import { AuthFacade } from './auth/facades/auth-facade';
import { Spinner } from './shared/components/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly theme = inject(ThemeService);
  private readonly authFacade = inject(AuthFacade);

  private readonly _isLoading = signal(true);

  protected readonly isLoading = computed(() => this._isLoading());

  ngOnInit(): void {
    this.authFacade
      .checkAuth()
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe();
  }
}

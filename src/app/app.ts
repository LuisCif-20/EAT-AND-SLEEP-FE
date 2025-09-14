import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';

import { Theme } from './theme/services/theme';
import { Auth } from './auth/services/auth';
import { AuthStatus } from './auth/interfaces/auth';
import { Spinner } from './shared/components/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly theme = inject(Theme);
  private readonly auth = inject(Auth);

  protected readonly isChecking = computed(() => this.auth.authStatus() === AuthStatus.CHECKING);

  ngOnInit(): void {
    this.auth.checkAuthentication().subscribe();
  }
}

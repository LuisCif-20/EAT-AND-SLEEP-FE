import { Component, computed, inject, signal } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from 'src/app/shared/pipes/image-url-pipe';
import { NgOptimizedImage } from '@angular/common';
import { AuthFacade } from '../../facades/auth-facade';
import { AuthState } from '../../state/auth-state';
import { AuthStatus } from '../../interfaces/auth';
import { finalize } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-auth-options',
  imports: [NgOptimizedImage, AvatarModule, ButtonModule, RouterLink, ImageUrlPipe],
  templateUrl: './auth-options.html',
  styles: ``,
})
export class AuthOptions {
  private readonly authFacade = inject(AuthFacade);
  private readonly authState = inject(AuthState);
  private readonly toastService = inject(ToastService);

  private readonly _isButtonDisable = signal(false);

  protected readonly isButtonDisable = computed(() => this._isButtonDisable());
  protected readonly isNotAuthenticated = computed(
    () => this.authState.authStatus() === AuthStatus.NOT_AUTHENTICATED,
  );
  protected readonly avatar = computed(() => this.authState.userAccount()!.avatar);

  public onLogout() {
    this._isButtonDisable.set(true);
    this.authFacade
      .logoutAndClear()
      .pipe(finalize(() => this._isButtonDisable.set(false)))
      .subscribe({
        complete: () => this.toastService.showToast('success', 'Hasta pronto!!!'),
      });
  }
}

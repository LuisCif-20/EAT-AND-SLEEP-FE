import { Component, computed, inject, signal } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ImageUrlPipe } from 'src/app/shared/pipes/image-url-pipe';
import { NgOptimizedImage } from '@angular/common';
import { Customer } from 'src/app/customer/services/customer';

@Component({
  selector: 'app-auth-options',
  imports: [NgOptimizedImage, AvatarModule, ButtonModule, RouterLink, ImageUrlPipe],
  templateUrl: './auth-options.html',
  styles: ``,
})
export class AuthOptions {
  private readonly auth = inject(Auth);
  private readonly customer = inject(Customer);

  private readonly _isButtonDisable = signal(false);

  protected readonly isButtonDisable = computed(() => this._isButtonDisable());
  protected readonly userAccount = computed(() => this.auth.userAccount());

  public onLogout() {
    this._isButtonDisable.set(true);
    this.auth.logout().subscribe({
      next: () => this.customer.forgetCustomer(),
    });
  }
}

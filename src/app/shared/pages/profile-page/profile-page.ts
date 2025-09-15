import { Component, computed, inject } from '@angular/core';
import { AuthState } from 'src/app/auth/state/auth-state';
import { NgOptimizedImage } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { ImageUrlPipe } from '../../pipes/image-url-pipe';
import { NitPipe } from '../../pipes/nit-pipe';
import { PhoneNumberPipe } from '../../pipes/phone-number-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [NgOptimizedImage, RouterLink, ButtonModule, ImageUrlPipe, NitPipe, PhoneNumberPipe],
  templateUrl: './profile-page.html',
  styles: ``,
})
export default class ProfilePage {
  private readonly authState = inject(AuthState);

  protected readonly userAccount = computed(() => this.authState.userAccount());
  protected readonly authCustomer = computed(() => this.authState.authCustomer());
}

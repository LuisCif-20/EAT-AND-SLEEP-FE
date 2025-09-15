import { Component, computed, inject, signal } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ImageInput } from '../../components/image-input/image-input';
import { AuthState } from 'src/app/auth/state/auth-state';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from 'src/app/auth/facades/auth-facade';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-profile-page',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ImageInput],
  templateUrl: './edit-profile-page.html',
  styles: ``,
})
export default class EditProfilePage {
  private readonly authState = inject(AuthState);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);

  private readonly _isButtonDisabled = signal(false);

  protected readonly userAccount = computed(() => this.authState.userAccount());
  protected readonly isButtonDisabled = computed(() => this._isButtonDisabled());

  protected userAccountForm = this.formBuilder.group({
    avatar: this.formBuilder.control<File | null>(null),
    email: this.formBuilder.control(this.userAccount()!.email, [Validators.required]),
  });

  public catchImage(event: File) {
    this.userAccountForm.patchValue({
      avatar: event,
    });
  }

  public updateUserAccount() {
    this._isButtonDisabled.set(true);
    const formData = new FormData();
    if (this.userAccountForm.get('email')!.dirty) {
      formData.append('email', this.userAccountForm.get('email')!.value);
    }
    if (this.userAccountForm.get('avatar')!.value) {
      formData.append('avatar', this.userAccountForm.get('avatar')!.value!);
    }
    this.authFacade
      .updateUserAccountAndLoadNewInfo(formData)
      .pipe(finalize(() => this._isButtonDisabled.set(false)))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/profile');
        },
      });
  }
}

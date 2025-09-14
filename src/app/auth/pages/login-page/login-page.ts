import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

import { ToastService } from 'src/app/shared/services/toast-service';
import { AuthFacade } from '../../facades/auth-facade';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    MessageModule,
  ],
  templateUrl: './login-page.html',
  styles: ``,
})
export default class LoginPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly authFacade = inject(AuthFacade);

  private readonly _isButtonDisable = signal(false);

  protected readonly isButtonDisable = computed(() => this._isButtonDisable());

  protected readonly loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  private login() {
    this._isButtonDisable.set(true);
    const body = this.loginForm.getRawValue();
    this.authFacade
      .loginAndGetInfo(body)
      .pipe(finalize(() => this._isButtonDisable.set(false)))
      .subscribe({
        next: (value) => {
          if (!value) {
            this.toastService.showToast(
              'error',
              'No se puedo recuperar la informacion del usuario',
            );
            return;
          }
          this.router.navigateByUrl('/', { replaceUrl: true });
          this.toastService.showToast('success', 'Bienvenido!!!');
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showToast('error', error.error['detail']);
        },
      });
  }

  public isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control.touched;
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.toastService.showToast('error', 'Llena correctamente el formulario');
      this.loginForm.markAllAsTouched();
      return;
    }
    this.login();
  }
}

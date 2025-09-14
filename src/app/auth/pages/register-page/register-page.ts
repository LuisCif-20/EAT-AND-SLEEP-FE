import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import { isFieldOneEqualsFieldTwo } from 'src/app/shared/validators/custom-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services/toast-service';
import { AuthFacade } from '../../facades/auth-facade';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DividerModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DatePickerModule,
    PasswordModule,
    MessageModule,
    NgClass,
  ],
  templateUrl: './register-page.html',
  styles: ``,
})
export default class RegisterPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly authFacade = inject(AuthFacade);

  private readonly _isButtonDisable = signal(false);

  protected readonly isButtonDisable = computed(() => this._isButtonDisable());

  protected readonly maxDate = new Date();
  protected readonly registerForm = this.formBuilder.group(
    {
      name: this.formBuilder.control('', [Validators.required]),
      birthDate: this.formBuilder.control('', [Validators.required]),
      nit: this.formBuilder.control('', [Validators.required]),
      phoneNumber: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      confirmPassword: this.formBuilder.control(''),
    },
    {
      validators: [isFieldOneEqualsFieldTwo('password', 'confirmPassword')],
    },
  );

  private register() {
    this._isButtonDisable.set(true);
    const { confirmPassword: _, ...body } = this.registerForm.getRawValue();
    this.authFacade
      .registerAndLogin(body)
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
    const control = this.registerForm.get(controlName);
    return control?.invalid && control.touched;
  }

  public isPasswordMismatch() {
    const control = this.registerForm.get('confirmPassword');
    return this.registerForm.hasError('passwordsMismatch') && control?.touched;
  }

  public onRegister() {
    if (this.registerForm.invalid) {
      this.toastService.showToast('error', 'Llena correctamente el formulario');
      this.registerForm.markAllAsTouched();
      return;
    }
    this.register();
  }
}

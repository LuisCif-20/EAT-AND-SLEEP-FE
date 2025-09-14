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
import { MessageService } from 'primeng/api';
import { Auth } from '../../services/auth';
import { Customer } from 'src/app/customer/services/customer';
import { switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterData } from 'src/app/customer/interfaces/customer.interface';

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
  private readonly messageService = inject(MessageService);
  private readonly auth = inject(Auth);
  private readonly customer = inject(Customer);

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
      confirm: this.formBuilder.control(''),
    },
    {
      validators: [isFieldOneEqualsFieldTwo('password', 'confirm')],
    },
  );

  public isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control.touched;
  }

  public isPasswordMismatch() {
    const control = this.registerForm.get('confirm');
    return this.registerForm.hasError('passwordsMismatch') && control?.touched;
  }

  public registerAndLogin(body: RegisterData) {
    return this.customer
      .register(body)
      .pipe(
        switchMap(() =>
          this.auth
            .login(body.email, body.password)
            .pipe(switchMap((userAccount) => this.customer.gerCustomerInfo(userAccount.id))),
        ),
      );
  }

  public onRegister() {
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Llena correctamente el formulario',
      });
      this.registerForm.markAllAsTouched();
      return;
    }
    this._isButtonDisable.set(true);
    const body = this.registerForm.getRawValue() as RegisterData;
    this.registerAndLogin(body).subscribe({
      next: () => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error['detail'],
        });
      },
      complete: () => {
        this._isButtonDisable.set(false);
      },
    });
  }
}

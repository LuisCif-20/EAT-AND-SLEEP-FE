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

import { Auth } from '../../services/auth';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/customer/services/customer';
import { switchMap } from 'rxjs';

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
  private readonly messageService = inject(MessageService);
  private readonly auth = inject(Auth);
  private readonly customer = inject(Customer);

  private readonly _isButtonDisable = signal(false);

  protected readonly isButtonDisable = computed(() => this._isButtonDisable());

  protected readonly loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  public isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control.touched;
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Llena correctamente el formulario',
      });
      this.loginForm.markAllAsTouched();
      return;
    }
    this._isButtonDisable.set(true);
    const { email, password } = this.loginForm.getRawValue();
    this.auth
      .login(email, password)
      .pipe(switchMap((userAccount) => this.customer.gerCustomerInfo(userAccount.id)))
      .subscribe({
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

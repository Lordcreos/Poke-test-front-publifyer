import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, ToastService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { isInvalidForm, isInvalidInput } from '@shared/utils';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    ToastModule,
  ],
  templateUrl: './login-page.component.html',
  styles: [
    `
      :host {
        @apply flex w-full justify-end;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  onLogIn(): void {
    if (isInvalidForm(this.loginForm)) return;
    const { email, password, rememberMe } = this.loginForm.value;
    this.authService
      .login(email as string, password as string, rememberMe as boolean)
      .then(() => {
        this.toastService.showSuccess('TOAST.LOGIN.SUCCESS');
      })
      .catch((error: Error) => {
        this.toastService.showError(error.message);
      });
  }

  isInvalid(controlName: string): boolean {
    return isInvalidInput(this.loginForm, controlName);
  }
}

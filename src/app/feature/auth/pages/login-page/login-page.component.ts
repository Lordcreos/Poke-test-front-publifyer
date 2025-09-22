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
      
      .demo-accounts-enter {
        animation: slideDown 0.3s ease-out;
      }
      
      .demo-accounts-exit {
        animation: slideUp 0.3s ease-in;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
          max-height: 0;
        }
        to {
          opacity: 1;
          transform: translateY(0);
          max-height: 500px;
        }
      }
      
      @keyframes slideUp {
        from {
          opacity: 1;
          transform: translateY(0);
          max-height: 500px;
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
          max-height: 0;
        }
      }
      
      .demo-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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

  // Obtener cuentas de prueba para mostrar
  testAccounts = this.authService.getTestAccounts();
  showTestAccounts = false;

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

  toggleTestAccounts(): void {
    this.showTestAccounts = !this.showTestAccounts;
  }

  fillTestAccount(email: string, password: string): void {
    this.loginForm.patchValue({
      email,
      password
    });
    
    // Agregar un pequeño feedback visual
    this.toastService.showSuccess('Credenciales cargadas correctamente ✨');
    
    // Opcional: cerrar el panel después de seleccionar
    setTimeout(() => {
      this.showTestAccounts = false;
    }, 1500);
  }
}

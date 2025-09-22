import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NewUser } from '@core/models';
import { AuthService, ToastService, CitiesService } from '@core/services';

import { TranslateModule } from '@ngx-translate/core';
import { isInvalidForm, isInvalidInput } from '@shared/utils';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';

const passwordMatchValidator = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    PasswordModule,
    SelectModule,
  ],
  templateUrl: './register-page.component.html',
  styles: [
    `
      :host {
        @apply flex w-full justify-end;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private citiesService = inject(CitiesService);
  private router = inject(Router);

  cities = signal<{ label: string; value: string }[]>([]);

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      city: new FormControl(null),
      hasReference: new FormControl(null),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  onRegister(): void {
    if (isInvalidForm(this.registerForm)) return;

    const newUser: NewUser = {
      name: this.registerForm.value.name!.trim().toUpperCase(),
      lastName: this.registerForm.value.lastName!.trim().toUpperCase(),
      email: this.registerForm.value.email!.trim().toLowerCase(),
      phone: this.registerForm.value.phone!.trim(),
      city: this.registerForm.value.city! || null,
      hasReference: this.registerForm.value.hasReference! || false,
      password: this.registerForm.value.password!,
    };

    console.log(newUser);

    this.authService
      .register(newUser)
      .then(() => {
        this.toastService.showSuccess('TOAST.REGISTER.SUCCESS');
        this.router.navigate(['/login']);
      })
      .catch((error: Error) => {
        this.toastService.showError(error.message);
      });
  }
  async getCities(city: string): Promise<void> {
    const cities = await this.citiesService.getCitiesOptions(city);

    const cityOptions = cities.map((c) => ({
      label: `${c.name} (${c.country_code})`,
      value: `${c.name} (${c.country_code})`,
    }));

    this.cities.set(cityOptions);
  }

  isInvalid(controlName: string): boolean {
    return isInvalidInput(this.registerForm, controlName);
  }
}

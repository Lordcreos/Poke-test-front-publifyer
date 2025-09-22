import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CitiesService, ToastService } from '@core/services';
import { User } from '@core/models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    SelectModule,
  ],
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private citiesService = inject(CitiesService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  profileForm!: FormGroup;
  isLoading = signal(false);
  cities = signal<{ label: string; value: string }[]>([]);

  hasReferenceOptions = [
    { label: this.translate.instant('register.hasReference.Yes'), value: true },
    { label: this.translate.instant('register.hasReference.No'), value: false }
  ];

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/']);
      return;
    }

    this.profileForm = this.fb.group({
      name: [currentUser.name, [Validators.required, Validators.minLength(2)]],
      lastName: [currentUser.lastName, [Validators.required, Validators.minLength(2)]],
      email: [currentUser.email, [Validators.required, Validators.email]],
      phone: [currentUser.phone || ''],
      city: [currentUser.city || ''],
      hasReference: [currentUser.hasReference, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      
      const currentUser = this.authService.getCurrentUser();
      const updatedUser: Partial<User> = {
        ...this.profileForm.value,
        id: currentUser?.id
      };

      // Simular actualización del usuario - aquí deberías implementar la lógica real
      setTimeout(() => {
        try {
          // Por ahora solo actualizamos en localStorage/sessionStorage
          if (currentUser) {
            const updatedUserComplete = { ...currentUser, ...this.profileForm.value };
            
            // Actualizar en localStorage si existe
            const localUser = localStorage.getItem('currentUser');
            if (localUser) {
              localStorage.setItem('currentUser', JSON.stringify(updatedUserComplete));
            }
            
            // Actualizar en sessionStorage si existe
            const sessionUser = sessionStorage.getItem('currentUser');
            if (sessionUser) {
              sessionStorage.setItem('currentUser', JSON.stringify(updatedUserComplete));
            }
          }
          
          this.toastService.showSuccess(
            this.translate.instant('profile.updateSuccess')
          );
        } catch (error) {
          this.toastService.showError(
            this.translate.instant('profile.updateError')
          );
        } finally {
          this.isLoading.set(false);
        }
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return this.translate.instant(`register.${fieldName}Required`);
      }
      if (field.errors['email']) {
        return this.translate.instant('register.emailInvalid');
      }
      if (field.errors['minlength']) {
        return this.translate.instant(`register.${fieldName}MinLength`);
      }
    }
    return '';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async getCities(city: string): Promise<void> {
    try {
      const cities = await this.citiesService.getCitiesOptions(city);
      const cityOptions = cities.map((c) => ({
        label: `${c.name} (${c.country_code})`,
        value: `${c.name} (${c.country_code})`,
      }));
      this.cities.set(cityOptions);
    } catch (error) {
      console.error('Error loading cities:', error);
      this.cities.set([]);
    }
  }

  async loadAllCities(): Promise<void> {
    // Cargar ciudades populares cuando se abre el dropdown sin filtro
    const popularCities = [
      'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
      'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao',
      'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón'
    ];
    
    const cityOptions = popularCities.map((city) => ({
      label: `${city} (ES)`,
      value: `${city} (ES)`,
    }));
    
    this.cities.set(cityOptions);
  }
}
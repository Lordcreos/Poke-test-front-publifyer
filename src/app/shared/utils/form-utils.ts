import { AbstractControl, FormGroup } from '@angular/forms';

export const isInvalidInput = (form: FormGroup, controlName: string): boolean => {
  const control = form.get(controlName);
  return !!(control && control.invalid && (control.dirty || control.touched));
};

export const isInvalidForm = (form: AbstractControl): boolean => {
  if (form.invalid) {
    form.markAllAsTouched();
    return true;
  }
  return false;
};

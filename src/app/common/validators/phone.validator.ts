import { FormControl } from '@angular/forms';

export function phoneValidator(control: FormControl) {
  const phonePattern = /^\+380\d{9}$/;
  if (control.value && !phonePattern.test(control.value)) {
    return { invalidPhone: true };
  }
  return null;
}

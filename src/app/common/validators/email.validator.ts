import { FormControl } from '@angular/forms';

export function emailValidator(control: FormControl) {
  const emailPattern =
    /^[\w!#$%&'*+/=?`{|}~^.-]+(?:\.[\w!#$%&'*+/=?`{|}~^.-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  if (control.value && !emailPattern.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}

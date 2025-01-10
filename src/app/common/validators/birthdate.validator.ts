import { FormControl } from '@angular/forms';
const MIN_BIRTH_DATE = new Date('1700-01-01');
const MIN_AGE = 0;

export function birthDateValidator(control: FormControl) {
  const birthDate = control.value ? new Date(control.value) : null;

  if (!birthDate) return null;

  if (birthDate <= MIN_BIRTH_DATE) {
    return { invalidBirthDate: true };
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < MIN_AGE) {
    return { invalidBirthDate: true };
  }

  return null;
}

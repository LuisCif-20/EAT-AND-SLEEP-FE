import { AbstractControl, ValidationErrors } from '@angular/forms';

export const isFieldOneEqualsFieldTwo = (field_1: string, field_2: string) => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control_1 = formGroup.get(field_1);
    const control_2 = formGroup.get(field_2);
    if (!control_1 || !control_2) return null;
    return control_1.value === control_2.value ? null : { passwordsMismatch: true };
  };
};

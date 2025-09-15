import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string | null {
    if (value.length !== 8) return null;
    return value.slice(0, 4) + '-' + value.slice(4, 8);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nit',
})
export class NitPipe implements PipeTransform {
  transform(value: string): string | null {
    if (value.length !== 8) return null;
    return value.slice(0, -1) + '-' + value.slice(-1);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string) {
    const baseUrl = 'https://storage.googleapis.com/eat-and-sleep-bucket';
    return `${baseUrl}/${value}`;
  }
}

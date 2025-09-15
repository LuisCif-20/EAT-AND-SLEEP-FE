import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ImageUrlPipe } from '../../pipes/image-url-pipe';

@Component({
  selector: 'app-image-input',
  imports: [NgOptimizedImage, FileUploadModule, ImageUrlPipe],
  templateUrl: './image-input.html',
  styles: ``,
})
export class ImageInput {
  public readonly url = input.required<string | null>();
  public readonly newUrl = output<File>();

  private readonly _imageUrl = signal<string | null>(null);

  protected readonly imageUrl = computed(() => this._imageUrl());

  public onSelect(event: FileSelectEvent) {
    this._imageUrl.set(URL.createObjectURL(event.files[0]));
    this.newUrl.emit(event.files[0]);
  }
}

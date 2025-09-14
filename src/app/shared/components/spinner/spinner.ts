import { Component, input } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  imports: [ProgressSpinnerModule],
  templateUrl: './spinner.html',
  styles: ``,
})
export class Spinner {
  public readonly strokeWidth = input('5');
}

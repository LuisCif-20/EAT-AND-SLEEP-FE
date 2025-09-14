import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../../components/sidebar/sidebar';
import { Menubar } from '../../components/menubar/menubar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Menubar, Sidebar],
  templateUrl: './main-layout.html',
  styles: ``,
})
export class MainLayout {
  public open = signal(false);
}

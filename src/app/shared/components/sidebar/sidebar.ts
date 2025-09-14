import { NgClass } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';

import { PanelMenuModule } from 'primeng/panelmenu';

import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styles: ``,
  imports: [NgClass, PanelMenuModule, ButtonModule],
})
export class Sidebar {
  public readonly open = input.required<boolean>();
  public readonly hide = output();

  private readonly router = inject(Router);

  protected readonly items = signal<MenuItem[]>([
    {
      id: 'home',
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.redirectAndHide('/'),
    },
    {
      id: 'accomodation',
      label: 'Alojamientos',
      icon: 'pi pi-building',
    },
    {
      id: 'food',
      label: 'Comida',
      icon: 'pi pi-shop',
    },
  ]);

  private redirectAndHide(route: string) {
    this.router.navigateByUrl(route);
    this.hide.emit();
  }
}

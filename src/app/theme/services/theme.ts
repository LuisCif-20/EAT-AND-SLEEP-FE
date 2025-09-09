import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly htmlElement = document.documentElement;
  private readonly darkClass = 'dark-theme';

  private readonly _isDark = signal<boolean>(false);
  public readonly isDark = computed(() => this._isDark());

  constructor() {
    this.initTheme();
  }

  private useSystemPreference(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(prefersDark);
  }

  private initTheme(): void {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.setDarkMode(saved === 'dark', false);
    } else {
      this.useSystemPreference();
    }
  }

  private setDarkMode(toggle = true, saveToStorage = true): void {
    if (toggle) {
      this._isDark.update((value) => !value);
      this.htmlElement.classList.toggle(this.darkClass);
    }
    if (saveToStorage) {
      localStorage.setItem('theme', this._isDark() ? 'dark' : 'light');
    }
  }

  public toggle(): void {
    this.setDarkMode();
  }
}

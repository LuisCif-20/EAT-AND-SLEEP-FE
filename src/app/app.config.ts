import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { appInitializer } from './core/initializer/app-initializer';
import BluePreset from './theme/presets/amberpreset';
import { routes } from './app.routes';
import { addWithCredentialsInterceptor } from './core/interceptors/add-with-credentials-interceptor';
import { addAccessTokenInterceptor } from './core/interceptors/add-access-token-interceptor';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppInitializer(appInitializer),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: BluePreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
          darkModeSelector: '.dark-theme',
        },
      },
    }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        addWithCredentialsInterceptor,
        addAccessTokenInterceptor,
        refreshTokenInterceptor,
      ]),
    ),
  ],
};

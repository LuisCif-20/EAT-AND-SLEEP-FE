import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';

import BluePreset from './theme/presets/amberpreset';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { addWithCredentialsInterceptor } from './auth/interceptors/add-with-credentials-interceptor';
import { addAccessTokenInterceptor } from './auth/interceptors/add-access-token-interceptor';
import { refreshTokenInterceptor } from './auth/interceptors/refresh-token-interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
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

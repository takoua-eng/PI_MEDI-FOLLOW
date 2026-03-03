import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

// ngx-translate imports
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http'; // obligatoire

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // requis pour charger les fichiers JSON

    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
    ),

    IconSetService,
    provideAnimationsAsync(),

    // Configuration ngx-translate moderne (recommandée pour standalone)
    provideTranslateService({
      defaultLanguage: 'fr',
      useDefaultLang: true,
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/', // ou '/assets/i18n/' selon ton build
        suffix: '.json',
      }),
    }),
  ],
};

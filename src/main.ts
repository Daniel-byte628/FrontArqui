import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './vistas/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

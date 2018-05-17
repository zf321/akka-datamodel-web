import {AppRootComponent} from 'layout-lib';
import { ApplicationRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { Store } from '@ngrx/store';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { routes } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    APP_DECLARATIONS
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_IMPORTS,
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  bootstrap: [AppRootComponent],
  exports: [AppRootComponent],
  providers: [APP_PROVIDERS]
})

export class AppModule {
  constructor() { }

}

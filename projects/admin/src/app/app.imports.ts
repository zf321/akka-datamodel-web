import { LayoutLibModule } from 'layout-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { reducers, metaReducers } from './reducers/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { PRIMENG_MODULES } from 'primeng-lib';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { OdataLibModule } from 'odata-lib';
import { ModelingModule } from './modeling/modeling.module';


const STORE_DEV_TOOLS_IMPORTS = [];


const APP_MODULE = [
  ModelingModule
];

export const APP_IMPORTS = [
  OdataLibModule.forRoot(),
  PRIMENG_MODULES, LayoutLibModule,
  SlimLoadingBarModule.forRoot(),
  /**
   * StoreModule.forRoot is imported once in the root module, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   */
  StoreModule.forRoot(reducers, { metaReducers }),

  /**
   * @ngrx/router-store keeps router state up-to-date in the store.
   */
  StoreRouterConnectingModule,

  /**
   * Store devtools instrument the store retaining past versions of state
   * and recalculating new states. This enables powerful time-travel
   * debugging.
   *
   * To use the debugger, install the Redux Devtools extension for either
   * Chrome or Firefox
   *
   * See: https://github.com/zalmoxisus/redux-devtools-extension
   */
  // !environment.production ? StoreDevtoolsModule.instrument() : [],
  StoreDevtoolsModule.instrument(),
  /**
   * EffectsModule.forRoot() is imported once in the root module and
   * sets up the effects class to be initialized immediately when the
   * application starts.
   *
   * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
   */
  EffectsModule.forRoot([]),


  STORE_DEV_TOOLS_IMPORTS,

  APP_MODULE

];

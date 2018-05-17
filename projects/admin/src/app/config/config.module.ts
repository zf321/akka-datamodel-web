import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataConfiguration } from 'odata-lib';
import { ConfigComponentsModule } from './components';
import { PRIMENG_MODULES } from 'primeng-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { RouterModule } from '@angular/router';
import { ODataConfigurationFactory } from './ODataConfigurationFactory';
import { ODataServiceFactory } from 'odata-lib';
import { ConfigIndexPageComponent } from './containers/config-index-page';

@NgModule({
  imports: [
    CommonModule,
    ConfigComponentsModule,
    PRIMENG_MODULES,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsPrimeNGUIModule,
    RouterModule.forChild(
      [{
        path: '', component: ConfigIndexPageComponent, data: { menu: true, title: 'config' }
        , children: [


        ]
      }],
    ),

  ],
  declarations: [
    ConfigIndexPageComponent,
  ],
  providers: [{ provide: ODataConfiguration, useFactory: ODataConfigurationFactory }, ODataServiceFactory],
})
export class ConfigModule { }

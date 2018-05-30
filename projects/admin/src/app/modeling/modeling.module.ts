import { CategoryEffects } from './effects/category.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataConfiguration } from 'odata-lib';
import { ModelingComponentsModule } from './components';
import { PRIMENG_MODULES } from 'primeng-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { RouterModule } from '@angular/router';
import { ODataConfigurationFactory } from './ODataConfigurationFactory';
import { ODataServiceFactory } from 'odata-lib';
import { ModelingIndexPageComponent } from './containers/modeling-index-page';
import { CategoryPageComponent } from './containers/category-page';
import { CategorySchemaComponent } from './components/category/category-schema.component';
import { AssociationPageComponent } from './containers/association-page';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AssociationEffects } from './effects/association.effects';

@NgModule({
  imports: [
    CommonModule,
    ModelingComponentsModule,
    PRIMENG_MODULES,

    StoreModule.forFeature('modeling', reducers),
    EffectsModule.forFeature([CategoryEffects, AssociationEffects]),


    RouterModule.forChild(
      [{
        path: '', component: ModelingIndexPageComponent, data: { menu: true, title: 'modeling' }
        , children: [

          { path: 'category', component: CategoryPageComponent, data: { menu: true, title: 'category' } },
          { path: 'association', component: AssociationPageComponent, data: { menu: true, title: 'association' } }

        ]
      }],
    ),

  ],
  declarations: [
    ModelingIndexPageComponent, CategoryPageComponent, AssociationPageComponent,

  ],
  providers: [{ provide: ODataConfiguration, useFactory: ODataConfigurationFactory }, ODataServiceFactory],
})
export class ModelingModule { }

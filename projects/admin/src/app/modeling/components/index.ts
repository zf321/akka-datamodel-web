import { PRIMENG_MODULES } from 'primeng-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategorySchemaComponent } from './category/category-schema.component';
import { CategoryTypeComponent } from './category/category-type.component';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { CategoryComponent } from './category/category.component';


export const COMPONENTS = [
  CategorySchemaComponent, CategoryTypeComponent, CategoryComponent
];

@NgModule({
  imports: [
    CommonModule,
    PRIMENG_MODULES,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsPrimeNGUIModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ModelingComponentsModule { }

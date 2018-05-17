import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule
  ],
  declarations: [],
  exports: []
})
export class OdataLibModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: OdataLibModule
    };
  }
}

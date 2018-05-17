import { PrimengLibModule } from 'primeng-lib';
import { NgModule } from '@angular/core';

import { AppRootComponent } from './app-root.component';
import { AppSubMenuComponent } from './app-submenu.component';
import { AppMenuComponent } from './app-menu.component';
import { AppTopbarComponent } from './app-topbar.component';
import { AppInlineProfileComponent } from './app-inline-profile.component';
import { BreadCrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

const COMPONENTS = [
  AppRootComponent,AppSubMenuComponent,AppMenuComponent,AppTopbarComponent,AppInlineProfileComponent,BreadCrumbComponent
]

@NgModule({
  imports: [CommonModule,RouterModule,SlimLoadingBarModule,PrimengLibModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class LayoutLibModule { }

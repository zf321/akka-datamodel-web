import { AppRootComponent } from './app-root.component';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-topbar',
  template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <!--<div class="logo"></div>-->
                <span style="font-size: 36px;line-height: 1em;color: rgba(255, 255, 255, 0.8); font-family: 'Roboto'">akka-model</span>
            </div>

            <div class="topbar-right">
                <a id="menu-button" (click)="app.staticMenuDesktopInactive=!app.staticMenuDesktopInactive">
                    <i></i>
                </a>


                <a  id="topbar-menu-button">
                    <i class="material-icons">menu</i>
                </a>
            </div>
        </div>
    `
})
export class AppTopbarComponent implements OnInit, OnDestroy {

  constructor(public app: AppRootComponent) { }

  ngOnInit() { }

  ngOnDestroy() { }
}

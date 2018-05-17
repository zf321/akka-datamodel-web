// import { InputSwitchModule } from 'primeng/inputswitch';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Params, PRIMARY_OUTLET, NavigationEnd, ActivatedRoute, Router } from '@angular/router';

// import { InputSwitchModule, ProgressBarModule,ScrollPanelModule } from 'primeng/primeng';
import { transition, trigger, state, style, animate } from "@angular/animations";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  styleUrls: [],
  templateUrl: './app-root.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('overlayState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out'))
    ])
  ]
})
export class AppRootComponent implements OnInit {

  menuActive: boolean;

  activeMenuId: string;
  menus = [];
  constructor(
    // public activatedRoute: ActivatedRoute,
    // public router: Router,
    // private titleService: Title
  ) {
    // this.router.events
    //   .filter((event) => event instanceof NavigationEnd)
    //   .map(() => this.activatedRoute)
    //   .map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   })
    //   .filter((route) => route.outlet === 'primary')
    //   .mergeMap((route) => route.data)
    //   .subscribe((event) => this.titleService.setTitle(event['title']));

    // this.generateMenu();
  }

  ngOnInit() {
  }

  // onMenuButtonClick(event: Event) {
  //   this.menuActive = !this.menuActive;
  //   event.preventDefault();
  // }

  // Module = "cockpit";
  // Module = "datamapper";
  // generateMenu() {
  //   this.router.config.forEach((v, i) => {
  //     if (v.path === this.Module) {
  //       if (v.children && v.children.length > 0) {
  //         v.children.forEach((j, k) => {
  //           if (j.path)
  //             this.menus.push({ url: "/" + this.Module + "/" + j.path, title: j.data["title"] });
  //         });
  //       }
  //       return;
  //     }

  //   });
  // }





  ///////////////////////new//////////////////////////////////

  resetMenu = true;
  profileMode = "";
  overlayMenuActive = false;
  staticMenuDesktopInactive = false;
  staticMenuMobileActive = false;
  layoutCompact = true;

  isHorizontal() {
    return false;
  }

  isOverlay() {
    return false;
  }

  isSlim() {
    return false;
  }

}

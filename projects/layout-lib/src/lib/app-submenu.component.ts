import { OnInit, Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler, MenuItem } from 'primeng/primeng';
import { OnDestroy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ul[app-submenu]',
  template: `
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #listItem [ngClass]="{'active-menuitem': listItem==activeItem}" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" class="ripplelink" [href]="child.url||'#'" (click)="itemClick($event, child)">
                        <i class="material-icons" *ngIf="child.icon">{{child.icon}}</i>
                        <span>{{child.label}}</span>
                        <span class="ink ripple-animate"></span>
                        <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                    </a>
                    <a *ngIf="child.routerLink" class="ripplelink" [routerLink]="child.routerLink" [routerLinkActive]="'active-menuitem-routerlink'">
                        <i class="material-icons" *ngIf="child.icon">{{child.icon}}</i>
                        <span>{{child.label}}</span>
                        <span class="ink ripple-animate"></span>
                        <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                    </a>
                    <div class="layout-menu-tooltip">
                        <div class="layout-menu-tooltip-arrow"></div>
                        <div class="layout-menu-tooltip-text">{{child.label}}</div>
                    </div>
                    <ul app-submenu [item]="child" *ngIf="child.items" [@openClose]="listItem != activeItem? 'collapsed':'expanded'"></ul>
                </li>
            </ng-template>
    `,
  animations: [trigger(
    'openClose',
    [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', [animate('300ms cubic-bezier(.17,.67,.88,.1)')])
    ])],
  providers: [DomHandler]
})
export class AppSubMenuComponent implements OnDestroy, OnInit {
  @Input() item: MenuItem;
  @Input() root: boolean;
  @Input() reset: boolean;

  // documentClickListener: any;
  // menuClick: boolean;

  activeItem: any;

  constructor(public domHandler: DomHandler, public renderer: Renderer2) { }

  ngOnInit() { }

  ngOnDestroy() { }

  onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem) {

    if (menuitem.disabled) {
      return;
    }

    this.activeItem = item;
    // this.menuClick = true;
    // this.bindEventListener();

  }

  // bindEventListener() {
  //     if (!this.documentClickListener) {
  //         this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
  //             if (!this.menuClick) {
  //                 this.activeItem = null;
  //             }
  //             this.menuClick = false;
  //         });
  //     }
  // }

  itemClick(event, item: MenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }

    this.activeItem = null;
  }
}

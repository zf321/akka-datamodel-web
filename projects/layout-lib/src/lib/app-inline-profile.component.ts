import { OnDestroy, Component, OnInit } from '@angular/core';

@Component({
    selector:'app-inline-profile',
    template: `
        <div class="profile">
            <a class="ng-tns-c1-25" href="#">
                <img class="profile-image" src="assets/layout/images/avatar.png">
                <span class="profile-name">Jane Williams</span>
                <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </div>

        <ul class="ultima-menu profile-menu ng-trigger ng-trigger-menu" style="height: 0px;">
            <li class="ng-tns-c1-25" role="menuitem">
                <a class="ripplelink" href="#" tabindex="-1">
                    <i class="material-icons">person</i>
                    <span class="ng-tns-c1-25">Profile</span>
                </a>
            </li>
            <li class="ng-tns-c1-25" role="menuitem">
                <a class="ripplelink" href="#" tabindex="-1">
                    <i class="material-icons">security</i>
                    <span class="ng-tns-c1-25">Privacy</span>
                </a>
            </li>
            <li class="ng-tns-c1-25" role="menuitem">
                <a class="ripplelink" href="#" tabindex="-1">
                    <i class="material-icons">settings_application</i>
                    <span class="ng-tns-c1-25">Settings</span>
                </a>
            </li>
            <li class="ng-tns-c1-25" role="menuitem">
                <a class="ripplelink" href="#" tabindex="-1">
                    <i class="material-icons">power_settings_new</i>
                    <span class="ng-tns-c1-25">Logout</span>
                </a>
            </li>
        </ul>
    `
})
export class AppInlineProfileComponent implements  OnInit, OnDestroy{

    constructor(){}

    ngOnInit(){}

    ngOnDestroy(){}

}
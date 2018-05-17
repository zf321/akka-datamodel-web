import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription ,  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'config-index-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ConfigIndexPageComponent implements OnDestroy {

  ngOnDestroy() {
  }
}

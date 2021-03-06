import { Category } from '../models/category';
import { Select } from './../actions/category.actions';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'category-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'category-page.html'
})
export class CategoryPageComponent {
  selected: Category;
  constructor() {

  }

}

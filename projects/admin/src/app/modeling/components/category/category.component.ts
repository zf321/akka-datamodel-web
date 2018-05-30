import { getSelectedSchema } from './../../reducers/index';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoryTypeSchema, CategoryType } from '../../models/category';
import { DynamicFormControlModel, DynamicFormLayout, DynamicInputModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import * as fromModeling from '../../reducers';
import { Store, select } from '@ngrx/store';
import * as actCategory from '../../actions/category.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'category',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
  @Input() schema: CategoryTypeSchema;
  @Output() selected: EventEmitter<CategoryType>;

  formModel: DynamicFormControlModel[] = [
    new DynamicInputModel({
      id: 'name',
      label: 'name',
      placeholder: 'name'
    }),
    new DynamicInputModel({
      id: 'code',
      label: 'code',
      placeholder: 'code'
    })];
  formLayout: DynamicFormLayout = {};
  protected formGroup: FormGroup;
  display = false;

  constructor(private store: Store<fromModeling.State>, private formService: DynamicFormService) {
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  add() {
    this.display = true;
  }

  save() {
    const en = this.formGroup.value;
    this.display = false;
  }
}

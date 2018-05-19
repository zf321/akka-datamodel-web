import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoryTypeSchema } from '../../models/category';
import { DynamicFormControlModel, DynamicFormLayout, DynamicInputModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import * as fromModeling from '../../reducers';
import { Store, select } from '@ngrx/store';
import * as actCategory from '../../actions/category.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'category-schema',
  templateUrl: 'category-schema.component.html'
})

export class CategorySchemaComponent implements OnInit {
  entities$: Observable<CategoryTypeSchema[]>;
  @Output() selected: EventEmitter<CategoryTypeSchema>;

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
    this.entities$ = store.pipe(select(fromModeling.getAllCategorys));
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.store.dispatch(new actCategory.LoadSchema());
  }

  add() {
    this.display = true;
  }

  save() {
    const en = this.formGroup.value;
    en.isSystem = true;
    this.store.dispatch(new actCategory.CreateSchema(en));
    this.display = false;
  }
}

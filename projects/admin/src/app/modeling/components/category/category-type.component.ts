import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoryTypeSchema, CategoryType } from '../../models/category';
import { DynamicFormControlModel, DynamicFormLayout, DynamicInputModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import * as fromModeling from '../../reducers';
import { Store, select } from '@ngrx/store';
import * as actCategory from '../../actions/category.actions';
import * as actAssociation from '../../actions/association.actions';
import { Observable } from 'rxjs';
import { TreeNode, MenuItem } from 'primeng-lib';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'category-type',
  templateUrl: 'category-type.component.html'
})

export class CategoryTypeComponent implements OnInit {

  tree: TreeNode[];
  _schema: CategoryTypeSchema;
  @Input() set schema(sch: CategoryTypeSchema) {
    if (sch) {
      this._schema = sch;
      this.tree = this.convertTree(sch);
    }
  }
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
  menus: MenuItem[];
  selectedType: TreeNode;
  constructor(private store: Store<fromModeling.State>, private formService: DynamicFormService) {
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.menus = [
      { label: 'Add Child', icon: 'fa-plus', command: (event) => this.addChild(this.selectedType) },
      { label: 'Delete', icon: 'fa-remove', command: (event) => this.deleteType(this.selectedType) }
    ];
  }

  add() {
    this.display = true;
  }

  refresh() {
    this.store.dispatch(new actCategory.LoadSchema());
  }
  addChild(node: TreeNode) {
    if (node.data) {
      this.display = true;
    }
  }
  deleteType(node: TreeNode) {
    if (node.data) {
      this.store.dispatch(new actCategory.DeleteType(this.schema.id, node.data));
    }
  }
  save() {
    const en = this.formGroup.value;
    this.store.dispatch(new actCategory.AddType(this.schema.id, en));
    this.store.dispatch(new actAssociation.Create(en));
    this.display = false;
  }

  convertTree(sch: CategoryTypeSchema): TreeNode[] {
    const treeNode: TreeNode[] = [];
    // if (sch.types) {
    // sch.types.forEach(c => {
    //   const node: TreeNode = {};
    //   node.label = c.name;
    //   node.data = c;
    //   node.expandedIcon = 'fa-folder-open';
    //   node.collapsedIcon = 'fa-folder';
    //   node.children = [];
    //   treeNode.push(node);
    // });
    // }
    return treeNode;
  }
}

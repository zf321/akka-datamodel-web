import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category';
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
  selector: 'category',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {

  tree: TreeNode[];
  @Output() selected: EventEmitter<Category>;

  formModel: DynamicFormControlModel[] = [
    new DynamicInputModel({
      id: 'name',
      label: 'name',
      placeholder: 'name'
    })];
  formLayout: DynamicFormLayout = {};
  protected formGroup: FormGroup;
  display = false;
  isRoot = false;
  menus: MenuItem[];
  selectedNode: TreeNode;
  constructor(private store: Store<fromModeling.State>, private formService: DynamicFormService) {
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.store.pipe(select(fromModeling.getCategoryTree)).subscribe(e => {
      if (e) {
        this.tree = this.convertTree(e);
      }
    });
    this.menus = [
      { label: 'Add Child', icon: 'fa-plus', command: (event) => this.addChild(this.selectedNode) },
      { label: 'Delete', icon: 'fa-remove', command: (event) => this.deleteType(this.selectedNode) }
    ];
  }

  refresh() {
    this.store.dispatch(new actCategory.Load());
    this.store.dispatch(new actAssociation.Load());
  }
  addRoot() {
    this.display = true;
    this.isRoot = true;
  }
  addChild(node: TreeNode) {
    if (node.data) {
      this.display = true;
      this.isRoot = false;
    }
  }
  deleteType(node: TreeNode) {
    if (node.data) {
      this.store.dispatch(new actCategory.Delete(node.data));
    }
  }
  save() {
    const en = this.formGroup.value;
    if (this.isRoot) {
      this.store.dispatch(new actCategory.Create(en));
    } else {
      this.store.dispatch(new actCategory.AddChild(this.selectedNode.data.id, en));
    }
    this.display = false;
  }
  drop(e) {
    console.log(e);
  }
  convertTree(sch: Category[]): TreeNode[] {
    const treeNode: TreeNode[] = [];
    sch.forEach(c => {
      const node: TreeNode = {};
      node.label = c.name;
      node.data = c;
      node.expandedIcon = 'fa-folder-open';
      node.collapsedIcon = 'fa-folder';
      node.children = this.convertTree(c['children']);
      treeNode.push(node);
    });
    return treeNode;
  }
}

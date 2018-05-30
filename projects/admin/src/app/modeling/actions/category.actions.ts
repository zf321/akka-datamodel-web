import { Action } from '@ngrx/store';
import { CategoryTypeSchema, CategoryType } from '../models/category';

export enum ActionTypes {
  CreateSchema = '[Category] CreateSchema',
  LoadSchema = '[Category] LoadSchema',
  LoadSchemaSuccess = '[Category] LoadSchema Success',
  SelectSchema = '[Category] SelectSchema',
  AddType = '[Category] AddType',
  DeleteType = '[Category] DeleteType',
}

export class CreateSchema implements Action {
  readonly type = ActionTypes.CreateSchema;
  constructor(public payload: CategoryTypeSchema) { }
}
export class LoadSchema implements Action {
  readonly type = ActionTypes.LoadSchema;
}

export class LoadSchemaSuccess implements Action {
  readonly type = ActionTypes.LoadSchemaSuccess;
  constructor(public payload: CategoryTypeSchema[]) { }
}
export class SelectSchema implements Action {
  readonly type = ActionTypes.SelectSchema;

  constructor(public payload: string) { }
}
export class AddType implements Action {
  readonly type = ActionTypes.AddType;

  constructor(public schemaId, public payload: CategoryType) { }
}
export class DeleteType implements Action {
  readonly type = ActionTypes.DeleteType;

  constructor(public schemaId, public payload: CategoryType) { }
}

export type ActionsUnion =
  | CreateSchema
  | LoadSchema
  | LoadSchemaSuccess
  | SelectSchema
  | AddType;
